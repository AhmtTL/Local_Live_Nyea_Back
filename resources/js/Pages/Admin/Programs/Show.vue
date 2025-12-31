<script setup>
import { Head, Link, router } from "@inertiajs/vue3";
import { useAdminLayout } from "@/Composables/useAdminLayout";

const props = defineProps({
    program: Object,
    canViewRevenue: {
        type: Boolean,
        default: true,
    },
});

const { Layout } = useAdminLayout();

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const getStatusBadgeClass = (status) => {
    const classes = {
        paid: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        refunded: "bg-gray-100 text-gray-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
};

const getInterestLevelBadgeClass = (level) => {
    const classes = {
        high: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        low: "bg-red-100 text-red-800",
    };
    return classes[level] || "bg-gray-100 text-gray-800";
};

const deleteProgram = () => {
    if (
        confirm(
            `Are you sure you want to delete program "${props.program.title}"?`
        )
    ) {
        router.delete(route("admin.programs.destroy", props.program.id));
    }
};
</script>

<template>
    <Head :title="program.title" />

    <component :is="Layout">
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <!-- Header -->
                <div
                    class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6"
                >
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-3xl font-bold text-gray-900">
                                    {{ program.title }}
                                </h1>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{ program.category || "No category" }}
                                </p>
                            </div>
                            <div class="flex space-x-2">
                                <Link
                                    :href="
                                        route('admin.programs.edit', program.id)
                                    "
                                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Edit Program
                                </Link>
                                <button
                                    @click="deleteProgram"
                                    class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete Program
                                </button>
                                <Link
                                    :href="route('admin.programs.index')"
                                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Back to Programs
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Program Details -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <!-- Main Details -->
                    <div class="lg:col-span-2">
                        <div
                            class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                        >
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h2
                                    class="text-xl font-semibold text-gray-900 mb-4"
                                >
                                    Program Details
                                </h2>

                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Title
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            {{ program.title }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Slug
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            {{ program.slug }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Price
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            {{ program.formatted_price }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Duration
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            {{
                                                program.duration ||
                                                "Not specified"
                                            }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Category
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            {{
                                                program.category ||
                                                "No category"
                                            }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Type
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            {{
                                                program.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                program.type.slice(1)
                                            }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Created
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            {{ formatDate(program.created_at) }}
                                        </dd>
                                    </div>
                                </div>

                                <div class="mt-6" v-if="program.description">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Description
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ program.description }}
                                    </dd>
                                </div>

                                <div
                                    class="mt-6"
                                    v-if="
                                        program.features &&
                                        program.features.length
                                    "
                                >
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Features
                                    </dt>
                                    <dd class="mt-2">
                                        <div class="flex flex-wrap gap-2">
                                            <span
                                                v-for="feature in program.features"
                                                :key="feature"
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                {{ feature }}
                                            </span>
                                        </div>
                                    </dd>
                                </div>

                                <div class="mt-6" v-if="program.image">
                                    <dt
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Image
                                    </dt>
                                    <dd class="mt-2">
                                        <img
                                            :src="program.image"
                                            :alt="program.title"
                                            class="w-full max-w-md h-48 object-cover rounded-lg"
                                        />
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="space-y-6">
                        <div
                            class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                        >
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h3
                                    class="text-lg font-semibold text-gray-900 mb-4"
                                >
                                    Program Statistics
                                </h3>

                                <div class="space-y-4">
                                    <div>
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Total Interested Users
                                        </dt>
                                        <dd
                                            class="mt-1 text-2xl font-semibold text-gray-900"
                                        >
                                            {{ program.stats.total_interested }}
                                        </dd>
                                    </div>

                                    <div v-if="canViewRevenue">
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Total Payments
                                        </dt>
                                        <dd
                                            class="mt-1 text-2xl font-semibold text-gray-900"
                                        >
                                            {{ program.stats.total_payments }}
                                        </dd>
                                    </div>

                                    <div v-if="canViewRevenue">
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Total Revenue
                                        </dt>
                                        <dd
                                            class="mt-1 text-2xl font-semibold text-green-600"
                                        >
                                            {{
                                                formatCurrency(
                                                    program.stats.total_revenue
                                                )
                                            }}
                                        </dd>
                                    </div>

                                    <div v-if="canViewRevenue">
                                        <dt
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Conversion Rate
                                        </dt>
                                        <dd
                                            class="mt-1 text-2xl font-semibold text-blue-600"
                                        >
                                            {{ program.stats.conversion_rate }}%
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interested Users & Payments -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div
                        class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div class="p-6 bg-white border-b border-gray-200">
                            <h3
                                class="text-lg font-semibold text-gray-900 mb-4"
                            >
                                Interested Users
                            </h3>

                            <div
                                class="space-y-4"
                                v-if="program.interested_users.length"
                            >
                                <div
                                    v-for="user in program.interested_users"
                                    :key="user.id"
                                    class="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div>
                                        <p
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {{ user.name }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            {{ user.email }}
                                        </p>
                                        <p class="text-xs text-gray-400">
                                            Interested:
                                            {{ formatDate(user.interested_at) }}
                                        </p>
                                        <p
                                            v-if="user.notes"
                                            class="text-xs text-gray-600 mt-1"
                                        >
                                            {{ user.notes }}
                                        </p>
                                    </div>
                                    <span
                                        :class="[
                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                            getInterestLevelBadgeClass(
                                                user.interest_level
                                            ),
                                        ]"
                                    >
                                        {{ user.interest_level }}
                                    </span>
                                </div>
                            </div>

                            <p v-else class="text-gray-500 text-center py-8">
                                No interested users yet.
                            </p>
                        </div>
                    </div>

                    <!-- Payments - Only show for non-dev users -->
                    <div
                        v-if="canViewRevenue"
                        class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div class="p-6 bg-white border-b border-gray-200">
                            <h3
                                class="text-lg font-semibold text-gray-900 mb-4"
                            >
                                Recent Payments
                            </h3>

                            <div
                                class="space-y-4"
                                v-if="program.payments.length"
                            >
                                <div
                                    v-for="payment in program.payments"
                                    :key="payment.id"
                                    class="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div>
                                        <p
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {{
                                                payment.user
                                                    ? payment.user.name
                                                    : payment.guest_name ||
                                                      "Guest User"
                                            }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            {{
                                                payment.user
                                                    ? payment.user.email
                                                    : payment.guest_email ||
                                                      "No email"
                                            }}
                                        </p>
                                        <p class="text-xs text-gray-400">
                                            {{ formatDate(payment.created_at) }}
                                        </p>
                                        <p
                                            v-if="payment.paid_at"
                                            class="text-xs text-gray-400"
                                        >
                                            Paid:
                                            {{ formatDate(payment.paid_at) }}
                                        </p>
                                        <p
                                            v-if="!payment.user"
                                            class="text-xs text-orange-600 mt-1"
                                        >
                                            Guest Payment
                                        </p>
                                    </div>
                                    <div class="text-right">
                                        <p
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {{ formatCurrency(payment.amount) }}
                                        </p>
                                        <span
                                            :class="[
                                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                getStatusBadgeClass(
                                                    payment.status
                                                ),
                                            ]"
                                        >
                                            {{ payment.status }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p v-else class="text-gray-500 text-center py-8">
                                No payments yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
