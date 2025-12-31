<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head } from '@inertiajs/vue3';
import DataTable from '@/Components/Admin/DataTable.vue';
import SearchFilter from '@/Components/Admin/SearchFilter.vue';
import Button from '@/Components/Button.vue';
import { useFilters } from '@/Composables/useFilters';
import { useCrud } from '@/Composables/useCrud';

const props = defineProps({
    influencers: Object,
    filters: Object,
});

const { filters: searchFilters, isLoading } = useFilters('admin.influencers.index', props.filters);
const { deleteItem } = useCrud();

// Table configuration
const columns = [
    {
        key: 'name',
        label: 'Influencer',
        type: 'avatar',
        showName: true,
        class: 'text-sm text-gray-900',
    },
    {
        key: 'referral_code',
        label: 'Referral Code',
        class: 'text-sm text-gray-900 font-mono',
    },
    {
        key: 'referred_count',
        label: 'Referred',
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
        key: 'remove-influencer',
        label: 'Remove Influencer',
        class: 'bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-md text-sm font-medium',
    },
    {
        key: 'delete',
        label: 'Delete',
        class: 'bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium',
    },
];

const searchFilterConfig = [
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
            window.location.href = route('admin.influencers.show', item.id);
            break;
        case 'edit':
            window.location.href = route('admin.users.edit', item.id);
            break;
        case 'remove-influencer':
            if (confirm(`Are you sure you want to remove the influencer tag from "${item.name}"?`)) {
                // Create a form and submit it via POST
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = route('admin.influencers.remove-influencer', item.id);
                
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
                confirmMessage: `Are you sure you want to delete influencer "${item.name || 'this influencer'}"?`,
            });
            break;
    }
};

const resetFilters = () => {
    searchFilters.value = {
        search: '',
        is_active: '',
        created_at_from: '',
        created_at_to: '',
    };
};
</script>

<template>
    <Head title="Influencers" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-semibold leading-tight text-gray-800">
                        Influencers Management
                    </h2>
                    <p class="mt-1 text-sm text-gray-600">
                        Manage influencer accounts and referral codes
                    </p>
                </div>
                <div class="flex space-x-2">
                    <Button
                        variant="secondary"
                        :href="route('admin.users.index')"
                        as="a"
                        left-icon="M12 4v16m8-8H4"
                    >
                        Manage Users
                    </Button>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <!-- Search and Filters -->
                    <SearchFilter
                        v-model="searchFilters"
                        search-placeholder="Search influencers by name, email, or referral code..."
                        :filters="searchFilterConfig"
                        :is-loading="isLoading"
                        @reset="resetFilters"
                    />

                    <!-- Data Table -->
                    <DataTable
                        :items="influencers"
                        :columns="columns"
                        :actions="actions"
                        :is-loading="isLoading"
                        empty-message="No influencers found. Tag users as influencers to get started."
                        @action="handleTableAction"
                    />
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
