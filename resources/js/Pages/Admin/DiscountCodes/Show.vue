<template>
    <component :is="Layout">
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Discount Code: {{ discountCode.code }}
                </h2>
                <div class="flex space-x-2">
                    <Link
                        :href="
                            route('admin.discount-codes.edit', discountCode.id)
                        "
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Edit
                    </Link>
                    <Link
                        :href="route('admin.discount-codes.index')"
                        class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Back to List
                    </Link>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <!-- Discount Code Details -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">
                            Discount Code Details
                        </h3>

                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Code
                                </dt>
                                <dd
                                    class="mt-1 text-sm text-gray-900 font-mono"
                                >
                                    {{ discountCode.code }}
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Name
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ discountCode.name }}
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Status
                                </dt>
                                <dd class="mt-1">
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                        :class="
                                            getStatusClass(discountCode.status)
                                        "
                                    >
                                        {{
                                            getStatusLabel(discountCode.status)
                                        }}
                                    </span>
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Type
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{
                                        discountCode.type === "percentage"
                                            ? "Percentage"
                                            : "Fixed Amount"
                                    }}
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Value
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ discountCode.formatted_value }}
                                </dd>
                            </div>

                            <div v-if="discountCode.currency">
                                <dt class="text-sm font-medium text-gray-500">
                                    Currency
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ discountCode.currency }}
                                </dd>
                            </div>

                            <div v-if="discountCode.min_amount">
                                <dt class="text-sm font-medium text-gray-500">
                                    Minimum Amount
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    ${{ discountCode.min_amount }}
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Usage
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ discountCode.used_count
                                    }}{{
                                        discountCode.max_redemptions
                                            ? "/" + discountCode.max_redemptions
                                            : " (unlimited)"
                                    }}
                                </dd>
                            </div>

                            <div v-if="discountCode.starts_at">
                                <dt class="text-sm font-medium text-gray-500">
                                    Start Date
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ formatDateTime(discountCode.starts_at) }}
                                </dd>
                            </div>

                            <div v-if="discountCode.expires_at">
                                <dt class="text-sm font-medium text-gray-500">
                                    Expiry Date
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{
                                        formatDateTime(discountCode.expires_at)
                                    }}
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Created
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{
                                        formatDateTime(discountCode.created_at)
                                    }}
                                </dd>
                            </div>

                            <div v-if="discountCode.creator">
                                <dt class="text-sm font-medium text-gray-500">
                                    Created By
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{
                                        discountCode.creator?.name || "Unknown"
                                    }}
                                </dd>
                            </div>
                        </div>

                        <div v-if="discountCode.description" class="mt-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Description
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900">
                                {{ discountCode.description }}
                            </dd>
                        </div>
                    </div>
                </div>

                <!-- Stripe Integration Info -->
                <div
                    v-if="discountCode.stripe_coupon_id"
                    class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                >
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">
                            Stripe Integration
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <dt class="text-sm font-medium text-gray-500">
                                    Stripe Coupon ID
                                </dt>
                                <dd
                                    class="mt-1 text-sm text-gray-900 font-mono"
                                >
                                    {{ discountCode.stripe_coupon_id }}
                                </dd>
                            </div>
                            <div v-if="discountCode.stripe_promotion_code_id">
                                <dt class="text-sm font-medium text-gray-500">
                                    Stripe Promotion Code ID
                                </dt>
                                <dd
                                    class="mt-1 text-sm text-gray-900 font-mono"
                                >
                                    {{ discountCode.stripe_promotion_code_id }}
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Redemptions -->
                <div
                    v-if="redemptions && redemptions.length > 0"
                    class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                >
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">
                            Recent Redemptions
                        </h3>

                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Customer Email
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Amount Discounted
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Session ID
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                >
                                    <tr
                                        v-for="redemption in redemptions"
                                        :key="redemption.id"
                                        class="hover:bg-gray-50"
                                    >
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {{ redemption.user_email }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            ${{ redemption.amount_discounted }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono"
                                        >
                                            {{ redemption.stripe_session_id }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{
                                                formatDateTime(
                                                    redemption.created_at
                                                )
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- No Redemptions -->
                <div
                    v-else
                    class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                >
                    <div class="p-6 text-center">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">
                            No Redemptions Yet
                        </h3>
                        <p class="text-gray-500">
                            This discount code hasn't been used by any customers
                            yet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { useAdminLayout } from "@/Composables/useAdminLayout";

const { Layout } = useAdminLayout();

const props = defineProps({
    discountCode: {
        type: Object,
        required: true,
    },
    redemptions: {
        type: Array,
        default: () => [],
    },
});

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

const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
};
</script>
