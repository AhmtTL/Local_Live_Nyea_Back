<template>
    <component :is="Layout">
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Discount Code: {{ discountCode.code }}
                </h2>
                <Link
                    :href="route('admin.discount-codes.index')"
                    class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Back to List
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <form @submit.prevent="submit" class="p-6 space-y-6">
                        <!-- Code (Read-only) -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700"
                            >
                                Discount Code
                            </label>
                            <div
                                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
                            >
                                {{ discountCode.code }}
                            </div>
                            <p class="mt-2 text-sm text-gray-500">
                                Discount codes cannot be changed after creation
                            </p>
                        </div>

                        <!-- Type and Value (Read-only) -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Discount Type
                                </label>
                                <div
                                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
                                >
                                    {{
                                        discountCode.type === "percentage"
                                            ? "Percentage"
                                            : "Fixed Amount"
                                    }}
                                </div>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Discount Value
                                </label>
                                <div
                                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
                                >
                                    {{
                                        discountCode.type === "percentage"
                                            ? discountCode.value + "%"
                                            : "$" + discountCode.value
                                    }}
                                </div>
                            </div>
                        </div>

                        <!-- Name -->
                        <div>
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Display Name *
                            </label>
                            <input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                :class="{ 'border-red-500': form.errors.name }"
                            />
                            <p
                                v-if="form.errors.name"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.name }}
                            </p>
                        </div>

                        <!-- Description -->
                        <div>
                            <label
                                for="description"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                rows="3"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                :class="{
                                    'border-red-500': form.errors.description,
                                }"
                            />
                            <p
                                v-if="form.errors.description"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.description }}
                            </p>
                        </div>

                        <!-- Usage Information -->
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h3 class="text-sm font-medium text-gray-900 mb-2">
                                Usage Information
                            </h3>
                            <div class="text-sm text-gray-600">
                                <p>
                                    Times Used:
                                    <span class="font-medium">{{
                                        discountCode.used_count
                                    }}</span>
                                </p>
                                <p v-if="discountCode.max_redemptions">
                                    Remaining Uses:
                                    <span class="font-medium">{{
                                        discountCode.max_redemptions -
                                        discountCode.used_count
                                    }}</span>
                                </p>
                            </div>
                        </div>

                        <!-- Maximum Redemptions -->
                        <div>
                            <label
                                for="max_redemptions"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Maximum Redemptions:
                            </label>
                            <input
                                placeholder="Leave blank for unlimited"
                                id="max_redemptions"
                                v-model="form.max_redemptions"
                                type="number"
                                min="1"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                :class="{
                                    'border-red-500':
                                        form.errors.max_redemptions,
                                }"
                            />
                            <p
                                v-if="form.errors.max_redemptions"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.max_redemptions }}
                            </p>
                        </div>

                        <!-- Status -->
                        <div>
                            <div class="flex items-center">
                                <input
                                    id="is_active"
                                    v-model="form.is_active"
                                    type="checkbox"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    for="is_active"
                                    class="ml-2 block text-sm text-gray-900"
                                >
                                    Active
                                </label>
                            </div>
                            <p class="mt-2 text-sm text-gray-500">
                                Inactive codes cannot be used by customers
                            </p>
                        </div>

                        <!-- Submit Buttons -->
                        <div
                            class="border-t border-gray-200 pt-6 flex justify-end space-x-3"
                        >
                            <Link
                                :href="route('admin.discount-codes.index')"
                                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {{
                                    form.processing
                                        ? "Updating..."
                                        : "Update Discount Code"
                                }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </component>
</template>

<script setup>
import { Link, useForm } from "@inertiajs/vue3";
import { useAdminLayout } from "@/Composables/useAdminLayout";

const { Layout } = useAdminLayout();

const props = defineProps({
    discountCode: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    name: props.discountCode?.name || "",
    description: props.discountCode?.description || "",
    is_active: props.discountCode?.is_active ?? true,
    max_redemptions: props.discountCode?.max_redemptions || null, // Added max_redemptions
});

const submit = () => {
    form.patch(route("admin.discount-codes.update", props.discountCode?.id));
};
</script>
