<template>
    <component :is="Layout">
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Create Discount Code
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
                        <!-- Code -->
                        <div>
                            <label
                                for="code"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Discount Code *
                            </label>
                            <input
                                id="code"
                                v-model="form.code"
                                type="text"
                                required
                                placeholder="e.g., SAVE20"
                                pattern="[A-Za-z0-9_-]+"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                :class="{ 'border-red-500': form.errors.code }"
                                @input="
                                    form.code = $event.target.value.replace(
                                        /[^A-Za-z0-9_-]/g,
                                        ''
                                    )
                                "
                            />
                            <p
                                v-if="form.errors.code"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.code }}
                            </p>
                            <p class="mt-2 text-sm text-gray-500">
                                Code will be automatically converted to
                                uppercase. Use letters, numbers, hyphens (-),
                                and underscores (_) only. No spaces allowed.
                            </p>
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
                                placeholder="e.g., 20% Off Summer Sale"
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
                                placeholder="Optional description for internal use"
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

                        <!-- Discount Type and Value -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    for="type"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Discount Type *
                                </label>
                                <select
                                    id="type"
                                    v-model="form.type"
                                    required
                                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    :class="{
                                        'border-red-500': form.errors.type,
                                    }"
                                >
                                    <option value="percentage">
                                        Percentage
                                    </option>
                                    <option value="fixed_amount">
                                        Fixed Amount
                                    </option>
                                </select>
                                <p
                                    v-if="form.errors.type"
                                    class="mt-2 text-sm text-red-600"
                                >
                                    {{ form.errors.type }}
                                </p>
                            </div>

                            <div>
                                <label
                                    for="value"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Discount Value *
                                </label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <div
                                        v-if="form.type === 'fixed_amount'"
                                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                    >
                                        <span class="text-gray-500 sm:text-sm"
                                            >$</span
                                        >
                                    </div>
                                    <input
                                        id="value"
                                        v-model="form.value"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        :max="
                                            form.type === 'percentage'
                                                ? 100
                                                : undefined
                                        "
                                        required
                                        :placeholder="
                                            form.type === 'percentage'
                                                ? 'e.g., 20'
                                                : 'e.g., 50.00'
                                        "
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="[
                                            {
                                                'border-red-500':
                                                    form.errors.value,
                                            },
                                            form.type === 'fixed_amount'
                                                ? 'pl-7'
                                                : '',
                                        ]"
                                    />
                                    <div
                                        v-if="form.type === 'percentage'"
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                    >
                                        <span class="text-gray-500 sm:text-sm"
                                            >%</span
                                        >
                                    </div>
                                </div>
                                <p
                                    v-if="form.errors.value"
                                    class="mt-2 text-sm text-red-600"
                                >
                                    {{ form.errors.value }}
                                </p>
                            </div>
                        </div>

                        <!-- Currency (for fixed amount) -->
                        <div v-if="form.type === 'fixed_amount'">
                            <label
                                for="currency"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Currency *
                            </label>
                            <select
                                id="currency"
                                v-model="form.currency"
                                required
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                :class="{
                                    'border-red-500': form.errors.currency,
                                }"
                            >
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - British Pound</option>
                                <option value="CAD">
                                    CAD - Canadian Dollar
                                </option>
                            </select>
                            <p
                                v-if="form.errors.currency"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.currency }}
                            </p>
                        </div>

                        <!-- Business Rules -->
                        <div class="border-t border-gray-200 pt-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">
                                Business Rules
                            </h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Minimum Amount -->
                                <div>
                                    <label
                                        for="min_amount"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Minimum Order Amount
                                    </label>
                                    <div
                                        class="mt-1 relative rounded-md shadow-sm"
                                    >
                                        <div
                                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                        >
                                            <span
                                                class="text-gray-500 sm:text-sm"
                                                >$</span
                                            >
                                        </div>
                                        <input
                                            id="min_amount"
                                            v-model="form.min_amount"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            class="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            :class="{
                                                'border-red-500':
                                                    form.errors.min_amount,
                                            }"
                                        />
                                    </div>
                                    <p
                                        v-if="form.errors.min_amount"
                                        class="mt-2 text-sm text-red-600"
                                    >
                                        {{ form.errors.min_amount }}
                                    </p>
                                    <p class="mt-2 text-sm text-gray-500">
                                        Leave empty for no minimum requirement
                                    </p>
                                </div>

                                <!-- Max Redemptions -->
                                <div>
                                    <label
                                        for="max_redemptions"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Maximum Uses
                                    </label>
                                    <input
                                        id="max_redemptions"
                                        v-model="form.max_redemptions"
                                        type="number"
                                        min="1"
                                        placeholder="Unlimited"
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
                                    <p class="mt-2 text-sm text-gray-500">
                                        Total number of times this code can be
                                        used
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Validity Period -->
                        <div class="border-t border-gray-200 pt-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">
                                Validity Period
                            </h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Start Date -->
                                <div>
                                    <label
                                        for="starts_at"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Start Date & Time
                                    </label>
                                    <input
                                        id="starts_at"
                                        v-model="form.starts_at"
                                        type="datetime-local"
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="{
                                            'border-red-500':
                                                form.errors.starts_at,
                                        }"
                                    />
                                    <p
                                        v-if="form.errors.starts_at"
                                        class="mt-2 text-sm text-red-600"
                                    >
                                        {{ form.errors.starts_at }}
                                    </p>
                                    <p class="mt-2 text-sm text-gray-500">
                                        Leave empty to start immediately
                                    </p>
                                </div>

                                <!-- End Date -->
                                <div>
                                    <label
                                        for="expires_at"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Expiry Date & Time
                                    </label>
                                    <input
                                        id="expires_at"
                                        v-model="form.expires_at"
                                        type="datetime-local"
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="{
                                            'border-red-500':
                                                form.errors.expires_at,
                                        }"
                                    />
                                    <p
                                        v-if="form.errors.expires_at"
                                        class="mt-2 text-sm text-red-600"
                                    >
                                        {{ form.errors.expires_at }}
                                    </p>
                                    <p class="mt-2 text-sm text-gray-500">
                                        Leave empty for no expiry
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Status -->
                        <div class="border-t border-gray-200 pt-6">
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
                                        ? "Creating..."
                                        : "Create Discount Code"
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

const form = useForm({
    code: "",
    name: "",
    description: "",
    type: "percentage",
    value: "",
    currency: "USD",
    min_amount: "",
    max_redemptions: "",
    starts_at: "",
    expires_at: "",
    is_active: true,
});

const submit = () => {
    console.log("Form submission started", form.data());
    console.log("Form errors before submit:", form.errors);

    form.post("/admin/discount-codes", {
        onError: (errors) => {
            console.log("Form submission errors:", errors);
        },
        onSuccess: () => {
            console.log("Form submitted successfully");
        },
        onBefore: () => {
            console.log("Form submission starting...");
        },
        onFinish: () => {
            console.log("Form submission finished");
        },
    });
};
</script>
