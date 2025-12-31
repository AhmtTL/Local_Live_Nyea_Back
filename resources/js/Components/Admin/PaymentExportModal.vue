<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    workshopSessions: {
        type: Array,
        default: () => [],
    },
    schools: {
        type: Array,
        default: () => [],
    },
    exportRoute: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['close', 'export']);

// Export filters state
const exportFilters = ref({
    status: 'paid',
    date_from: '',
    date_to: '',
    workshop_session_id: '',
    school_ids: [], // Changed to array for multi-select
});

// Multi-select schools state
const selectedSchools = ref([]);
const schoolDropdownOpen = ref(false);

// Watch for changes in selected schools to update exportFilters
watch(selectedSchools, (newValue) => {
    exportFilters.value.school_ids = newValue.map(school => school.id);
}, { deep: true });

// School selection methods
const toggleSchoolSelection = (school) => {
    const index = selectedSchools.value.findIndex(s => s.id === school.id);
    if (index > -1) {
        selectedSchools.value.splice(index, 1);
    } else {
        selectedSchools.value.push(school);
    }
};

const isSchoolSelected = (school) => {
    return selectedSchools.value.some(s => s.id === school.id);
};

const clearAllSchools = () => {
    selectedSchools.value = [];
};

const selectAllSchools = () => {
    selectedSchools.value = [...props.schools];
};

const getSelectedSchoolsText = () => {
    if (selectedSchools.value.length === 0) return 'All Schools';
    if (selectedSchools.value.length === 1) return selectedSchools.value[0].name;
    if (selectedSchools.value.length === props.schools.length) return 'All Schools Selected';
    return `${selectedSchools.value.length} Schools Selected`;
};

// Modal methods
const closeModal = () => {
    emit('close');
    // Reset form
    exportFilters.value = {
        status: 'paid',
        date_from: '',
        date_to: '',
        workshop_session_id: '',
        school_ids: [],
    };
    selectedSchools.value = [];
    schoolDropdownOpen.value = false;
};

const downloadExport = () => {
    const params = new URLSearchParams();
    
    if (exportFilters.value.status) {
        params.append('status', exportFilters.value.status);
    }
    if (exportFilters.value.date_from) {
        params.append('date_from', exportFilters.value.date_from);
    }
    if (exportFilters.value.date_to) {
        params.append('date_to', exportFilters.value.date_to);
    }
    if (exportFilters.value.workshop_session_id) {
        params.append('workshop_session_id', exportFilters.value.workshop_session_id);
    }
    
    // Handle multiple school IDs
    if (exportFilters.value.school_ids.length > 0) {
        exportFilters.value.school_ids.forEach(schoolId => {
            params.append('school_ids[]', schoolId);
        });
    }
    
    window.location.href = props.exportRoute + '?' + params.toString();
    
    emit('export', exportFilters.value);
    closeModal();
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
    // Close dropdown if clicking outside
    if (!event.target.closest('.school-dropdown')) {
        schoolDropdownOpen.value = false;
    }
};

// Add/remove click outside event listener
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <!-- Export Modal -->
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- Background overlay -->
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

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
                                Export Payments
                            </h3>
                            <div class="mt-4 space-y-4">
                                <p class="text-sm text-gray-500">
                                    Select filters to export payment records as CSV or Excel. Multiple schools will be included in one file.
                                </p>

                                <!-- Status Filter -->
                                <div>
                                    <label for="export-status" class="block text-sm font-medium text-gray-700">Payment Status</label>
                                    <select
                                        id="export-status"
                                        v-model="exportFilters.status"
                                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="paid">Paid</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="failed">Failed</option>
                                        <option value="refunded">Refunded</option>
                                    </select>
                                </div>

                                <!-- Workshop Filter -->
                                <div v-if="workshopSessions.length > 0">
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

                                <!-- Multi-Select Schools Filter -->
                                <div v-if="schools.length > 0">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Schools</label>
                                    <div class="relative school-dropdown">
                                        <!-- Multi-select trigger -->
                                        <button
                                            type="button"
                                            @click="schoolDropdownOpen = !schoolDropdownOpen"
                                            class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <span class="block truncate">{{ getSelectedSchoolsText() }}</span>
                                            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </button>

                                        <!-- Dropdown options -->
                                        <div v-show="schoolDropdownOpen" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                                            <!-- Select/Clear all options -->
                                            <div class="px-3 py-2 border-b border-gray-200">
                                                <div class="flex space-x-2">
                                                    <button
                                                        type="button"
                                                        @click="selectAllSchools"
                                                        class="text-xs text-green-600 hover:text-green-800 font-medium"
                                                    >
                                                        Select All
                                                    </button>
                                                    <span class="text-xs text-gray-400">|</span>
                                                    <button
                                                        type="button"
                                                        @click="clearAllSchools"
                                                        class="text-xs text-red-600 hover:text-red-800 font-medium"
                                                    >
                                                        Clear All
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- School options -->
                                            <div
                                                v-for="school in schools"
                                                :key="school.id"
                                                @click="toggleSchoolSelection(school)"
                                                class="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100"
                                            >
                                                <!-- Checkmark -->
                                                <span v-if="isSchoolSelected(school)" class="absolute inset-y-0 left-0 flex items-center pl-2">
                                                    <svg class="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                                
                                                <span class="block truncate font-normal">{{ school.name }}</span>
                                            </div>

                                            <!-- No schools message -->
                                            <div v-if="schools.length === 0" class="px-3 py-2 text-sm text-gray-500 italic">
                                                No schools available
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Selected schools summary -->
                                    <div v-if="selectedSchools.length > 0" class="mt-2 text-sm text-gray-600">
                                        <span class="font-medium">{{ selectedSchools.length }}</span> 
                                        {{ selectedSchools.length === 1 ? 'school' : 'schools' }} selected
                                        
                                        <!-- Show first few selected schools -->
                                        <div class="mt-1 flex flex-wrap gap-1">
                                            <span 
                                                v-for="school in selectedSchools.slice(0, 3)" 
                                                :key="school.id"
                                                class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-800"
                                            >
                                                {{ school.name }}
                                                <button 
                                                    @click.stop="toggleSchoolSelection(school)"
                                                    class="ml-1 text-green-600 hover:text-green-800"
                                                >
                                                    <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                            <span v-if="selectedSchools.length > 3" class="text-xs text-gray-500">
                                                +{{ selectedSchools.length - 3 }} more
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Date Range -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="export-date-from" class="block text-sm font-medium text-gray-700">From Date</label>
                                        <input
                                            id="export-date-from"
                                            v-model="exportFilters.date_from"
                                            type="date"
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                        >
                                    </div>
                                    <div>
                                        <label for="export-date-to" class="block text-sm font-medium text-gray-700">To Date</label>
                                        <input
                                            id="export-date-to"
                                            v-model="exportFilters.date_to"
                                            type="date"
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        @click="downloadExport"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Download CSV
                    </button>
                    <button
                        type="button"
                        @click="closeModal"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Custom styles for the dropdown */
.select-none {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>