<script setup>
import { Head, Link, router } from "@inertiajs/vue3";
import { useServerSearch } from "@/Composables/useServerSearch";
import { useAdminLayout } from "@/Composables/useAdminLayout";

const props = defineProps({
    programs: Object,
    categories: Array,
    filters: Object,
    canViewRevenue: {
        type: Boolean,
        default: true,
    },
});

const { Layout } = useAdminLayout();

// Use the reusable server search composable
const { filters, isLoading, updateFilter } = useServerSearch(
    "admin.programs.index",
    props.filters,
    {
        immediateFilters: ["category"],
    }
);

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const deleteProgram = (program) => {
    if (
        confirm(`Are you sure you want to delete program "${program.title}"?`)
    ) {
        router.delete(route("admin.programs.destroy", program.id));
    }
};
</script>

<template>
    <Head title="Programs" />

    <component :is="Layout">
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="md:flex md:items-center md:justify-between mb-8">
                    <div class="flex-1 min-w-0">
                        <h2
                            class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
                        >
                            Programs
                        </h2>
                        <p class="mt-1 text-sm text-gray-500">
                            Manage educational programs and track their
                            performance
                        </p>
                    </div>
                    <div class="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            :href="route('admin.programs.create')"
                            class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Program
                        </Link>
                    </div>
                </div>

                <!-- Content -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <!-- Filters -->
                    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                        <div
                            class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4"
                        >
                            <div class="flex-1">
                                <input
                                    v-model="filters.search"
                                    type="text"
                                    placeholder="Search programs..."
                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div class="flex-shrink-0">
                                <select
                                    :value="filters.category"
                                    @change="
                                        updateFilter(
                                            'category',
                                            $event.target.value
                                        )
                                    "
                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    :disabled="isLoading"
                                >
                                    <option value="">All Categories</option>
                                    <option
                                        v-for="cat in categories"
                                        :key="cat.id"
                                        :value="cat.name"
                                    >
                                        {{ cat.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Programs Table -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Program
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Price
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Duration
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Type
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Interest / Sales
                                    </th>
                                    <th
                                        v-if="canViewRevenue"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Revenue
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
                                    v-for="program in programs.data"
                                    :key="program.id"
                                    class="hover:bg-gray-50"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                {{ program.title }}
                                            </div>
                                            <div class="text-sm text-gray-500">
                                                {{
                                                    program.category ||
                                                    "No category"
                                                }}
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {{ program.formatted_price }}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {{ program.duration || "-" }}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {{
                                            program.type
                                                .charAt(0)
                                                .toUpperCase() +
                                            program.type.slice(1)
                                        }}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {{ program.interested_users_count }} /
                                        {{ program.paid_payments_count }}
                                    </td>
                                    <td
                                        v-if="canViewRevenue"
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {{
                                            formatCurrency(
                                                program.total_revenue
                                            )
                                        }}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                    >
                                        <div class="flex justify-end space-x-2">
                                            <Link
                                                :href="
                                                    route(
                                                        'admin.programs.show',
                                                        program.id
                                                    )
                                                "
                                                class="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                :href="
                                                    route(
                                                        'admin.programs.edit',
                                                        program.id
                                                    )
                                                "
                                                class="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                @click="deleteProgram(program)"
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
                        v-if="programs.links && programs.links.length > 3"
                        class="px-4 py-3 border-t border-gray-200 sm:px-6"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex-1 flex justify-between sm:hidden">
                                <Link
                                    v-if="programs.prev_page_url"
                                    :href="programs.prev_page_url"
                                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                                <Link
                                    v-if="programs.next_page_url"
                                    :href="programs.next_page_url"
                                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            </div>
                            <div
                                class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p class="text-sm text-gray-700">
                                        Showing {{ programs.from }} to
                                        {{ programs.to }} of
                                        {{ programs.total }} results
                                    </p>
                                </div>
                                <div>
                                    <nav
                                        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    >
                                        <template
                                            v-for="(
                                                link, index
                                            ) in programs.links"
                                            :key="index"
                                        >
                                            <Link
                                                v-if="link.url"
                                                :href="link.url"
                                                :class="[
                                                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                                                    link.active
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                                    index === 0
                                                        ? 'rounded-l-md'
                                                        : '',
                                                    index ===
                                                    programs.links.length - 1
                                                        ? 'rounded-r-md'
                                                        : '',
                                                ]"
                                            >
                                                {{ link.label }}
                                            </Link>
                                            <span
                                                v-else
                                                v-html="link.label"
                                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-300"
                                            />
                                        </template>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
