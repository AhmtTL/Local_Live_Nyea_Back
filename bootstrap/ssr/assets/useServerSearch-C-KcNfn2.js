import { ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
function useServerSearch(routeName, initialFilters = {}, options = {}) {
  const {
    debounceMs = 300,
    preserveScroll = true,
    preserveState = true,
    immediateFilters = ["status", "category", "type", "school_id", "workshop_session_id", "date_from", "date_to"]
  } = options;
  const filters = ref({
    search: initialFilters.search || "",
    ...initialFilters
  });
  const isLoading = ref(false);
  let searchTimeout = null;
  let isUpdatingFilter = false;
  const cleanFilters = (filterObj) => {
    return Object.fromEntries(
      Object.entries(filterObj).filter(([_, value]) => {
        return value !== "" && value !== null && value !== void 0;
      })
    );
  };
  const applyFilters = (customFilters = {}) => {
    isLoading.value = true;
    const filtersToApply = cleanFilters({
      ...filters.value,
      ...customFilters
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
        }
      }
    );
  };
  const performSearch = (value) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchTimeout = null;
      applyFilters();
    }, debounceMs);
  };
  const updateFilter = (key, value) => {
    clearTimeout(searchTimeout);
    isUpdatingFilter = true;
    filters.value[key] = value;
    if (immediateFilters.includes(key) || key === "search" && !value) {
      searchTimeout = null;
      applyFilters();
    } else if (key === "search") {
      performSearch();
    } else {
      searchTimeout = null;
      applyFilters();
    }
    setTimeout(() => {
      isUpdatingFilter = false;
    }, 50);
  };
  const resetFilters = () => {
    clearTimeout(searchTimeout);
    searchTimeout = null;
    isUpdatingFilter = true;
    filters.value = {
      search: "",
      ...Object.fromEntries(
        Object.keys(initialFilters).map((key) => [key, ""])
      )
    };
    applyFilters();
    setTimeout(() => {
      isUpdatingFilter = false;
    }, 50);
  };
  watch(
    () => filters.value.search,
    (newValue, oldValue) => {
      if (newValue === oldValue || isUpdatingFilter) return;
      clearTimeout(searchTimeout);
      if (!newValue) {
        searchTimeout = null;
        applyFilters();
      } else {
        performSearch();
      }
    }
  );
  return {
    filters,
    isLoading,
    applyFilters,
    updateFilter,
    resetFilters,
    cleanFilters
  };
}
export {
  useServerSearch as u
};
