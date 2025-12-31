<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';

const props = defineProps({
    user: Object,
});

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const getStatusBadgeClass = (status) => {
    const classes = {
        'paid': 'bg-green-100 text-green-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'failed': 'bg-red-100 text-red-800',
        'refunded': 'bg-gray-100 text-gray-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
};

const getInterestLevelBadgeClass = (level) => {
    const classes = {
        'high': 'bg-green-100 text-green-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'low': 'bg-red-100 text-red-800',
    };
    return classes[level] || 'bg-gray-100 text-gray-800';
};

const deleteUser = () => {
    if (confirm(`Are you sure you want to delete user "${props.user.name}"?`)) {
        router.delete(route('admin.users.destroy', props.user.id));
    }
};

const tagAsInfluencer = () => {
    if (confirm(`Are you sure you want to tag "${props.user.name}" as an influencer?`)) {
        // Create a form and submit it via POST
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('admin.users.tag-influencer', props.user.id);

        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken.getAttribute('content');
            form.appendChild(csrfInput);
        }

        document.body.appendChild(form);
        form.submit();
    }
};

const removeInfluencerTag = () => {
    if (confirm(`Are you sure you want to remove the influencer tag from "${props.user.name}"?`)) {
        // Create a form and submit it via POST
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('admin.users.remove-influencer', props.user.id);

        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken.getAttribute('content');
            form.appendChild(csrfInput);
        }

        document.body.appendChild(form);
        form.submit();
    }
};
</script>

<template>

    <Head :title="user.name" />

    <AdminLayout>
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-12 w-12">
                                    <div class="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center">
                                        <span class="text-lg font-medium text-white">{{ user.name.charAt(0) }}</span>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <h1 class="text-3xl font-bold text-gray-900">{{ user.name }}</h1>
                                    <p class="mt-1 text-sm text-gray-500">{{ user.email }}</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <Link :href="route('admin.users.edit', user.id)"
                                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                    Edit User
                                </Link>
                                <button v-if="!user.is_influencer" @click="tagAsInfluencer"
                                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Tag as Influencer
                                </button>
                                <button v-else @click="removeInfluencerTag"
                                    class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                                    Remove Influencer Tag
                                </button>
                                <button @click="deleteUser"
                                    class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete User
                                </button>
                                <Link :href="route('admin.users.index')"
                                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                    Back to Users
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- User Details -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <!-- Main Details -->
                    <div class="lg:col-span-2">
                        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h2 class="text-xl font-semibold text-gray-900 mb-4">User Information</h2>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Full Name</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ user.name }}</dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Email Address</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ user.email }}</dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">School Name</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ user.school_name || '-' }}</dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Email Verified</dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            <span
                                                :class="[user.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium']">
                                                {{ user.email_verified_at ? 'Verified' : 'Not Verified' }}
                                            </span>
                                        </dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Registration Date</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatDate(user.created_at) }}</dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Total Spent</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ formatCurrency(user.total_spent) }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Influencer Status</dt>
                                        <dd class="mt-1 text-sm text-gray-900">
                                            <span
                                                :class="[user.is_influencer ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800', 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium']">
                                                {{ user.is_influencer ? 'Influencer' : 'Regular User' }}
                                            </span>
                                        </dd>
                                    </div>

                                    <!-- <div v-if="user.is_influencer">
                                        <dt class="text-sm font-medium text-gray-500">Referral Code</dt>
                                        <dd class="mt-1 text-sm text-gray-900 font-mono">{{ user.referral_code }}</dd>
                                    </div>
                                    
                                    <div v-if="user.is_influencer">
                                        <dt class="text-sm font-medium text-gray-500">Referred Count</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ user.referred_count }}</dd>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="space-y-6">
                        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div class="p-6 bg-white border-b border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>

                                <div class="space-y-4">
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Interested Programs</dt>
                                        <dd class="mt-1 text-2xl font-semibold text-gray-900">{{
                                            user.interested_programs.length }}</dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Total Payments</dt>
                                        <dd class="mt-1 text-2xl font-semibold text-gray-900">{{ user.payments.length }}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Total Spent</dt>
                                        <dd class="mt-1 text-2xl font-semibold text-green-600">{{
                                            formatCurrency(user.total_spent) }}</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interested Programs & Payments -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Interested Programs -->
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6 bg-white border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Interested Programs</h3>

                            <div class="space-y-4" v-if="user.interested_programs.length">
                                <div v-for="program in user.interested_programs" :key="program.id"
                                    class="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">{{ program.title }}</p>
                                        <p class="text-sm text-gray-500">{{ formatCurrency(program.price) }}</p>
                                        <p v-if="program.notes" class="text-xs text-gray-600 mt-1">{{ program.notes }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p v-else class="text-gray-500 text-center py-8">No program interests yet.</p>
                        </div>
                    </div>

                    <!-- Payment History -->
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6 bg-white border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>

                            <div class="space-y-4" v-if="user.payments.length">
                                <div v-for="payment in user.payments" :key="payment.id"
                                    class="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">{{ payment.program.title }}</p>
                                        <p class="text-xs text-gray-400">{{ formatDate(payment.created_at) }}</p>
                                        <p v-if="payment.paid_at" class="text-xs text-gray-400">Paid: {{
                                            formatDate(payment.paid_at) }}</p>
                                        <p v-if="payment.stripe_payment_intent_id" class="text-xs text-gray-500">
                                            ID: {{ payment.stripe_payment_intent_id }}
                                        </p>
                                        <p v-if="payment.notes" class="text-xs text-gray-600 mt-1">{{ payment.notes }}
                                        </p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm font-medium text-gray-900">{{ formatCurrency(payment.amount)
                                            }}</p>
                                        <span
                                            :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusBadgeClass(payment.status)]">
                                            {{ payment.status }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p v-else class="text-gray-500 text-center py-8">No payments yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
