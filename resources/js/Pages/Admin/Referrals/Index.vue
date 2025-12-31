<script setup>
import { useAdminLayout } from "@/Composables/useAdminLayout";
import { Head, useForm } from "@inertiajs/vue3";
import DataTable from "@/Components/Admin/DataTable.vue";
import SearchFilter from "@/Components/Admin/SearchFilter.vue";
import Button from "@/Components/Button.vue";
import Modal from "@/Components/Modal.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { useFilters } from "@/Composables/useFilters";
import { useCrud } from "@/Composables/useCrud";
import { ref } from "vue";

const props = defineProps({
    referrals: Object,
    filters: Object,
    formData: Object,
});

const { filters: searchFilters, isLoading } = useFilters(
    "admin.referrals.index",
    props.filters
);
const { deleteItem } = useCrud();
const { Layout } = useAdminLayout();

// Modal state
const showCreateModal = ref(false);
const influencers = ref(props.formData?.influencers || []);
const schools = ref(props.formData?.schools || []);

// Form for creating referrals
const form = useForm({
    user_id: "",
    school_id: "",
    discount_type: "percentage",
    discount_value: "",
    discount_currency: "USD",
    starts_at: "",
    expires_at: "",
});

const openCreateModal = () => {
    form.reset();
    showCreateModal.value = true;
};

const closeCreateModal = () => {
    showCreateModal.value = false;
    form.reset();
};

const submitForm = () => {
    form.post(route("admin.referrals.store"), {
        onSuccess: () => {
            closeCreateModal();
        },
    });
};

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        // You could add a toast notification here if you have one
        console.log("Copied to clipboard:", text);
    } catch (err) {
        console.error("Failed to copy: ", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }
};

// Table configuration
const columns = [
    {
        key: "user.name",
        label: "Influencer",
        class: "text-sm text-gray-900",
    },
    {
        key: "school.name",
        label: "School",
        class: "text-sm text-gray-900",
    },
    {
        key: "referral_code",
        label: "Referral Code",
        class: "text-sm text-gray-900 font-mono",
    },
    {
        key: "referral_link",
        label: "Referral Link",
        class: "text-sm text-gray-900",
    },
    {
        key: "conversions_count",
        label: "Conversions",
        class: "text-sm text-gray-900",
    },
    {
        key: "created_at",
        label: "Created",
        type: "date",
        class: "text-sm text-gray-500",
    },
];

const actions = [
    {
        key: "view",
        label: "View",
        class: "bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium mr-2",
    },
    {
        key: "delete",
        label: "Delete",
        class: "bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium",
    },
];

const searchFilterConfig = [
    {
        key: "created_at",
        label: "Created Date",
        type: "date-range",
    },
];

const handleTableAction = ({ action, item }) => {
    if (!item || !item.id) {
        console.error("Invalid item data:", item);
        return;
    }

    switch (action) {
        case "view":
            window.location.href = route("admin.referrals.show", item.id);
            break;
        case "delete":
            deleteItem(item, "admin.referrals.destroy", {
                confirmMessage: `Are you sure you want to delete this referral?`,
            });
            break;
    }
};

const resetFilters = () => {
    searchFilters.value = {
        search: "",
        created_at_from: "",
        created_at_to: "",
    };
};
</script>

