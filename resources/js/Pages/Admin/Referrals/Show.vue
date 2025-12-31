<script setup>
import { useAdminLayout } from "@/Composables/useAdminLayout";
import { Head, Link } from "@inertiajs/vue3";
import Button from "@/Components/Button.vue";
import { computed } from "vue";

const props = defineProps({
    referral: Object,
});

const { Layout } = useAdminLayout();

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
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

const totalRevenue = computed(() => {
    return (
        props.referral.conversions?.reduce(
            (sum, conversion) => sum + parseFloat(conversion.amount),
            0
        ) || 0
    );
});

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
</script>

<template>
    <Head
        :title="`Referral - ${referral.user?.name} - ${referral.school?.name}`"
    />

    <component :is="Layout">
        <template #header>
            <div class="flex justify-between items-center">
                <div>
                    <div class="flex items-center space-x-3">
                        <Link
                            :href="route('admin.referrals.index')"
                            class="text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                        </Link>
                        <h2
                            class="text-xl font-semibold leading-tight text-gray-800"
                        >
                            Referral Details
                        </h2>
                    </div>
                    <p class="mt-1 text-sm text-gray-600">
                        View referral performance and conversion history
                    </p>
                </div>
                <Button
                    variant="secondary"
                    :href="route('admin.referrals.index')"
                    as="Link"
                >
                    Back to Referrals
                </Button>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8 space-y-8">
                <!-- Referral Overview -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">
                            Referral Overview
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Left Column -->
                            <div class="space-y-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >Influencer</label
                                    >
                                    <p class="mt-1 text-sm text-gray-900">
                                        {{ referral.user?.name }}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        {{ referral.user?.email }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >School</label
                                    >
                                    <p class="mt-1 text-sm text-gray-900">
                                        {{ referral.school?.name }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >Referral Code</label
                                    >
                                    <div
                                        class="mt-1 flex items-center space-x-2"
                                    >
                                        <p
                                            class="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded"
                                        >
                                            {{ referral.referral_code }}
                                        </p>
                                        <button
                                            @click="
                                                copyToClipboard(
                                                    referral.referral_code
                                                )
                                            "
                                            class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
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
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >Created Date</label
                                    >
                                    <p class="mt-1 text-sm text-gray-900">
                                        {{ formatDate(referral.created_at) }}
                                    </p>
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div class="space-y-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >Referral Link</label
                                    >
                                    <div
                                        class="mt-1 flex items-center space-x-2"
                                    >
                                        <p
                                            class="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded break-all"
                                        >
                                            {{ referral.referral_link }}
                                        </p>
                                        <button
                                            @click="
                                                copyToClipboard(
                                                    referral.referral_link
                                                )
                                            "
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Performance Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div class="p-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                                    >
                                        <svg
                                            class="w-4 h-4 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <p
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Total Conversions
                                    </p>
                                    <p
                                        class="text-2xl font-semibold text-gray-900"
                                    >
                                        {{ referral.conversions_count || 0 }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div class="p-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                                    >
                                        <svg
                                            class="w-4 h-4 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <p
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Total Revenue
                                    </p>
                                    <p
                                        class="text-2xl font-semibold text-gray-900"
                                    >
                                        {{ formatCurrency(totalRevenue) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div class="p-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
                                    >
                                        <svg
                                            class="w-4 h-4 text-purple-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <p
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Average Order Value
                                    </p>
                                    <p
                                        class="text-2xl font-semibold text-gray-900"
                                    >
                                        {{
                                            referral.conversions_count > 0
                                                ? formatCurrency(
                                                      totalRevenue /
                                                          referral.conversions_count
                                                  )
                                                : formatCurrency(0)
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Conversions History -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">
                            Conversion History
                        </h3>
                        <p class="mt-1 text-sm text-gray-600">
                            List of successful referral conversions
                        </p>
                    </div>

                    <div
                        v-if="
                            referral.conversions &&
                            referral.conversions.length > 0
                        "
                        class="divide-y divide-gray-200"
                    >
                        <div
                            v-for="conversion in referral.conversions"
                            :key="conversion.id"
                            class="p-6 hover:bg-gray-50"
                        >
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-4">
                                        <div>
                                            <p
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                {{ conversion.customer_name }}
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                {{ conversion.customer_email }}
                                            </p>
                                            <p
                                                v-if="conversion.customer_grade"
                                                class="text-sm text-gray-500"
                                            >
                                                Grade:
                                                {{ conversion.customer_grade }}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        class="mt-2 flex items-center space-x-4 text-sm text-gray-500"
                                    >
                                        <span>{{
                                            formatDate(conversion.created_at)
                                        }}</span>
                                        <span>•</span>
                                        <span
                                            >Payment ID:
                                            {{ conversion.payment_id }}</span
                                        >
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p
                                        class="text-lg font-medium text-gray-900"
                                    >
                                        {{ formatCurrency(conversion.amount) }}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        {{
                                            conversion.program?.title ||
                                            "Program"
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="p-6 text-center">
                        <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            ></path>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">
                            No conversions yet
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                            This referral hasn't generated any conversions yet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
