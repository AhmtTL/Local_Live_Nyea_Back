import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';

export function useFilters(routeName, initialFilters = {}) {
    const filters = ref({
        search: initialFilters.search || '',
        category: initialFilters.category || '',
        status: initialFilters.status || '',
        sort: initialFilters.sort || '',
        per_page: initialFilters.per_page || 15,
        ...initialFilters,
    });

    const isLoading = ref(false);

    const applyFilters = (newFilters = {}) => {
        isLoading.value = true;
        
        // Clean up empty values
        const cleanFilters = Object.fromEntries(
            Object.entries({ ...filters.value, ...newFilters })
                .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        );

        router.get(route(routeName), cleanFilters, {
            preserveState: true,
            replace: true,
            onFinish: () => {
                isLoading.value = false;
            },
        });
    };

    const resetFilters = () => {
        filters.value = {
            search: '',
            category: '',
            status: '',
            sort: '',
            per_page: 15,
        };
        applyFilters();
    };

    const updateFilter = (key, value) => {
        filters.value[key] = value;
        applyFilters();
    };

    // Debounced search
    let searchTimeout;
    watch(() => filters.value.search, (newValue, oldValue) => {
        if (newValue !== oldValue) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        }
    });

    // Immediate update for non-search filters
    watch([() => filters.value.category, () => filters.value.status, () => filters.value.sort], () => {
        applyFilters();
    });

    return {
        filters,
        isLoading,
        applyFilters,
        resetFilters,
        updateFilter,
    };
} 