<template>
    <Head title="Referrals" />

    <component :is="Layout">
        <template #header>
            <div class="flex justify-between items-center">
                <div>
                    <h2
                        class="text-xl font-semibold leading-tight text-gray-800"
                    >
                        Referrals Management
                    </h2>
                    <p class="mt-1 text-sm text-gray-600">
                        Manage referral links and track performance
                    </p>
                </div>
                <Button
                    variant="primary"
                    @click="openCreateModal"
                    left-icon="M12 4v16m8-8H4"
                >
                    Create Referral
                </Button>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <!-- Search and Filters -->
                    <SearchFilter
                        v-model="searchFilters"
                        search-placeholder="Search by influencer, school, or referral code..."
                        :filters="searchFilterConfig"
                        :is-loading="isLoading"
                        @reset="resetFilters"
                    />

                    <!-- Data Table -->
                    <DataTable
                        :items="referrals"
                        :columns="columns"
                        :actions="actions"
                        :is-loading="isLoading"
                        empty-message="No referrals found. Create your first referral to get started."
                        @action="handleTableAction"
                    >
                        <template #cell-referral_link="{ value }">
                            <div class="flex items-center space-x-2 max-w-xs">
                                <span class="truncate text-blue-600 text-sm">
                                    {{ value }}
                                </span>
                                <button
                                    @click="copyToClipboard(value)"
                                    class="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    title="Copy to clipboard"
                                >
                                    <svg
                                        class="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </template>
                    </DataTable>
                </div>
            </div>
        </div>

        <!-- Create Referral Modal -->
        <Modal
            :show="showCreateModal"
            @close="closeCreateModal"
            max-width="2xl"
        >
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">
                    Create New Referral
                </h2>

                <form @submit.prevent="submitForm" class="space-y-6">
                    <!-- Influencer Selection -->
                    <div>
                        <InputLabel for="user_id" value="Influencer" />
                        <select
                            id="user_id"
                            v-model="form.user_id"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select an influencer...</option>
                            <option
                                v-for="user in influencers"
                                :key="user.id"
                                :value="user.id"
                            >
                                {{ user.name }} ({{ user.email }})
                            </option>
                        </select>
                        <InputError
                            class="mt-2"
                            :message="form.errors.user_id"
                        />
                    </div>

                    <!-- School Selection -->
                    <div>
                        <InputLabel for="school_id" value="School" />
                        <select
                            id="school_id"
                            v-model="form.school_id"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select a school...</option>
                            <option
                                v-for="school in schools"
                                :key="school.id"
                                :value="school.id"
                            >
                                {{ school.name }}
                            </option>
                        </select>
                        <InputError
                            class="mt-2"
                            :message="form.errors.school_id"
                        />
                    </div>

                    <!-- Discount Type -->
                    <div>
                        <InputLabel for="discount_type" value="Discount Type" />
                        <select
                            id="discount_type"
                            v-model="form.discount_type"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="percentage">Percentage</option>
                            <option value="fixed_amount">Fixed Amount</option>
                        </select>
                        <InputError
                            class="mt-2"
                            :message="form.errors.discount_type"
                        />
                    </div>

                    <!-- Discount Value -->
                    <div>
                        <InputLabel
                            for="discount_value"
                            :value="
                                form.discount_type === 'percentage'
                                    ? 'Discount Percentage (%)'
                                    : 'Discount Amount'
                            "
                        />
                        <div class="relative">
                            <input
                                id="discount_value"
                                v-model="form.discount_value"
                                type="number"
                                step="0.01"
                                min="0"
                                :max="
                                    form.discount_type === 'percentage'
                                        ? 100
                                        : undefined
                                "
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                :placeholder="
                                    form.discount_type === 'percentage'
                                        ? 'e.g., 10'
                                        : 'e.g., 50.00'
                                "
                                required
                            />
                            <div
                                v-if="form.discount_type === 'fixed_amount'"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                            >
                                <span class="text-gray-500 sm:text-sm">{{
                                    form.discount_currency
                                }}</span>
                            </div>
                        </div>
                        <InputError
                            class="mt-2"
                            :message="form.errors.discount_value"
                        />
                    </div>

                    <!-- Currency (only for fixed amount) -->
                    <div v-if="form.discount_type === 'fixed_amount'">
                        <InputLabel for="discount_currency" value="Currency" />
                        <select
                            id="discount_currency"
                            v-model="form.discount_currency"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                        <InputError
                            class="mt-2"
                            :message="form.errors.discount_currency"
                        />
                    </div>

                    <!-- Start Date -->
                    <div>
                        <InputLabel
                            for="starts_at"
                            value="Start Date (Optional)"
                        />
                        <input
                            id="starts_at"
                            v-model="form.starts_at"
                            type="datetime-local"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p class="mt-1 text-sm text-gray-500">
                            When the discount becomes active. Leave empty for
                            immediate activation.
                        </p>
                        <InputError
                            class="mt-2"
                            :message="form.errors.starts_at"
                        />
                    </div>

                    <!-- Expiry Date -->
                    <div>
                        <InputLabel
                            for="expires_at"
                            value="Expiry Date (Optional)"
                        />
                        <input
                            id="expires_at"
                            v-model="form.expires_at"
                            type="datetime-local"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p class="mt-1 text-sm text-gray-500">
                            When the discount expires. Leave empty for no
                            expiration.
                        </p>
                        <InputError
                            class="mt-2"
                            :message="form.errors.expires_at"
                        />
                    </div>

                    <!-- Error Message -->
                    <div
                        v-if="form.errors.error"
                        class="rounded-md bg-red-50 p-4"
                    >
                        <div class="text-sm text-red-700">
                            {{ form.errors.error }}
                        </div>
                    </div>

                    <!-- Submit Buttons -->
                    <div class="flex items-center justify-end gap-4">
                        <Button
                            variant="secondary"
                            type="button"
                            @click="closeCreateModal"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                            :disabled="form.processing"
                        >
                            <span v-if="form.processing">Creating...</span>
                            <span v-else>Create Referral</span>
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    </component>
</template>
