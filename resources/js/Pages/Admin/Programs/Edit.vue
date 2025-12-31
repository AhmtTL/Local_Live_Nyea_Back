<script setup>
import { useAdminLayout } from "@/Composables/useAdminLayout";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ref } from "vue";

const props = defineProps({
    program: Object,
    categories: Array,
});

const { Layout } = useAdminLayout();

const form = useForm({
    title: props.program.title,
    slug: props.program.slug,
    description: props.program.description,
    price: props.program.price,
    duration: props.program.duration,
    category: props.program.category,
    image: props.program.image,
    features: props.program.features || [],
    available_tickets: props.program.available_tickets,
    sold_tickets: props.program.sold_tickets,
    type:
        props.program.type ||
        (props.program.is_workshop ? "workshop" : "regular"),
    is_workshop: props.program.is_workshop || false,
    workshop_description: props.program.workshop_description || "",
    workshop_highlights: props.program.workshop_highlights || [],
    instructor_name: props.program.instructor_name || "",
    instructor_title: props.program.instructor_title || "",
    instructor_image: props.program.instructor_image || "",
    accreditations: props.program.accreditations || [],
    base_price: props.program.base_price || props.program.price,
});

const newFeature = ref("");
const imageFile = ref(null);
const uploadingImage = ref(false);
const imagePreview = ref(props.program.image || null);

const addFeature = () => {
    if (newFeature.value.trim()) {
        form.features.push(newFeature.value.trim());
        newFeature.value = "";
    }
};

const removeFeature = (index) => {
    form.features.splice(index, 1);
};

const compressImage = (file, maxSizeKB = 1500) => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions (max 1200px width/height)
            const maxDimension = 1200;
            let { width, height } = img;

            if (width > height) {
                if (width > maxDimension) {
                    height = (height * maxDimension) / width;
                    width = maxDimension;
                }
            } else {
                if (height > maxDimension) {
                    width = (width * maxDimension) / height;
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);

            // Start with high quality and reduce if needed
            let quality = 0.8;
            let compressedDataUrl;

            do {
                compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
                quality -= 0.1;
            } while (
                compressedDataUrl.length > maxSizeKB * 1024 * 1.37 &&
                quality > 0.1
            ); // 1.37 accounts for base64 overhead

            // Convert back to File
            canvas.toBlob(
                (blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                },
                "image/jpeg",
                quality
            );
        };

        img.src = URL.createObjectURL(file);
    });
};

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show original file info
    const originalSizeMB = (file.size / 1024 / 1024).toFixed(1);
    console.log(`Original file: ${originalSizeMB}MB`);

    // Compress image if it's too large
    let finalFile = file;
    if (file.size > 1.5 * 1024 * 1024) {
        // If larger than 1.5MB, compress
        console.log("Compressing image...");
        finalFile = await compressImage(file);
        const compressedSizeMB = (finalFile.size / 1024 / 1024).toFixed(1);
        console.log(`Compressed to: ${compressedSizeMB}MB`);
    }

    imageFile.value = finalFile;
    uploadingImage.value = true;

    try {
        const formData = new FormData();
        formData.append("image", finalFile);
        formData.append("type", "program");

        // Get CSRF token from meta tag
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfMeta?.getAttribute("content");

        console.log("CSRF Token found:", csrfToken ? "Yes" : "No");
        console.log("CSRF Token length:", csrfToken?.length || 0);

        // Add CSRF token to FormData
        if (csrfToken) {
            formData.append("_token", csrfToken);
        }

        const response = await fetch(route("admin.images.upload"), {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": csrfToken || "",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response
                .json()
                .catch(() => ({ message: `HTTP ${response.status}` }));
            console.error("Upload failed:", response.status, errorData);
            console.log(
                "Full error response:",
                JSON.stringify(errorData, null, 2)
            );

            // Show detailed error information
            let errorMessage =
                errorData.message || `Server error (${response.status})`;
            if (errorData.errors) {
                const errorDetails = Object.entries(errorData.errors)
                    .map(
                        ([field, messages]) =>
                            `${field}: ${
                                Array.isArray(messages)
                                    ? messages.join(", ")
                                    : messages
                            }`
                    )
                    .join("\n");
                errorMessage += "\n\nDetails:\n" + errorDetails;
            }

            alert("Failed to upload image: " + errorMessage);
            return;
        }

        const result = await response.json();

        if (result.success) {
            form.image = result.data.url;
            imagePreview.value = result.data.url;
            alert("Image uploaded and optimized successfully!");
        } else {
            alert("Failed to upload image: " + result.message);
        }
    } catch (error) {
        console.error("Image upload error:", error);
        alert("Failed to upload image: " + (error.message || "Network error"));
    } finally {
        uploadingImage.value = false;
    }
};

