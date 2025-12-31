<script setup>
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    links: {
        type: Array,
        required: true,
    },
    meta: {
        type: Object,
        required: true,
    },
    showStats: {
        type: Boolean,
        default: true,
    },
});

const getPageNumber = (url) => {
    if (!url) return null;
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : 1;
};

const isCurrentPage = (link) => {
    return link.active;
};

const shouldShowLink = (link, index) => {
    // Always show first, last, prev, next
    if (index === 0 || index === props.links.length - 1) return true;
    
    // Show current page and adjacent pages
    return link.active || Math.abs(getPageNumber(link.url) - props.meta.current_page) <= 2;
};
</script>

<template>
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <!-- Mobile pagination -->
        <div class="flex-1 flex justify-between sm:hidden">
            <Link
                v-if="meta.prev_page_url"
                :href="meta.prev_page_url"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
                Previous
            </Link>
            <div v-else class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400">
                Previous
            </div>
            
            <Link
                v-if="meta.next_page_url"
                :href="meta.next_page_url"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
                Next
            </Link>
            <div v-else class="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400">
                Next
            </div>
        </div>

        <!-- Desktop pagination -->
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <!-- Stats -->
            <div v-if="showStats">
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ meta.from || 0 }}</span>
                    to
                    <span class="font-medium">{{ meta.to || 0 }}</span>
                    of
                    <span class="font-medium">{{ meta.total || 0 }}</span>
                    results
                </p>
            </div>

            <!-- Page links -->
            <div v-if="links && links.length > 3">
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <template v-for="(link, index) in links" :key="index">
                        <!-- Previous button -->
                        <Link
                            v-if="index === 0 && link.url"
                            :href="link.url"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                            aria-label="Previous page"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </Link>
                        <span
                            v-else-if="index === 0"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </span>

                        <!-- Next button -->
                        <Link
                            v-else-if="index === links.length - 1 && link.url"
                            :href="link.url"
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                            aria-label="Next page"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </Link>
                        <span
                            v-else-if="index === links.length - 1"
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </span>

                        <!-- Page numbers -->
                        <template v-else-if="shouldShowLink(link, index)">
                            <!-- Current page -->
                            <span
                                v-if="isCurrentPage(link)"
                                class="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600"
                                aria-current="page"
                            >
                                {{ link.label }}
                            </span>

                            <!-- Other pages -->
                            <Link
                                v-else-if="link.url"
                                :href="link.url"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                {{ link.label }}
                            </Link>
                        </template>

                        <!-- Ellipsis -->
                        <span
                            v-else-if="!shouldShowLink(link, index) && (
                                (index < links.length / 2 && getPageNumber(link.url) < meta.current_page - 2) ||
                                (index > links.length / 2 && getPageNumber(link.url) > meta.current_page + 2)
                            )"
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                            ...
                        </span>
                    </template>
                </nav>
            </div>
        </div>
    </div>
</template> 