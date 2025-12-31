<template>
    <component :is="Layout">
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Discount Codes
                </h2>
                <Link
                    :href="route('admin.discount-codes.create')"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Create Discount Code
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <!-- Search and Filters -->
                <div
                    class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6"
                >
                    <div class="p-6">
                        <div class="flex flex-col sm:flex-row gap-4">
                            <div class="flex-1">
                                <input
                                    v-model="filters.search"
                                    type="text"
                                    placeholder="Search by code, name, or description..."
                                    class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div class="flex gap-2">
                                <select
                                    :value="filters.status"
                                    @change="
                                        updateFilter(
                                            'status',
                                            $event.target.value
                                        )
                                    "
                                    class="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    :disabled="isLoading"
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="expired">Expired</option>
                                    <option value="scheduled">Scheduled</option>
                                </select>
                                <select
                                    :value="filters.type"
                                    @change="
                                        updateFilter(
                                            'type',
                                            $event.target.value
                                        )
                                    "
                                    class="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    :disabled="isLoading"
                                >
                                    <option value="">All Types</option>
                                    <option value="percentage">
                                        Percentage
                                    </option>
                                    <option value="fixed_amount">
                                        Fixed Amount
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Discount Codes Table -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Code
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Type
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Value
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Usage
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Created
                                    </th>
                                    <th
                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-if="!discountCodes?.data?.length"
                                    class="text-center"
                                >
                                    <td
                                        colspan="8"
                                        class="px-6 py-4 text-sm text-gray-500"
                                    >
                                        No discount codes found.
                                    </td>
                                </tr>
                                <tr
                                    v-for="code in discountCodes?.data || []"
                                    :key="code.id"
                                    class="hover:bg-gray-50"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div
                                            class="text-sm font-mono font-medium text-gray-900"
                                        >
                                            {{ code.code }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {{ code.name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                            :class="
                                                code.type === 'percentage'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-green-100 text-green-800'
                                            "
                                        >
                                            {{
                                                code.type === "percentage"
                                                    ? "Percentage"
                                                    : "Fixed Amount"
                                            }}
                                        </span>
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {{ code.formatted_value }}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {{ code.used_count
                                        }}{{
                                            code.max_redemptions
                                                ? "/" + code.max_redemptions
                                                : ""
                                        }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                            :class="getStatusClass(code.status)"
                                        >
                                            {{ getStatusLabel(code.status) }}
                                        </span>
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {{ formatDate(code.created_at) }}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                    >
                                        <div class="flex justify-end space-x-2">
                                            <Link
                                                :href="
                                                    route(
                                                        'admin.discount-codes.show',
                                                        code.id
                                                    )
                                                "
                                                class="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                :href="
                                                    route(
                                                        'admin.discount-codes.edit',
                                                        code.id
                                                    )
                                                "
                                                class="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                @click="
                                                    toggleDiscountCode(code)
                                                "
                                                :class="
                                                    code.status === 'active'
                                                        ? 'text-orange-600 hover:text-orange-900'
                                                        : 'text-green-600 hover:text-green-900'
                                                "
                                            >
                                                {{
                                                    code.status === "active"
                                                        ? "Deactivate"
                                                        : "Activate"
                                                }}
                                            </button>
                                            <button
                                                @click="
                                                    deleteDiscountCode(code)
                                                "
                                                class="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div
                        v-if="
                            discountCodes?.links &&
                            discountCodes.links.length > 3
                        "
                        class="px-6 py-3 border-t border-gray-200"
                    >
                        <div class="flex items-center justify-between">
                            <div class="text-sm text-gray-700">
                                Showing {{ discountCodes.from || 0 }} to
                                {{ discountCodes.to || 0 }} of
                                {{ discountCodes.total || 0 }} results
                            </div>
                            <div class="flex space-x-1">
                                <template
                                    v-for="(link, index) in discountCodes.links"
                                    :key="index"
                                >
                                    <Link
                                        v-if="link.url"
                                        :href="link.url"
                                        :class="[
                                            'px-3 py-2 text-sm border',
                                            link.active
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
                                        ]"
                                    >
                                        <span v-html="link.label"></span>
                                    </Link>
                                    <span
                                        v-else
                                        :class="[
                                            'px-3 py-2 text-sm border bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed',
                                        ]"
                                        v-html="link.label"
                                    />
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>

<script setup>
import { ref } from "vue";
import { Link, router } from "@inertiajs/vue3";
import { useAdminLayout } from "@/Composables/useAdminLayout";
import { useServerSearch } from "@/Composables/useServerSearch";

const { Layout } = useAdminLayout();

const props = defineProps({
    discountCodes: {
        type: Object,
        default: () => ({ data: [], links: null }),
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
});

// Use the reusable server search composable
const { filters, isLoading, updateFilter } = useServerSearch(
    "admin.discount-codes.index",
    props.filters,
    {
        immediateFilters: ["status", "type"],
    }
);

// Delete discount code permanently
const deleteDiscountCode = (code) => {
    if (
        confirm(
            `Are you sure you want to permanently delete discount code "${code.code}"? This action cannot be undone.`
        )
    ) {
        router.delete(route("admin.discount-codes.destroy", code.id), {
            onError: (errors) => {
                console.error("Delete failed:", errors);
            },
        });
    }
};

// Toggle discount code status (activate/deactivate)
const toggleDiscountCode = (code) => {
    if (code.status === "active") {
        // Deactivate
        if (
            confirm(
                `Are you sure you want to deactivate discount code "${code.code}"? This will stop it from being usable.`
            )
        ) {
            router.post(
                route("admin.discount-codes.deactivate", code.id),
                {},
                {
                    onError: (errors) => {
                        console.error("Deactivate failed:", errors);
                    },
                }
            );
        }
    } else {
        // Activate
        if (
            confirm(
                `Are you sure you want to activate discount code "${code.code}"? This will make it usable again.`
            )
        ) {
            router.post(
                route("admin.discount-codes.activate", code.id),
                {},
                {
                    onError: (errors) => {
                        console.error("Activate failed:", errors);
                    },
                }
            );
        }
    }
};

const getStatusClass = (status) => {
    const classes = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        expired: "bg-red-100 text-red-800",
        scheduled: "bg-yellow-100 text-yellow-800",
        exhausted: "bg-orange-100 text-orange-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusLabel = (status) => {
    const labels = {
        active: "Active",
        inactive: "Inactive",
        expired: "Expired",
        scheduled: "Scheduled",
        exhausted: "Exhausted",
    };
    return labels[status] || "Unknown";
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
</script>
