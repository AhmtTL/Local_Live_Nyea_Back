<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { Head, Link } from "@inertiajs/vue3";

defineProps({
    stats: Object,
    recent_users: Array,
    recent_payments: Array,
    revenue_by_program: Array,
});

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const getStatusBadgeClass = (status) => {
    const classes = {
        paid: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        processing: "bg-blue-100 text-blue-800",
        refunded: "bg-gray-100 text-gray-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
};
</script>

<template>
    <Head title="Admin Dashboard" />

    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                LOCAL LIVE Dashboard TEST LIVE

            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
                <!-- Stats Grid -->
                <div
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                >
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg
                                        class="h-6 w-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt
                                            class="text-sm font-medium text-gray-500 truncate"
                                        >
                                            Total Users
                                        </dt>
                                        <dd
                                            class="text-lg font-medium text-gray-900"
                                        >
                                            {{ stats.total_users }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <div class="text-sm">
                                <Link
                                    :href="route('admin.users.index')"
                                    class="font-medium text-cyan-700 hover:text-cyan-900"
                                >
                                    View all users
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg
                                        class="h-6 w-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt
                                            class="text-sm font-medium text-gray-500 truncate"
                                        >
                                            Total Programs
                                        </dt>
                                        <dd
                                            class="text-lg font-medium text-gray-900"
                                        >
                                            {{ stats.total_programs }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <div class="text-sm">
                                <Link
                                    :href="route('admin.programs.index')"
                                    class="font-medium text-cyan-700 hover:text-cyan-900"
                                >
                                    View all programs
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg
                                        class="h-6 w-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt
                                            class="text-sm font-medium text-gray-500 truncate"
                                        >
                                            Total Revenue
                                        </dt>
                                        <dd
                                            class="text-lg font-medium text-gray-900"
                                        >
                                            {{
                                                formatCurrency(
                                                    stats.total_revenue
                                                )
                                            }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <div class="text-sm">
                                <Link
                                    :href="route('admin.payments.index')"
                                    class="font-medium text-cyan-700 hover:text-cyan-900"
                                >
                                    View all payments
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg
                                        class="h-6 w-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt
                                            class="text-sm font-medium text-gray-500 truncate"
                                        >
                                            Total Payments
                                        </dt>
                                        <dd
                                            class="text-lg font-medium text-gray-900"
                                        >
                                            {{ stats.total_payments }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <div class="text-sm">
                                <span class="text-gray-500"
                                    >{{ stats.pending_payments }} pending,
                                    {{ stats.failed_payments }} failed</span
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity Grid -->
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <!-- Recent Users -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-6">
                            <h3
                                class="text-lg leading-6 font-medium text-gray-900 mb-4"
                            >
                                Recent Users
                            </h3>
                            <div class="flow-root">
                                <ul class="-my-3 divide-y divide-gray-200">
                                    <li
                                        v-for="user in recent_users"
                                        :key="user.id"
                                        class="py-3 flex items-center justify-between"
                                    >
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <div
                                                    class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center"
                                                >
                                                    <span
                                                        class="text-sm font-medium text-white"
                                                        >{{
                                                            user.name?.charAt(
                                                                0
                                                            ) || "U"
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="ml-3">
                                                <p
                                                    class="text-sm font-medium text-gray-900"
                                                >
                                                    {{
                                                        user.name ||
                                                        "Unknown User"
                                                    }}
                                                </p>
                                                <p
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{
                                                        user.email || "No email"
                                                    }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ formatDate(user.created_at) }}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="mt-4">
                                <Link
                                    :href="route('admin.users.index')"
                                    class="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                                >
                                    View all users →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Payments -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-6">
                            <h3
                                class="text-lg leading-6 font-medium text-gray-900 mb-4"
                            >
                                Recent Payments
                            </h3>
                            <div class="flow-root">
                                <ul class="-my-3 divide-y divide-gray-200">
                                    <li
                                        v-for="payment in recent_payments"
                                        :key="payment.id"
                                        class="py-3 flex items-center justify-between"
                                    >
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <span
                                                    :class="[
                                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                        getStatusBadgeClass(
                                                            payment.status
                                                        ),
                                                    ]"
                                                >
                                                    {{ payment.status }}
                                                </span>
                                            </div>
                                            <div class="ml-3">
                                                <p
                                                    class="text-sm font-medium text-gray-900"
                                                >
                                                    {{
                                                        payment.user?.name ||
                                                        payment.guest_name ||
                                                        "Guest User"
                                                    }}
                                                </p>
                                                <p
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{
                                                        payment.program
                                                            ?.title ||
                                                        "Unknown Program"
                                                    }}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {{ formatCurrency(payment.amount) }}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="mt-4">
                                <Link
                                    :href="route('admin.payments.index')"
                                    class="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                                >
                                    View all payments →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Revenue by Program -->
                <div class="mt-8 bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-6">
                        <h3
                            class="text-lg leading-6 font-medium text-gray-900 mb-4"
                        >
                            Revenue by Program TEST LOCAL LIVE
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Program
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Sales
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Revenue
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                >
                                    <tr
                                        v-for="item in revenue_by_program"
                                        :key="item.program_id"
                                    >
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                        >
                                            {{
                                                item.program?.title ||
                                                "Unknown Program"
                                            }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{ item.total_sales }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {{
                                                formatCurrency(
                                                    item.total_revenue
                                                )
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
