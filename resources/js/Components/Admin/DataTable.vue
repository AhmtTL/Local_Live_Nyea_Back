<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import LoadingSpinner from '../LoadingSpinner.vue';
import Pagination from '../Pagination.vue';

const props = defineProps({
    items: {
        type: Object,
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    actions: {
        type: Array,
        default: () => [],
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
    emptyMessage: {
        type: String,
        default: 'No data available',
    },
    striped: {
        type: Boolean,
        default: true,
    },
    hover: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['action']);

const hasData = computed(() => {
    return props.items?.data && props.items.data.length > 0;
});

const tableClasses = computed(() => ({
    'min-w-full divide-y divide-gray-200': true,
}));

const rowClasses = computed(() => ({
    'hover:bg-gray-50': props.hover,
}));

const handleAction = (action, item) => {
    emit('action', { action, item });
};

const renderCellContent = (item, column) => {
    if (column.render) {
        return column.render(item);
    }
    
    const value = getNestedValue(item, column.key);
    
    if (column.type === 'currency') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value || 0);
    }
    
    if (column.type === 'date') {
        return value ? new Date(value).toLocaleDateString() : '-';
    }
    
    if (column.type === 'badge') {
        return value;
    }
    
    return value || '-';
};

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
};
</script>

<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <!-- Loading Overlay -->
        <div v-if="isLoading" class="relative">
            <div class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <LoadingSpinner />
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table :class="tableClasses">
                <!-- Header -->
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            v-for="column in columns"
                            :key="column.key"
                            :class="[
                                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                            ]"
                            @click="column.sortable && $emit('sort', column.key)"
                        >
                            <div class="flex items-center space-x-1">
                                <span>{{ column.label }}</span>
                                <span v-if="column.sortable" class="text-gray-400">
                                    <!-- Sort icon -->
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </div>
                        </th>
                        <th 
                            v-if="actions.length > 0"
                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Empty State -->
                    <tr v-if="!hasData && !isLoading">
                        <td :colspan="columns.length + (actions.length > 0 ? 1 : 0)" class="px-6 py-12 text-center">
                            <div class="text-gray-500">
                                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p class="mt-2 text-sm">{{ emptyMessage }}</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Data Rows -->
                    <tr 
                        v-for="(item, index) in items?.data || []" 
                        :key="item.id || index"
                        :class="[
                            rowClasses,
                            striped && index % 2 === 1 ? 'bg-gray-50' : ''
                        ]"
                    >
                        <td
                            v-for="column in columns"
                            :key="column.key"
                            :class="[
                                'px-6 py-4 whitespace-nowrap',
                                column.class || 'text-sm text-gray-900'
                            ]"
                        >
                            <!-- Custom slot content -->
                            <slot 
                                :name="`cell-${column.key}`" 
                                :item="item" 
                                :value="getNestedValue(item, column.key)"
                                :column="column"
                            >
                                <!-- Badge type -->
                                <span 
                                    v-if="column.type === 'badge'"
                                    :class="[
                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                        column.badgeClass?.(getNestedValue(item, column.key)) || 'bg-gray-100 text-gray-800'
                                    ]"
                                >
                                    {{ renderCellContent(item, column) }}
                                </span>

                                <!-- Link type -->
                                <Link
                                    v-else-if="column.type === 'link'"
                                    :href="column.linkHref(item)"
                                    :class="column.linkClass || 'text-blue-600 hover:text-blue-900'"
                                >
                                    {{ renderCellContent(item, column) }}
                                </Link>

                                <!-- Avatar type -->
                                <div v-else-if="column.type === 'avatar'" class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img 
                                            v-if="getNestedValue(item, column.key)" 
                                            class="h-10 w-10 rounded-full" 
                                            :src="getNestedValue(item, column.key)" 
                                            :alt="item.name || 'Avatar'"
                                        />
                                        <div 
                                            v-else 
                                            class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center"
                                        >
                                            <span class="text-sm font-medium text-white">
                                                {{ (item.name || item.title || 'U').charAt(0).toUpperCase() }}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-if="column.showName" class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ item.name || item.title }}</div>
                                        <div v-if="item.email" class="text-sm text-gray-500">{{ item.email }}</div>
                                    </div>
                                </div>

                                <!-- Default rendering -->
                                <span v-else>{{ renderCellContent(item, column) }}</span>
                            </slot>
                        </td>

                        <!-- Actions -->
                        <td 
                            v-if="actions.length > 0"
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <div class="flex justify-end space-x-2">
                                <button
                                    v-for="action in actions"
                                    v-show="!action.condition || action.condition(item)"
                                    :key="action.key"
                                    @click="handleAction(action.key, item)"
                                    :class="[
                                        'text-sm font-medium',
                                        action.class || 'text-blue-600 hover:text-blue-900'
                                    ]"
                                    :disabled="action.disabled?.(item)"
                                >
                                    {{ action.label }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <Pagination v-if="hasData && items.links" :links="items.links" :meta="items" />
    </div>
</template> 