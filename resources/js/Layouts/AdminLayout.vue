<script setup>
import BaseLayout from './BaseLayout.vue';

const navigationItems = [
    { label: 'Dashboard', route: 'admin.dashboard', active: 'admin.dashboard' },
    { label: 'Users', route: 'admin.users.index', active: 'admin.users.*' },
    // { label: 'Influencers', route: 'admin.influencers.index', active: 'admin.influencers.*' },
    { label: 'Programs', route: 'admin.programs.index', active: 'admin.programs.*' },
    { label: 'Referrals', route: 'admin.referrals.index', active: 'admin.referrals.*' },
    { label: 'Workshop Sessions', route: 'admin.workshop-sessions.index', active: 'admin.workshop-sessions.*' },
    { label: 'Training Camp Sessions', route: 'admin.training-camp-sessions.index', active: 'admin.training-camp-sessions.*' },
    { label: 'Registrations', route: 'admin.registrations.index', active: 'admin.registrations.*' },
    { label: 'Discount Codes', route: 'admin.discount-codes.index', active: 'admin.discount-codes.*' },
    { label: 'Payments', route: 'admin.payments.index', active: 'admin.payments.*' },
];

const dropdownItems = [
    { label: 'Main Site', route: 'admin.dashboard' },
    { label: 'Log Out', route: 'logout', method: 'post', as: 'button' },
];
</script>

<template>
    <BaseLayout
        variant="admin"
        logo-route="admin.dashboard"
        logo-src="/images/logo.svg"
        logo-alt="NY Empire Academy"
        title="Admin Panel LIVE"
        :navigation-items="navigationItems"
        :dropdown-items="dropdownItems"
    >
        <template #header v-if="$slots.header">
            <slot name="header" />
        </template>
        
        <slot />
    </BaseLayout>
</template> 