<script setup>
import { useAdminLayout } from "@/Composables/useAdminLayout";
import { Head, Link, router } from "@inertiajs/vue3";

const props = defineProps({
    session: Object,
});

const { Layout } = useAdminLayout();

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
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

const getUrgencyClass = (urgencyLevel) => {
    switch (urgencyLevel) {
        case "critical":
            return "bg-red-100 text-red-800 border-red-200";
        case "high":
            return "bg-orange-100 text-orange-800 border-orange-200";
        default:
            return "bg-green-100 text-green-800 border-green-200";
    }
};

const getUrgencyText = (session) => {
    if (session.remaining_spots <= 5) return "CRITICAL";
    if (session.remaining_spots <= 10) return "HIGH DEMAND";
    return "AVAILABLE";
};

const togglePublish = () => {
    const action = props.session.is_active ? "send to draft" : "publish";
    if (
        confirm(
            `Are you sure you want to ${action} this training camp session?`
        )
    ) {
        router.post(
            route(
                "admin.training-camp-sessions.toggle-publish",
                props.session.id
            )
        );
    }
};

const getAvailabilityStatus = () => {
    if (!props.session.is_active) return "DRAFT";
    if (props.session.remaining_spots <= 5) return "CRITICAL";
    if (props.session.remaining_spots <= 10) return "HIGH DEMAND";
    return "AVAILABLE";
};

const getAvailabilityClass = () => {
    if (!props.session.is_active)
        return "bg-gray-100 text-gray-800 border-gray-200";
    if (props.session.remaining_spots <= 5)
        return "bg-red-100 text-red-800 border-red-200";
    if (props.session.remaining_spots <= 10)
        return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-green-100 text-green-800 border-green-200";
};
</script>

