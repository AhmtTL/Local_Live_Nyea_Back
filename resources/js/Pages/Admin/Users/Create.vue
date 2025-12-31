<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const form = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
    is_active: true,
    school_name: "",
});

const submit = () => {
    form.post(route("admin.users.store"));
};
</script>

<template>
    <Head title="Create User" />

    <AdminLayout>
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">
                                Create New User
                            </h2>
                            <Link
                                :href="route('admin.users.index')"
                                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Back to Users
                            </Link>
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

                                <!-- Password -->
                                <div>
                                    <InputLabel
                                        for="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        id="password"
                                        v-model="form.password"
                                        type="password"
                                        class="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.password"
                                    />
                                </div>

                                <!-- Confirm Password -->
                                <div>
                                    <InputLabel
                                        for="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        v-model="form.password_confirmation"
                                        type="password"
                                        class="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="
                                            form.errors.password_confirmation
                                        "
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

                            <div class="flex items-center justify-end">
                                <PrimaryButton
                                    class="ml-4"
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                >
                                    Create User
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
