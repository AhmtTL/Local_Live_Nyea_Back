<script setup>
import { useAdminLayout } from "@/Composables/useAdminLayout";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, useForm, Link, router } from "@inertiajs/vue3";
import { ref, computed } from "vue";

const props = defineProps({
    session: Object,
    trainingCamps: Array,
    schools: Array,
});

const { Layout } = useAdminLayout();

const form = useForm({
    program_id: props.session.program_id,
    program_type: props.session.program_type || "none",
    school_id: props.session.school_id || "",
    new_school_name: "",
    location: props.session.location,
    city: props.session.city || "",
    country: props.session.country || "",
    country_code: props.session.country_code || "",
    venue_name: props.session.venue_name || "",
    organization_logo: props.session.organization_logo || "",
    venue_address: props.session.venue_address || "",
    location_highlights: props.session.location_highlights || [],
    date: props.session.date
        ? new Date(props.session.date).toISOString().split("T")[0]
        : "",
    start_date: props.session.start_date
        ? new Date(props.session.start_date).toISOString().split("T")[0]
        : "",
    end_date: props.session.end_date
        ? new Date(props.session.end_date).toISOString().split("T")[0]
        : "",
    // time: props.session.time,
    timezone: props.session.timezone || "",
    available_spots: props.session.available_spots,
    booked_spots: props.session.booked_spots,
    // price_override: props.session.price_override || '',

    is_active: props.session.is_active,
    is_featured: props.session.is_featured,
    special_notes: props.session.special_notes || "",
    metadata: props.session.metadata || {},
});

const newHighlight = ref("");
const logoUploading = ref(false);
const logoPreview = ref(props.session.organization_logo || "");

const addHighlight = () => {
    if (newHighlight.value.trim()) {
        form.location_highlights.push(newHighlight.value.trim());
        newHighlight.value = "";
    }
};

const removeHighlight = (index) => {
    form.location_highlights.splice(index, 1);
};

const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    logoUploading.value = true;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "organization");

    try {
        const response = await fetch("/admin/images/upload", {
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
        });

        const result = await response.json();

        if (result.success) {
            form.organization_logo = result.data.url;
            logoPreview.value = result.data.url;
        } else {
            alert("Logo upload failed: " + result.message);
        }
    } catch (error) {
        alert("Logo upload failed: " + error.message);
    } finally {
        logoUploading.value = false;
    }
};

const removeLogo = () => {
    form.organization_logo = "";
    logoPreview.value = "";
};

// Clear new school name when existing school is selected
const clearNewSchoolWhenExistingSelected = () => {
    if (form.school_id) {
        form.new_school_name = "";
    }
};

// Clear school selection when new school name is entered
const clearSchoolWhenNewNameEntered = () => {
    if (form.new_school_name.trim()) {
        form.school_id = "";
    }
};

const submit = () => {
    form.put(route("admin.training-camp-sessions.update", props.session.id));
};

const selectedTrainingCamp = computed(() => {
    return props.trainingCamps.find((t) => t.id === parseInt(form.program_id));
});

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
</script>

