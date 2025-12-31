<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    payment: Object,
});

const showEditForm = ref(false);
const editStatus = ref(props.payment.status);
const editNotes = ref(props.payment.notes);

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const formatDateTime = (date) => {
    return new Date(date).toLocaleString();
};

const getStatusBadgeClass = (status) => {
    const classes = {
        'paid': 'bg-green-100 text-green-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'failed': 'bg-red-100 text-red-800',
        'processing': 'bg-blue-100 text-blue-800',
        'refunded': 'bg-gray-100 text-gray-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
};

const toggleEditForm = () => {
    showEditForm.value = !showEditForm.value;
    if (showEditForm.value) {
        editStatus.value = props.payment.status;
        editNotes.value = props.payment.notes;
    }
};

const updatePayment = () => {
    router.put(route('admin.payments.update', props.payment.id), {
        status: editStatus.value,
        notes: editNotes.value,
        manual_override: true,
    }, {
        onSuccess: () => {
            showEditForm.value = false;
        }
    });
};

const getCustomerName = () => {
    return props.payment.user?.name || props.payment.guest_name || 'Guest User';
};

const getCustomerEmail = () => {
    return props.payment.user?.email || props.payment.guest_email || 'No email';
};

const getCustomerPhone = () => {
    return props.payment.user?.phone || props.payment.guest_phone || 'No phone';
};

const getCustomerSchool = () => {
    return props.payment.user?.school_name || props.payment.guest_school_name || 'No school';
};

const getCustomerGrade = () => {
    return props.payment.user?.grade || props.payment.guest_grade || 'No grade';
};

const getCustomerCity = () => {
    return props.payment.user?.city || props.payment.guest_city || 'No city';
};

const isGuestPayment = () => {
    return !props.payment.user;
};
</script>

<template>
    <Head :title="`Payment #${payment.id}`" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Payment Details
                </h2>
                <Link
                    :href="route('admin.payments.index')"
                    class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                    ← Back to Payments
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-12 w-12">
                                    <div class="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center">
                                        <span class="text-lg font-medium text-white">{{ getCustomerName().charAt(0) }}</span>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <h1 class="text-3xl font-bold text-gray-900">Payment #{{ payment.id }}</h1>
                                    <p class="mt-1 text-sm text-gray-500">{{ getCustomerName() }} - {{ getCustomerEmail() }}</p>
                                    <div class="mt-2">
                                        <span :class="['inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', getStatusBadgeClass(payment.status)]">
                                            {{ payment.status.toUpperCase() }}
                                        </span>
                                        <span v-if="payment.manual_override" class="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                            MANUAL OVERRIDE
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Details -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <!-- Main Details -->
                    <div class="lg:col-span-2">
                        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h2 class="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Payment ID</dt>
                                        <dd class="mt-1 text-sm text-gray-900">#{{ payment.id }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Amount</dt>
                                        <dd class="mt-1">
                                            <div v-if="payment.is_deposit || payment.payment_plan_type" class="space-y-3">
                                                <div class="text-lg font-semibold text-gray-900">
                                                    {{ formatCurrency(payment.payment_plan_total_amount || payment.amount) }}
                                                    <span class="text-sm font-normal text-blue-600 ml-2">Split Payment</span>
                                                </div>
                                                <div class="text-sm text-gray-600">
                                                    <div class="flex justify-between mb-1">
                                                        <span>Deposit Paid:</span>
                                                        <span class="font-medium text-green-600">{{ formatCurrency(payment.payment_plan_deposit_amount || payment.amount) }}</span>
                                                    </div>
                                                    <div class="flex justify-between">
                                                        <span>Balance Due:</span>
                                                        <span class="font-medium text-orange-600">{{ formatCurrency(payment.payment_plan_balance_amount || 0) }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else class="text-lg font-semibold text-gray-900">{{ formatCurrency(payment.amount) }}</div>
                                        </dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Currency</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ payment.currency }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Status</dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusBadgeClass(payment.status)]">
                                                {{ payment.status }}
                                            </span>
                                        </dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Program</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ payment.program?.title || 'Unknown Program' }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Stripe Payment Intent ID</dt>
                                        <dd class="mt-1 text-sm text-gray-900 font-mono">{{ payment.stripe_payment_intent_id || 'N/A' }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Stripe Customer ID</dt>
                                        <dd class="mt-1 text-sm text-gray-900 font-mono">{{ payment.stripe_customer_id || 'N/A' }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Created At</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(payment.created_at) }}</dd>
                                    </div>
                                    
                                    <div v-if="payment.paid_at">
                                        <dt class="text-sm font-medium text-gray-500">Paid At</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(payment.paid_at) }}</dd>
                                    </div>
                                    
                                    <div v-if="payment.updated_at && payment.updated_at !== payment.created_at">
                                        <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(payment.updated_at) }}</dd>
                                    </div>
                                </div>
                                
                                <div v-if="payment.notes" class="mt-6">
                                    <dt class="text-sm font-medium text-gray-500">Notes</dt>
                                    <dd class="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{{ payment.notes }}</dd>
                                </div>
                            </div>
                        </div>

                        <!-- Workshop Session Details -->
                        <div v-if="payment.workshop_session" class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Workshop Session Details</h3>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Session ID</dt>
                                        <dd class="mt-1 text-sm text-gray-900">#{{ payment.workshop_session.id }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Program Type</dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            <span :class="[
                                                payment.workshop_session.program_type === 'mastery' 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : 'bg-blue-100 text-blue-800',
                                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                            ]">
                                                {{ payment.workshop_session.program_type }}
                                            </span>
                                        </dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Date</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatDate(payment.workshop_session.date) }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Location</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ payment.workshop_session.location || 'TBD' }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Available Spots</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ payment.workshop_session.available_spots || 'N/A' }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Booked Spots</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ payment.workshop_session.booked_spots || 0 }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Remaining Spots</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ (payment.workshop_session.available_spots || 0) - (payment.workshop_session.booked_spots || 0) }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Session Status</dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            <span :class="[
                                                payment.workshop_session.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800',
                                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                                            ]">
                                                {{ payment.workshop_session.is_active ? 'Active' : 'Inactive' }}
                                            </span>
                                        </dd>
                                    </div>
                                    
                                    <div v-if="payment.workshop_session.price_override">
                                        <dt class="text-sm font-medium text-gray-500">Price Override</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatCurrency(payment.workshop_session.price_override) }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Session Created</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(payment.workshop_session.created_at) }}</dd>
                                    </div>
                                </div>
                                
                                <div v-if="payment.workshop_session.description" class="mt-6">
                                    <dt class="text-sm font-medium text-gray-500">Description</dt>
                                    <dd class="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{{ payment.workshop_session.description }}</dd>
                                </div>
                            </div>
                        </div>

                        <!-- Balance Payment Details (if applicable) -->
                        <div v-if="payment.balance_payments && payment.balance_payments.length > 0" class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Balance Payment</h3>
                                
                                <div v-for="balancePayment in payment.balance_payments" :key="balancePayment.id" class="bg-gray-50 rounded-lg p-4">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <dt class="text-sm font-medium text-gray-500">Amount</dt>
                                            <dd class="mt-1 text-sm font-semibold text-gray-900">{{ formatCurrency(balancePayment.amount) }}</dd>
                                        </div>
                                        
                                        <div>
                                            <dt class="text-sm font-medium text-gray-500">Status</dt>
                                            <dd class="mt-1">
                                                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusBadgeClass(balancePayment.status)]">
                                                    {{ balancePayment.status }}
                                                </span>
                                            </dd>
                                        </div>
                                        
                                        <div v-if="balancePayment.paid_at">
                                            <dt class="text-sm font-medium text-gray-500">Paid At</dt>
                                            <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(balancePayment.paid_at) }}</dd>
                                        </div>
                                        <div v-else-if="payment.payment_plan_balance_due_at">
                                            <dt class="text-sm font-medium text-gray-500">Due Date</dt>
                                            <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(payment.payment_plan_balance_due_at) }}</dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Information -->
                    <div class="space-y-6">
                        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                    {{ isGuestPayment() ? 'Guest Information' : 'Customer Information' }}
                                </h3>
                                
                                <div class="space-y-4">
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Name</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ getCustomerName() }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Email</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ getCustomerEmail() }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Phone</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ getCustomerPhone() }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">School</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ getCustomerSchool() }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Grade</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ getCustomerGrade() }}</dd>
                                    </div>
                                    
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">City</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ getCustomerCity() }}</dd>
                                    </div>
                                    
                                    <div v-if="!isGuestPayment()">
                                        <dt class="text-sm font-medium text-gray-500">Customer Type</dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Registered User
                                            </span>
                                        </dd>
                                    </div>
                                    
                                    <div v-else>
                                        <dt class="text-sm font-medium text-gray-500">Customer Type</dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Guest Checkout
                                            </span>
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Metadata -->
                <div v-if="payment.metadata && Object.keys(payment.metadata).length > 0" class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Metadata</h3>
                        
                        <div class="bg-gray-50 rounded-lg p-4">
                            <pre class="text-sm text-gray-700 whitespace-pre-wrap">{{ JSON.stringify(payment.metadata, null, 2) }}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
