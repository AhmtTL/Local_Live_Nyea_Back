<script setup>
import { useAdminLayout } from "@/Composables/useAdminLayout";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, useForm, Link } from "@inertiajs/vue3";
import { ref, computed } from "vue";

const props = defineProps({
    resourcePrograms: Array,
    schools: Array,
});

const { Layout } = useAdminLayout();

const form = useForm({
    resource_program_id: "",
    school_id: "",
    new_school_name: "",
    location: "",
    city: "",
    country: "",
    country_code: "",
    venue_name: "",
    organization_logo: "",
    venue_address: "",
    location_highlights: [],
    date: "",
    start_date: "",
    end_date: "",
    timezone: "",
    available_spots: 25,
    booked_spots: 0,
    is_active: false,
    is_featured: false,
    special_notes: "",
    metadata: {},
});

const newHighlight = ref("");
const logoUploading = ref(false);
const logoPreview = ref("");

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

const clearNewSchoolWhenExistingSelected = () => {
    if (form.school_id) {
        form.new_school_name = "";
    }
};

const clearSchoolWhenNewNameEntered = () => {
    if (form.new_school_name.trim()) {
        form.school_id = "";
    }
};

const submitAsDraft = () => {
    form.is_active = false;
    form.post(route("admin.resource-sessions.store"));
};

const submitAndPublish = () => {
    form.is_active = true;
    form.post(route("admin.resource-sessions.store"));
};

const selectedResourceProgram = computed(() => {
    return props.resourcePrograms?.find(
        (rp) => rp.id === parseInt(form.resource_program_id)
    );
});
</script>

