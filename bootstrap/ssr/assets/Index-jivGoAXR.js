import { ref, watch, onMounted, onUnmounted, mergeProps, useSSRContext, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, withDirectives, vModelText, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AdminLayout-EcLlKyRZ.js";
import { Head, Link } from "@inertiajs/vue3";
import { u as useServerSearch } from "./useServerSearch-C-KcNfn2.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
const _sfc_main$1 = {
  __name: "PaymentExportModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    workshopSessions: {
      type: Array,
      default: () => []
    },
    schools: {
      type: Array,
      default: () => []
    },
    exportRoute: {
      type: String,
      required: true
    }
  },
  emits: ["close", "export"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const exportFilters = ref({
      status: "paid",
      date_from: "",
      date_to: "",
      workshop_session_id: "",
      school_ids: []
      // Changed to array for multi-select
    });
    const selectedSchools = ref([]);
    const schoolDropdownOpen = ref(false);
    watch(selectedSchools, (newValue) => {
      exportFilters.value.school_ids = newValue.map((school) => school.id);
    }, { deep: true });
    const isSchoolSelected = (school) => {
      return selectedSchools.value.some((s) => s.id === school.id);
    };
    const getSelectedSchoolsText = () => {
      if (selectedSchools.value.length === 0) return "All Schools";
      if (selectedSchools.value.length === 1) return selectedSchools.value[0].name;
      if (selectedSchools.value.length === props.schools.length) return "All Schools Selected";
      return `${selectedSchools.value.length} Schools Selected`;
    };
    const handleClickOutside = (event) => {
      if (!event.target.closest(".school-dropdown")) {
        schoolDropdownOpen.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 z-50 overflow-y-auto",
          "aria-labelledby": "modal-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))} data-v-ffa8bd68><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" data-v-ffa8bd68><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" data-v-ffa8bd68></div><div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" data-v-ffa8bd68><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" data-v-ffa8bd68><div class="sm:flex sm:items-start" data-v-ffa8bd68><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10" data-v-ffa8bd68><svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ffa8bd68><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ffa8bd68></path></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" data-v-ffa8bd68><h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title" data-v-ffa8bd68> Export Payments </h3><div class="mt-4 space-y-4" data-v-ffa8bd68><p class="text-sm text-gray-500" data-v-ffa8bd68> Select filters to export payment records as CSV or Excel. Multiple schools will be included in one file. </p><div data-v-ffa8bd68><label for="export-status" class="block text-sm font-medium text-gray-700" data-v-ffa8bd68>Payment Status</label><select id="export-status" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" data-v-ffa8bd68><option value="" data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.status) ? ssrLooseContain(exportFilters.value.status, "") : ssrLooseEqual(exportFilters.value.status, "")) ? " selected" : ""}>All Statuses</option><option value="paid" data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.status) ? ssrLooseContain(exportFilters.value.status, "paid") : ssrLooseEqual(exportFilters.value.status, "paid")) ? " selected" : ""}>Paid</option><option value="pending" data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.status) ? ssrLooseContain(exportFilters.value.status, "pending") : ssrLooseEqual(exportFilters.value.status, "pending")) ? " selected" : ""}>Pending</option><option value="processing" data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.status) ? ssrLooseContain(exportFilters.value.status, "processing") : ssrLooseEqual(exportFilters.value.status, "processing")) ? " selected" : ""}>Processing</option><option value="failed" data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.status) ? ssrLooseContain(exportFilters.value.status, "failed") : ssrLooseEqual(exportFilters.value.status, "failed")) ? " selected" : ""}>Failed</option><option value="refunded" data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.status) ? ssrLooseContain(exportFilters.value.status, "refunded") : ssrLooseEqual(exportFilters.value.status, "refunded")) ? " selected" : ""}>Refunded</option></select></div>`);
        if (__props.workshopSessions.length > 0) {
          _push(`<div data-v-ffa8bd68><label for="export-workshop" class="block text-sm font-medium text-gray-700" data-v-ffa8bd68>Workshop Session</label><select id="export-workshop" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" data-v-ffa8bd68><option value="" data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.workshop_session_id) ? ssrLooseContain(exportFilters.value.workshop_session_id, "") : ssrLooseEqual(exportFilters.value.workshop_session_id, "")) ? " selected" : ""}>All Workshops</option><!--[-->`);
          ssrRenderList(__props.workshopSessions, (workshop) => {
            _push(`<option${ssrRenderAttr("value", workshop.id)} data-v-ffa8bd68${ssrIncludeBooleanAttr(Array.isArray(exportFilters.value.workshop_session_id) ? ssrLooseContain(exportFilters.value.workshop_session_id, workshop.id) : ssrLooseEqual(exportFilters.value.workshop_session_id, workshop.id)) ? " selected" : ""}>${ssrInterpolate(workshop.title)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.schools.length > 0) {
          _push(`<div data-v-ffa8bd68><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ffa8bd68>Schools</label><div class="relative school-dropdown" data-v-ffa8bd68><button type="button" class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500" data-v-ffa8bd68><span class="block truncate" data-v-ffa8bd68>${ssrInterpolate(getSelectedSchoolsText())}</span><span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" data-v-ffa8bd68><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ffa8bd68><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ffa8bd68></path></svg></span></button><div style="${ssrRenderStyle(schoolDropdownOpen.value ? null : { display: "none" })}" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none" data-v-ffa8bd68><div class="px-3 py-2 border-b border-gray-200" data-v-ffa8bd68><div class="flex space-x-2" data-v-ffa8bd68><button type="button" class="text-xs text-green-600 hover:text-green-800 font-medium" data-v-ffa8bd68> Select All </button><span class="text-xs text-gray-400" data-v-ffa8bd68>|</span><button type="button" class="text-xs text-red-600 hover:text-red-800 font-medium" data-v-ffa8bd68> Clear All </button></div></div><!--[-->`);
          ssrRenderList(__props.schools, (school) => {
            _push(`<div class="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100" data-v-ffa8bd68>`);
            if (isSchoolSelected(school)) {
              _push(`<span class="absolute inset-y-0 left-0 flex items-center pl-2" data-v-ffa8bd68><svg class="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" data-v-ffa8bd68><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-ffa8bd68></path></svg></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<span class="block truncate font-normal" data-v-ffa8bd68>${ssrInterpolate(school.name)}</span></div>`);
          });
          _push(`<!--]-->`);
          if (__props.schools.length === 0) {
            _push(`<div class="px-3 py-2 text-sm text-gray-500 italic" data-v-ffa8bd68> No schools available </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (selectedSchools.value.length > 0) {
            _push(`<div class="mt-2 text-sm text-gray-600" data-v-ffa8bd68><span class="font-medium" data-v-ffa8bd68>${ssrInterpolate(selectedSchools.value.length)}</span> ${ssrInterpolate(selectedSchools.value.length === 1 ? "school" : "schools")} selected <div class="mt-1 flex flex-wrap gap-1" data-v-ffa8bd68><!--[-->`);
            ssrRenderList(selectedSchools.value.slice(0, 3), (school) => {
              _push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-800" data-v-ffa8bd68>${ssrInterpolate(school.name)} <button class="ml-1 text-green-600 hover:text-green-800" data-v-ffa8bd68><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-ffa8bd68><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-ffa8bd68></path></svg></button></span>`);
            });
            _push(`<!--]-->`);
            if (selectedSchools.value.length > 3) {
              _push(`<span class="text-xs text-gray-500" data-v-ffa8bd68> +${ssrInterpolate(selectedSchools.value.length - 3)} more </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-2 gap-4" data-v-ffa8bd68><div data-v-ffa8bd68><label for="export-date-from" class="block text-sm font-medium text-gray-700" data-v-ffa8bd68>From Date</label><input id="export-date-from"${ssrRenderAttr("value", exportFilters.value.date_from)} type="date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" data-v-ffa8bd68></div><div data-v-ffa8bd68><label for="export-date-to" class="block text-sm font-medium text-gray-700" data-v-ffa8bd68>To Date</label><input id="export-date-to"${ssrRenderAttr("value", exportFilters.value.date_to)} type="date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" data-v-ffa8bd68></div></div></div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" data-v-ffa8bd68><button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" data-v-ffa8bd68> Download CSV </button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" data-v-ffa8bd68> Cancel </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/PaymentExportModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PaymentExportModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ffa8bd68"]]);
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    payments: Object,
    filters: Object,
    stats: Object,
    workshopSessions: Array,
    schools: Array
  },
  setup(__props) {
    const props = __props;
    const { filters, isLoading, updateFilter } = useServerSearch("admin.payments.index", props.filters, {
      immediateFilters: ["status", "school_id", "date_from", "date_to"]
    });
    const showExportModal = ref(false);
    const exportRoute = ref(route("admin.payments.export"));
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };
    const formatDateTime = (date) => {
      return new Date(date).toLocaleString();
    };
    const getStatusBadgeClass = (status) => {
      const classes = {
        paid: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        processing: "bg-blue-100 text-blue-800",
        refunded: "bg-gray-100 text-gray-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const openExportModal = (format = "csv") => {
      exportRoute.value = format === "excel" ? route("admin.payments.export-excel") : route("admin.payments.export");
      showExportModal.value = true;
    };
    const closeExportModal = () => {
      showExportModal.value = false;
    };
    const handleExport = (filters2) => {
      console.log("Export started with filters:", filters2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Payments" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Payments </h2><div class="flex items-center gap-2"${_scopeId}><button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"${_scopeId}> Export CSV </button><button class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"${_scopeId}> Export Excel </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Payments "),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("button", {
                    onClick: ($event) => openExportModal("csv"),
                    class: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                  }, " Export CSV ", 8, ["onClick"]),
                  createVNode("button", {
                    onClick: ($event) => openExportModal("excel"),
                    class: "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
                  }, " Export Excel ", 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Revenue</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.total_revenue))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Pending Amount</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.pending_amount))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Failed Payments</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.failed_count)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Transactions</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_transactions)}</dd></dl></div></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 border-b border-gray-200"${_scopeId}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"${_scopeId}><div${_scopeId}><label for="search" class="sr-only"${_scopeId}>Search payments</label><div class="relative"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></div><input id="search"${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by user, program, or school..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div></div><div${_scopeId}><select${ssrRenderAttr("value", unref(filters).status)} class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}><option value=""${_scopeId}>All Statuses</option><option value="paid"${_scopeId}>Paid</option><option value="pending"${_scopeId}>Pending</option><option value="processing"${_scopeId}>Processing</option><option value="failed"${_scopeId}>Failed</option><option value="refunded"${_scopeId}>Refunded</option></select></div><div${_scopeId}><select${ssrRenderAttr("value", unref(filters).school_id)} class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}><option value=""${_scopeId}>All Schools</option><!--[-->`);
            ssrRenderList(__props.schools, (school) => {
              _push2(`<option${ssrRenderAttr("value", school.id)}${_scopeId}>${ssrInterpolate(school.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><input${ssrRenderAttr("value", unref(filters).date_from)} type="date" placeholder="From date" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}></div><div${_scopeId}><input${ssrRenderAttr("value", unref(filters).date_to)} type="date" placeholder="To date" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}></div></div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> User </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Program </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> School </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Date </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.payments.data, (payment) => {
              var _a, _b, _c, _d;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0 h-8 w-8"${_scopeId}><div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center"${_scopeId}><span class="text-xs font-medium text-white"${_scopeId}>${ssrInterpolate((((_a = payment.user) == null ? void 0 : _a.name) || payment.guest_name || "Guest User").charAt(0))}</span></div></div><div class="ml-3"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_b = payment.user) == null ? void 0 : _b.name) || payment.guest_name || "Guest User")}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(((_c = payment.user) == null ? void 0 : _c.email) || payment.guest_email || "No email")}</div>`);
              if (payment.guest_school_name) {
                _push2(`<div class="text-xs text-blue-600"${_scopeId}> School: ${ssrInterpolate(payment.guest_school_name)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (payment.guest_grade) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}> Grade: ${ssrInterpolate(payment.guest_grade)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (payment.guest_city) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}> City: ${ssrInterpolate(payment.guest_city)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!payment.user && payment.guest_phone) {
                _push2(`<div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(payment.guest_phone)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_d = payment.program) == null ? void 0 : _d.title) || "Unknown Program")}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payment.program ? formatCurrency(payment.program.price) : "N/A")}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>`);
              if (payment.school) {
                _push2(`<div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(payment.school.name)}</div>`);
              } else if (payment.guest_school_name) {
                _push2(`<div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payment.guest_school_name)}</div>`);
              } else {
                _push2(`<div class="text-sm text-gray-400 italic"${_scopeId}>No school</div>`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}><div class="flex flex-col"${_scopeId}><div class="font-semibold"${_scopeId}>${ssrInterpolate(payment.is_split_payment ? formatCurrency(payment.payment_plan_total_amount) : formatCurrency(payment.amount))}</div>`);
              if (payment.is_split_payment) {
                _push2(`<div class="text-xs text-blue-600 mt-1"${_scopeId}><span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"${_scopeId}> Split Payment </span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(payment.status)])}"${_scopeId}>${ssrInterpolate(payment.status)}</span>`);
              if (payment.manual_override) {
                _push2(`<div class="text-xs text-orange-600"${_scopeId}>Manual</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (payment.is_split_payment && payment.balance_payment) {
                _push2(`<div class="text-xs"${_scopeId}><span class="text-gray-500"${_scopeId}>Balance: </span><span class="${ssrRenderClass(["px-1.5 py-0.5 rounded text-xs font-medium", getStatusBadgeClass(payment.balance_payment.status)])}"${_scopeId}>${ssrInterpolate(payment.balance_payment.status)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}><div${_scopeId}>${ssrInterpolate(formatDateTime(payment.created_at))}</div>`);
              if (payment.paid_at) {
                _push2(`<div class="text-xs text-green-600"${_scopeId}> Paid: ${ssrInterpolate(formatDate(payment.paid_at))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}>`);
              if (payment.id) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin.payments.show", payment.id),
                  class: "text-blue-600 hover:text-blue-900"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View Details `);
                    } else {
                      return [
                        createTextVNode(" View Details ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<span class="text-gray-400"${_scopeId}>No ID</span>`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
            if (__props.payments.prev_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.prev_page_url,
                class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Previous `);
                  } else {
                    return [
                      createTextVNode(" Previous ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.payments.next_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.next_page_url,
                class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Next `);
                  } else {
                    return [
                      createTextVNode(" Next ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.payments.from)} to ${ssrInterpolate(__props.payments.to)} of ${ssrInterpolate(__props.payments.total)} results </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"${_scopeId}>`);
            if (__props.payments.prev_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.prev_page_url,
                class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Previous `);
                  } else {
                    return [
                      createTextVNode(" Previous ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.payments.next_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.next_page_url,
                class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Next `);
                  } else {
                    return [
                      createTextVNode(" Next ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</nav></div></div></div></div></div></div>`);
            _push2(ssrRenderComponent(PaymentExportModal, {
              show: showExportModal.value,
              "workshop-sessions": __props.workshopSessions,
              schools: __props.schools,
              "export-route": exportRoute.value,
              onClose: closeExportModal,
              onExport: handleExport
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-green-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Revenue"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.total_revenue)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-yellow-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Pending Amount"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.pending_amount)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-red-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Failed Payments"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.failed_count), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-blue-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Transactions"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_transactions), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 border-b border-gray-200" }, [
                      createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "search",
                            class: "sr-only"
                          }, "Search payments"),
                          createVNode("div", { class: "relative" }, [
                            createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-5 w-5 text-gray-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                })
                              ]))
                            ]),
                            withDirectives(createVNode("input", {
                              id: "search",
                              "onUpdate:modelValue": ($event) => unref(filters).search = $event,
                              type: "text",
                              placeholder: "Search by user, program, or school...",
                              class: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(filters).search]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("select", {
                            value: unref(filters).status,
                            onChange: ($event) => unref(updateFilter)("status", $event.target.value),
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            disabled: unref(isLoading)
                          }, [
                            createVNode("option", { value: "" }, "All Statuses"),
                            createVNode("option", { value: "paid" }, "Paid"),
                            createVNode("option", { value: "pending" }, "Pending"),
                            createVNode("option", { value: "processing" }, "Processing"),
                            createVNode("option", { value: "failed" }, "Failed"),
                            createVNode("option", { value: "refunded" }, "Refunded")
                          ], 40, ["value", "onChange", "disabled"])
                        ]),
                        createVNode("div", null, [
                          createVNode("select", {
                            value: unref(filters).school_id,
                            onChange: ($event) => unref(updateFilter)("school_id", $event.target.value),
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            disabled: unref(isLoading)
                          }, [
                            createVNode("option", { value: "" }, "All Schools"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.schools, (school) => {
                              return openBlock(), createBlock("option", {
                                key: school.id,
                                value: school.id
                              }, toDisplayString(school.name), 9, ["value"]);
                            }), 128))
                          ], 40, ["value", "onChange", "disabled"])
                        ]),
                        createVNode("div", null, [
                          createVNode("input", {
                            value: unref(filters).date_from,
                            onChange: ($event) => unref(updateFilter)("date_from", $event.target.value),
                            type: "date",
                            placeholder: "From date",
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            disabled: unref(isLoading)
                          }, null, 40, ["value", "onChange", "disabled"])
                        ]),
                        createVNode("div", null, [
                          createVNode("input", {
                            value: unref(filters).date_to,
                            onChange: ($event) => unref(updateFilter)("date_to", $event.target.value),
                            type: "date",
                            placeholder: "To date",
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            disabled: unref(isLoading)
                          }, null, 40, ["value", "onChange", "disabled"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " User "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Program "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " School "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Date "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.payments.data, (payment) => {
                            var _a, _b, _c, _d;
                            return openBlock(), createBlock("tr", {
                              key: payment.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "flex-shrink-0 h-8 w-8" }, [
                                    createVNode("div", { class: "h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center" }, [
                                      createVNode("span", { class: "text-xs font-medium text-white" }, toDisplayString((((_a = payment.user) == null ? void 0 : _a.name) || payment.guest_name || "Guest User").charAt(0)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_b = payment.user) == null ? void 0 : _b.name) || payment.guest_name || "Guest User"), 1),
                                    createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(((_c = payment.user) == null ? void 0 : _c.email) || payment.guest_email || "No email"), 1),
                                    payment.guest_school_name ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-blue-600"
                                    }, " School: " + toDisplayString(payment.guest_school_name), 1)) : createCommentVNode("", true),
                                    payment.guest_grade ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "text-xs text-gray-500"
                                    }, " Grade: " + toDisplayString(payment.guest_grade), 1)) : createCommentVNode("", true),
                                    payment.guest_city ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "text-xs text-gray-500"
                                    }, " City: " + toDisplayString(payment.guest_city), 1)) : createCommentVNode("", true),
                                    !payment.user && payment.guest_phone ? (openBlock(), createBlock("div", {
                                      key: 3,
                                      class: "text-xs text-gray-400"
                                    }, toDisplayString(payment.guest_phone), 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_d = payment.program) == null ? void 0 : _d.title) || "Unknown Program"), 1),
                                createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(payment.program ? formatCurrency(payment.program.price) : "N/A"), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                payment.school ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-sm font-medium text-gray-900"
                                }, toDisplayString(payment.school.name), 1)) : payment.guest_school_name ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "text-sm text-gray-500"
                                }, toDisplayString(payment.guest_school_name), 1)) : (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "text-sm text-gray-400 italic"
                                }, "No school"))
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, [
                                createVNode("div", { class: "flex flex-col" }, [
                                  createVNode("div", { class: "font-semibold" }, toDisplayString(payment.is_split_payment ? formatCurrency(payment.payment_plan_total_amount) : formatCurrency(payment.amount)), 1),
                                  payment.is_split_payment ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-blue-600 mt-1"
                                  }, [
                                    createVNode("span", { class: "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800" }, " Split Payment ")
                                  ])) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex flex-col gap-1" }, [
                                  createVNode("span", {
                                    class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(payment.status)]
                                  }, toDisplayString(payment.status), 3),
                                  payment.manual_override ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-orange-600"
                                  }, "Manual")) : createCommentVNode("", true),
                                  payment.is_split_payment && payment.balance_payment ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "text-xs"
                                  }, [
                                    createVNode("span", { class: "text-gray-500" }, "Balance: "),
                                    createVNode("span", {
                                      class: ["px-1.5 py-0.5 rounded text-xs font-medium", getStatusBadgeClass(payment.balance_payment.status)]
                                    }, toDisplayString(payment.balance_payment.status), 3)
                                  ])) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, [
                                createVNode("div", null, toDisplayString(formatDateTime(payment.created_at)), 1),
                                payment.paid_at ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-green-600"
                                }, " Paid: " + toDisplayString(formatDate(payment.paid_at)), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                payment.id ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: _ctx.route("admin.payments.show", payment.id),
                                  class: "text-blue-600 hover:text-blue-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" View Details ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-gray-400"
                                }, "No ID"))
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        __props.payments.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: __props.payments.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.payments.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: __props.payments.next_page_url,
                          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.payments.from) + " to " + toDisplayString(__props.payments.to) + " of " + toDisplayString(__props.payments.total) + " results ", 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" }, [
                            __props.payments.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: __props.payments.prev_page_url,
                              class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Previous ")
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true),
                            __props.payments.next_page_url ? (openBlock(), createBlock(unref(Link), {
                              key: 1,
                              href: __props.payments.next_page_url,
                              class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Next ")
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(PaymentExportModal, {
                show: showExportModal.value,
                "workshop-sessions": __props.workshopSessions,
                schools: __props.schools,
                "export-route": exportRoute.value,
                onClose: closeExportModal,
                onExport: handleExport
              }, null, 8, ["show", "workshop-sessions", "schools", "export-route"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Payments/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