const handleImageDelete = async () => {
    if (!form.image || !confirm("Are you sure you want to delete this image?"))
        return;

    try {
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfMeta ? csrfMeta.getAttribute("content") : null;

        const response = await fetch(route("admin.images.delete"), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken || "",
                Accept: "application/json",
            },
            body: JSON.stringify({ path: form.image }),
        });

        const result = await response.json();

        if (result.success) {
            form.image = "";
            imagePreview.value = null;
            alert("Image deleted successfully!");
        } else {
            alert("Failed to delete image: " + result.message);
        }
    } catch (error) {
        console.error("Image delete error:", error);
        alert("Failed to delete image: " + (error.message || "Network error"));
    }
};

// Program type selection logic
const handleProgramTypeChange = (type) => {
    form.type = type;
    form.is_workshop = type === "workshop";
};

const submit = () => {
    form.put(route("admin.programs.update", props.program.id));
};
</script>

<template>
    <Head title="Edit Program" />

    <component :is="Layout">
        <div class="py-12">
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">
                                Edit Program: {{ program.title }}
                            </h2>
                            <div class="space-x-2">
                                <Link
                                    :href="
                                        route('admin.programs.show', program.id)
                                    "
                                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    View Program
                                </Link>
                                <Link
                                    :href="route('admin.programs.index')"
                                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Back to Programs
                                </Link>
                            </div>
                        </div>

                        <form @submit.prevent="submit" class="space-y-6">
                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <!-- Title -->
                                <div>
                                    <InputLabel
                                        for="title"
                                        value="Program Title"
                                    />
                                    <TextInput
                                        id="title"
                                        v-model="form.title"
                                        type="text"
                                        class="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.title"
                                    />
                                </div>

                                <!-- Slug -->
                                <div>
                                    <InputLabel for="slug" value="Slug" />
                                    <TextInput
                                        id="slug"
                                        v-model="form.slug"
                                        type="text"
                                        class="mt-1 block w-full"
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.slug"
                                    />
                                </div>

                                <!-- Price -->
                                <div>
                                    <InputLabel
                                        for="price"
                                        value="Price (USD)"
                                    />
                                    <TextInput
                                        id="price"
                                        v-model="form.price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        class="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.price"
                                    />
                                </div>

                                <!-- Duration -->
                                <div>
                                    <InputLabel
                                        for="duration"
                                        value="Duration"
                                    />
                                    <TextInput
                                        id="duration"
                                        v-model="form.duration"
                                        type="text"
                                        class="mt-1 block w-full"
                                        placeholder="e.g., 8 weeks, 3 months"
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.duration"
                                    />
                                </div>

                                <!-- Category -->
                                <div>
                                    <InputLabel
                                        for="category"
                                        value="Category"
                                    />
                                    <select
                                        id="category"
                                        v-model="form.category"
                                        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        <option
                                            v-for="category in categories"
                                            :key="category.id"
                                            :value="category.name"
                                        >
                                            {{ category.name }}
                                        </option>
                                    </select>
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.category"
                                    />
                                </div>

                                <!-- Program Type -->
                                <div>
                                    <InputLabel value="Program Type" />
                                    <div class="mt-2 space-y-3">
                                        <!-- Regular Program Option -->
                                        <div
                                            class="bg-gray-50 border border-gray-200 rounded-lg p-4"
                                        >
                                            <label
                                                class="flex items-center cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="program_type"
                                                    value="regular"
                                                    :checked="
                                                        form.type === 'regular'
                                                    "
                                                    @change="
                                                        handleProgramTypeChange(
                                                            'regular'
                                                        )
                                                    "
                                                    class="rounded border-gray-300 text-gray-600 shadow-sm focus:ring-gray-500"
                                                />
                                                <div class="ml-3">
                                                    <div
                                                        class="text-sm font-medium text-gray-900"
                                                    >
                                                        📚 Regular Program
                                                    </div>
                                                    <div
                                                        class="text-sm text-gray-700"
                                                    >
                                                        Standard educational
                                                        program (default)
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                        <!-- Workshop Option -->
                                        <div
                                            class="bg-purple-50 border border-purple-200 rounded-lg p-4"
                                        >
                                            <label
                                                class="flex items-center cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="program_type"
                                                    value="workshop"
                                                    :checked="
                                                        form.type === 'workshop'
                                                    "
                                                    @change="
                                                        handleProgramTypeChange(
                                                            'workshop'
                                                        )
                                                    "
                                                    class="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                                                />
                                                <div class="ml-3">
                                                    <div
                                                        class="text-sm font-medium text-purple-900"
                                                    >
                                                        🎓 Workshop Program
                                                    </div>
                                                    <div
                                                        class="text-sm text-purple-700"
                                                    >
                                                        Interactive sessions
                                                        with hands-on learning
                                                        experiences
                                                    </div>
                                                </div>
                                            </label>
                                            <div
                                                v-if="form.type === 'workshop'"
                                                class="mt-3 p-3 bg-white border border-purple-200 rounded"
                                            >
                                                <div
                                                    class="text-xs text-purple-800"
                                                >
                                                    <strong
                                                        >Workshop Mode:</strong
                                                    >
                                                    This program can have
                                                    multiple sessions in
                                                    different locations. Use the
                                                    <strong
                                                        >"Workshop
                                                        Sessions"</strong
                                                    >
                                                    menu to add specific
                                                    sessions with locations and
                                                    pricing.
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Training Camp Option -->
                                        <div
                                            class="bg-orange-50 border border-orange-200 rounded-lg p-4"
                                        >
                                            <label
                                                class="flex items-center cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="program_type"
                                                    value="training_camp"
                                                    :checked="
                                                        form.type ===
                                                        'training_camp'
                                                    "
                                                    @change="
                                                        handleProgramTypeChange(
                                                            'training_camp'
                                                        )
                                                    "
                                                    class="rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500"
                                                />
                                                <div class="ml-3">
                                                    <div
                                                        class="text-sm font-medium text-orange-900"
                                                    >
                                                        🏕️ Training Camp
                                                    </div>
                                                    <div
                                                        class="text-sm text-orange-700"
                                                    >
                                                        Intensive training
                                                        program with immersive
                                                        learning
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.type"
                                    />
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.is_workshop"
                                    />
                                </div>

                                <!-- Image Upload -->
                                <div>
                                    <InputLabel
                                        for="image"
                                        value="Program Image"
                                    />
                                    <div class="mt-2 space-y-4">
                                        <!-- Image Preview -->
                                        <div
                                            v-if="imagePreview"
                                            class="relative"
                                        >
                                            <img
                                                :src="imagePreview"
                                                :alt="form.title"
                                                class="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                                            />
                                            <div
                                                class="mt-2 flex items-center justify-between"
                                            >
                                                <div
                                                    class="text-sm text-gray-600"
                                                >
                                                    Current image •
                                                    Auto-optimized to 800x600px
                                                    (4:3 ratio)
                                                </div>
                                                <button
                                                    type="button"
                                                    @click="handleImageDelete"
                                                    class="text-red-600 hover:text-red-800 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                                >
                                                    🗑️ Delete Image
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Upload Input -->
                                        <div
                                            class="flex items-center space-x-4"
                                        >
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                @change="handleImageUpload"
                                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                :disabled="uploadingImage"
                                            />
                                            <div
                                                v-if="uploadingImage"
                                                class="flex items-center text-blue-600"
                                            >
                                                <svg
                                                    class="animate-spin h-4 w-4 mr-2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        class="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        stroke-width="4"
                                                        fill="none"
                                                    ></circle>
                                                    <path
                                                        class="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Uploading...
                                            </div>
                                        </div>

                                        <!-- Image Guidelines -->
                                        <div
                                            class="bg-blue-50 border border-blue-200 rounded-lg p-4"
                                        >
                                            <h4
                                                class="text-sm font-semibold text-blue-900 mb-2"
                                            >
                                                📸 Smart Image Processing:
                                            </h4>
                                            <ul
                                                class="text-sm text-blue-700 space-y-1"
                                            >
                                                <li>
                                                    •
                                                    <strong
                                                        >Auto-optimization:</strong
                                                    >
                                                    Images automatically resized
                                                    to 800x600px (4:3 ratio)
                                                </li>
                                                <li>
                                                    •
                                                    <strong
                                                        >Format
                                                        conversion:</strong
                                                    >
                                                    All images converted to WebP
                                                    for optimal performance
                                                </li>
                                                <li>
                                                    •
                                                    <strong
                                                        >Maximum file
                                                        size:</strong
                                                    >
                                                    5MB before processing
                                                </li>
                                                <li>
                                                    •
                                                    <strong
                                                        >Supported
                                                        formats:</strong
                                                    >
                                                    JPEG, PNG, JPG, GIF, WebP
                                                </li>
                                                <li>
                                                    •
                                                    <strong>Quality:</strong>
                                                    85% compression for perfect
                                                    balance of size and quality
                                                </li>
                                                <li>
                                                    •
                                                    <strong
                                                        >Best practice:</strong
                                                    >
                                                    Upload high-resolution
                                                    images - we'll optimize
                                                    them!
                                                </li>
                                            </ul>
                                        </div>

                                        <!-- Manual URL Input (Alternative) -->
                                        <div
                                            class="border-t border-gray-200 pt-4"
                                        >
                                            <InputLabel
                                                for="imageUrl"
                                                value="Or enter image URL manually"
                                            />
                                            <TextInput
                                                id="imageUrl"
                                                v-model="form.image"
                                                type="url"
                                                class="mt-1 block w-full"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>
                                    <InputError
                                        class="mt-2"
                                        :message="form.errors.image"
                                    />
                                </div>
                            </div>

                            <!-- Description -->
                            <div>
                                <InputLabel
                                    for="description"
                                    value="Description"
                                />
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    rows="4"
                                    class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    placeholder="Detailed program description..."
                                ></textarea>
                                <InputError
                                    class="mt-2"
                                    :message="form.errors.description"
                                />
                            </div>

                            <!-- Features -->
                            <div>
                                <InputLabel value="Program Features" />
                                <div class="mt-2 space-y-2">
                                    <div
                                        v-for="(
                                            feature, index
                                        ) in form.features"
                                        :key="index"
                                        class="flex items-center space-x-2"
                                    >
                                        <span
                                            class="flex-1 px-3 py-2 bg-gray-100 rounded"
                                            >{{ feature }}</span
                                        >
                                        <button
                                            type="button"
                                            @click="removeFeature(index)"
                                            class="text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div class="flex space-x-2">
                                        <TextInput
                                            v-model="newFeature"
                                            type="text"
                                            class="flex-1"
                                            placeholder="Add a feature..."
                                            @keydown.enter.prevent="addFeature"
                                        />
                                        <button
                                            type="button"
                                            @click="addFeature"
                                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <InputError
                                    class="mt-2"
                                    :message="form.errors.features"
                                />
                            </div>

                            <!-- Ticket Management -->
                            <div
                                class="bg-orange-50 border border-orange-200 rounded-lg p-6"
                            >
                                <h3
                                    class="text-lg font-semibold text-orange-900 mb-4"
                                >
                                    🎟️ Ticket Management (Scarcity Control)
                                </h3>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <!-- Available Tickets -->
                                    <div>
                                        <InputLabel
                                            for="available_tickets"
                                            value="Available Tickets"
                                        />
                                        <TextInput
                                            id="available_tickets"
                                            v-model="form.available_tickets"
                                            type="number"
                                            min="0"
                                            class="mt-1 block w-full"
                                            placeholder="e.g., 50 (leave empty for unlimited)"
                                        />
                                        <div class="mt-1 text-xs text-gray-600">
                                            Set a limit to create scarcity
                                            effect. Leave empty for unlimited
                                            enrollment.
                                        </div>
                                        <InputError
                                            class="mt-2"
                                            :message="
                                                form.errors.available_tickets
                                            "
                                        />
                                    </div>

                                    <!-- Sold Tickets -->
                                    <div>
                                        <InputLabel
                                            for="sold_tickets"
                                            value="Sold Tickets"
                                        />
                                        <TextInput
                                            id="sold_tickets"
                                            v-model="form.sold_tickets"
                                            type="number"
                                            min="0"
                                            class="mt-1 block w-full"
                                            placeholder="0"
                                        />
                                        <div class="mt-1 text-xs text-gray-600">
                                            Current number of sold tickets
                                            (usually auto-managed).
                                        </div>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.sold_tickets"
                                        />
                                    </div>
                                </div>

                                <!-- Ticket Stats -->
                                <div
                                    v-if="form.available_tickets"
                                    class="mt-4 p-4 bg-white rounded-lg border border-orange-200"
                                >
                                    <div
                                        class="flex items-center justify-between text-sm"
                                    >
                                        <span class="text-gray-600"
                                            >Remaining Tickets:</span
                                        >
                                        <span
                                            class="font-bold"
                                            :class="
                                                form.available_tickets -
                                                    (form.sold_tickets || 0) <=
                                                5
                                                    ? 'text-red-600'
                                                    : 'text-green-600'
                                            "
                                        >
                                            {{
                                                form.available_tickets -
                                                (form.sold_tickets || 0)
                                            }}
                                            / {{ form.available_tickets }}
                                        </span>
                                    </div>
                                    <div
                                        class="mt-2 w-full bg-gray-200 rounded-full h-2"
                                    >
                                        <div
                                            class="h-2 rounded-full transition-all duration-300"
                                            :class="
                                                (form.sold_tickets || 0) /
                                                    form.available_tickets >
                                                0.8
                                                    ? 'bg-red-500'
                                                    : (form.sold_tickets || 0) /
                                                          form.available_tickets >
                                                      0.6
                                                    ? 'bg-orange-500'
                                                    : 'bg-green-500'
                                            "
                                            :style="{
                                                width:
                                                    Math.min(
                                                        ((form.sold_tickets ||
                                                            0) /
                                                            form.available_tickets) *
                                                            100,
                                                        100
                                                    ) + '%',
                                            }"
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-end">
                                <PrimaryButton
                                    class="ml-4"
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                >
                                    Update Program
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
