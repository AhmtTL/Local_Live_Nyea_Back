<script setup>
import { useAdminLayout } from "@/Composables/useAdminLayout";
import { Head, Link, router } from "@inertiajs/vue3";
import { useServerSearch } from "@/Composables/useServerSearch";

const props = defineProps({
    sessions: Object,
    filters: Object,
});

// Use the reusable server search composable
const { filters, isLoading } = useServerSearch(
    "admin.workshop-sessions.index",
    props.filters
);
const { Layout } = useAdminLayout();

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const formatDateRange = (session) => {
    if (session.start_date && session.end_date) {
        return `${formatDate(session.start_date)} - ${formatDate(
            session.end_date
        )}`;
    }
    return formatDate(session.date);
};

const getUrgencyClass = (session) => {
    if (!session.is_active) return "bg-gray-100 text-gray-800 border-gray-200";
    if (session.remaining_spots <= 5)
        return "bg-red-100 text-red-800 border-red-200";
    if (session.remaining_spots <= 10)
        return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-green-100 text-green-800 border-green-200";
};

const getUrgencyText = (session) => {
    if (!session.is_active) return "📝 DRAFT";
    if (session.remaining_spots <= 5) return "🔥 CRITICAL";
    if (session.remaining_spots <= 10) return "⚡ HIGH DEMAND";
    return "✅ AVAILABLE";
};

const deleteSession = (sessionId) => {
    if (confirm("Are you sure you want to delete this workshop session?")) {
        router.delete(route("admin.workshop-sessions.destroy", sessionId));
    }
};

const duplicateSession = (sessionId) => {
    if (
        confirm(
            "Are you sure you want to duplicate this workshop session? A copy will be created with updated details."
        )
    ) {
        router.post(route("admin.workshop-sessions.duplicate", sessionId));
    }
};

const togglePublish = (sessionId, currentStatus) => {
    const action = currentStatus ? "send to draft" : "publish";
    if (confirm(`Are you sure you want to ${action} this workshop session?`)) {
        router.post(route("admin.workshop-sessions.toggle-publish", sessionId));
    }
};
</script>

