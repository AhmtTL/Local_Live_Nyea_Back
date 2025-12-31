<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useServerSearch } from '@/Composables/useServerSearch';
import PaymentExportModal from '@/Components/Admin/PaymentExportModal.vue';

const props = defineProps({
    payments: Object,
    filters: Object,
    stats: Object,
    workshopSessions: Array,
    schools: Array,
});

// Use the reusable server search composable
const { filters, isLoading, updateFilter } = useServerSearch('admin.payments.index', props.filters, {
    immediateFilters: ['status', 'school_id', 'date_from', 'date_to'],
});

// Export modal state
const showExportModal = ref(false);
const exportRoute = ref(route('admin.payments.export'));

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
        paid: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        failed: 'bg-red-100 text-red-800',
        processing: 'bg-blue-100 text-blue-800',
        refunded: 'bg-gray-100 text-gray-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
};

const openExportModal = (format = 'csv') => {
    exportRoute.value = format === 'excel'
        ? route('admin.payments.export-excel')
        : route('admin.payments.export');
    showExportModal.value = true;
};

const closeExportModal = () => {
    showExportModal.value = false;
};

const handleExport = (filters) => {
    // Optional: Handle any additional logic after export
    console.log('Export started with filters:', filters);
};
</script>

<template>
    <Head title="Payments" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Payments
                </h2>
                <div class="flex items-center gap-2">
                    <button
                        @click="openExportModal('csv')"
                        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        Export CSV
                    </button>
                    <button
                        @click="openExportModal('excel')"
                        class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        Export Excel
                    </button>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <!-- Stats Grid -->
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats.total_revenue) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Pending Amount</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats.pending_amount) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Failed Payments</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.failed_count }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Transactions</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.total_transactions }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <!-- Search and Filter Bar -->
                    <div class="p-6 border-b border-gray-200">
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            <div>
                                <label for="search" class="sr-only">Search payments</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="search"
                                        v-model="filters.search"
                                        type="text"
                                        placeholder="Search by user, program, or school..."
                                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                </div>
                            </div>
                            <div>
                                <select
                                    :value="filters.status"
                                    @change="updateFilter('status', $event.target.value)"
                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    :disabled="isLoading"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="failed">Failed</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    :value="filters.school_id"
                                    @change="updateFilter('school_id', $event.target.value)"
                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    :disabled="isLoading"
                                >
                                    <option value="">All Schools</option>
                                    <option v-for="school in schools" :key="school.id" :value="school.id">
                                        {{ school.name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <input
                                    :value="filters.date_from"
                                    @change="updateFilter('date_from', $event.target.value)"
                                    type="date"
                                    placeholder="From date"
                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    :disabled="isLoading"
                                >
                            </div>
                            <div>
                                <input
                                    :value="filters.date_to"
                                    @change="updateFilter('date_to', $event.target.value)"
                                    type="date"
                                    placeholder="To date"
                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    :disabled="isLoading"
                                >
                            </div>
                        </div>
                    </div>

                    <!-- Payments Table -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Program
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        School
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="payment in payments.data" :key="payment.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-8 w-8">
                                                <div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                                                    <span class="text-xs font-medium text-white">
                                                        {{ (payment.user?.name || payment.guest_name || 'Guest User').charAt(0) }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="ml-3">
                                                <div class="text-sm font-medium text-gray-900">
                                                    {{ payment.user?.name || payment.guest_name || 'Guest User' }}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    {{ payment.user?.email || payment.guest_email || 'No email' }}
                                                </div>
                                                    <div v-if="payment.guest_school_name" class="text-xs text-blue-600">
                                                        School: {{ payment.guest_school_name }}
                                                    </div>
                                                    <div v-if="payment.guest_grade" class="text-xs text-gray-500">
                                                        Grade: {{ payment.guest_grade }}
                                                    </div>
                                                    <div v-if="payment.guest_city" class="text-xs text-gray-500">
                                                        City: {{ payment.guest_city }}
                                                    </div>
                                                <div v-if="!payment.user && payment.guest_phone" class="text-xs text-gray-400">
                                                    {{ payment.guest_phone }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ payment.program?.title || 'Unknown Program' }}</div>
                                        <div class="text-sm text-gray-500">{{ payment.program ? formatCurrency(payment.program.price) : 'N/A' }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div v-if="payment.school" class="text-sm font-medium text-gray-900">{{ payment.school.name }}</div>
                                        <div v-else-if="payment.guest_school_name" class="text-sm text-gray-500">{{ payment.guest_school_name }}</div>
                                        <div v-else class="text-sm text-gray-400 italic">No school</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div class="flex flex-col">
                                            <div class="font-semibold">
                                                {{ payment.is_split_payment ? formatCurrency(payment.payment_plan_total_amount) : formatCurrency(payment.amount) }}
                                            </div>
                                            <div v-if="payment.is_split_payment" class="text-xs text-blue-600 mt-1">
                                                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                    Split Payment
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex flex-col gap-1">
                                            <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusBadgeClass(payment.status)]">
                                                {{ payment.status }}
                                            </span>
                                            <div v-if="payment.manual_override" class="text-xs text-orange-600">Manual</div>
                                            
                                            <!-- Split payment status -->
                                            <div v-if="payment.is_split_payment && payment.balance_payment" class="text-xs">
                                                <span class="text-gray-500">Balance: </span>
                                                <span :class="['px-1.5 py-0.5 rounded text-xs font-medium', getStatusBadgeClass(payment.balance_payment.status)]">
                                                    {{ payment.balance_payment.status }}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>{{ formatDateTime(payment.created_at) }}</div>
                                        <div v-if="payment.paid_at" class="text-xs text-green-600">
                                            Paid: {{ formatDate(payment.paid_at) }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            v-if="payment.id"
                                            :href="route('admin.payments.show', payment.id)"
                                            class="text-blue-600 hover:text-blue-900"
                                        >
                                            View Details
                                        </Link>
                                        <span v-else class="text-gray-400">No ID</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <Link
                                v-if="payments.prev_page_url"
                                :href="payments.prev_page_url"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                            <Link
                                v-if="payments.next_page_url"
                                :href="payments.next_page_url"
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Showing {{ payments.from }} to {{ payments.to }} of {{ payments.total }} results
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <Link
                                        v-if="payments.prev_page_url"
                                        :href="payments.prev_page_url"
                                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Previous
                                    </Link>
                                    <Link
                                        v-if="payments.next_page_url"
                                        :href="payments.next_page_url"
                                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Export Modal Component -->
        <PaymentExportModal 
            :show="showExportModal"
            :workshop-sessions="workshopSessions"
            :schools="schools"
            :export-route="exportRoute"
            @close="closeExportModal"
            @export="handleExport"
        />
    </AdminLayout>
</template> 