import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';

/**
 * Enhanced server-side search composable with debouncing and optimization
 * 
 * @param {string} routeName - The route name for the index page
 * @param {Object} initialFilters - Initial filter values from props
 * @param {Object} options - Configuration options
 * @param {number} options.debounceMs - Debounce delay in milliseconds (default: 300)
 * @param {boolean} options.preserveScroll - Preserve scroll position (default: true)
 * @param {boolean} options.preserveState - Preserve component state (default: true)
 * @param {Array<string>} options.immediateFilters - Filter keys that should update immediately without debounce
 * 
 * @returns {Object} - Search utilities
 */
export function useServerSearch(routeName, initialFilters = {}, options = {}) {
    const {
        debounceMs = 300,
        preserveScroll = true,
        preserveState = true,
        immediateFilters = ['status', 'category', 'type', 'school_id', 'workshop_session_id', 'date_from', 'date_to'],
    } = options;

    // Initialize filters from props
    const filters = ref({
        search: initialFilters.search || '',
        ...initialFilters,
    });

    const isLoading = ref(false);
    let searchTimeout = null;
    let isUpdatingFilter = false; // Flag to prevent watch from triggering during updateFilter

    /**
     * Clean filters - remove empty/null/undefined values
     */
    const cleanFilters = (filterObj) => {
        return Object.fromEntries(
            Object.entries(filterObj).filter(([_, value]) => {
                return value !== '' && value !== null && value !== undefined;
            })
        );
    };

    /**
     * Apply filters to server
     */
    const applyFilters = (customFilters = {}) => {
        isLoading.value = true;

        const filtersToApply = cleanFilters({
            ...filters.value,
            ...customFilters,
        });

        router.get(
            route(routeName),
            filtersToApply,
            {
                preserveState,
                preserveScroll,
                replace: true,
                onFinish: () => {
                    isLoading.value = false;
                },
                onError: () => {
                    isLoading.value = false;
                },
            }
        );
    };

    /**
     * Debounced search function
     */
    const performSearch = (value) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchTimeout = null;
            applyFilters();
        }, debounceMs);
    };

    /**
     * Update a single filter
     */
    const updateFilter = (key, value) => {
        clearTimeout(searchTimeout);
        isUpdatingFilter = true;
        filters.value[key] = value;
        
        // If it's an immediate filter or search is being cleared, apply immediately
        if (immediateFilters.includes(key) || (key === 'search' && !value)) {
            searchTimeout = null;
            applyFilters();
        } else if (key === 'search') {
            // Debounce search
            performSearch(value);
        } else {
            // Other filters apply immediately
            searchTimeout = null;
            applyFilters();
        }
        
        // Reset flag after a brief delay to allow watch to work again
        setTimeout(() => {
            isUpdatingFilter = false;
        }, 50);
    };

    /**
     * Reset all filters to initial state
     */
    const resetFilters = () => {
        clearTimeout(searchTimeout);
        searchTimeout = null;
        isUpdatingFilter = true;
        filters.value = {
            search: '',
            ...Object.fromEntries(
                Object.keys(initialFilters).map(key => [key, ''])
            ),
        };
        applyFilters();
        setTimeout(() => {
            isUpdatingFilter = false;
        }, 50);
    };

    /**
     * Watch for search changes when using v-model directly
     */
    watch(
        () => filters.value.search,
        (newValue, oldValue) => {
            // Skip if value hasn't actually changed or if updateFilter is handling it
            if (newValue === oldValue || isUpdatingFilter) return;
            
            // Clear any pending search
            clearTimeout(searchTimeout);
            
            // If search is cleared, apply immediately
            if (!newValue) {
                searchTimeout = null;
                applyFilters();
            } else {
                // Otherwise debounce
                performSearch(newValue);
            }
        }
    );

    return {
        filters,
        isLoading,
        applyFilters,
        updateFilter,
        resetFilters,
        cleanFilters,
    };
}

