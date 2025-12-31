<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const props = defineProps({
    user: Object,
});

const form = useForm({
    name: props.user.name,
    email: props.user.email,
    role: props.user.role,
    is_active: props.user.is_active,
    school_name: props.user.school_name || "",
});

const tagAsInfluencer = () => {
    if (
        confirm(
            `Are you sure you want to tag "${props.user.name}" as an influencer?`
        )
    ) {
        // Create a form and submit it via POST
        const form = document.createElement("form");
        form.method = "POST";
        form.action = route("admin.users.tag-influencer", props.user.id);

        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
            const csrfInput = document.createElement("input");
            csrfInput.type = "hidden";
            csrfInput.name = "_token";
            csrfInput.value = csrfToken.getAttribute("content");
            form.appendChild(csrfInput);
        }

        document.body.appendChild(form);
        form.submit();
    }
};

const removeInfluencerTag = () => {
    if (
        confirm(
            `Are you sure you want to remove the influencer tag from "${props.user.name}"?`
        )
    ) {
        // Create a form and submit it via POST
        const form = document.createElement("form");
        form.method = "POST";
        form.action = route("admin.users.remove-influencer", props.user.id);

        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
            const csrfInput = document.createElement("input");
            csrfInput.type = "hidden";
            csrfInput.name = "_token";
            csrfInput.value = csrfToken.getAttribute("content");
            form.appendChild(csrfInput);
        }

        document.body.appendChild(form);
        form.submit();
    }
};

const submit = () => {
    form.put(route("admin.users.update", props.user.id));
};
</script>

<template>
    <Head title="Edit User" />

    <AdminLayout>
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">
                                Edit User: {{ user.name }}
                            </h2>
                            <div class="space-x-2">
                                <Link
                                    :href="route('admin.users.show', user.id)"
                                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    View User
                                </Link>
                                <button
                                    v-if="!user.is_influencer"
                                    @click="tagAsInfluencer"
                                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Tag as Influencer
                                </button>
                                <button
                                    v-else
                                    @click="removeInfluencerTag"
                                    class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Remove Influencer Tag
                                </button>
                                <Link
                                    :href="route('admin.users.index')"
                                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Back to Users
                                </Link>
                            </div>
                        </div>

                        <form @submit.prevent="submit" class="space-y-6">
                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <!-- Name -->
                                <div>
                                    <InputLabel for="name" value="Full Name" />
                                    <TextInput
                                        id="name"
                                        v-model="form.name"
                                        type="text"
                                        class="mt-1 block w-full"
                                        required
                                        autofocus
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.name"
                                    />
                                </div>

                                <!-- Email -->
                                <div>
                                    <InputLabel
                                        for="email"
                                        value="Email Address"
                                    />
                                    <TextInput
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        class="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.email"
                                    />
                                </div>

                                <!-- Role -->
                                <div>
                                    <InputLabel for="role" value="Role" />
                                    <select
                                        id="role"
                                        v-model="form.role"
                                        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="school">School</option>
                                        <option value="dev">Dev</option>
                                    </select>
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.role"
                                    />
                                </div>

                                <!-- Status -->
                                <div>
                                    <InputLabel
                                        for="is_active"
                                        value="Status"
                                    />
                                    <select
                                        id="is_active"
                                        v-model="form.is_active"
                                        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option :value="true">Active</option>
                                        <option :value="false">Inactive</option>
                                    </select>
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.is_active"
                                    />
                                </div>

                                <!-- School Name -->
                                <div>
                                    <InputLabel
                                        for="school_name"
                                        value="School Name"
                                    />
                                    <TextInput
                                        id="school_name"
                                        v-model="form.school_name"
                                        type="text"
                                        class="mt-1 block w-full"
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.school_name"
                                    />
                                </div>
                            </div>

                            <!-- Influencer Information -->
                            <!-- <div v-if="user.is_influencer" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                                <h3 class="text-lg font-medium text-green-800 mb-2">Influencer Information</h3>
                                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <dt class="text-sm font-medium text-green-700">Referral Code</dt>
                                        <dd class="mt-1 text-sm text-green-900 font-mono">{{ user.referral_code }}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-sm font-medium text-green-700">Referred Count</dt>
                                        <dd class="mt-1 text-sm text-green-900">{{ user.referred_count }}</dd>
                                    </div>
                                </div>
                            </div> -->

                            <div
                                class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md"
                            >
                                <p class="text-sm text-yellow-800">
                                    <strong>Note:</strong> Password changes
                                    should be handled separately for security
                                    reasons.
                                </p>
                            </div>

                            <div class="flex items-center justify-end">
                                <PrimaryButton
                                    class="ml-4"
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                >
                                    Update User
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
