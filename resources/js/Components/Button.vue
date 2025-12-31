<script setup>
import { computed } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary', // 'primary', 'secondary', 'danger', 'success', 'warning', 'ghost', 'link'
    },
    size: {
        type: String,
        default: 'md', // 'xs', 'sm', 'md', 'lg', 'xl'
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    block: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: String,
        default: 'md', // 'none', 'sm', 'md', 'lg', 'full'
    },
    leftIcon: {
        type: String,
        default: null,
    },
    rightIcon: {
        type: String,
        default: null,
    },
    as: {
        type: String,
        default: 'button',
    },
    href: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: 'button',
    },
});

const emit = defineEmits(['click']);

const isDisabled = computed(() => props.disabled || props.loading);

const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses = computed(() => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white border border-transparent focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500',
        success: 'bg-green-600 hover:bg-green-700 text-white border border-transparent focus:ring-green-500',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white border border-transparent focus:ring-yellow-500',
        ghost: 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500',
        link: 'bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-700 border-transparent focus:ring-blue-500 underline',
    };
    
    if (isDisabled.value) {
        return 'bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed';
    }
    
    return variants[props.variant] || variants.primary;
});

const sizeClasses = computed(() => {
    const sizes = {
        xs: 'px-2.5 py-1.5 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-4 py-2 text-base',
        xl: 'px-6 py-3 text-base',
    };
    
    return sizes[props.size] || sizes.md;
});

const roundedClasses = computed(() => {
    const rounded = {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };
    
    return rounded[props.rounded] || rounded.md;
});

const blockClasses = computed(() => {
    return props.block ? 'w-full' : '';
});

const buttonClasses = computed(() => {
    return [
        baseClasses,
        variantClasses.value,
        sizeClasses.value,
        roundedClasses.value,
        blockClasses.value,
    ].join(' ');
});

const handleClick = (event) => {
    if (!isDisabled.value) {
        emit('click', event);
    }
};
</script>

<template>
    <component
        :is="as"
        :href="as === 'a' ? href : undefined"
        :type="as === 'button' ? type : undefined"
        :disabled="isDisabled"
        :class="buttonClasses"
        @click="handleClick"
    >
        <!-- Left Icon -->
        <svg
            v-if="leftIcon && !loading"
            :class="[
                'h-4 w-4',
                $slots.default ? (size === 'xs' ? 'mr-1' : 'mr-2') : ''
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path :d="leftIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>

        <!-- Loading Spinner -->
        <LoadingSpinner
            v-if="loading"
            :size="size === 'xs' ? 'sm' : 'sm'"
            :color="variant === 'ghost' || variant === 'link' ? 'gray' : 'white'"
            :class="$slots.default ? (size === 'xs' ? 'mr-1' : 'mr-2') : ''"
        />

        <!-- Content -->
        <slot />

        <!-- Right Icon -->
        <svg
            v-if="rightIcon && !loading"
            :class="[
                'h-4 w-4',
                $slots.default ? (size === 'xs' ? 'ml-1' : 'ml-2') : ''
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path :d="rightIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
    </component>
</template> 