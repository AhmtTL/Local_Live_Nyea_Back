<script setup>
import BaseLayout from "./BaseLayout.vue";

const navigationItems = [
    {
        label: "Registrations",
        route: "admin.registrations.index",
        active: "admin.registrations.*",
    },
];

const dropdownItems = [
    { label: "Log Out", route: "logout", method: "post", as: "button" },
];
</script>

<template>
    <BaseLayout
        variant="admin"
        logo-route="admin.registrations.index"
        logo-src="/images/logo.svg"
        logo-alt="NY Empire Academy"
        title="School Portal"
        :navigation-items="navigationItems"
        :dropdown-items="dropdownItems"
    >
        <template #header v-if="$slots.header">
            <slot name="header" />
        </template>

        <slot />
    </BaseLayout>
</template>