<template>
    <Head title="Training Camp Session Details" />

    <component :is="Layout">
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900">
                                    Training Camp Session Details
                                </h2>
                                <p class="text-gray-600 mt-1">
                                    🏕️ {{ session.program?.title }}
                                </p>
                            </div>
                            <div class="flex items-center space-x-3">
                                <button
                                    @click="togglePublish"
                                    :class="
                                        session.is_active
                                            ? 'text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200'
                                            : 'text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 border border-green-200'
                                    "
                                    class="px-4 py-2 rounded-lg transition-colors font-medium"
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
                                            'admin.training-camp-sessions.edit',
                                            session.id
                                        )
                                    "
                                    class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                >
                                    Edit Session
                                </Link>
                                <Link
                                    :href="
                                        route(
                                            'admin.training-camp-sessions.index'
                                        )
                                    "
                                    class="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors"
                                >
                                    ← Back to Sessions
                                </Link>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <!-- Main Information -->
                            <div class="lg:col-span-2 space-y-6">
                                <!-- Location Details -->
                                <div
                                    class="bg-orange-50 border border-orange-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-orange-900 mb-4"
                                    >
                                        ⛰️ Location Details
                                    </h3>
                                    <div class="space-y-3">
                                        <div>
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                                >Location</label
                                            >
                                            <div
                                                class="text-lg font-semibold text-gray-900"
                                            >
                                                {{ session.location }}
                                            </div>
                                        </div>
                                        <div v-if="session.venue_name">
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                                >Venue</label
                                            >
                                            <div class="text-gray-900">
                                                {{ session.venue_name }}
                                            </div>
                                        </div>
                                        <div
                                            v-if="
                                                session.city || session.country
                                            "
                                        >
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                                >City & Country</label
                                            >
                                            <div class="text-gray-900">
                                                {{
                                                    [
                                                        session.city,
                                                        session.country,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(", ")
                                                }}
                                            </div>
                                        </div>
                                        <div v-if="session.venue_address">
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                                >Address</label
                                            >
                                            <div class="text-gray-900">
                                                {{ session.venue_address }}
                                            </div>
                                        </div>
                                        <div v-if="session.school">
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                                >Associated School</label
                                            >
                                            <div
                                                class="text-gray-900 flex items-center"
                                            >
                                                🏫 {{ session.school.name }}
                                            </div>
                                        </div>
                                        <div v-if="session.organization_logo">
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                                >Organization Logo</label
                                            >
                                            <div class="mt-2">
                                                <img
                                                    :src="
                                                        session.organization_logo
                                                    "
                                                    alt="Organization Logo"
                                                    class="h-16 w-16 object-contain border border-gray-300 rounded-lg bg-white p-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Location Highlights -->
                                    <div
                                        v-if="
                                            session.location_highlights &&
                                            session.location_highlights.length >
                                                0
                                        "
                                        class="mt-4"
                                    >
                                        <label
                                            class="text-sm font-medium text-gray-700 mb-2 block"
                                            >Location Highlights</label
                                        >
                                        <div class="flex flex-wrap gap-2">
                                            <span
                                                v-for="highlight in session.location_highlights"
                                                :key="highlight"
                                                class="inline-flex items-center bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full border border-orange-200"
                                            >
                                                ✨ {{ highlight }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Schedule -->
                                <div
                                    class="bg-green-50 border border-green-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-green-900 mb-4"
                                    >
                                        📅 Schedule
                                    </h3>
                                    <div
                                        class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        <div class="md:col-span-2">
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                            >
                                                {{
                                                    session.start_date &&
                                                    session.end_date
                                                        ? "Date Range"
                                                        : "Date"
                                                }}
                                            </label>
                                            <div
                                                class="text-lg font-semibold text-gray-900"
                                            >
                                                {{ formatDateRange(session) }}
                                            </div>
                                        </div>
                                        <!-- <div>
                                            <label class="text-sm font-medium text-gray-700">Time</label>
                                            <div class="text-gray-900">{{ session.time }}</div>
                                        </div> -->
                                        <div v-if="session.timezone">
                                            <label
                                                class="text-sm font-medium text-gray-700"
                                                >Timezone</label
                                            >
                                            <div class="text-gray-900">
                                                {{ session.timezone }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Special Notes -->
                                <div
                                    v-if="session.special_notes"
                                    class="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-yellow-900 mb-4"
                                    >
                                        📝 Special Notes
                                    </h3>
                                    <div class="text-gray-900">
                                        {{ session.special_notes }}
                                    </div>
                                </div>
                            </div>

                            <!-- Sidebar -->
                            <div class="space-y-6">
                                <!-- Program Type -->
                                <div
                                    class="bg-white border border-gray-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-gray-900 mb-4"
                                    >
                                        Program Type
                                    </h3>
                                    <div class="flex justify-center">
                                        <span
                                            v-if="
                                                session.program_type ===
                                                'mastery'
                                            "
                                            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                                        >
                                            👑 Mastery Program
                                        </span>
                                        <span
                                            v-else
                                            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200"
                                        >
                                            ⚡ Essentials Program
                                        </span>
                                    </div>
                                </div>

                                <!-- Status -->
                                <div
                                    class="bg-white border border-gray-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-gray-900 mb-4"
                                    >
                                        Status
                                    </h3>
                                    <div class="space-y-3">
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Active</span
                                            >
                                            <span
                                                :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    session.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`"
                                            >
                                                {{
                                                    session.is_active
                                                        ? "Published"
                                                        : "Draft"
                                                }}
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Featured</span
                                            >
                                            <span
                                                :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    session.is_featured
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`"
                                            >
                                                {{
                                                    session.is_featured
                                                        ? "Yes"
                                                        : "No"
                                                }}
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Availability</span
                                            >
                                            <span
                                                :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityClass()}`"
                                            >
                                                {{ getAvailabilityStatus() }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Capacity -->
                                <div
                                    class="bg-white border border-gray-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-gray-900 mb-4"
                                    >
                                        Capacity
                                    </h3>
                                    <div class="space-y-3">
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Available Spots</span
                                            >
                                            <span
                                                class="font-semibold text-gray-900"
                                                >{{
                                                    session.available_spots
                                                }}</span
                                            >
                                        </div>
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Booked</span
                                            >
                                            <span
                                                class="font-semibold text-gray-900"
                                                >{{
                                                    session.booked_spots
                                                }}</span
                                            >
                                        </div>
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Remaining</span
                                            >
                                            <span
                                                :class="`font-semibold ${
                                                    session.remaining_spots <= 5
                                                        ? 'text-red-600'
                                                        : session.remaining_spots <=
                                                          10
                                                        ? 'text-orange-600'
                                                        : 'text-green-600'
                                                }`"
                                            >
                                                {{ session.remaining_spots }}
                                            </span>
                                        </div>
                                        <div
                                            class="w-full bg-gray-200 rounded-full h-3 mt-2"
                                        >
                                            <div
                                                :class="`h-3 rounded-full transition-all duration-300 ${
                                                    session.remaining_spots <= 5
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
                                    </div>
                                </div>

                                <!-- Pricing -->
                                <div
                                    class="bg-white border border-gray-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-gray-900 mb-4"
                                    >
                                        Pricing
                                    </h3>
                                    <div class="space-y-3">
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Session Price</span
                                            >
                                            <span
                                                class="font-semibold text-gray-900"
                                                >{{
                                                    session.formatted_effective_price
                                                }}</span
                                            >
                                        </div>
                                        <div
                                            v-if="session.program?.base_price"
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Base Price</span
                                            >
                                            <span class="text-gray-700"
                                                >${{
                                                    session.program.base_price
                                                }}</span
                                            >
                                        </div>
                                        <div
                                            v-if="
                                                session.price_difference !== 0
                                            "
                                            class="flex items-center justify-between"
                                        >
                                            <span class="text-gray-600"
                                                >Price Difference</span
                                            >
                                            <span
                                                :class="`font-medium ${
                                                    session.price_difference > 0
                                                        ? 'text-purple-600'
                                                        : 'text-green-600'
                                                }`"
                                            >
                                                {{
                                                    session.price_difference > 0
                                                        ? "+"
                                                        : ""
                                                }}${{
                                                    Math.abs(
                                                        session.price_difference
                                                    )
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Actions -->
                                <div
                                    class="bg-white border border-gray-200 rounded-lg p-6"
                                >
                                    <h3
                                        class="text-lg font-semibold text-gray-900 mb-4"
                                    >
                                        Actions
                                    </h3>
                                    <div class="space-y-3">
                                        <Link
                                            :href="
                                                route(
                                                    'admin.training-camp-sessions.duplicate',
                                                    session.id
                                                )
                                            "
                                            method="post"
                                            class="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium rounded-lg transition-colors"
                                        >
                                            📋 Duplicate Session
                                        </Link>
                                        <button
                                            @click="togglePublish"
                                            :class="
                                                session.is_active
                                                    ? 'bg-orange-100 hover:bg-orange-200 text-orange-800'
                                                    : 'bg-green-100 hover:bg-green-200 text-green-800'
                                            "
                                            class="w-full px-4 py-2 font-medium rounded-lg transition-colors"
                                        >
                                            {{
                                                session.is_active
                                                    ? "📝 Send to Draft"
                                                    : "📢 Publish Session"
                                            }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
