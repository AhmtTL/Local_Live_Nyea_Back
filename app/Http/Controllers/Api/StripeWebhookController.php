<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Invoice as StripeInvoice;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    /**
     * Handle incoming Stripe webhook events.
     */
    public function handle(Request $request): Response
    {
        $payload = $request->getContent();
        $signature = $request->headers->get('Stripe-Signature');
        $webhookSecret = config('services.stripe.webhook_secret');

        if (!$webhookSecret) {
            Log::critical('Stripe webhook secret is not configured');

            return response([
                'error' => 'Webhook secret not configured',
            ], 500);
        }

        try {
            $event = Webhook::constructEvent($payload, $signature, $webhookSecret);
        } catch (\UnexpectedValueException $exception) {
            Log::warning('Stripe webhook payload could not be parsed', [
                'error' => $exception->getMessage(),
            ]);

            return response(['error' => 'Invalid payload'], 400);
        } catch (SignatureVerificationException $exception) {
            Log::warning('Stripe webhook signature verification failed', [
                'error' => $exception->getMessage(),
            ]);

            return response(['error' => 'Invalid signature'], 400);
        }

        $object = $event->data->object;

        switch ($event->type) {
            case 'invoice.paid':
                $this->handleInvoicePaid($object);
                break;
            case 'invoice.payment_failed':
                $this->handleInvoiceFailed($object);
                break;
            default:
                Log::debug('Unhandled Stripe webhook event', ['type' => $event->type]);
        }

        return response([
            'success' => true,
        ]);
    }

    /**
     * Mark the balance payment as paid when Stripe confirms the invoice payment.
     */
    private function handleInvoicePaid(StripeInvoice $invoice): void
    {
        $balancePaymentId = $invoice->metadata['balance_payment_id'] ?? null;

        if (!$balancePaymentId) {
            Log::warning('Stripe invoice paid event missing balance payment reference', [
                'invoice_id' => $invoice->id,
            ]);

            return;
        }

        $balancePayment = Payment::find($balancePaymentId);

        if (!$balancePayment) {
            Log::warning('Balance payment not found for Stripe invoice', [
                'invoice_id' => $invoice->id,
                'balance_payment_id' => $balancePaymentId,
            ]);

            return;
        }

        $balancePayment->update([
            'status' => 'paid',
            'paid_at' => now(),
            'stripe_invoice_id' => $invoice->id,
            'stripe_customer_id' => $invoice->customer,
        ]);

        if ($balancePayment->parentPayment) {
            $parentPayment = $balancePayment->parentPayment;
            $metadata = $parentPayment->metadata ?? [];
            Arr::set($metadata, 'payment_plan.balance_paid_at', now()->toIso8601String());

            $parentPayment->update([
                'payment_plan_balance_amount' => 0,
                'metadata' => $metadata,
            ]);
        }

        Log::info('Balance payment marked as paid via Stripe invoice', [
            'balance_payment_id' => $balancePayment->id,
            'deposit_payment_id' => $balancePayment->parent_payment_id,
            'invoice_id' => $invoice->id,
        ]);
    }

    /**
     * Flag the balance payment when Stripe reports a failed invoice payment.
     */
    private function handleInvoiceFailed(StripeInvoice $invoice): void
    {
        $balancePaymentId = $invoice->metadata['balance_payment_id'] ?? null;

        if (!$balancePaymentId) {
            Log::warning('Stripe invoice payment failed event missing balance payment reference', [
                'invoice_id' => $invoice->id,
            ]);

            return;
        }

        $balancePayment = Payment::find($balancePaymentId);

        if (!$balancePayment) {
            Log::warning('Balance payment not found for failed Stripe invoice', [
                'invoice_id' => $invoice->id,
                'balance_payment_id' => $balancePaymentId,
            ]);

            return;
        }

        $balancePayment->update([
            'status' => 'failed',
            'stripe_invoice_id' => $invoice->id,
            'stripe_customer_id' => $invoice->customer,
        ]);

        Log::info('Balance payment flagged as failed via Stripe invoice', [
            'balance_payment_id' => $balancePayment->id,
            'invoice_id' => $invoice->id,
        ]);
    }
}