<template>
    <Head title="Create Resource Session" />

    <component :is="Layout">
        <div class="py-12">
            <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-8 bg-white border-b border-gray-200">
                        <div class="mb-8">
                            <h2 class="text-3xl font-bold text-gray-900">Create Resource Session</h2>
                            <p class="text-gray-600 mt-2">Add a new session for a resource program in a specific location</p>
                        </div>

                        <form @submit.prevent="submitAsDraft" class="space-y-8">
                            <!-- 📚 Orange Section: Resource Program Selection -->
                            <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-orange-900 mb-4">📚 Resource Program Selection</h3>
                                <div>
                                    <InputLabel for="resource_program_id" value="Select Resource Program" />
                                    <select
                                        id="resource_program_id"
                                        v-model="form.resource_program_id"
                                        @change="clearNewSchoolWhenExistingSelected"
                                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="">-- Select a program --</option>
                                        <option v-for="program in resourcePrograms" :key="program.id" :value="program.id">
                                            {{ program.title }}
                                        </option>
                                    </select>
                                    <InputError class="mt-2" :message="form.errors.resource_program_id" />
                                    <div v-if="selectedResourceProgram" class="mt-4 p-4 bg-white rounded border border-orange-100">
                                        <p class="text-sm text-gray-600"><strong>Program Details:</strong> {{ selectedResourceProgram.description }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- 🏫 Indigo Section: School -->
                            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-indigo-900 mb-4">🏫 School / Organization</h3>
                                <div class="grid grid-cols-1 gap-6">
                                    <div>
                                        <InputLabel for="school_id" value="Select Existing School" />
                                        <select
                                            id="school_id"
                                            v-model="form.school_id"
                                            @change="clearNewSchoolWhenExistingSelected"
                                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">-- Select a school --</option>
                                            <option v-for="school in schools" :key="school.id" :value="school.id">
                                                {{ school.name }}
                                            </option>
                                        </select>
                                        <InputError class="mt-2" :message="form.errors.school_id" />
                                    </div>

                                    <div v-if="!form.school_id">
                                        <InputLabel for="new_school_name" value="Or Create New School" />
                                        <TextInput
                                            id="new_school_name"
                                            v-model="form.new_school_name"
                                            type="text"
                                            class="mt-1 block w-full"
                                            placeholder="Enter school name"
                                            @input="clearSchoolWhenNewNameEntered"
                                        />
                                        <InputError class="mt-2" :message="form.errors.new_school_name" />
                                    </div>
                                </div>
                            </div>

                            <!-- 🌍 Green Section: Location -->
                            <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-green-900 mb-4">🌍 Location Details</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel for="location" value="Location Name" />
                                        <TextInput
                                            id="location"
                                            v-model="form.location"
                                            type="text"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., Downtown Center"
                                        />
                                        <InputError class="mt-2" :message="form.errors.location" />
                                    </div>

                                    <div>
                                        <InputLabel for="venue_name" value="Venue Name" />
                                        <TextInput
                                            id="venue_name"
                                            v-model="form.venue_name"
                                            type="text"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., Grand Hall"
                                        />
                                        <InputError class="mt-2" :message="form.errors.venue_name" />
                                    </div>

                                    <div>
                                        <InputLabel for="city" value="City" />
                                        <TextInput
                                            id="city"
                                            v-model="form.city"
                                            type="text"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., Istanbul"
                                        />
                                        <InputError class="mt-2" :message="form.errors.city" />
                                    </div>

                                    <div>
                                        <InputLabel for="country" value="Country" />
                                        <TextInput
                                            id="country"
                                            v-model="form.country"
                                            type="text"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., Turkey"
                                        />
                                        <InputError class="mt-2" :message="form.errors.country" />
                                    </div>

                                    <div>
                                        <InputLabel for="country_code" value="Country Code" />
                                        <TextInput
                                            id="country_code"
                                            v-model="form.country_code"
                                            type="text"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., TR"
                                            maxlength="2"
                                        />
                                        <InputError class="mt-2" :message="form.errors.country_code" />
                                    </div>

                                    <div class="md:col-span-2">
                                        <InputLabel for="venue_address" value="Complete Venue Address" />
                                        <textarea
                                            id="venue_address"
                                            v-model="form.venue_address"
                                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            rows="3"
                                            placeholder="Full address including street, postal code, etc."
                                        ></textarea>
                                        <InputError class="mt-2" :message="form.errors.venue_address" />
                                    </div>

                                    <!-- Location Highlights -->
                                    <div class="md:col-span-2">
                                        <InputLabel for="location_highlights" value="Location Highlights" />
                                        <div class="mt-2">
                                            <div class="flex gap-2">
                                                <TextInput
                                                    id="location_highlights"
                                                    v-model="newHighlight"
                                                    type="text"
                                                    class="flex-1"
                                                    placeholder="e.g., Swimming Pool, WiFi, Cafeteria"
                                                    @keyup.enter="addHighlight"
                                                />
                                                <button
                                                    type="button"
                                                    @click="addHighlight"
                                                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>

                                            <div v-if="form.location_highlights.length > 0" class="mt-3 flex flex-wrap gap-2">
                                                <span
                                                    v-for="(highlight, index) in form.location_highlights"
                                                    :key="index"
                                                    class="inline-flex items-center gap-2 px-3 py-1 bg-white border border-green-200 rounded-full text-sm text-green-700"
                                                >
                                                    {{ highlight }}
                                                    <button
                                                        type="button"
                                                        @click="removeHighlight(index)"
                                                        class="text-green-600 hover:text-green-800"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        <InputError class="mt-2" :message="form.errors.location_highlights" />
                                    </div>

                                    <!-- Organization Logo -->
                                    <div class="md:col-span-2">
                                        <InputLabel for="organization_logo" value="Organization Logo" />
                                        <div class="mt-2 flex gap-4">
                                            <div v-if="logoPreview" class="relative">
                                                <img
                                                    :src="logoPreview"
                                                    alt="Organization Logo"
                                                    class="h-24 w-24 object-cover rounded-lg border border-gray-300"
                                                />
                                                <button
                                                    type="button"
                                                    @click="removeLogo"
                                                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div class="flex-1">
                                                <input
                                                    id="organization_logo"
                                                    type="file"
                                                    accept="image/*"
                                                    @change="handleLogoUpload"
                                                    :disabled="logoUploading"
                                                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                                />
                                                <p class="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                                                <InputError class="mt-2" :message="form.errors.organization_logo" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 📅 Orange Section: Schedule -->
                            <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-orange-900 mb-4">📅 Schedule</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel for="date" value="Single Date (if applicable)" />
                                        <TextInput
                                            id="date"
                                            v-model="form.date"
                                            type="date"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError class="mt-2" :message="form.errors.date" />
                                    </div>

                                    <div>
                                        <InputLabel for="timezone" value="Timezone" />
                                        <select
                                            id="timezone"
                                            v-model="form.timezone"
                                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        >
                                            <option value="">-- Select timezone --</option>
                                            <option value="UTC">UTC (Coordinated Universal Time)</option>
                                            <option value="Europe/Istanbul">Europe/Istanbul</option>
                                            <option value="Europe/London">Europe/London</option>
                                            <option value="America/New_York">America/New_York</option>
                                            <option value="Asia/Tokyo">Asia/Tokyo</option>
                                        </select>
                                        <InputError class="mt-2" :message="form.errors.timezone" />
                                    </div>

                                    <div>
                                        <InputLabel for="start_date" value="Start Date" />
                                        <TextInput
                                            id="start_date"
                                            v-model="form.start_date"
                                            type="date"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError class="mt-2" :message="form.errors.start_date" />
                                    </div>

                                    <div>
                                        <InputLabel for="end_date" value="End Date" />
                                        <TextInput
                                            id="end_date"
                                            v-model="form.end_date"
                                            type="date"
                                            class="mt-1 block w-full"
                                        />
                                        <InputError class="mt-2" :message="form.errors.end_date" />
                                    </div>
                                </div>
                            </div>

                            <!-- ⚙️ Purple Section: Capacity & Settings -->
                            <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-purple-900 mb-4">⚙️ Capacity & Settings</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel for="available_spots" value="Total Available Spots" />
                                        <TextInput
                                            id="available_spots"
                                            v-model="form.available_spots"
                                            type="number"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., 50"
                                        />
                                        <InputError class="mt-2" :message="form.errors.available_spots" />
                                    </div>

                                    <div>
                                        <InputLabel for="booked_spots" value="Currently Booked" />
                                        <TextInput
                                            id="booked_spots"
                                            v-model="form.booked_spots"
                                            type="number"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., 0"
                                            readonly
                                        />
                                        <p class="text-xs text-gray-600 mt-1">Read-only: Auto-calculated from registrations</p>
                                    </div>

                                    <div>
                                        <InputLabel for="price_override" value="Custom Price (Optional)" />
                                        <TextInput
                                            id="price_override"
                                            v-model="form.price_override"
                                            type="number"
                                            step="0.01"
                                            class="mt-1 block w-full"
                                            placeholder="Leave empty to use program default"
                                        />
                                        <InputError class="mt-2" :message="form.errors.price_override" />
                                    </div>

                                    <div class="md:col-span-2">
                                        <label class="flex items-center gap-2">
                                            <input
                                                v-model="form.is_featured"
                                                type="checkbox"
                                                class="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                                            />
                                            <span class="text-sm font-medium text-gray-700">⭐ Featured Session (Show on homepage)</span>
                                        </label>
                                    </div>

                                    <div class="md:col-span-2">
                                        <InputLabel for="special_notes" value="Special Notes for Participants" />
                                        <textarea
                                            id="special_notes"
                                            v-model="form.special_notes"
                                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            rows="3"
                                            placeholder="Any important information participants should know..."
                                        ></textarea>
                                        <InputError class="mt-2" :message="form.errors.special_notes" />
                                    </div>
                                </div>
                            </div>

                            <!-- Form Actions -->
                            <div class="flex gap-3 pt-6">
                                <button
                                    type="button"
                                    @click="submitAsDraft"
                                    :disabled="form.processing"
                                    class="px-6 py-2 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {{ form.processing ? 'Saving...' : '📝 Save as Draft' }}
                                </button>

                                <button
                                    type="button"
                                    @click="submitAndPublish"
                                    :disabled="form.processing"
                                    class="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
                                >
                                    {{ form.processing ? 'Creating...' : '✅ Create & Publish' }}
                                </button>

                                <Link
                                    :href="route('admin.resource-sessions.index')"
                                    class="px-6 py-2 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
