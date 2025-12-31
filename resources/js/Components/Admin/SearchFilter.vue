<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({}),
    },
    searchPlaceholder: {
        type: String,
        default: 'Search...',
    },
    filters: {
        type: Array,
        default: () => [],
    },
    showReset: {
        type: Boolean,
        default: true,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue', 'reset']);

const internalValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const updateFilter = (key, value) => {
    emit('update:modelValue', {
        ...props.modelValue,
        [key]: value,
    });
};

const resetFilters = () => {
    emit('reset');
};

const hasActiveFilters = computed(() => {
    return Object.values(props.modelValue).some(value => 
        value !== '' && value !== null && value !== undefined
    );
});
</script>

<template>
    <div class="bg-white p-6 border-b border-gray-200">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <!-- Search Input -->
            <div class="flex-1 max-w-lg">
                <label for="search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        id="search"
                        :value="modelValue.search || ''"
                        @input="updateFilter('search', $event.target.value)"
                        type="text"
                        :placeholder="searchPlaceholder"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                </div>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap items-center gap-3">
                <template v-for="filter in filters" :key="filter.key">
                    <!-- Select Filter -->
                    <div v-if="filter.type === 'select'" class="min-w-0">
                        <label :for="filter.key" class="sr-only">{{ filter.label }}</label>
                        <select
                            :id="filter.key"
                            :value="modelValue[filter.key] || ''"
                            @change="updateFilter(filter.key, $event.target.value)"
                            :disabled="isLoading"
                            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <option value="">{{ filter.placeholder || `All ${filter.label}` }}</option>
                            <option 
                                v-for="option in filter.options" 
                                :key="option.value" 
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Date Range Filter -->
                    <div v-else-if="filter.type === 'date-range'" class="flex items-center space-x-2">
                        <input
                            :value="modelValue[`${filter.key}_from`] || ''"
                            @input="updateFilter(`${filter.key}_from`, $event.target.value)"
                            type="date"
                            :disabled="isLoading"
                            class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                        <span class="text-gray-500">to</span>
                        <input
                            :value="modelValue[`${filter.key}_to`] || ''"
                            @input="updateFilter(`${filter.key}_to`, $event.target.value)"
                            type="date"
                            :disabled="isLoading"
                            class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                    </div>

                    <!-- Number Range Filter -->
                    <div v-else-if="filter.type === 'number-range'" class="flex items-center space-x-2">
                        <input
                            :value="modelValue[`${filter.key}_min`] || ''"
                            @input="updateFilter(`${filter.key}_min`, $event.target.value)"
                            type="number"
                            :placeholder="`Min ${filter.label}`"
                            :disabled="isLoading"
                            class="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                        <span class="text-gray-500">-</span>
                        <input
                            :value="modelValue[`${filter.key}_max`] || ''"
                            @input="updateFilter(`${filter.key}_max`, $event.target.value)"
                            type="number"
                            :placeholder="`Max ${filter.label}`"
                            :disabled="isLoading"
                            class="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                    </div>

                    <!-- Toggle Filter -->
                    <div v-else-if="filter.type === 'toggle'" class="flex items-center">
                        <input
                            :id="filter.key"
                            :checked="modelValue[filter.key] || false"
                            @change="updateFilter(filter.key, $event.target.checked)"
                            type="checkbox"
                            :disabled="isLoading"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        <label :for="filter.key" class="ml-2 text-sm text-gray-700">
                            {{ filter.label }}
                        </label>
                    </div>
                </template>

                <!-- Reset Button -->
                <button
                    v-if="showReset && hasActiveFilters"
                    @click="resetFilters"
                    :disabled="isLoading"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reset
                </button>
            </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap items-center gap-2">
            <span class="text-sm text-gray-500">Active filters:</span>
            <template v-for="(value, key) in modelValue" :key="key">
                <span 
                    v-if="value && value !== '' && key !== 'search'"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                    {{ key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}: {{ value }}
                    <button
                        @click="updateFilter(key, '')"
                        type="button"
                        class="ml-1.5 h-3 w-3 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                    >
                        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                            <path stroke-linecap="round" stroke-width="1.5" d="m1 1 6 6m0-6-6 6" />
                        </svg>
                    </button>
                </span>
            </template>
        </div>
    </div>
</template> 