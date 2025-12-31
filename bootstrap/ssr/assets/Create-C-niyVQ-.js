import { ref, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, withModifiers, withDirectives, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, vModelText, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-KyMrG-Br.js";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./InputLabel-BdCx2Ft7.js";
import { P as PrimaryButton } from "./PrimaryButton-CIooT64n.js";
import { _ as _sfc_main$2 } from "./TextInput-BEWjE_Xr.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./AdminLayout-VxMcYlr7.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props) {
    const { Layout } = useAdminLayout();
    const form = useForm({
      title: "",
      slug: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      image: "",
      features: [],
      available_tickets: "",
      sold_tickets: 0,
      type: "regular",
      is_workshop: false,
      workshop_description: "",
      workshop_highlights: [],
      instructor_name: "",
      instructor_title: "",
      instructor_image: "",
      accreditations: [],
      base_price: ""
    });
    const newFeature = ref("");
    const imageFile = ref(null);
    const uploadingImage = ref(false);
    const imagePreview = ref(null);
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
          const maxDimension = 1200;
          let { width, height } = img;
          if (width > height) {
            if (width > maxDimension) {
              height = height * maxDimension / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = width * maxDimension / height;
              height = maxDimension;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          let quality = 0.8;
          let compressedDataUrl;
          do {
            compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
            quality -= 0.1;
          } while (compressedDataUrl.length > maxSizeKB * 1024 * 1.37 && quality > 0.1);
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now()
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
      const originalSizeMB = (file.size / 1024 / 1024).toFixed(1);
      console.log(`Original file: ${originalSizeMB}MB`);
      let finalFile = file;
      if (file.size > 1.5 * 1024 * 1024) {
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
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfMeta == null ? void 0 : csrfMeta.getAttribute("content");
        console.log("CSRF Token found:", csrfToken ? "Yes" : "No");
        console.log("CSRF Token length:", (csrfToken == null ? void 0 : csrfToken.length) || 0);
        if (csrfToken) {
          formData.append("_token", csrfToken);
        }
        const response = await fetch(route("admin.images.upload"), {
          method: "POST",
          body: formData,
          headers: {
            "X-CSRF-TOKEN": csrfToken || "",
            Accept: "application/json"
          }
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
          console.error("Upload failed:", response.status, errorData);
          console.log(
            "Full error response:",
            JSON.stringify(errorData, null, 2)
          );
          let errorMessage = errorData.message || `Server error (${response.status})`;
          if (errorData.errors) {
            const errorDetails = Object.entries(errorData.errors).map(
              ([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
            ).join("\n");
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
        const headers = { "Content-Type": "application/json" };
        if (csrfToken) {
          headers["X-CSRF-TOKEN"] = csrfToken;
        }
        const response = await fetch(route("admin.images.delete"), {
          method: "DELETE",
          headers,
          body: JSON.stringify({ path: form.image })
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
    const handleProgramTypeChange = (type) => {
      form.type = type;
      form.is_workshop = type === "workshop";
    };
    const submit = () => {
      form.post(route("admin.programs.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Create Program" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}> Create New Program </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.programs.index"),
              class: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Programs `);
                } else {
                  return [
                    createTextVNode(" Back to Programs ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-6 md:grid-cols-2"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "title",
              value: "Program Title"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "title",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.title
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "slug",
              value: "Slug (optional)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "slug",
              modelValue: unref(form).slug,
              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
              type: "text",
              class: "mt-1 block w-full",
              placeholder: "auto-generated from title if empty"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.slug
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "price",
              value: "Price (USD)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "price",
              modelValue: unref(form).price,
              "onUpdate:modelValue": ($event) => unref(form).price = $event,
              type: "number",
              step: "0.01",
              min: "0",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.price
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "duration",
              value: "Duration"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "duration",
              modelValue: unref(form).duration,
              "onUpdate:modelValue": ($event) => unref(form).duration = $event,
              type: "text",
              class: "mt-1 block w-full",
              placeholder: "e.g., 8 weeks, 3 months"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.duration
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "category",
              value: "Category"
            }, null, _parent2, _scopeId));
            _push2(`<select id="category" class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}${_scopeId}> Select a category </option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.name)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, category.name) : ssrLooseEqual(unref(form).category, category.name)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.category
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { value: "Program Type" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 space-y-3"${_scopeId}><div class="bg-gray-50 border border-gray-200 rounded-lg p-4"${_scopeId}><label class="flex items-center cursor-pointer"${_scopeId}><input type="radio" name="program_type" value="regular"${ssrIncludeBooleanAttr(
              unref(form).type === "regular"
            ) ? " checked" : ""} class="rounded border-gray-300 text-gray-600 shadow-sm focus:ring-gray-500"${_scopeId}><div class="ml-3"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}> 📚 Regular Program </div><div class="text-sm text-gray-700"${_scopeId}> Standard educational program (default) </div></div></label></div><div class="bg-purple-50 border border-purple-200 rounded-lg p-4"${_scopeId}><label class="flex items-center cursor-pointer"${_scopeId}><input type="radio" name="program_type" value="workshop"${ssrIncludeBooleanAttr(
              unref(form).type === "workshop"
            ) ? " checked" : ""} class="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"${_scopeId}><div class="ml-3"${_scopeId}><div class="text-sm font-medium text-purple-900"${_scopeId}> 🎓 Workshop Program </div><div class="text-sm text-purple-700"${_scopeId}> Interactive sessions with hands-on learning experiences </div></div></label>`);
            if (unref(form).type === "workshop") {
              _push2(`<div class="mt-3 p-3 bg-white border border-purple-200 rounded"${_scopeId}><div class="text-xs text-purple-800"${_scopeId}><strong${_scopeId}>Workshop Mode:</strong> After creating this program, use the <strong${_scopeId}>&quot;Workshop Sessions&quot;</strong> menu to add specific sessions with locations and pricing. </div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-orange-50 border border-orange-200 rounded-lg p-4"${_scopeId}><label class="flex items-center cursor-pointer"${_scopeId}><input type="radio" name="program_type" value="training_camp"${ssrIncludeBooleanAttr(
              unref(form).type === "training_camp"
            ) ? " checked" : ""} class="rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500"${_scopeId}><div class="ml-3"${_scopeId}><div class="text-sm font-medium text-orange-900"${_scopeId}> 🏕️ Training Camp </div><div class="text-sm text-orange-700"${_scopeId}> Intensive training program with immersive learning </div></div></label></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.type
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.is_workshop
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "image",
              value: "Program Image"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 space-y-4"${_scopeId}>`);
            if (imagePreview.value) {
              _push2(`<div class="relative"${_scopeId}><img${ssrRenderAttr("src", imagePreview.value)}${ssrRenderAttr("alt", unref(form).title)} class="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"${_scopeId}><div class="mt-2 flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-600"${_scopeId}> Preview • Auto-optimized to 800x600px (4:3 ratio) </div><button type="button" class="text-red-600 hover:text-red-800 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded transition-colors"${_scopeId}> 🗑️ Delete Image </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center space-x-4"${_scopeId}><input type="file" id="imageUpload" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"${ssrIncludeBooleanAttr(uploadingImage.value) ? " disabled" : ""}${_scopeId}>`);
            if (uploadingImage.value) {
              _push2(`<div class="flex items-center text-blue-600"${_scopeId}><svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Uploading... </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-blue-50 border border-blue-200 rounded-lg p-4"${_scopeId}><h4 class="text-sm font-semibold text-blue-900 mb-2"${_scopeId}> 📸 Smart Image Processing: </h4><ul class="text-sm text-blue-700 space-y-1"${_scopeId}><li${_scopeId}> • <strong${_scopeId}>Auto-optimization:</strong> Images automatically resized to 800x600px (4:3 ratio) </li><li${_scopeId}> • <strong${_scopeId}>Format conversion:</strong> All images converted to WebP for optimal performance </li><li${_scopeId}> • <strong${_scopeId}>Maximum file size:</strong> 5MB before processing </li><li${_scopeId}> • <strong${_scopeId}>Supported formats:</strong> JPEG, PNG, JPG, GIF, WebP </li><li${_scopeId}> • <strong${_scopeId}>Quality:</strong> 85% compression for perfect balance of size and quality </li><li${_scopeId}> • <strong${_scopeId}>Best practice:</strong> Upload high-resolution images - we&#39;ll optimize them! </li></ul></div><div class="border-t border-gray-200 pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "imageUrl",
              value: "Or enter image URL manually"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "imageUrl",
              modelValue: unref(form).image,
              "onUpdate:modelValue": ($event) => unref(form).image = $event,
              type: "url",
              class: "mt-1 block w-full",
              placeholder: "https://example.com/image.jpg"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.image
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "description",
              value: "Description"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" rows="4" class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" placeholder="Detailed program description..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { value: "Program Features" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).features, (feature, index) => {
              _push2(`<div class="flex items-center space-x-2"${_scopeId}><span class="flex-1 px-3 py-2 bg-gray-100 rounded"${_scopeId}>${ssrInterpolate(feature)}</span><button type="button" class="text-red-600 hover:text-red-800"${_scopeId}> Remove </button></div>`);
            });
            _push2(`<!--]--><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: newFeature.value,
              "onUpdate:modelValue": ($event) => newFeature.value = $event,
              type: "text",
              class: "flex-1",
              placeholder: "Add a feature...",
              onKeydown: addFeature
            }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"${_scopeId}> Add </button></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.features
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-orange-50 border border-orange-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-orange-900 mb-4"${_scopeId}> 🎟️ Ticket Management (Scarcity Control) </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "available_tickets",
              value: "Available Tickets"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "available_tickets",
              modelValue: unref(form).available_tickets,
              "onUpdate:modelValue": ($event) => unref(form).available_tickets = $event,
              type: "number",
              min: "0",
              class: "mt-1 block w-full",
              placeholder: "e.g., 50 (leave empty for unlimited)"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1 text-xs text-gray-600"${_scopeId}> Set a limit to create scarcity effect. Leave empty for unlimited enrollment. </div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.available_tickets
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "sold_tickets",
              value: "Sold Tickets"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "sold_tickets",
              modelValue: unref(form).sold_tickets,
              "onUpdate:modelValue": ($event) => unref(form).sold_tickets = $event,
              type: "number",
              min: "0",
              class: "mt-1 block w-full",
              placeholder: "0"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1 text-xs text-gray-600"${_scopeId}> Current number of sold tickets (usually starts at 0). </div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.sold_tickets
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (unref(form).available_tickets) {
              _push2(`<div class="mt-4 p-4 bg-white rounded-lg border border-orange-200"${_scopeId}><div class="flex items-center justify-between text-sm"${_scopeId}><span class="text-gray-600"${_scopeId}>Remaining Tickets:</span><span class="${ssrRenderClass([
                unref(form).available_tickets - (unref(form).sold_tickets || 0) <= 5 ? "text-red-600" : "text-green-600",
                "font-bold"
              ])}"${_scopeId}>${ssrInterpolate(unref(form).available_tickets - (unref(form).sold_tickets || 0))} / ${ssrInterpolate(unref(form).available_tickets)}</span></div><div class="mt-2 w-full bg-gray-200 rounded-full h-2"${_scopeId}><div class="${ssrRenderClass([
                (unref(form).sold_tickets || 0) / unref(form).available_tickets > 0.8 ? "bg-red-500" : (unref(form).sold_tickets || 0) / unref(form).available_tickets > 0.6 ? "bg-orange-500" : "bg-green-500",
                "h-2 rounded-full transition-all duration-300"
              ])}" style="${ssrRenderStyle({
                width: Math.min(
                  (unref(form).sold_tickets || 0) / unref(form).available_tickets * 100,
                  100
                ) + "%"
              })}"${_scopeId}></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Program `);
                } else {
                  return [
                    createTextVNode(" Create Program ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, " Create New Program "),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.programs.index"),
                          class: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Back to Programs ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "title",
                              value: "Program Title"
                            }),
                            createVNode(_sfc_main$2, {
                              id: "title",
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              type: "text",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.title
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "slug",
                              value: "Slug (optional)"
                            }),
                            createVNode(_sfc_main$2, {
                              id: "slug",
                              modelValue: unref(form).slug,
                              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                              type: "text",
                              class: "mt-1 block w-full",
                              placeholder: "auto-generated from title if empty"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.slug
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "price",
                              value: "Price (USD)"
                            }),
                            createVNode(_sfc_main$2, {
                              id: "price",
                              modelValue: unref(form).price,
                              "onUpdate:modelValue": ($event) => unref(form).price = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.price
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "duration",
                              value: "Duration"
                            }),
                            createVNode(_sfc_main$2, {
                              id: "duration",
                              modelValue: unref(form).duration,
                              "onUpdate:modelValue": ($event) => unref(form).duration = $event,
                              type: "text",
                              class: "mt-1 block w-full",
                              placeholder: "e.g., 8 weeks, 3 months"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.duration
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "category",
                              value: "Category"
                            }),
                            withDirectives(createVNode("select", {
                              id: "category",
                              "onUpdate:modelValue": ($event) => unref(form).category = $event,
                              class: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            }, [
                              createVNode("option", { value: "" }, " Select a category "),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                                return openBlock(), createBlock("option", {
                                  key: category.id,
                                  value: category.name
                                }, toDisplayString(category.name), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).category]
                            ]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.category
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, { value: "Program Type" }),
                            createVNode("div", { class: "mt-2 space-y-3" }, [
                              createVNode("div", { class: "bg-gray-50 border border-gray-200 rounded-lg p-4" }, [
                                createVNode("label", { class: "flex items-center cursor-pointer" }, [
                                  createVNode("input", {
                                    type: "radio",
                                    name: "program_type",
                                    value: "regular",
                                    checked: unref(form).type === "regular",
                                    onChange: ($event) => handleProgramTypeChange(
                                      "regular"
                                    ),
                                    class: "rounded border-gray-300 text-gray-600 shadow-sm focus:ring-gray-500"
                                  }, null, 40, ["checked", "onChange"]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, " 📚 Regular Program "),
                                    createVNode("div", { class: "text-sm text-gray-700" }, " Standard educational program (default) ")
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "bg-purple-50 border border-purple-200 rounded-lg p-4" }, [
                                createVNode("label", { class: "flex items-center cursor-pointer" }, [
                                  createVNode("input", {
                                    type: "radio",
                                    name: "program_type",
                                    value: "workshop",
                                    checked: unref(form).type === "workshop",
                                    onChange: ($event) => handleProgramTypeChange(
                                      "workshop"
                                    ),
                                    class: "rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                                  }, null, 40, ["checked", "onChange"]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("div", { class: "text-sm font-medium text-purple-900" }, " 🎓 Workshop Program "),
                                    createVNode("div", { class: "text-sm text-purple-700" }, " Interactive sessions with hands-on learning experiences ")
                                  ])
                                ]),
                                unref(form).type === "workshop" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-3 p-3 bg-white border border-purple-200 rounded"
                                }, [
                                  createVNode("div", { class: "text-xs text-purple-800" }, [
                                    createVNode("strong", null, "Workshop Mode:"),
                                    createTextVNode(" After creating this program, use the "),
                                    createVNode("strong", null, '"Workshop Sessions"'),
                                    createTextVNode(" menu to add specific sessions with locations and pricing. ")
                                  ])
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "bg-orange-50 border border-orange-200 rounded-lg p-4" }, [
                                createVNode("label", { class: "flex items-center cursor-pointer" }, [
                                  createVNode("input", {
                                    type: "radio",
                                    name: "program_type",
                                    value: "training_camp",
                                    checked: unref(form).type === "training_camp",
                                    onChange: ($event) => handleProgramTypeChange(
                                      "training_camp"
                                    ),
                                    class: "rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500"
                                  }, null, 40, ["checked", "onChange"]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("div", { class: "text-sm font-medium text-orange-900" }, " 🏕️ Training Camp "),
                                    createVNode("div", { class: "text-sm text-orange-700" }, " Intensive training program with immersive learning ")
                                  ])
                                ])
                              ])
                            ]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.type
                            }, null, 8, ["message"]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.is_workshop
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "image",
                              value: "Program Image"
                            }),
                            createVNode("div", { class: "mt-2 space-y-4" }, [
                              imagePreview.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "relative"
                              }, [
                                createVNode("img", {
                                  src: imagePreview.value,
                                  alt: unref(form).title,
                                  class: "w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", { class: "mt-2 flex items-center justify-between" }, [
                                  createVNode("div", { class: "text-sm text-gray-600" }, " Preview • Auto-optimized to 800x600px (4:3 ratio) "),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: handleImageDelete,
                                    class: "text-red-600 hover:text-red-800 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                  }, " 🗑️ Delete Image ")
                                ])
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "flex items-center space-x-4" }, [
                                createVNode("input", {
                                  type: "file",
                                  id: "imageUpload",
                                  onChange: handleImageUpload,
                                  accept: "image/jpeg,image/png,image/jpg,image/gif,image/webp",
                                  class: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
                                  disabled: uploadingImage.value
                                }, null, 40, ["disabled"]),
                                uploadingImage.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center text-blue-600"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "animate-spin h-4 w-4 mr-2",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("circle", {
                                      class: "opacity-25",
                                      cx: "12",
                                      cy: "12",
                                      r: "10",
                                      stroke: "currentColor",
                                      "stroke-width": "4",
                                      fill: "none"
                                    }),
                                    createVNode("path", {
                                      class: "opacity-75",
                                      fill: "currentColor",
                                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    })
                                  ])),
                                  createTextVNode(" Uploading... ")
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-lg p-4" }, [
                                createVNode("h4", { class: "text-sm font-semibold text-blue-900 mb-2" }, " 📸 Smart Image Processing: "),
                                createVNode("ul", { class: "text-sm text-blue-700 space-y-1" }, [
                                  createVNode("li", null, [
                                    createTextVNode(" • "),
                                    createVNode("strong", null, "Auto-optimization:"),
                                    createTextVNode(" Images automatically resized to 800x600px (4:3 ratio) ")
                                  ]),
                                  createVNode("li", null, [
                                    createTextVNode(" • "),
                                    createVNode("strong", null, "Format conversion:"),
                                    createTextVNode(" All images converted to WebP for optimal performance ")
                                  ]),
                                  createVNode("li", null, [
                                    createTextVNode(" • "),
                                    createVNode("strong", null, "Maximum file size:"),
                                    createTextVNode(" 5MB before processing ")
                                  ]),
                                  createVNode("li", null, [
                                    createTextVNode(" • "),
                                    createVNode("strong", null, "Supported formats:"),
                                    createTextVNode(" JPEG, PNG, JPG, GIF, WebP ")
                                  ]),
                                  createVNode("li", null, [
                                    createTextVNode(" • "),
                                    createVNode("strong", null, "Quality:"),
                                    createTextVNode(" 85% compression for perfect balance of size and quality ")
                                  ]),
                                  createVNode("li", null, [
                                    createTextVNode(" • "),
                                    createVNode("strong", null, "Best practice:"),
                                    createTextVNode(" Upload high-resolution images - we'll optimize them! ")
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "border-t border-gray-200 pt-4" }, [
                                createVNode(_sfc_main$1, {
                                  for: "imageUrl",
                                  value: "Or enter image URL manually"
                                }),
                                createVNode(_sfc_main$2, {
                                  id: "imageUrl",
                                  modelValue: unref(form).image,
                                  "onUpdate:modelValue": ($event) => unref(form).image = $event,
                                  type: "url",
                                  class: "mt-1 block w-full",
                                  placeholder: "https://example.com/image.jpg"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode(_sfc_main$3, {
                              class: "mt-2",
                              message: unref(form).errors.image
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$1, {
                            for: "description",
                            value: "Description"
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            class: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                            placeholder: "Detailed program description..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode(_sfc_main$3, {
                            class: "mt-2",
                            message: unref(form).errors.description
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$1, { value: "Program Features" }),
                          createVNode("div", { class: "mt-2 space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feature, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "flex items-center space-x-2"
                              }, [
                                createVNode("span", { class: "flex-1 px-3 py-2 bg-gray-100 rounded" }, toDisplayString(feature), 1),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeFeature(index),
                                  class: "text-red-600 hover:text-red-800"
                                }, " Remove ", 8, ["onClick"])
                              ]);
                            }), 128)),
                            createVNode("div", { class: "flex space-x-2" }, [
                              createVNode(_sfc_main$2, {
                                modelValue: newFeature.value,
                                "onUpdate:modelValue": ($event) => newFeature.value = $event,
                                type: "text",
                                class: "flex-1",
                                placeholder: "Add a feature...",
                                onKeydown: withKeys(withModifiers(addFeature, ["prevent"]), ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"]),
                              createVNode("button", {
                                type: "button",
                                onClick: addFeature,
                                class: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                              }, " Add ")
                            ])
                          ]),
                          createVNode(_sfc_main$3, {
                            class: "mt-2",
                            message: unref(form).errors.features
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "bg-orange-50 border border-orange-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-orange-900 mb-4" }, " 🎟️ Ticket Management (Scarcity Control) "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "available_tickets",
                                value: "Available Tickets"
                              }),
                              createVNode(_sfc_main$2, {
                                id: "available_tickets",
                                modelValue: unref(form).available_tickets,
                                "onUpdate:modelValue": ($event) => unref(form).available_tickets = $event,
                                type: "number",
                                min: "0",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., 50 (leave empty for unlimited)"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "mt-1 text-xs text-gray-600" }, " Set a limit to create scarcity effect. Leave empty for unlimited enrollment. "),
                              createVNode(_sfc_main$3, {
                                class: "mt-2",
                                message: unref(form).errors.available_tickets
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "sold_tickets",
                                value: "Sold Tickets"
                              }),
                              createVNode(_sfc_main$2, {
                                id: "sold_tickets",
                                modelValue: unref(form).sold_tickets,
                                "onUpdate:modelValue": ($event) => unref(form).sold_tickets = $event,
                                type: "number",
                                min: "0",
                                class: "mt-1 block w-full",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "mt-1 text-xs text-gray-600" }, " Current number of sold tickets (usually starts at 0). "),
                              createVNode(_sfc_main$3, {
                                class: "mt-2",
                                message: unref(form).errors.sold_tickets
                              }, null, 8, ["message"])
                            ])
                          ]),
                          unref(form).available_tickets ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-4 p-4 bg-white rounded-lg border border-orange-200"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600" }, "Remaining Tickets:"),
                              createVNode("span", {
                                class: [
                                  "font-bold",
                                  unref(form).available_tickets - (unref(form).sold_tickets || 0) <= 5 ? "text-red-600" : "text-green-600"
                                ]
                              }, toDisplayString(unref(form).available_tickets - (unref(form).sold_tickets || 0)) + " / " + toDisplayString(unref(form).available_tickets), 3)
                            ]),
                            createVNode("div", { class: "mt-2 w-full bg-gray-200 rounded-full h-2" }, [
                              createVNode("div", {
                                class: [
                                  "h-2 rounded-full transition-all duration-300",
                                  (unref(form).sold_tickets || 0) / unref(form).available_tickets > 0.8 ? "bg-red-500" : (unref(form).sold_tickets || 0) / unref(form).available_tickets > 0.6 ? "bg-orange-500" : "bg-green-500"
                                ],
                                style: {
                                  width: Math.min(
                                    (unref(form).sold_tickets || 0) / unref(form).available_tickets * 100,
                                    100
                                  ) + "%"
                                }
                              }, null, 6)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center justify-end" }, [
                          createVNode(PrimaryButton, {
                            class: ["ml-4", { "opacity-25": unref(form).processing }],
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Create Program ")
                            ]),
                            _: 1
                          }, 8, ["class", "disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Programs/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
