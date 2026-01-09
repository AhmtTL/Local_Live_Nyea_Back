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
            `Are you sure you want to ${action} this resource session?`
        )
    ) {
        router.post(
            route(
                "admin.resource-sessions.toggle-publish",
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
  <Head title="Resource Session Details" />
  <component :is="Layout">
    <div class="py-12">
      <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Resource Session Details</h2>
              <Link
                :href="route('admin.resource-sessions.index')"
                class="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >← Back to Sessions</Link
              >
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div class="font-semibold">Title:</div>
                <div>{{ props.session.title }}</div>
              </div>
              <div>
                <div class="font-semibold">Location:</div>
                <div>{{ props.session.location }}</div>
              </div>
              <div>
                <div class="font-semibold">Date:</div>
                <div>{{ props.session.date }}</div>
              </div>
              <div>
                <div class="font-semibold">Available Spots:</div>
                <div>{{ props.session.available_spots }}</div>
              </div>
              <div>
                <div class="font-semibold">Status:</div>
                <div
                  :class="
                    getAvailabilityClass()
                  "
                >
                  {{ getAvailabilityStatus() }}
                </div>
              </div>
              <div>
                <div class="font-semibold">Urgency:</div>
                <div
                  :class="
                    getUrgencyClass(getUrgencyText(props.session))
                  "
                >
                  {{ getUrgencyText(props.session) }}
                </div>
              </div>
            </div>
            <div class="mt-6">
              <button
                @click="togglePublish"
                class="px-4 py-2 rounded-lg transition-all"
                :class="
                  props.session.is_active
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                "
              >
                {{ props.session.is_active ? 'Send to Draft' : 'Publish' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </component>
</template>