<template>
    <Head title="Workshop Sessions Management" />

    <component :is="Layout">
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900">
                                    Workshop Sessions
                                </h2>
                                <p class="text-gray-600 mt-1">
                                    Manage workshop sessions across multiple
                                    locations
                                </p>
                            </div>
                            <Link
                                :href="route('admin.workshop-sessions.create')"
                                class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                <svg
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 4v16m8-8H4"
                                    ></path>
                                </svg>
                                Add New Session
                            </Link>
                        </div>

                        <!-- Search -->
                        <div class="mb-6">
                            <input
                                v-model="filters.search"
                                type="text"
                                placeholder="Search by location, city, country, or workshop name..."
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <!-- Sessions Table -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Workshop
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Program Type
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            School
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Location
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Availability
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                >
                                    <tr
                                        v-for="session in sessions.data"
                                        :key="session.id"
                                        class="hover:bg-gray-50"
                                    >
                                        <Link
                                            :href="
                                                route(
                                                    'admin.workshop-sessions.show',
                                                    session.id
                                                )
                                            "
                                        >
                                            <td class="px-6 py-4">
                                                <div
                                                    class="text-sm font-medium text-gray-900"
                                                >
                                                    {{ session.program?.title }}
                                                </div>
                                                <div
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{ session.program?.slug }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-600 mt-1"
                                                >
                                                    📅
                                                    {{
                                                        formatDateRange(session)
                                                    }}
                                                    • {{ session.time }}
                                                </div>
                                            </td>
                                        </Link>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                v-if="
                                                    session.program_type ===
                                                    'mastery'
                                                "
                                                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                                            >
                                                👑 Mastery
                                            </span>
                                            <span
                                                v-else
                                                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200"
                                            >
                                                ⚡ Essentials
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                v-if="session.school"
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                🏫 {{ session.school.name }}
                                            </div>
                                            <div
                                                v-else
                                                class="text-sm text-gray-400 italic"
                                            >
                                                No school assigned
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                {{ session.location }}
                                            </div>
                                            <div
                                                v-if="session.venue_name"
                                                class="text-sm text-gray-500"
                                            >
                                                {{ session.venue_name }}
                                            </div>
                                            <div
                                                v-if="
                                                    session.city ||
                                                    session.country
                                                "
                                                class="text-xs text-gray-400"
                                            >
                                                {{
                                                    [
                                                        session.city,
                                                        session.country,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(", ")
                                                }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                {{
                                                    session.available_spots -
                                                    session.booked_spots
                                                }}/{{
                                                    session.available_spots
                                                }}
                                                available
                                            </div>
                                            <div
                                                class="w-full bg-gray-200 rounded-full h-2 mt-1"
                                            >
                                                <div
                                                    :class="`h-2 rounded-full ${
                                                        session.remaining_spots <=
                                                        5
                                                            ? 'bg-red-500'
                                                            : session.remaining_spots <=
                                                              10
                                                            ? 'bg-orange-500'
                                                            : 'bg-green-500'
                                                    }`"
                                                    :style="{
                                                        width: `${
                                                            (session.booked_spots /
                                                                session.available_spots) *
                                                            100
                                                        }%`,
                                                    }"
                                                ></div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyClass(
                                                    session
                                                )}`"
                                            >
                                                {{ getUrgencyText(session) }}
                                            </span>
                                            <div
                                                v-if="session.is_featured"
                                                class="mt-1"
                                            >
                                                <span
                                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                >
                                                    ⭐ Featured
                                                </span>
                                            </div>
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                        >
                                            <div
                                                class="flex items-center justify-end space-x-2"
                                            >
                                                <button
                                                    @click="
                                                        togglePublish(
                                                            session.id,
                                                            session.is_active
                                                        )
                                                    "
                                                    :class="
                                                        session.is_active
                                                            ? 'text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100'
                                                            : 'text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100'
                                                    "
                                                    class="px-3 py-1 rounded transition-colors text-sm font-medium"
                                                    :title="
                                                        session.is_active
                                                            ? 'Send to draft'
                                                            : 'Publish session'
                                                    "
                                                >
                                                    {{
                                                        session.is_active
                                                            ? "📝 Send to Draft"
                                                            : "📢 Publish"
                                                    }}
                                                </button>
                                                <Link
                                                    :href="
                                                        route(
                                                            'admin.workshop-sessions.show',
                                                            session.id
                                                        )
                                                    "
                                                    class="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    :href="
                                                        route(
                                                            'admin.workshop-sessions.edit',
                                                            session.id
                                                        )
                                                    "
                                                    class="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    @click="
                                                        duplicateSession(
                                                            session.id
                                                        )
                                                    "
                                                    class="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-sm"
                                                    title="Duplicate this session"
                                                >
                                                    Duplicate
                                                </button>
                                                <button
                                                    @click="
                                                        deleteSession(
                                                            session.id
                                                        )
                                                    "
                                                    class="text-red-600 hover:text-red-800 bg-gray-100 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div v-if="sessions.links" class="mt-6">
                            <nav class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <p class="text-sm text-gray-700">
                                        Showing {{ sessions.from }} to
                                        {{ sessions.to }} of
                                        {{ sessions.total }} results
                                    </p>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <template
                                        v-for="link in sessions.links"
                                        :key="link.label"
                                    >
                                        <Link
                                            v-if="link.url"
                                            :href="link.url"
                                            :class="`px-3 py-2 text-sm rounded-md transition-colors ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                            }`"
                                        >
                                            <span v-html="link.label"></span>
                                        </Link>
                                        <span
                                            v-else
                                            v-html="link.label"
                                            class="px-3 py-2 text-sm rounded-md text-gray-300 cursor-not-allowed"
                                        />
                                    </template>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
