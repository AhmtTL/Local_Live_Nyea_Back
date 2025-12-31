<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head } from '@inertiajs/vue3';
import DataTable from '@/Components/Admin/DataTable.vue';
import SearchFilter from '@/Components/Admin/SearchFilter.vue';
import Button from '@/Components/Button.vue';
import { useFilters } from '@/Composables/useFilters';
import { useCrud } from '@/Composables/useCrud';

const props = defineProps({
    users: Object,
    filters: Object,
});

const { filters: searchFilters, isLoading } = useFilters('admin.users.index', props.filters);
const { deleteItem } = useCrud();

// Table configuration
const columns = [
    {
        key: 'name',
        label: 'User',
        type: 'avatar',
        showName: true,
        class: 'text-sm text-gray-900',
    },
    {
        key: 'interested_programs_count',
        label: 'Programs Interest',
        class: 'text-sm text-gray-900',
    },
    {
        key: 'payments_count',
        label: 'Payments',
        class: 'text-sm text-gray-900',
    },
    {
        key: 'total_spent',
        label: 'Total Spent',
        type: 'currency',
        class: 'text-sm text-gray-900',
    },
    {
        key: 'is_influencer',
        label: 'Is Influencer',
        type: 'badge',
        class: 'text-sm text-gray-900',
    },
    {
        key: 'created_at',
        label: 'Joined',
        type: 'date',
        class: 'text-sm text-gray-500',
    },
];

const actions = [
    {
        key: 'view',
        label: 'View',
        class: 'bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium',
    },
    {
        key: 'edit',
        label: 'Edit',
        class: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-md text-sm font-medium',
    },
    {
        key: 'tag-influencer',
        label: 'Tag as Influencer',
        class: 'bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-sm font-medium',
        condition: (item) => !item.is_influencer,
    },
    {
        key: 'remove-influencer',
        label: 'Remove Influencer Tag',
        class: 'bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-md text-sm font-medium',
        condition: (item) => item.is_influencer,
    },
    {
        key: 'delete',
        label: 'Delete',
        class: 'bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium',
    },
];

const searchFilterConfig = [
    {
        key: 'role',
        label: 'Role',
        type: 'select',
        options: [
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' },
            { value: 'school', label: 'School' },
        ],
    },
    {
        key: 'is_active',
        label: 'Status',
        type: 'select',
        options: [
            { value: '1', label: 'Active' },
            { value: '0', label: 'Inactive' },
        ],
    },
    {
        key: 'created_at',
        label: 'Joined Date',
        type: 'date-range',
    },
];

const handleTableAction = ({ action, item }) => {
    if (!item || !item.id) {
        console.error('Invalid item data:', item);
        return;
    }
    
    switch (action) {
        case 'view':
            window.location.href = route('admin.users.show', item.id);
            break;
        case 'edit':
            window.location.href = route('admin.users.edit', item.id);
            break;
        case 'tag-influencer':
            if (confirm(`Are you sure you want to tag "${item.name}" as an influencer?`)) {
                // Create a form and submit it via POST
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = route('admin.users.tag-influencer', item.id);
                
                const csrfToken = document.querySelector('meta[name="csrf-token"]');
                if (csrfToken) {
                    const csrfInput = document.createElement('input');
                    csrfInput.type = 'hidden';
                    csrfInput.name = '_token';
                    csrfInput.value = csrfToken.getAttribute('content');
                    form.appendChild(csrfInput);
                }
                
                document.body.appendChild(form);
                form.submit();
            }
            break;
        case 'remove-influencer':
            if (confirm(`Are you sure you want to remove the influencer tag from "${item.name}"?`)) {
                // Create a form and submit it via POST
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = route('admin.users.remove-influencer', item.id);
                
                const csrfToken = document.querySelector('meta[name="csrf-token"]');
                if (csrfToken) {
                    const csrfInput = document.createElement('input');
                    csrfInput.type = 'hidden';
                    csrfInput.name = '_token';
                    csrfInput.value = csrfToken.getAttribute('content');
                    form.appendChild(csrfInput);
                }
                
                document.body.appendChild(form);
                form.submit();
            }
            break;
        case 'delete':
            deleteItem(item, 'admin.users.destroy', {
                confirmMessage: `Are you sure you want to delete user "${item.name || 'this user'}"?`,
            });
            break;
    }
};

const resetFilters = () => {
    searchFilters.value = {
        search: '',
        role: '',
        is_active: '',
        created_at_from: '',
        created_at_to: '',
    };
};
</script>

<template>
    <Head title="Users" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-semibold leading-tight text-gray-800">
                        Users Management
                    </h2>
                    <p class="mt-1 text-sm text-gray-600">
                        Manage user accounts and permissions
                    </p>
                </div>
                <Button
                    variant="primary"
                    :href="route('admin.users.create')"
                    as="a"
                    left-icon="M12 4v16m8-8H4"
                >
                    Add User
                </Button>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <!-- Search and Filters -->
                    <SearchFilter
                        v-model="searchFilters"
                        search-placeholder="Search users by name or email..."
                        :filters="searchFilterConfig"
                        :is-loading="isLoading"
                        @reset="resetFilters"
                    />

                    <!-- Data Table -->
                    <DataTable
                        :items="users"
                        :columns="columns"
                        :actions="actions"
                        :is-loading="isLoading"
                        empty-message="No users found. Create your first user to get started."
                        @action="handleTableAction"
                    />
                </div>
            </div>
        </div>
    </AdminLayout>
</template> 