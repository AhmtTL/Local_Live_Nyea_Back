<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(403, 'Access denied. Authentication required.');
        }

        // Allow admin users full access
        if ($user->isAdmin()) {
            return $next($request);
        }

        // Allow school users access to specific routes only
        if ($user->isSchool()) {
            $allowedRoutes = [
                'admin.dashboard',
                'admin.registrations.index',
                'admin.registrations.workshops.check-in',
                'admin.registrations.workshops.uncheck-in',
                'admin.registrations.training-camps.check-in',
                'admin.registrations.training-camps.uncheck-in',
                'admin.registrations.workshops.export',
                'admin.registrations.training-camps.export',
            ];

            $currentRoute = $request->route()->getName();

            if (in_array($currentRoute, $allowedRoutes)) {
                return $next($request);
            }
        }

        // Allow dev users access to specific routes (no dashboard, users, payments)
        if ($user->isDev()) {
            $deniedRoutes = [
                'admin.dashboard',
                'admin.users.index',
                'admin.users.create',
                'admin.users.store',
                'admin.users.show',
                'admin.users.edit',
                'admin.users.update',
                'admin.users.destroy',
                'admin.users.tag-influencer',
                'admin.users.remove-influencer',
                'admin.payments.index',
                'admin.payments.show',
                'admin.payments.update',
                'admin.payments.export',
                'admin.payments.export-excel',
            ];

            $currentRoute = $request->route()->getName();

            if (in_array($currentRoute, $deniedRoutes)) {
                abort(403, 'Access denied. You do not have permission to access this section.');
            }

            return $next($request);
        }

        abort(403, 'Access denied. Admin access required.');
    }
}
