<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useServerSearch } from '@/Composables/useServerSearch';

const props = defineProps({
    registrations: Object,
    filters: Object,
    stats: Object,
    workshopSessions: Array,
});

// Use the reusable server search composable
const { filters, isLoading, updateFilter } = useServerSearch('admin.workshop-registrations.index', props.filters, {
    immediateFilters: ['status'],
});

// Export modal state
const showExportModal = ref(false);
const exportFilters = ref({
    status: '',
    workshop_session_id: '',
});
const exportFormat = ref('csv');

const formatDateTime = (date) => {
    return new Date(date).toLocaleString();
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const getStatusBadgeClass = (isCheckedIn) => {
    return isCheckedIn 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800';
};

const checkIn = (registrationId) => {
    if (confirm('Mark this registration as checked in?')) {
        router.post(route('admin.workshop-registrations.check-in', registrationId), {}, {
            preserveScroll: true,
        });
    }
};

const uncheckIn = (registrationId) => {
    if (confirm('Uncheck this registration?')) {
        router.post(route('admin.workshop-registrations.uncheck-in', registrationId), {}, {
            preserveScroll: true,
        });
    }
};

const openExportModal = (format = 'csv') => {
    exportFormat.value = format;
    showExportModal.value = true;
};

const closeExportModal = () => {
    showExportModal.value = false;
};

const downloadExport = () => {
    const params = new URLSearchParams();
    
    if (exportFilters.value.status) {
        params.append('status', exportFilters.value.status);
    }
    if (exportFilters.value.workshop_session_id) {
        params.append('workshop_session_id', exportFilters.value.workshop_session_id);
    }

    const exportRoute = exportFormat.value === 'excel'
        ? route('admin.workshop-registrations.export-excel')
        : route('admin.workshop-registrations.export');

    window.location.href = exportRoute + '?' + params.toString();
    closeExportModal();
};
</script>

<template>
    <Head title="Workshop Registrations" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Workshop Registrations
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
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Registrations</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.total_registrations }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Checked In</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.checked_in }}</dd>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Pending Check-in</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.pending_checkin }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <!-- Search and Filter Bar -->
                    <div class="p-6 border-b border-gray-200">
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label for="search" class="sr-only">Search registrations</label>
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
                                        placeholder="Search by code, name, email, or program..."
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
                                    <option value="checked_in">Checked In</option>
                                    <option value="pending">Pending Check-in</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Registrations Table -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registration Code
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Attendee
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Program
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Session
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Check-in Status
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registered
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="registration in registrations.data" :key="registration.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-mono font-bold text-indigo-600">
                                            {{ registration.unique_code }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-8 w-8">
                                                <div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                                                    <span class="text-xs font-medium text-white">
                                                        {{ (registration.user?.name || registration.guest_name || 'Guest').charAt(0) }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="ml-3">
                                                <div class="text-sm font-medium text-gray-900">
                                                    {{ registration.user?.name || registration.guest_name || 'Guest User' }}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    {{ registration.user?.email || registration.guest_email || 'No email' }}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    School: {{ registration.payment?.guest_school_name || 'N/A' }}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    Grade: {{ registration.payment?.guest_grade || 'N/A' }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ registration.program?.title || 'Unknown Program' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div v-if="registration.workshop_session" class="text-sm text-gray-900">
                                            <div class="font-medium">{{ registration.workshop_session.location || 'N/A' }}</div>
                                            <div class="text-xs text-gray-500">
                                                {{ registration.workshop_session.date ? formatDate(registration.workshop_session.date) : 'TBA' }}
                                            </div>
                                            <div class="text-xs text-gray-500">
                                                {{ registration.workshop_session.time || 'TBA' }}
                                            </div>
                                        </div>
                                        <div v-else class="text-sm text-gray-400">No session</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusBadgeClass(registration.is_checked_in)]">
                                            {{ registration.is_checked_in ? 'Checked In' : 'Pending' }}
                                        </span>
                                        <div v-if="registration.checked_in_at" class="text-xs text-gray-500 mt-1">
                                            {{ formatDateTime(registration.checked_in_at) }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ formatDateTime(registration.created_at) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            v-if="!registration.is_checked_in"
                                            @click="checkIn(registration.id)"
                                            class="text-green-600 hover:text-green-900 font-medium"
                                        >
                                            Check In
                                        </button>
                                        <button
                                            v-else
                                            @click="uncheckIn(registration.id)"
                                            class="text-orange-600 hover:text-orange-900 font-medium"
                                        >
                                            Undo
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <a
                                v-if="registrations.prev_page_url"
                                :href="registrations.prev_page_url"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                v-if="registrations.next_page_url"
                                :href="registrations.next_page_url"
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Showing {{ registrations.from || 0 }} to {{ registrations.to || 0 }} of {{ registrations.total }} results
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <a
                                        v-if="registrations.prev_page_url"
                                        :href="registrations.prev_page_url"
                                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Previous
                                    </a>
                                    <a
                                        v-if="registrations.next_page_url"
                                        :href="registrations.next_page_url"
                                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Next
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Export Modal -->
        <div v-if="showExportModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- Background overlay -->
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeExportModal"></div>

                <!-- Modal panel -->
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Export Workshop Registrations
                                </h3>
                                <div class="mt-4 space-y-4">
                                    <p class="text-sm text-gray-500">
                                        Select filters to export registration records as CSV or Excel
                                    </p>

                                    <!-- Status Filter -->
                                    <div>
                                        <label for="export-status" class="block text-sm font-medium text-gray-700">Check-in Status</label>
                                        <select
                                            id="export-status"
                                            v-model="exportFilters.status"
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="checked_in">Checked In</option>
                                            <option value="pending">Pending Check-in</option>
                                        </select>
                                    </div>

                                    <!-- Workshop Filter -->
                                    <div>
                                        <label for="export-workshop" class="block text-sm font-medium text-gray-700">Workshop Session</label>
                                        <select
                                            id="export-workshop"
                                            v-model="exportFilters.workshop_session_id"
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="">All Workshops</option>
                                            <option v-for="workshop in workshopSessions" :key="workshop.id" :value="workshop.id">
                                                {{ workshop.title }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            @click="downloadExport"
                            :class="exportFormat === 'excel' ? 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm' : 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'"
                        >
                            {{ exportFormat === 'excel' ? 'Download Excel' : 'Download CSV' }}
                        </button>
                        <button
                            type="button"
                            @click="closeExportModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

