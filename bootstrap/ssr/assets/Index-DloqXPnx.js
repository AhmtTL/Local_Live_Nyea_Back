import { ref, unref, createVNode, resolveDynamicComponent, withCtx, isRef, toDisplayString, createBlock, openBlock, createTextVNode, withModifiers, createCommentVNode, withDirectives, Fragment, renderList, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-KyMrG-Br.js";
import { useForm, Head } from "@inertiajs/vue3";
import { u as useFilters, a as useCrud, _ as _sfc_main$1, b as _sfc_main$2 } from "./useCrud-DSDajlI3.js";
import { _ as _sfc_main$6 } from "./Button-DospE3Pk.js";
import { _ as _sfc_main$3 } from "./Modal-C_wVFe4n.js";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./InputLabel-BdCx2Ft7.js";
import "./AdminLayout-VxMcYlr7.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    referrals: Object,
    filters: Object,
    formData: Object
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const { filters: searchFilters, isLoading } = useFilters(
      "admin.referrals.index",
      props.filters
    );
    const { deleteItem } = useCrud();
    const { Layout } = useAdminLayout();
    const showCreateModal = ref(false);
    const influencers = ref(((_a = props.formData) == null ? void 0 : _a.influencers) || []);
    const schools = ref(((_b = props.formData) == null ? void 0 : _b.schools) || []);
    const form = useForm({
      user_id: "",
      school_id: "",
      discount_type: "percentage",
      discount_value: "",
      discount_currency: "USD",
      starts_at: "",
      expires_at: ""
    });
    const openCreateModal = () => {
      form.reset();
      showCreateModal.value = true;
    };
    const closeCreateModal = () => {
      showCreateModal.value = false;
      form.reset();
    };
    const submitForm = () => {
      form.post(route("admin.referrals.store"), {
        onSuccess: () => {
          closeCreateModal();
        }
      });
    };
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        console.log("Copied to clipboard:", text);
      } catch (err) {
        console.error("Failed to copy: ", err);
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    };
    const columns = [
      {
        key: "user.name",
        label: "Influencer",
        class: "text-sm text-gray-900"
      },
      {
        key: "school.name",
        label: "School",
        class: "text-sm text-gray-900"
      },
      {
        key: "referral_code",
        label: "Referral Code",
        class: "text-sm text-gray-900 font-mono"
      },
      {
        key: "referral_link",
        label: "Referral Link",
        class: "text-sm text-gray-900"
      },
      {
        key: "conversions_count",
        label: "Conversions",
        class: "text-sm text-gray-900"
      },
      {
        key: "created_at",
        label: "Created",
        type: "date",
        class: "text-sm text-gray-500"
      }
    ];
    const actions = [
      {
        key: "view",
        label: "View",
        class: "bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium mr-2"
      },
      {
        key: "delete",
        label: "Delete",
        class: "bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium"
      }
    ];
    const searchFilterConfig = [
      {
        key: "created_at",
        label: "Created Date",
        type: "date-range"
      }
    ];
    const handleTableAction = ({ action, item }) => {
      if (!item || !item.id) {
        console.error("Invalid item data:", item);
        return;
      }
      switch (action) {
        case "view":
          window.location.href = route("admin.referrals.show", item.id);
          break;
        case "delete":
          deleteItem(item, "admin.referrals.destroy", {
            confirmMessage: `Are you sure you want to delete this referral?`
          });
          break;
      }
    };
    const resetFilters = () => {
      searchFilters.value = {
        search: "",
        created_at_from: "",
        created_at_to: ""
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Referrals" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><div${_scopeId}><h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Referrals Management </h2><p class="mt-1 text-sm text-gray-600"${_scopeId}> Manage referral links and track performance </p></div>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              variant: "primary",
              onClick: openCreateModal,
              "left-icon": "M12 4v16m8-8H4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Referral `);
                } else {
                  return [
                    createTextVNode(" Create Referral ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("div", null, [
                  createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Referrals Management "),
                  createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Manage referral links and track performance ")
                ]),
                createVNode(_sfc_main$6, {
                  variant: "primary",
                  onClick: openCreateModal,
                  "left-icon": "M12 4v16m8-8H4"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Create Referral ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(searchFilters),
              "onUpdate:modelValue": ($event) => isRef(searchFilters) ? searchFilters.value = $event : null,
              "search-placeholder": "Search by influencer, school, or referral code...",
              filters: searchFilterConfig,
              "is-loading": unref(isLoading),
              onReset: resetFilters
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              items: __props.referrals,
              columns,
              actions,
              "is-loading": unref(isLoading),
              "empty-message": "No referrals found. Create your first referral to get started.",
              onAction: handleTableAction
            }, {
              "cell-referral_link": withCtx(({ value }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center space-x-2 max-w-xs"${_scopeId2}><span class="truncate text-blue-600 text-sm"${_scopeId2}>${ssrInterpolate(value)}</span><button class="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Copy to clipboard"${_scopeId2}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId2}></path></svg></button></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center space-x-2 max-w-xs" }, [
                      createVNode("span", { class: "truncate text-blue-600 text-sm" }, toDisplayString(value), 1),
                      createVNode("button", {
                        onClick: ($event) => copyToClipboard(value),
                        class: "flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors",
                        title: "Copy to clipboard"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          })
                        ]))
                      ], 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showCreateModal.value,
              onClose: closeCreateModal,
              "max-width": "2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><h2 class="text-lg font-medium text-gray-900 mb-4"${_scopeId2}> Create New Referral </h2><form class="space-y-6"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "user_id",
                    value: "Influencer"
                  }, null, _parent3, _scopeId2));
                  _push3(`<select id="user_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).user_id) ? ssrLooseContain(unref(form).user_id, "") : ssrLooseEqual(unref(form).user_id, "")) ? " selected" : ""}${_scopeId2}>Select an influencer...</option><!--[-->`);
                  ssrRenderList(influencers.value, (user) => {
                    _push3(`<option${ssrRenderAttr("value", user.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).user_id) ? ssrLooseContain(unref(form).user_id, user.id) : ssrLooseEqual(unref(form).user_id, user.id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(user.name)} (${ssrInterpolate(user.email)}) </option>`);
                  });
                  _push3(`<!--]--></select>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.user_id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "school_id",
                    value: "School"
                  }, null, _parent3, _scopeId2));
                  _push3(`<select id="school_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).school_id) ? ssrLooseContain(unref(form).school_id, "") : ssrLooseEqual(unref(form).school_id, "")) ? " selected" : ""}${_scopeId2}>Select a school...</option><!--[-->`);
                  ssrRenderList(schools.value, (school) => {
                    _push3(`<option${ssrRenderAttr("value", school.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).school_id) ? ssrLooseContain(unref(form).school_id, school.id) : ssrLooseEqual(unref(form).school_id, school.id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(school.name)}</option>`);
                  });
                  _push3(`<!--]--></select>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.school_id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "discount_type",
                    value: "Discount Type"
                  }, null, _parent3, _scopeId2));
                  _push3(`<select id="discount_type" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required${_scopeId2}><option value="percentage"${ssrIncludeBooleanAttr(Array.isArray(unref(form).discount_type) ? ssrLooseContain(unref(form).discount_type, "percentage") : ssrLooseEqual(unref(form).discount_type, "percentage")) ? " selected" : ""}${_scopeId2}>Percentage</option><option value="fixed_amount"${ssrIncludeBooleanAttr(Array.isArray(unref(form).discount_type) ? ssrLooseContain(unref(form).discount_type, "fixed_amount") : ssrLooseEqual(unref(form).discount_type, "fixed_amount")) ? " selected" : ""}${_scopeId2}>Fixed Amount</option></select>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.discount_type
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "discount_value",
                    value: unref(form).discount_type === "percentage" ? "Discount Percentage (%)" : "Discount Amount"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><input id="discount_value"${ssrRenderAttr("value", unref(form).discount_value)} type="number" step="0.01" min="0"${ssrRenderAttr(
                    "max",
                    unref(form).discount_type === "percentage" ? 100 : void 0
                  )} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrRenderAttr(
                    "placeholder",
                    unref(form).discount_type === "percentage" ? "e.g., 10" : "e.g., 50.00"
                  )} required${_scopeId2}>`);
                  if (unref(form).discount_type === "fixed_amount") {
                    _push3(`<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"${_scopeId2}><span class="text-gray-500 sm:text-sm"${_scopeId2}>${ssrInterpolate(unref(form).discount_currency)}</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.discount_value
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).discount_type === "fixed_amount") {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      for: "discount_currency",
                      value: "Currency"
                    }, null, _parent3, _scopeId2));
                    _push3(`<select id="discount_currency" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required${_scopeId2}><option value="USD"${ssrIncludeBooleanAttr(Array.isArray(unref(form).discount_currency) ? ssrLooseContain(unref(form).discount_currency, "USD") : ssrLooseEqual(unref(form).discount_currency, "USD")) ? " selected" : ""}${_scopeId2}>USD ($)</option><option value="EUR"${ssrIncludeBooleanAttr(Array.isArray(unref(form).discount_currency) ? ssrLooseContain(unref(form).discount_currency, "EUR") : ssrLooseEqual(unref(form).discount_currency, "EUR")) ? " selected" : ""}${_scopeId2}>EUR (€)</option><option value="GBP"${ssrIncludeBooleanAttr(Array.isArray(unref(form).discount_currency) ? ssrLooseContain(unref(form).discount_currency, "GBP") : ssrLooseEqual(unref(form).discount_currency, "GBP")) ? " selected" : ""}${_scopeId2}>GBP (£)</option></select>`);
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      class: "mt-2",
                      message: unref(form).errors.discount_currency
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "starts_at",
                    value: "Start Date (Optional)"
                  }, null, _parent3, _scopeId2));
                  _push3(`<input id="starts_at"${ssrRenderAttr("value", unref(form).starts_at)} type="datetime-local" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${_scopeId2}><p class="mt-1 text-sm text-gray-500"${_scopeId2}> When the discount becomes active. Leave empty for immediate activation. </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.starts_at
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "expires_at",
                    value: "Expiry Date (Optional)"
                  }, null, _parent3, _scopeId2));
                  _push3(`<input id="expires_at"${ssrRenderAttr("value", unref(form).expires_at)} type="datetime-local" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${_scopeId2}><p class="mt-1 text-sm text-gray-500"${_scopeId2}> When the discount expires. Leave empty for no expiration. </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.expires_at
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.error) {
                    _push3(`<div class="rounded-md bg-red-50 p-4"${_scopeId2}><div class="text-sm text-red-700"${_scopeId2}>${ssrInterpolate(unref(form).errors.error)}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex items-center justify-end gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    variant: "secondary",
                    type: "button",
                    onClick: closeCreateModal
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          createTextVNode(" Cancel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    type: "submit",
                    variant: "primary",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(form).processing) {
                          _push4(`<span${_scopeId3}>Creating...</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>Create Referral</span>`);
                        }
                      } else {
                        return [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Creating...")) : (openBlock(), createBlock("span", { key: 1 }, "Create Referral"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-medium text-gray-900 mb-4" }, " Create New Referral "),
                      createVNode("form", {
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "user_id",
                            value: "Influencer"
                          }),
                          withDirectives(createVNode("select", {
                            id: "user_id",
                            "onUpdate:modelValue": ($event) => unref(form).user_id = $event,
                            class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Select an influencer..."),
                            (openBlock(true), createBlock(Fragment, null, renderList(influencers.value, (user) => {
                              return openBlock(), createBlock("option", {
                                key: user.id,
                                value: user.id
                              }, toDisplayString(user.name) + " (" + toDisplayString(user.email) + ") ", 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).user_id]
                          ]),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.user_id
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "school_id",
                            value: "School"
                          }),
                          withDirectives(createVNode("select", {
                            id: "school_id",
                            "onUpdate:modelValue": ($event) => unref(form).school_id = $event,
                            class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Select a school..."),
                            (openBlock(true), createBlock(Fragment, null, renderList(schools.value, (school) => {
                              return openBlock(), createBlock("option", {
                                key: school.id,
                                value: school.id
                              }, toDisplayString(school.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).school_id]
                          ]),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.school_id
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "discount_type",
                            value: "Discount Type"
                          }),
                          withDirectives(createVNode("select", {
                            id: "discount_type",
                            "onUpdate:modelValue": ($event) => unref(form).discount_type = $event,
                            class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            required: ""
                          }, [
                            createVNode("option", { value: "percentage" }, "Percentage"),
                            createVNode("option", { value: "fixed_amount" }, "Fixed Amount")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).discount_type]
                          ]),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.discount_type
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "discount_value",
                            value: unref(form).discount_type === "percentage" ? "Discount Percentage (%)" : "Discount Amount"
                          }, null, 8, ["value"]),
                          createVNode("div", { class: "relative" }, [
                            withDirectives(createVNode("input", {
                              id: "discount_value",
                              "onUpdate:modelValue": ($event) => unref(form).discount_value = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              max: unref(form).discount_type === "percentage" ? 100 : void 0,
                              class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                              placeholder: unref(form).discount_type === "percentage" ? "e.g., 10" : "e.g., 50.00",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue", "max", "placeholder"]), [
                              [vModelText, unref(form).discount_value]
                            ]),
                            unref(form).discount_type === "fixed_amount" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                            }, [
                              createVNode("span", { class: "text-gray-500 sm:text-sm" }, toDisplayString(unref(form).discount_currency), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.discount_value
                          }, null, 8, ["message"])
                        ]),
                        unref(form).discount_type === "fixed_amount" ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(_sfc_main$4, {
                            for: "discount_currency",
                            value: "Currency"
                          }),
                          withDirectives(createVNode("select", {
                            id: "discount_currency",
                            "onUpdate:modelValue": ($event) => unref(form).discount_currency = $event,
                            class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            required: ""
                          }, [
                            createVNode("option", { value: "USD" }, "USD ($)"),
                            createVNode("option", { value: "EUR" }, "EUR (€)"),
                            createVNode("option", { value: "GBP" }, "GBP (£)")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).discount_currency]
                          ]),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.discount_currency
                          }, null, 8, ["message"])
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "starts_at",
                            value: "Start Date (Optional)"
                          }),
                          withDirectives(createVNode("input", {
                            id: "starts_at",
                            "onUpdate:modelValue": ($event) => unref(form).starts_at = $event,
                            type: "datetime-local",
                            class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).starts_at]
                          ]),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " When the discount becomes active. Leave empty for immediate activation. "),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.starts_at
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "expires_at",
                            value: "Expiry Date (Optional)"
                          }),
                          withDirectives(createVNode("input", {
                            id: "expires_at",
                            "onUpdate:modelValue": ($event) => unref(form).expires_at = $event,
                            type: "datetime-local",
                            class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).expires_at]
                          ]),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " When the discount expires. Leave empty for no expiration. "),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.expires_at
                          }, null, 8, ["message"])
                        ]),
                        unref(form).errors.error ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "rounded-md bg-red-50 p-4"
                        }, [
                          createVNode("div", { class: "text-sm text-red-700" }, toDisplayString(unref(form).errors.error), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center justify-end gap-4" }, [
                          createVNode(_sfc_main$6, {
                            variant: "secondary",
                            type: "button",
                            onClick: closeCreateModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$6, {
                            type: "submit",
                            variant: "primary",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Creating...")) : (openBlock(), createBlock("span", { key: 1 }, "Create Referral"))
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode(_sfc_main$1, {
                      modelValue: unref(searchFilters),
                      "onUpdate:modelValue": ($event) => isRef(searchFilters) ? searchFilters.value = $event : null,
                      "search-placeholder": "Search by influencer, school, or referral code...",
                      filters: searchFilterConfig,
                      "is-loading": unref(isLoading),
                      onReset: resetFilters
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "is-loading"]),
                    createVNode(_sfc_main$2, {
                      items: __props.referrals,
                      columns,
                      actions,
                      "is-loading": unref(isLoading),
                      "empty-message": "No referrals found. Create your first referral to get started.",
                      onAction: handleTableAction
                    }, {
                      "cell-referral_link": withCtx(({ value }) => [
                        createVNode("div", { class: "flex items-center space-x-2 max-w-xs" }, [
                          createVNode("span", { class: "truncate text-blue-600 text-sm" }, toDisplayString(value), 1),
                          createVNode("button", {
                            onClick: ($event) => copyToClipboard(value),
                            class: "flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors",
                            title: "Copy to clipboard"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              })
                            ]))
                          ], 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["items", "is-loading"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, {
                show: showCreateModal.value,
                onClose: closeCreateModal,
                "max-width": "2xl"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("h2", { class: "text-lg font-medium text-gray-900 mb-4" }, " Create New Referral "),
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "user_id",
                          value: "Influencer"
                        }),
                        withDirectives(createVNode("select", {
                          id: "user_id",
                          "onUpdate:modelValue": ($event) => unref(form).user_id = $event,
                          class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Select an influencer..."),
                          (openBlock(true), createBlock(Fragment, null, renderList(influencers.value, (user) => {
                            return openBlock(), createBlock("option", {
                              key: user.id,
                              value: user.id
                            }, toDisplayString(user.name) + " (" + toDisplayString(user.email) + ") ", 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).user_id]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.user_id
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "school_id",
                          value: "School"
                        }),
                        withDirectives(createVNode("select", {
                          id: "school_id",
                          "onUpdate:modelValue": ($event) => unref(form).school_id = $event,
                          class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Select a school..."),
                          (openBlock(true), createBlock(Fragment, null, renderList(schools.value, (school) => {
                            return openBlock(), createBlock("option", {
                              key: school.id,
                              value: school.id
                            }, toDisplayString(school.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).school_id]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.school_id
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "discount_type",
                          value: "Discount Type"
                        }),
                        withDirectives(createVNode("select", {
                          id: "discount_type",
                          "onUpdate:modelValue": ($event) => unref(form).discount_type = $event,
                          class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "percentage" }, "Percentage"),
                          createVNode("option", { value: "fixed_amount" }, "Fixed Amount")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).discount_type]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.discount_type
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "discount_value",
                          value: unref(form).discount_type === "percentage" ? "Discount Percentage (%)" : "Discount Amount"
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            id: "discount_value",
                            "onUpdate:modelValue": ($event) => unref(form).discount_value = $event,
                            type: "number",
                            step: "0.01",
                            min: "0",
                            max: unref(form).discount_type === "percentage" ? 100 : void 0,
                            class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            placeholder: unref(form).discount_type === "percentage" ? "e.g., 10" : "e.g., 50.00",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue", "max", "placeholder"]), [
                            [vModelText, unref(form).discount_value]
                          ]),
                          unref(form).discount_type === "fixed_amount" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                          }, [
                            createVNode("span", { class: "text-gray-500 sm:text-sm" }, toDisplayString(unref(form).discount_currency), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.discount_value
                        }, null, 8, ["message"])
                      ]),
                      unref(form).discount_type === "fixed_amount" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_sfc_main$4, {
                          for: "discount_currency",
                          value: "Currency"
                        }),
                        withDirectives(createVNode("select", {
                          id: "discount_currency",
                          "onUpdate:modelValue": ($event) => unref(form).discount_currency = $event,
                          class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "USD" }, "USD ($)"),
                          createVNode("option", { value: "EUR" }, "EUR (€)"),
                          createVNode("option", { value: "GBP" }, "GBP (£)")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).discount_currency]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.discount_currency
                        }, null, 8, ["message"])
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "starts_at",
                          value: "Start Date (Optional)"
                        }),
                        withDirectives(createVNode("input", {
                          id: "starts_at",
                          "onUpdate:modelValue": ($event) => unref(form).starts_at = $event,
                          type: "datetime-local",
                          class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).starts_at]
                        ]),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " When the discount becomes active. Leave empty for immediate activation. "),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.starts_at
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "expires_at",
                          value: "Expiry Date (Optional)"
                        }),
                        withDirectives(createVNode("input", {
                          id: "expires_at",
                          "onUpdate:modelValue": ($event) => unref(form).expires_at = $event,
                          type: "datetime-local",
                          class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).expires_at]
                        ]),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " When the discount expires. Leave empty for no expiration. "),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.expires_at
                        }, null, 8, ["message"])
                      ]),
                      unref(form).errors.error ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "rounded-md bg-red-50 p-4"
                      }, [
                        createVNode("div", { class: "text-sm text-red-700" }, toDisplayString(unref(form).errors.error), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex items-center justify-end gap-4" }, [
                        createVNode(_sfc_main$6, {
                          variant: "secondary",
                          type: "button",
                          onClick: closeCreateModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$6, {
                          type: "submit",
                          variant: "primary",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Creating...")) : (openBlock(), createBlock("span", { key: 1 }, "Create Referral"))
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ]),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Referrals/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
