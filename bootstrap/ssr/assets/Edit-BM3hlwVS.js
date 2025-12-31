import { ref, computed, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, createBlock, openBlock, toDisplayString, withModifiers, withDirectives, Fragment, renderList, vModelSelect, vModelText, createCommentVNode, withKeys, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-KyMrG-Br.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputLabel-BdCx2Ft7.js";
import { P as PrimaryButton } from "./PrimaryButton-CIooT64n.js";
import { _ as _sfc_main$3 } from "./TextInput-BEWjE_Xr.js";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import "./AdminLayout-VxMcYlr7.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    session: Object,
    trainingCamps: Array,
    schools: Array
  },
  setup(__props) {
    const props = __props;
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
      date: props.session.date ? new Date(props.session.date).toISOString().split("T")[0] : "",
      start_date: props.session.start_date ? new Date(props.session.start_date).toISOString().split("T")[0] : "",
      end_date: props.session.end_date ? new Date(props.session.end_date).toISOString().split("T")[0] : "",
      // time: props.session.time,
      timezone: props.session.timezone || "",
      available_spots: props.session.available_spots,
      booked_spots: props.session.booked_spots,
      // price_override: props.session.price_override || '',
      is_active: props.session.is_active,
      is_featured: props.session.is_featured,
      special_notes: props.session.special_notes || "",
      metadata: props.session.metadata || {}
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
    const submit = () => {
      form.put(route("admin.training-camp-sessions.update", props.session.id));
    };
    computed(() => {
      return props.trainingCamps.find((t) => t.id === parseInt(form.program_id));
    });
    const togglePublish = () => {
      const action = props.session.is_active ? "send to draft" : "publish";
      if (confirm(
        `Are you sure you want to ${action} this training camp session?`
      )) {
        router.post(
          route(
            "admin.training-camp-sessions.toggle-publish",
            props.session.id
          )
        );
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Training Camp Session" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}> Edit Training Camp Session </h2><p class="text-gray-600 mt-1"${_scopeId}>${ssrInterpolate(__props.session.location)} - ${ssrInterpolate((_a = __props.session.program) == null ? void 0 : _a.title)}</p></div><div class="flex items-center space-x-3"${_scopeId}><button class="${ssrRenderClass([
              __props.session.is_active ? "text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200" : "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 border border-green-200",
              "px-4 py-2 rounded-lg transition-colors font-medium"
            ])}"${_scopeId}>${ssrInterpolate(__props.session.is_active ? "📝 Send to Draft" : "📢 Publish")}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route(
                "admin.training-camp-sessions.index"
              ),
              class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← Back to Sessions `);
                } else {
                  return [
                    createTextVNode(" ← Back to Sessions ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><form class="space-y-8"${_scopeId}><div class="bg-orange-50 border border-orange-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-orange-900 mb-4"${_scopeId}> 🏕️ Training Camp Selection </h3><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "program_id",
              value: "Training Camp Program"
            }, null, _parent2, _scopeId));
            _push2(`<select id="program_id" class="mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).program_id) ? ssrLooseContain(unref(form).program_id, "") : ssrLooseEqual(unref(form).program_id, "")) ? " selected" : ""}${_scopeId}> Choose a training camp... </option><!--[-->`);
            ssrRenderList(__props.trainingCamps, (camp) => {
              _push2(`<option${ssrRenderAttr("value", camp.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).program_id) ? ssrLooseContain(unref(form).program_id, camp.id) : ssrLooseEqual(unref(form).program_id, camp.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(camp.title)} (Base: $${ssrInterpolate(camp.base_price)}) </option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.program_id
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-indigo-50 border border-indigo-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-indigo-900 mb-4"${_scopeId}> 🏫 School Selection </h3><div class="grid grid-cols-1 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "school_id",
              value: "Select School (Optional)"
            }, null, _parent2, _scopeId));
            _push2(`<select id="school_id" class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).school_id) ? ssrLooseContain(unref(form).school_id, "") : ssrLooseEqual(unref(form).school_id, "")) ? " selected" : ""}${_scopeId}> Select an existing school... </option><!--[-->`);
            ssrRenderList(__props.schools, (school) => {
              _push2(`<option${ssrRenderAttr("value", school.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).school_id) ? ssrLooseContain(unref(form).school_id, school.id) : ssrLooseEqual(unref(form).school_id, school.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(school.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.school_id
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1 text-xs text-gray-600"${_scopeId}> Choose from existing schools or create a new one below </div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "new_school_name",
              value: "Or Create New School"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "new_school_name",
              modelValue: unref(form).new_school_name,
              "onUpdate:modelValue": ($event) => unref(form).new_school_name = $event,
              type: "text",
              onInput: clearSchoolWhenNewNameEntered,
              class: "mt-1 block w-full",
              placeholder: "e.g., Mountain Adventure Academy",
              disabled: !!unref(form).school_id
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.new_school_name
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1 text-xs text-gray-600"${_scopeId}>`);
            if (unref(form).school_id) {
              _push2(`<span${_scopeId}>Clear the school selection above to create a new school</span>`);
            } else {
              _push2(`<span${_scopeId}>Enter a new school name to create it automatically</span>`);
            }
            _push2(`</div></div></div></div><div class="bg-green-50 border border-green-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-green-900 mb-4"${_scopeId}> ⛰️ Location Details </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "location",
              value: "Location Name *"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "location",
              modelValue: unref(form).location,
              "onUpdate:modelValue": ($event) => unref(form).location = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.location
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
              class: "mt-1 block w-full"
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
              class: "mt-1 block w-full"
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
              maxlength: "3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.country_code
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "venue_name",
              value: "Venue Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "venue_name",
              modelValue: unref(form).venue_name,
              "onUpdate:modelValue": ($event) => unref(form).venue_name = $event,
              type: "text",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.venue_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "venue_address",
              value: "Venue Address"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="venue_address" class="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm" rows="2"${_scopeId}>${ssrInterpolate(unref(form).venue_address)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.venue_address
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "organization_logo",
              value: "Organization Logo"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 space-y-3"${_scopeId}>`);
            if (logoPreview.value) {
              _push2(`<div class="flex items-center space-x-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img${ssrRenderAttr("src", logoPreview.value)} alt="Organization Logo" class="h-16 w-16 object-contain border border-gray-300 rounded-lg bg-white p-2"${_scopeId}></div><div class="flex-1"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}> Current organization logo </p><button type="button" class="mt-1 text-red-600 hover:text-red-800 text-sm"${_scopeId}> Remove Logo </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center space-x-4"${_scopeId}><label for="logo_upload" class="${ssrRenderClass([{
              "opacity-50": logoUploading.value
            }, "cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"])}"${_scopeId}>`);
            if (logoUploading.value) {
              _push2(`<span${_scopeId}>🔄 Uploading...</span>`);
            } else {
              _push2(`<span${_scopeId}>📁 ${ssrInterpolate(logoPreview.value ? "Change Logo" : "Upload Logo")}</span>`);
            }
            _push2(`</label><input id="logo_upload" type="file" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml" class="hidden"${ssrIncludeBooleanAttr(logoUploading.value) ? " disabled" : ""}${_scopeId}><div class="text-xs text-gray-500"${_scopeId}> Max 2MB • JPEG, PNG, SVG, WebP supported<br${_scopeId}> Images are automatically resized to 64x64px </div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.organization_logo
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { value: "Location Highlights" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 space-y-2"${_scopeId}><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: newHighlight.value,
              "onUpdate:modelValue": ($event) => newHighlight.value = $event,
              type: "text",
              class: "flex-1",
              placeholder: "e.g., Mountain Views, Adventure Activities",
              onKeyup: addHighlight
            }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"${_scopeId}> Add </button></div>`);
            if (unref(form).location_highlights.length > 0) {
              _push2(`<div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).location_highlights, (highlight, index) => {
                _push2(`<span class="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full border border-green-200"${_scopeId}> ✨ ${ssrInterpolate(highlight)} <button type="button" class="ml-2 text-green-600 hover:text-green-800"${_scopeId}> × </button></span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-orange-50 border border-orange-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-orange-900 mb-4"${_scopeId}> 📅 Schedule &amp; Capacity </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "date",
              value: "Primary Date *"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "date",
              modelValue: unref(form).date,
              "onUpdate:modelValue": ($event) => unref(form).date = $event,
              type: "date",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1 text-xs text-gray-600"${_scopeId}> Main session date for listings </div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.date
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "start_date",
              value: "Start Date (Optional)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "start_date",
              modelValue: unref(form).start_date,
              "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
              type: "date",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1 text-xs text-gray-600"${_scopeId}> For multi-day camps </div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.start_date
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "end_date",
              value: "End Date (Optional)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "end_date",
              modelValue: unref(form).end_date,
              "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
              type: "date",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1 text-xs text-gray-600"${_scopeId}> For multi-day camps </div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.end_date
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "timezone",
              value: "Timezone"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "timezone",
              modelValue: unref(form).timezone,
              "onUpdate:modelValue": ($event) => unref(form).timezone = $event,
              type: "text",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.timezone
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "available_spots",
              value: "Available Spots *"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "available_spots",
              modelValue: unref(form).available_spots,
              "onUpdate:modelValue": ($event) => unref(form).available_spots = $event,
              type: "number",
              min: "1",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.available_spots
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "booked_spots",
              value: "Booked Spots"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "booked_spots",
              modelValue: unref(form).booked_spots,
              "onUpdate:modelValue": ($event) => unref(form).booked_spots = $event,
              type: "number",
              min: "0",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.booked_spots
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-purple-50 border border-purple-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-purple-900 mb-4"${_scopeId}> ⚙️ Additional Settings </h3><div class="space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "special_notes",
              value: "Special Notes"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="special_notes" class="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm" rows="3"${_scopeId}>${ssrInterpolate(unref(form).special_notes)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.special_notes
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center space-x-6"${_scopeId}><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"${_scopeId}><span class="ml-2 text-sm text-gray-700"${_scopeId}>Active Session</span></label><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_featured) ? ssrLooseContain(unref(form).is_featured, null) : unref(form).is_featured) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"${_scopeId}><span class="ml-2 text-sm text-gray-700"${_scopeId}>Featured Session</span></label></div></div></div><div class="flex items-center justify-end space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route(
                "admin.training-camp-sessions.index"
              ),
              class: "bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded transition-colors"
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
            _push2(ssrRenderComponent(PrimaryButton, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(`<span${_scopeId2}>Updating...</span>`);
                  } else {
                    _push3(`<span${_scopeId2}>Update Session</span>`);
                  }
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Updating...")) : (openBlock(), createBlock("span", { key: 1 }, "Update Session"))
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
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, " Edit Training Camp Session "),
                          createVNode("p", { class: "text-gray-600 mt-1" }, toDisplayString(__props.session.location) + " - " + toDisplayString((_b = __props.session.program) == null ? void 0 : _b.title), 1)
                        ]),
                        createVNode("div", { class: "flex items-center space-x-3" }, [
                          createVNode("button", {
                            onClick: togglePublish,
                            class: [
                              __props.session.is_active ? "text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200" : "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 border border-green-200",
                              "px-4 py-2 rounded-lg transition-colors font-medium"
                            ]
                          }, toDisplayString(__props.session.is_active ? "📝 Send to Draft" : "📢 Publish"), 3),
                          createVNode(unref(Link), {
                            href: _ctx.route(
                              "admin.training-camp-sessions.index"
                            ),
                            class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" ← Back to Sessions ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        createVNode("div", { class: "bg-orange-50 border border-orange-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-orange-900 mb-4" }, " 🏕️ Training Camp Selection "),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "program_id",
                              value: "Training Camp Program"
                            }),
                            withDirectives(createVNode("select", {
                              id: "program_id",
                              "onUpdate:modelValue": ($event) => unref(form).program_id = $event,
                              class: "mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm",
                              required: ""
                            }, [
                              createVNode("option", { value: "" }, " Choose a training camp... "),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.trainingCamps, (camp) => {
                                return openBlock(), createBlock("option", {
                                  key: camp.id,
                                  value: camp.id
                                }, toDisplayString(camp.title) + " (Base: $" + toDisplayString(camp.base_price) + ") ", 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).program_id]
                            ]),
                            createVNode(_sfc_main$2, {
                              class: "mt-2",
                              message: unref(form).errors.program_id
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "bg-indigo-50 border border-indigo-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-indigo-900 mb-4" }, " 🏫 School Selection "),
                          createVNode("div", { class: "grid grid-cols-1 gap-4" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "school_id",
                                value: "Select School (Optional)"
                              }),
                              withDirectives(createVNode("select", {
                                id: "school_id",
                                "onUpdate:modelValue": ($event) => unref(form).school_id = $event,
                                onChange: clearNewSchoolWhenExistingSelected,
                                class: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                              }, [
                                createVNode("option", { value: "" }, " Select an existing school... "),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.schools, (school) => {
                                  return openBlock(), createBlock("option", {
                                    key: school.id,
                                    value: school.id
                                  }, toDisplayString(school.name), 9, ["value"]);
                                }), 128))
                              ], 40, ["onUpdate:modelValue", "onChange"]), [
                                [vModelSelect, unref(form).school_id]
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.school_id
                              }, null, 8, ["message"]),
                              createVNode("div", { class: "mt-1 text-xs text-gray-600" }, " Choose from existing schools or create a new one below ")
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "new_school_name",
                                value: "Or Create New School"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "new_school_name",
                                modelValue: unref(form).new_school_name,
                                "onUpdate:modelValue": ($event) => unref(form).new_school_name = $event,
                                type: "text",
                                onInput: clearSchoolWhenNewNameEntered,
                                class: "mt-1 block w-full",
                                placeholder: "e.g., Mountain Adventure Academy",
                                disabled: !!unref(form).school_id
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput", "disabled"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.new_school_name
                              }, null, 8, ["message"]),
                              createVNode("div", { class: "mt-1 text-xs text-gray-600" }, [
                                unref(form).school_id ? (openBlock(), createBlock("span", { key: 0 }, "Clear the school selection above to create a new school")) : (openBlock(), createBlock("span", { key: 1 }, "Enter a new school name to create it automatically"))
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "bg-green-50 border border-green-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-green-900 mb-4" }, " ⛰️ Location Details "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "location",
                                value: "Location Name *"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "location",
                                modelValue: unref(form).location,
                                "onUpdate:modelValue": ($event) => unref(form).location = $event,
                                type: "text",
                                class: "mt-1 block w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.location
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
                                class: "mt-1 block w-full"
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
                                class: "mt-1 block w-full"
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
                                maxlength: "3"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.country_code
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$1, {
                                for: "venue_name",
                                value: "Venue Name"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "venue_name",
                                modelValue: unref(form).venue_name,
                                "onUpdate:modelValue": ($event) => unref(form).venue_name = $event,
                                type: "text",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.venue_name
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$1, {
                                for: "venue_address",
                                value: "Venue Address"
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "venue_address",
                                "onUpdate:modelValue": ($event) => unref(form).venue_address = $event,
                                class: "mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm",
                                rows: "2"
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
                                for: "organization_logo",
                                value: "Organization Logo"
                              }),
                              createVNode("div", { class: "mt-2 space-y-3" }, [
                                logoPreview.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center space-x-4"
                                }, [
                                  createVNode("div", { class: "flex-shrink-0" }, [
                                    createVNode("img", {
                                      src: logoPreview.value,
                                      alt: "Organization Logo",
                                      class: "h-16 w-16 object-contain border border-gray-300 rounded-lg bg-white p-2"
                                    }, null, 8, ["src"])
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("p", { class: "text-sm text-gray-600" }, " Current organization logo "),
                                    createVNode("button", {
                                      type: "button",
                                      onClick: removeLogo,
                                      class: "mt-1 text-red-600 hover:text-red-800 text-sm"
                                    }, " Remove Logo ")
                                  ])
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "flex items-center space-x-4" }, [
                                  createVNode("label", {
                                    for: "logo_upload",
                                    class: ["cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500", {
                                      "opacity-50": logoUploading.value
                                    }]
                                  }, [
                                    logoUploading.value ? (openBlock(), createBlock("span", { key: 0 }, "🔄 Uploading...")) : (openBlock(), createBlock("span", { key: 1 }, "📁 " + toDisplayString(logoPreview.value ? "Change Logo" : "Upload Logo"), 1))
                                  ], 2),
                                  createVNode("input", {
                                    id: "logo_upload",
                                    type: "file",
                                    accept: "image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml",
                                    onChange: handleLogoUpload,
                                    class: "hidden",
                                    disabled: logoUploading.value
                                  }, null, 40, ["disabled"]),
                                  createVNode("div", { class: "text-xs text-gray-500" }, [
                                    createTextVNode(" Max 2MB • JPEG, PNG, SVG, WebP supported"),
                                    createVNode("br"),
                                    createTextVNode(" Images are automatically resized to 64x64px ")
                                  ])
                                ])
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.organization_logo
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "mt-6" }, [
                            createVNode(_sfc_main$1, { value: "Location Highlights" }),
                            createVNode("div", { class: "mt-2 space-y-2" }, [
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode(_sfc_main$3, {
                                  modelValue: newHighlight.value,
                                  "onUpdate:modelValue": ($event) => newHighlight.value = $event,
                                  type: "text",
                                  class: "flex-1",
                                  placeholder: "e.g., Mountain Views, Adventure Activities",
                                  onKeyup: withKeys(addHighlight, ["enter"])
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addHighlight,
                                  class: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                                }, " Add ")
                              ]),
                              unref(form).location_highlights.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex flex-wrap gap-2"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(form).location_highlights, (highlight, index) => {
                                  return openBlock(), createBlock("span", {
                                    key: index,
                                    class: "inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full border border-green-200"
                                  }, [
                                    createTextVNode(" ✨ " + toDisplayString(highlight) + " ", 1),
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removeHighlight(index),
                                      class: "ml-2 text-green-600 hover:text-green-800"
                                    }, " × ", 8, ["onClick"])
                                  ]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "bg-orange-50 border border-orange-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-orange-900 mb-4" }, " 📅 Schedule & Capacity "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "date",
                                value: "Primary Date *"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "date",
                                modelValue: unref(form).date,
                                "onUpdate:modelValue": ($event) => unref(form).date = $event,
                                type: "date",
                                class: "mt-1 block w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "mt-1 text-xs text-gray-600" }, " Main session date for listings "),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.date
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "start_date",
                                value: "Start Date (Optional)"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "start_date",
                                modelValue: unref(form).start_date,
                                "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                                type: "date",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "mt-1 text-xs text-gray-600" }, " For multi-day camps "),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.start_date
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "end_date",
                                value: "End Date (Optional)"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "end_date",
                                modelValue: unref(form).end_date,
                                "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                                type: "date",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "mt-1 text-xs text-gray-600" }, " For multi-day camps "),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.end_date
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "timezone",
                                value: "Timezone"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "timezone",
                                modelValue: unref(form).timezone,
                                "onUpdate:modelValue": ($event) => unref(form).timezone = $event,
                                type: "text",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.timezone
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "available_spots",
                                value: "Available Spots *"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "available_spots",
                                modelValue: unref(form).available_spots,
                                "onUpdate:modelValue": ($event) => unref(form).available_spots = $event,
                                type: "number",
                                min: "1",
                                class: "mt-1 block w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.available_spots
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "booked_spots",
                                value: "Booked Spots"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "booked_spots",
                                modelValue: unref(form).booked_spots,
                                "onUpdate:modelValue": ($event) => unref(form).booked_spots = $event,
                                type: "number",
                                min: "0",
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.booked_spots
                              }, null, 8, ["message"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "bg-purple-50 border border-purple-200 rounded-lg p-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-purple-900 mb-4" }, " ⚙️ Additional Settings "),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$1, {
                                for: "special_notes",
                                value: "Special Notes"
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "special_notes",
                                "onUpdate:modelValue": ($event) => unref(form).special_notes = $event,
                                class: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                                rows: "3"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).special_notes]
                              ]),
                              createVNode(_sfc_main$2, {
                                class: "mt-2",
                                message: unref(form).errors.special_notes
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "flex items-center space-x-6" }, [
                              createVNode("label", { class: "flex items-center" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                                  type: "checkbox",
                                  class: "rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelCheckbox, unref(form).is_active]
                                ]),
                                createVNode("span", { class: "ml-2 text-sm text-gray-700" }, "Active Session")
                              ]),
                              createVNode("label", { class: "flex items-center" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).is_featured = $event,
                                  type: "checkbox",
                                  class: "rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelCheckbox, unref(form).is_featured]
                                ]),
                                createVNode("span", { class: "ml-2 text-sm text-gray-700" }, "Featured Session")
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-end space-x-4" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route(
                              "admin.training-camp-sessions.index"
                            ),
                            class: "bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(PrimaryButton, {
                            class: { "opacity-25": unref(form).processing },
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Updating...")) : (openBlock(), createBlock("span", { key: 1 }, "Update Session"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/TrainingCampSessions/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
