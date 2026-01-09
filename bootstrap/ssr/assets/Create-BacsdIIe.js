import { ref, computed, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, withModifiers, withDirectives, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, withKeys, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-b70BBPZG.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputLabel-BdCx2Ft7.js";
import { _ as _sfc_main$3 } from "./TextInput-BEWjE_Xr.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./AdminLayout-EcLlKyRZ.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    resourcePrograms: Array,
    schools: Array
  },
  setup(__props) {
    const props = __props;
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
      metadata: {}
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
            ).content
          }
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
      var _a;
      return (_a = props.resourcePrograms) == null ? void 0 : _a.find(
        (rp) => rp.id === parseInt(form.resource_program_id)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Create Resource Session" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-4xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-8 bg-white border-b border-gray-200"${_scopeId}><div class="mb-8"${_scopeId}><h2 class="text-3xl font-bold text-gray-900"${_scopeId}>Create Resource Session</h2><p class="text-gray-600 mt-2"${_scopeId}>Add a new session for a resource program in a specific location</p></div><form class="space-y-8"${_scopeId}><div class="bg-orange-50 border border-orange-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-orange-900 mb-4"${_scopeId}>📚 Resource Program Selection</h3><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "resource_program_id",
              value: "Select Resource Program"
            }, null, _parent2, _scopeId));
            _push2(`<select id="resource_program_id" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).resource_program_id) ? ssrLooseContain(unref(form).resource_program_id, "") : ssrLooseEqual(unref(form).resource_program_id, "")) ? " selected" : ""}${_scopeId}>-- Select a program --</option><!--[-->`);
            ssrRenderList(__props.resourcePrograms, (program) => {
              _push2(`<option${ssrRenderAttr("value", program.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).resource_program_id) ? ssrLooseContain(unref(form).resource_program_id, program.id) : ssrLooseEqual(unref(form).resource_program_id, program.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(program.title)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.resource_program_id
            }, null, _parent2, _scopeId));
            if (selectedResourceProgram.value) {
              _push2(`<div class="mt-4 p-4 bg-white rounded border border-orange-100"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}><strong${_scopeId}>Program Details:</strong> ${ssrInterpolate(selectedResourceProgram.value.description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-indigo-50 border border-indigo-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-indigo-900 mb-4"${_scopeId}>🏫 School / Organization</h3><div class="grid grid-cols-1 gap-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "school_id",
              value: "Select Existing School"
            }, null, _parent2, _scopeId));
            _push2(`<select id="school_id" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).school_id) ? ssrLooseContain(unref(form).school_id, "") : ssrLooseEqual(unref(form).school_id, "")) ? " selected" : ""}${_scopeId}>-- Select a school --</option><!--[-->`);
            ssrRenderList(__props.schools, (school) => {
              _push2(`<option${ssrRenderAttr("value", school.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).school_id) ? ssrLooseContain(unref(form).school_id, school.id) : ssrLooseEqual(unref(form).school_id, school.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(school.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.school_id
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (!unref(form).school_id) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                for: "new_school_name",
                value: "Or Create New School"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "new_school_name",
                modelValue: unref(form).new_school_name,
                "onUpdate:modelValue": ($event) => unref(form).new_school_name = $event,
                type: "text",
                class: "mt-1 block w-full",
                placeholder: "Enter school name",
                onInput: clearSchoolWhenNewNameEntered
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: "mt-2",
                message: unref(form).errors.new_school_name
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-green-50 border border-green-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-green-900 mb-4"${_scopeId}>🌍 Location Details</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "location",
              value: "Location Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "location",
              modelValue: unref(form).location,
              "onUpdate:modelValue": ($event) => unref(form).location = $event,
              type: "text",
              class: "mt-1 block w-full",
              placeholder: "e.g., Downtown Center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.location
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "venue_name",
              value: "Venue Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "venue_name",
              modelValue: unref(form).venue_name,
              "onUpdate:modelValue": ($event) => unref(form).venue_name = $event,
              type: "text",
              class: "mt-1 block w-full",
              placeholder: "e.g., Grand Hall"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.venue_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "city",
              value: "City"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "city",
              modelValue: unref(form).city,
              "onUpdate:modelValue": ($event) => unref(form).city = $event,
              type: "text",
              class: "mt-1 block w-full",
              placeholder: "e.g., Istanbul"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.city
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "country",
              value: "Country"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "country",
              modelValue: unref(form).country,
              "onUpdate:modelValue": ($event) => unref(form).country = $event,
              type: "text",
              class: "mt-1 block w-full",
              placeholder: "e.g., Turkey"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.country
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "country_code",
              value: "Country Code"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "country_code",
              modelValue: unref(form).country_code,
              "onUpdate:modelValue": ($event) => unref(form).country_code = $event,
              type: "text",
              class: "mt-1 block w-full",
              placeholder: "e.g., TR",
              maxlength: "2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.country_code
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "venue_address",
              value: "Complete Venue Address"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="venue_address" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="3" placeholder="Full address including street, postal code, etc."${_scopeId}>${ssrInterpolate(unref(form).venue_address)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.venue_address
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "location_highlights",
              value: "Location Highlights"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2"${_scopeId}><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "location_highlights",
              modelValue: newHighlight.value,
              "onUpdate:modelValue": ($event) => newHighlight.value = $event,
              type: "text",
              class: "flex-1",
              placeholder: "e.g., Swimming Pool, WiFi, Cafeteria",
              onKeyup: addHighlight
            }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"${_scopeId}> Add </button></div>`);
            if (unref(form).location_highlights.length > 0) {
              _push2(`<div class="mt-3 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).location_highlights, (highlight, index) => {
                _push2(`<span class="inline-flex items-center gap-2 px-3 py-1 bg-white border border-green-200 rounded-full text-sm text-green-700"${_scopeId}>${ssrInterpolate(highlight)} <button type="button" class="text-green-600 hover:text-green-800"${_scopeId}> × </button></span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.location_highlights
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "organization_logo",
              value: "Organization Logo"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 flex gap-4"${_scopeId}>`);
            if (logoPreview.value) {
              _push2(`<div class="relative"${_scopeId}><img${ssrRenderAttr("src", logoPreview.value)} alt="Organization Logo" class="h-24 w-24 object-cover rounded-lg border border-gray-300"${_scopeId}><button type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"${_scopeId}> × </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex-1"${_scopeId}><input id="organization_logo" type="file" accept="image/*"${ssrIncludeBooleanAttr(logoUploading.value) ? " disabled" : ""} class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"${_scopeId}><p class="text-xs text-gray-500 mt-1"${_scopeId}>PNG, JPG up to 5MB</p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.organization_logo
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div></div><div class="bg-orange-50 border border-orange-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-orange-900 mb-4"${_scopeId}>📅 Schedule</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "date",
              value: "Single Date (if applicable)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "date",
              modelValue: unref(form).date,
              "onUpdate:modelValue": ($event) => unref(form).date = $event,
              type: "date",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.date
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "timezone",
              value: "Timezone"
            }, null, _parent2, _scopeId));
            _push2(`<select id="timezone" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).timezone) ? ssrLooseContain(unref(form).timezone, "") : ssrLooseEqual(unref(form).timezone, "")) ? " selected" : ""}${_scopeId}>-- Select timezone --</option><option value="UTC"${ssrIncludeBooleanAttr(Array.isArray(unref(form).timezone) ? ssrLooseContain(unref(form).timezone, "UTC") : ssrLooseEqual(unref(form).timezone, "UTC")) ? " selected" : ""}${_scopeId}>UTC (Coordinated Universal Time)</option><option value="Europe/Istanbul"${ssrIncludeBooleanAttr(Array.isArray(unref(form).timezone) ? ssrLooseContain(unref(form).timezone, "Europe/Istanbul") : ssrLooseEqual(unref(form).timezone, "Europe/Istanbul")) ? " selected" : ""}${_scopeId}>Europe/Istanbul</option><option value="Europe/London"${ssrIncludeBooleanAttr(Array.isArray(unref(form).timezone) ? ssrLooseContain(unref(form).timezone, "Europe/London") : ssrLooseEqual(unref(form).timezone, "Europe/London")) ? " selected" : ""}${_scopeId}>Europe/London</option><option value="America/New_York"${ssrIncludeBooleanAttr(Array.isArray(unref(form).timezone) ? ssrLooseContain(unref(form).timezone, "America/New_York") : ssrLooseEqual(unref(form).timezone, "America/New_York")) ? " selected" : ""}${_scopeId}>America/New_York</option><option value="Asia/Tokyo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).timezone) ? ssrLooseContain(unref(form).timezone, "Asia/Tokyo") : ssrLooseEqual(unref(form).timezone, "Asia/Tokyo")) ? " selected" : ""}${_scopeId}>Asia/Tokyo</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.timezone
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "start_date",
              value: "Start Date"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "start_date",
              modelValue: unref(form).start_date,
              "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
              type: "date",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.start_date
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "end_date",
              value: "End Date"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "end_date",
              modelValue: unref(form).end_date,
              "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
              type: "date",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.end_date
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-purple-50 border border-purple-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-purple-900 mb-4"${_scopeId}>⚙️ Capacity &amp; Settings</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "available_spots",
              value: "Total Available Spots"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "available_spots",
              modelValue: unref(form).available_spots,
              "onUpdate:modelValue": ($event) => unref(form).available_spots = $event,
              type: "number",
              class: "mt-1 block w-full",
              placeholder: "e.g., 50"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.available_spots
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "booked_spots",
              value: "Currently Booked"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "booked_spots",
              modelValue: unref(form).booked_spots,
              "onUpdate:modelValue": ($event) => unref(form).booked_spots = $event,
              type: "number",
              class: "mt-1 block w-full",
              placeholder: "e.g., 0",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-gray-600 mt-1"${_scopeId}>Read-only: Auto-calculated from registrations</p></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "price_override",
              value: "Custom Price (Optional)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "price_override",
              modelValue: unref(form).price_override,
              "onUpdate:modelValue": ($event) => unref(form).price_override = $event,
              type: "number",
              step: "0.01",
              class: "mt-1 block w-full",
              placeholder: "Leave empty to use program default"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.price_override
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}><label class="flex items-center gap-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_featured) ? ssrLooseContain(unref(form).is_featured, null) : unref(form).is_featured) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"${_scopeId}><span class="text-sm font-medium text-gray-700"${_scopeId}>⭐ Featured Session (Show on homepage)</span></label></div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "special_notes",
              value: "Special Notes for Participants"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="special_notes" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" rows="3" placeholder="Any important information participants should know..."${_scopeId}>${ssrInterpolate(unref(form).special_notes)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.special_notes
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="flex gap-3 pt-6"${_scopeId}><button type="button"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg transition-colors disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Saving..." : "📝 Save as Draft")}</button><button type="button"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Creating..." : "✅ Create & Publish")}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.resource-sessions.index"),
              class: "px-6 py-2 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-4xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-8 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "mb-8" }, [
                        createVNode("h2", { class: "text-3xl font-bold text-gray-900" }, "Create Resource Session"),
                        createVNode("p", { class: "text-gray-600 mt-2" }, "Add a new session for a resource program in a specific location")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitAsDraft, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        createVNode("div", { class: "bg-orange-50 border border-orange-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-orange-900 mb-4" }, "📚 Resource Program Selection"),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "resource_program_id",
                              value: "Select Resource Program"
                            }),
                            withDirectives(createVNode("select", {
                              id: "resource_program_id",
                              "onUpdate:modelValue": ($event) => unref(form).resource_program_id = $event,
                              onChange: clearNewSchoolWhenExistingSelected,
                              class: "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            }, [
                              createVNode("option", { value: "" }, "-- Select a program --"),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.resourcePrograms, (program) => {
                                return openBlock(), createBlock("option", {
                                  key: program.id,
                                  value: program.id
                                }, toDisplayString(program.title), 9, ["value"]);
                              }), 128))
                            ], 40, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).resource_program_id]
                            ]),
                            createVNode(_sfc_main$2, {
                              class: "mt-2",
                              message: unref(form).errors.resource_program_id
                            }, null, 8, ["message"]),
                            selectedResourceProgram.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-4 p-4 bg-white rounded border border-orange-100"
                            }, [
                              createVNode("p", { class: "text-sm text-gray-600" }, [
                                createVNode("strong", null, "Program Details:"),
                                createTextVNode(" " + toDisplayString(selectedResourceProgram.value.description), 1)
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "bg-indigo-50 border border-indigo-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-indigo-900 mb-4" }, "🏫 School / Organization"),
                          createVNode("div", { class: "grid grid-cols-1 gap-6" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "school_id",
                                value: "Select Existing School"
                              }),
                              withDirectives(createVNode("select", {
                                id: "school_id",
                                "onUpdate:modelValue": ($event) => unref(form).school_id = $event,
                                onChange: clearNewSchoolWhenExistingSelected,
                                class: "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              }, [
                                createVNode("option", { value: "" }, "-- Select a school --"),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.schools, (school) => {
                                  return openBlock(), createBlock("option", {
                                    key: school.id,
                                    value: school.id
                                  }, toDisplayString(school.name), 9, ["value"]);
                                }), 128))
                              ], 40, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(form).school_id]
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.school_id
                              }, null, 8, ["message"])
                            ]),
                            !unref(form).school_id ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode(_sfc_main$1, {
                                for: "new_school_name",
                                value: "Or Create New School"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "new_school_name",
                                modelValue: unref(form).new_school_name,
                                "onUpdate:modelValue": ($event) => unref(form).new_school_name = $event,
                                type: "text",
                                class: "mt-1 block w-full",
                                placeholder: "Enter school name",
                                onInput: clearSchoolWhenNewNameEntered
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.new_school_name
                              }, null, 8, ["message"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "bg-green-50 border border-green-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-green-900 mb-4" }, "🌍 Location Details"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "location",
                                value: "Location Name"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "location",
                                modelValue: unref(form).location,
                                "onUpdate:modelValue": ($event) => unref(form).location = $event,
                                type: "text",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., Downtown Center"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.location
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "venue_name",
                                value: "Venue Name"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "venue_name",
                                modelValue: unref(form).venue_name,
                                "onUpdate:modelValue": ($event) => unref(form).venue_name = $event,
                                type: "text",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., Grand Hall"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.venue_name
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "city",
                                value: "City"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "city",
                                modelValue: unref(form).city,
                                "onUpdate:modelValue": ($event) => unref(form).city = $event,
                                type: "text",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., Istanbul"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.city
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "country",
                                value: "Country"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "country",
                                modelValue: unref(form).country,
                                "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                type: "text",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., Turkey"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.country
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "country_code",
                                value: "Country Code"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "country_code",
                                modelValue: unref(form).country_code,
                                "onUpdate:modelValue": ($event) => unref(form).country_code = $event,
                                type: "text",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., TR",
                                maxlength: "2"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.country_code
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$1, {
                                for: "venue_address",
                                value: "Complete Venue Address"
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "venue_address",
                                "onUpdate:modelValue": ($event) => unref(form).venue_address = $event,
                                class: "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                rows: "3",
                                placeholder: "Full address including street, postal code, etc."
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).venue_address]
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.venue_address
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$1, {
                                for: "location_highlights",
                                value: "Location Highlights"
                              }),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode("div", { class: "flex gap-2" }, [
                                  createVNode(_sfc_main$3, {
                                    id: "location_highlights",
                                    modelValue: newHighlight.value,
                                    "onUpdate:modelValue": ($event) => newHighlight.value = $event,
                                    type: "text",
                                    class: "flex-1",
                                    placeholder: "e.g., Swimming Pool, WiFi, Cafeteria",
                                    onKeyup: withKeys(addHighlight, ["enter"])
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: addHighlight,
                                    class: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                  }, " Add ")
                                ]),
                                unref(form).location_highlights.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-3 flex flex-wrap gap-2"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(form).location_highlights, (highlight, index) => {
                                    return openBlock(), createBlock("span", {
                                      key: index,
                                      class: "inline-flex items-center gap-2 px-3 py-1 bg-white border border-green-200 rounded-full text-sm text-green-700"
                                    }, [
                                      createTextVNode(toDisplayString(highlight) + " ", 1),
                                      createVNode("button", {
                                        type: "button",
                                        onClick: ($event) => removeHighlight(index),
                                        class: "text-green-600 hover:text-green-800"
                                      }, " × ", 8, ["onClick"])
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.location_highlights
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$1, {
                                for: "organization_logo",
                                value: "Organization Logo"
                              }),
                              createVNode("div", { class: "mt-2 flex gap-4" }, [
                                logoPreview.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "relative"
                                }, [
                                  createVNode("img", {
                                    src: logoPreview.value,
                                    alt: "Organization Logo",
                                    class: "h-24 w-24 object-cover rounded-lg border border-gray-300"
                                  }, null, 8, ["src"]),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: removeLogo,
                                    class: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                  }, " × ")
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("input", {
                                    id: "organization_logo",
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handleLogoUpload,
                                    disabled: logoUploading.value,
                                    class: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                  }, null, 40, ["disabled"]),
                                  createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "PNG, JPG up to 5MB"),
                                  createVNode(_sfc_main$2, {
                                    class: "mt-2",
                                    message: unref(form).errors.organization_logo
                                  }, null, 8, ["message"])
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "bg-orange-50 border border-orange-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-orange-900 mb-4" }, "📅 Schedule"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "date",
                                value: "Single Date (if applicable)"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "date",
                                modelValue: unref(form).date,
                                "onUpdate:modelValue": ($event) => unref(form).date = $event,
                                type: "date",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.date
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "timezone",
                                value: "Timezone"
                              }),
                              withDirectives(createVNode("select", {
                                id: "timezone",
                                "onUpdate:modelValue": ($event) => unref(form).timezone = $event,
                                class: "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              }, [
                                createVNode("option", { value: "" }, "-- Select timezone --"),
                                createVNode("option", { value: "UTC" }, "UTC (Coordinated Universal Time)"),
                                createVNode("option", { value: "Europe/Istanbul" }, "Europe/Istanbul"),
                                createVNode("option", { value: "Europe/London" }, "Europe/London"),
                                createVNode("option", { value: "America/New_York" }, "America/New_York"),
                                createVNode("option", { value: "Asia/Tokyo" }, "Asia/Tokyo")
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(form).timezone]
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.timezone
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "start_date",
                                value: "Start Date"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "start_date",
                                modelValue: unref(form).start_date,
                                "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                                type: "date",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.start_date
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "end_date",
                                value: "End Date"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "end_date",
                                modelValue: unref(form).end_date,
                                "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                                type: "date",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.end_date
                              }, null, 8, ["message"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "bg-purple-50 border border-purple-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-purple-900 mb-4" }, "⚙️ Capacity & Settings"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "available_spots",
                                value: "Total Available Spots"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "available_spots",
                                modelValue: unref(form).available_spots,
                                "onUpdate:modelValue": ($event) => unref(form).available_spots = $event,
                                type: "number",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., 50"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.available_spots
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "booked_spots",
                                value: "Currently Booked"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "booked_spots",
                                modelValue: unref(form).booked_spots,
                                "onUpdate:modelValue": ($event) => unref(form).booked_spots = $event,
                                type: "number",
                                class: "mt-1 block w-full",
                                placeholder: "e.g., 0",
                                readonly: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-gray-600 mt-1" }, "Read-only: Auto-calculated from registrations")
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "price_override",
                                value: "Custom Price (Optional)"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "price_override",
                                modelValue: unref(form).price_override,
                                "onUpdate:modelValue": ($event) => unref(form).price_override = $event,
                                type: "number",
                                step: "0.01",
                                class: "mt-1 block w-full",
                                placeholder: "Leave empty to use program default"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.price_override
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode("label", { class: "flex items-center gap-2" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).is_featured = $event,
                                  type: "checkbox",
                                  class: "rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelCheckbox, unref(form).is_featured]
                                ]),
                                createVNode("span", { class: "text-sm font-medium text-gray-700" }, "⭐ Featured Session (Show on homepage)")
                              ])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$1, {
                                for: "special_notes",
                                value: "Special Notes for Participants"
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "special_notes",
                                "onUpdate:modelValue": ($event) => unref(form).special_notes = $event,
                                class: "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                                rows: "3",
                                placeholder: "Any important information participants should know..."
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).special_notes]
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.special_notes
                              }, null, 8, ["message"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-3 pt-6" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: submitAsDraft,
                            disabled: unref(form).processing,
                            class: "px-6 py-2 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg transition-colors disabled:opacity-50"
                          }, toDisplayString(unref(form).processing ? "Saving..." : "📝 Save as Draft"), 9, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: submitAndPublish,
                            disabled: unref(form).processing,
                            class: "px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
                          }, toDisplayString(unref(form).processing ? "Creating..." : "✅ Create & Publish"), 9, ["disabled"]),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.resource-sessions.index"),
                            class: "px-6 py-2 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ResourceSessions/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