<template>
    <Head title="Edit Training Camp Session" />

    <component :is="Layout">
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900">
                                    Edit Training Camp Session
                                </h2>
                                <p class="text-gray-600 mt-1">
                                    {{ session.location }} -
                                    {{ session.program?.title }}
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
                                            'admin.training-camp-sessions.index'
                                        )
                                    "
                                    class="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors"
                                >
                                    ← Back to Sessions
                                </Link>
                            </div>
                        </div>

                        <form @submit.prevent="submit" class="space-y-8">
                            <!-- Training Camp Selection -->
                            <div
                                class="bg-orange-50 border border-orange-200 rounded-lg p-6"
                            >
                                <h3
                                    class="text-lg font-semibold text-orange-900 mb-4"
                                >
                                    🏕️ Training Camp Selection
                                </h3>
                                <div>
                                    <InputLabel
                                        for="program_id"
                                        value="Training Camp Program"
                                    />
                                    <select
                                        id="program_id"
                                        v-model="form.program_id"
                                        class="mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">
                                            Choose a training camp...
                                        </option>
                                        <option
                                            v-for="camp in trainingCamps"
                                            :key="camp.id"
                                            :value="camp.id"
                                        >
                                            {{ camp.title }} (Base: ${{
                                                camp.base_price
                                            }})
                                        </option>
                                    </select>
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.program_id"
                                    />
                                </div>
                            </div>

                            <!-- Program Type Selection -->
                            <!-- <div class="bg-amber-50 border border-amber-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-amber-900 mb-4">👑 Program Type</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel for="program_type" value="Program Type *" />
                                        <select id="program_type" v-model="form.program_type"
                                            class="mt-1 block w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm"
                                            required>
                                            <option value="essentials">⚡ Essentials Program</option>
                                            <option value="mastery">👑 Mastery Program</option>
                                        </select>
                                        <InputError class="mt-2" :message="form.errors.program_type" />
                                        <div class="mt-1 text-xs text-gray-600">
                                            <span v-if="form.program_type === 'essentials'">Standard program with core
                                                content</span>
                                            <span v-if="form.program_type === 'mastery'">Premium program with extended
                                                content and coaching - Set direct price below</span>
                                        </div>
                                    </div>


                                </div>
                            </div> -->

                            <!-- School Selection -->
                            <div
                                class="bg-indigo-50 border border-indigo-200 rounded-lg p-6"
                            >
                                <h3
                                    class="text-lg font-semibold text-indigo-900 mb-4"
                                >
                                    🏫 School Selection
                                </h3>
                                <div class="grid grid-cols-1 gap-4">
                                    <div>
                                        <InputLabel
                                            for="school_id"
                                            value="Select School (Optional)"
                                        />
                                        <select
                                            id="school_id"
                                            v-model="form.school_id"
                                            @change="
                                                clearNewSchoolWhenExistingSelected
                                            "
                                            class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        >
                                            <option value="">
                                                Select an existing school...
                                            </option>
                                            <option
                                                v-for="school in schools"
                                                :key="school.id"
                                                :value="school.id"
                                            >
                                                {{ school.name }}
                                            </option>
                                        </select>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.school_id"
                                        />
                                        <div class="mt-1 text-xs text-gray-600">
                                            Choose from existing schools or
                                            create a new one below
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="new_school_name"
                                            value="Or Create New School"
                                        />
                                        <TextInput
                                            id="new_school_name"
                                            v-model="form.new_school_name"
                                            type="text"
                                            @input="
                                                clearSchoolWhenNewNameEntered
                                            "
                                            class="mt-1 block w-full"
                                            placeholder="e.g., Mountain Adventure Academy"
                                            :disabled="!!form.school_id"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="
                                                form.errors.new_school_name
                                            "
                                        />
                                        <div class="mt-1 text-xs text-gray-600">
                                            <span v-if="form.school_id"
                                                >Clear the school selection
                                                above to create a new
                                                school</span
                                            >
                                            <span v-else
                                                >Enter a new school name to
                                                create it automatically</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Location Details -->
                            <div
                                class="bg-green-50 border border-green-200 rounded-lg p-6"
                            >
                                <h3
                                    class="text-lg font-semibold text-green-900 mb-4"
                                >
                                    ⛰️ Location Details
                                </h3>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div>
                                        <InputLabel
                                            for="location"
                                            value="Location Name *"
                                        />
                                        <TextInput
                                            id="location"
                                            v-model="form.location"
                                            type="text"
                                            class="mt-1 block w-full"
                                            required
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.location"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel for="city" value="City" />
                                        <TextInput
                                            id="city"
                                            v-model="form.city"
                                            type="text"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.city"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="country"
                                            value="Country"
                                        />
                                        <TextInput
                                            id="country"
                                            v-model="form.country"
                                            type="text"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.country"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="country_code"
                                            value="Country Code"
                                        />
                                        <TextInput
                                            id="country_code"
                                            v-model="form.country_code"
                                            type="text"
                                            class="mt-1 block w-full"
                                            maxlength="3"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.country_code"
                                        />
                                    </div>

                                    <div class="md:col-span-2">
                                        <InputLabel
                                            for="venue_name"
                                            value="Venue Name"
                                        />
                                        <TextInput
                                            id="venue_name"
                                            v-model="form.venue_name"
                                            type="text"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.venue_name"
                                        />
                                    </div>

                                    <div class="md:col-span-2">
                                        <InputLabel
                                            for="venue_address"
                                            value="Venue Address"
                                        />
                                        <textarea
                                            id="venue_address"
                                            v-model="form.venue_address"
                                            class="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                            rows="2"
                                        ></textarea>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.venue_address"
                                        />
                                    </div>

                                    <!-- Organization Logo Upload -->
                                    <div class="md:col-span-2">
                                        <InputLabel
                                            for="organization_logo"
                                            value="Organization Logo"
                                        />
                                        <div class="mt-2 space-y-3">
                                            <!-- Current Logo Preview -->
                                            <div
                                                v-if="logoPreview"
                                                class="flex items-center space-x-4"
                                            >
                                                <div class="flex-shrink-0">
                                                    <img
                                                        :src="logoPreview"
                                                        alt="Organization Logo"
                                                        class="h-16 w-16 object-contain border border-gray-300 rounded-lg bg-white p-2"
                                                    />
                                                </div>
                                                <div class="flex-1">
                                                    <p
                                                        class="text-sm text-gray-600"
                                                    >
                                                        Current organization
                                                        logo
                                                    </p>
                                                    <button
                                                        type="button"
                                                        @click="removeLogo"
                                                        class="mt-1 text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove Logo
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- Upload Button -->
                                            <div
                                                class="flex items-center space-x-4"
                                            >
                                                <label
                                                    for="logo_upload"
                                                    class="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    :class="{
                                                        'opacity-50':
                                                            logoUploading,
                                                    }"
                                                >
                                                    <span v-if="logoUploading"
                                                        >🔄 Uploading...</span
                                                    >
                                                    <span v-else
                                                        >📁
                                                        {{
                                                            logoPreview
                                                                ? "Change Logo"
                                                                : "Upload Logo"
                                                        }}</span
                                                    >
                                                </label>
                                                <input
                                                    id="logo_upload"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml"
                                                    @change="handleLogoUpload"
                                                    class="hidden"
                                                    :disabled="logoUploading"
                                                />
                                                <div
                                                    class="text-xs text-gray-500"
                                                >
                                                    Max 2MB • JPEG, PNG, SVG,
                                                    WebP supported<br />
                                                    Images are automatically
                                                    resized to 64x64px
                                                </div>
                                            </div>
                                        </div>
                                        <InputError
                                            class="mt-2"
                                            :message="
                                                form.errors.organization_logo
                                            "
                                        />
                                    </div>
                                </div>

                                <!-- Location Highlights -->
                                <div class="mt-6">
                                    <InputLabel value="Location Highlights" />
                                    <div class="mt-2 space-y-2">
                                        <div class="flex gap-2">
                                            <TextInput
                                                v-model="newHighlight"
                                                type="text"
                                                class="flex-1"
                                                placeholder="e.g., Mountain Views, Adventure Activities"
                                                @keyup.enter="addHighlight"
                                            />
                                            <button
                                                type="button"
                                                @click="addHighlight"
                                                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div
                                            v-if="
                                                form.location_highlights
                                                    .length > 0
                                            "
                                            class="flex flex-wrap gap-2"
                                        >
                                            <span
                                                v-for="(
                                                    highlight, index
                                                ) in form.location_highlights"
                                                :key="index"
                                                class="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full border border-green-200"
                                            >
                                                ✨ {{ highlight }}
                                                <button
                                                    type="button"
                                                    @click="
                                                        removeHighlight(index)
                                                    "
                                                    class="ml-2 text-green-600 hover:text-green-800"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Schedule & Capacity -->
                            <div
                                class="bg-orange-50 border border-orange-200 rounded-lg p-6"
                            >
                                <h3
                                    class="text-lg font-semibold text-orange-900 mb-4"
                                >
                                    📅 Schedule & Capacity
                                </h3>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div>
                                        <InputLabel
                                            for="date"
                                            value="Primary Date *"
                                        />
                                        <TextInput
                                            id="date"
                                            v-model="form.date"
                                            type="date"
                                            class="mt-1 block w-full"
                                            required
                                        />
                                        <div class="mt-1 text-xs text-gray-600">
                                            Main session date for listings
                                        </div>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.date"
                                        />
                                    </div>

                                    <!-- <div>
                                        <InputLabel for="time" value="Time *" />
                                        <TextInput id="time" v-model="form.time" type="text" class="mt-1 block w-full"
                                            required />
                                        <InputError class="mt-2" :message="form.errors.time" />
                                    </div> -->

                                    <div>
                                        <InputLabel
                                            for="start_date"
                                            value="Start Date (Optional)"
                                        />
                                        <TextInput
                                            id="start_date"
                                            v-model="form.start_date"
                                            type="date"
                                            class="mt-1 block w-full"
                                        />
                                        <div class="mt-1 text-xs text-gray-600">
                                            For multi-day camps
                                        </div>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.start_date"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="end_date"
                                            value="End Date (Optional)"
                                        />
                                        <TextInput
                                            id="end_date"
                                            v-model="form.end_date"
                                            type="date"
                                            class="mt-1 block w-full"
                                        />
                                        <div class="mt-1 text-xs text-gray-600">
                                            For multi-day camps
                                        </div>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.end_date"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="timezone"
                                            value="Timezone"
                                        />
                                        <TextInput
                                            id="timezone"
                                            v-model="form.timezone"
                                            type="text"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.timezone"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="available_spots"
                                            value="Available Spots *"
                                        />
                                        <TextInput
                                            id="available_spots"
                                            v-model="form.available_spots"
                                            type="number"
                                            min="1"
                                            class="mt-1 block w-full"
                                            required
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="
                                                form.errors.available_spots
                                            "
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="booked_spots"
                                            value="Booked Spots"
                                        />
                                        <TextInput
                                            id="booked_spots"
                                            v-model="form.booked_spots"
                                            type="number"
                                            min="0"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.booked_spots"
                                        />
                                    </div>

                                    <!-- <div>
                                        <InputLabel for="price_override" value="Session Price Override" />
                                        <TextInput id="price_override" v-model="form.price_override" type="number"
                                            step="0.01" min="0" class="mt-1 block w-full" />
                                        <div class="mt-1 text-xs text-gray-600">
                                            Leave empty to use training camp base price
                                        </div>
                                        <InputError class="mt-2" :message="form.errors.price_override" />
                                    </div> -->
                                </div>
                            </div>

                            <!-- Additional Settings -->
                            <div
                                class="bg-purple-50 border border-purple-200 rounded-lg p-6"
                            >
                                <h3
                                    class="text-lg font-semibold text-purple-900 mb-4"
                                >
                                    ⚙️ Additional Settings
                                </h3>

                                <div class="space-y-4">
                                    <div>
                                        <InputLabel
                                            for="special_notes"
                                            value="Special Notes"
                                        />
                                        <textarea
                                            id="special_notes"
                                            v-model="form.special_notes"
                                            class="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            rows="3"
                                        ></textarea>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.special_notes"
                                        />
                                    </div>

                                    <div class="flex items-center space-x-6">
                                        <label class="flex items-center">
                                            <input
                                                v-model="form.is_active"
                                                type="checkbox"
                                                class="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                                            />
                                            <span
                                                class="ml-2 text-sm text-gray-700"
                                                >Active Session</span
                                            >
                                        </label>

                                        <label class="flex items-center">
                                            <input
                                                v-model="form.is_featured"
                                                type="checkbox"
                                                class="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                                            />
                                            <span
                                                class="ml-2 text-sm text-gray-700"
                                                >Featured Session</span
                                            >
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit -->
                            <div
                                class="flex items-center justify-end space-x-4"
                            >
                                <Link
                                    :href="
                                        route(
                                            'admin.training-camp-sessions.index'
                                        )
                                    "
                                    class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded transition-colors"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                >
                                    <span v-if="form.processing"
                                        >Updating...</span
                                    >
                                    <span v-else>Update Session</span>
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
