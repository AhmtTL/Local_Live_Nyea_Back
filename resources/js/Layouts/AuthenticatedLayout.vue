<script setup>
import BaseLayout from './BaseLayout.vue';

const navigationItems = [
    { label: 'Dashboard', route: 'dashboard' },
];
</script>

<template>
    <BaseLayout
        variant="authenticated"
        logo-route="dashboard"
        :navigation-items="navigationItems"
    >
        <template #header v-if="$slots.header">
            <slot name="header" />
        </template>
        
        <slot />
    </BaseLayout>
</template>
