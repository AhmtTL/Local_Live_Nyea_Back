import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

export function useCrud() {
    const isLoading = ref(false);
    const isDeleting = ref(false);

    const deleteItem = async (item, routeName, options = {}) => {
        const {
            confirmMessage = `Are you sure you want to delete "${item.title || item.name || 'this item'}"?`,
            successMessage = 'Item deleted successfully',
            onSuccess = null,
            onError = null,
        } = options;

        if (!confirm(confirmMessage)) {
            return false;
        }

        isDeleting.value = true;
        
        router.delete(route(routeName, item.id), {
            onSuccess: () => {
                isDeleting.value = false;
                if (onSuccess) onSuccess();
                // Here you could add toast notification
                console.log(successMessage);
            },
            onError: (errors) => {
                isDeleting.value = false;
                if (onError) onError(errors);
                console.error('Delete failed:', errors);
            },
        });

        return true;
    };

    const bulkDelete = async (items, routeName, options = {}) => {
        const {
            confirmMessage = `Are you sure you want to delete ${items.length} items?`,
            successMessage = `${items.length} items deleted successfully`,
            onSuccess = null,
            onError = null,
        } = options;

        if (!confirm(confirmMessage)) {
            return false;
        }

        isDeleting.value = true;
        
        router.delete(route(routeName), {
            data: { ids: items.map(item => item.id) },
            onSuccess: () => {
                isDeleting.value = false;
                if (onSuccess) onSuccess();
                console.log(successMessage);
            },
            onError: (errors) => {
                isDeleting.value = false;
                if (onError) onError(errors);
                console.error('Bulk delete failed:', errors);
            },
        });

        return true;
    };

    const toggleStatus = (item, routeName, statusField = 'is_active') => {
        isLoading.value = true;
        
        router.patch(route(routeName, item.id), {
            [statusField]: !item[statusField]
        }, {
            preserveScroll: true,
            onFinish: () => {
                isLoading.value = false;
            },
        });
    };

    const duplicate = (item, routeName) => {
        isLoading.value = true;
        
        router.post(route(routeName, item.id), {}, {
            onFinish: () => {
                isLoading.value = false;
            },
        });
    };

    return {
        isLoading,
        isDeleting,
        deleteItem,
        bulkDelete,
        toggleStatus,
        duplicate,
    };
} 