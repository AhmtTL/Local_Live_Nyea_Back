import { createVNode, resolveDynamicComponent, unref, withCtx, createTextVNode, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { u as useAdminLayout } from "./useAdminLayout-b70BBPZG.js";
import { u as useServerSearch } from "./useServerSearch-C-KcNfn2.js";
import "./AdminLayout-EcLlKyRZ.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    discountCodes: {
      type: Object,
      default: () => ({ data: [], links: null })
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const { Layout } = useAdminLayout();
    const props = __props;
    const { filters, isLoading, updateFilter } = useServerSearch(
      "admin.discount-codes.index",
      props.filters,
      {
        immediateFilters: ["status", "type"]
      }
    );
    const deleteDiscountCode = (code) => {
      if (confirm(
        `Are you sure you want to permanently delete discount code "${code.code}"? This action cannot be undone.`
      )) {
        router.delete(route("admin.discount-codes.destroy", code.id), {
          onError: (errors) => {
            console.error("Delete failed:", errors);
          }
        });
      }
    };
    const toggleDiscountCode = (code) => {
      if (code.status === "active") {
        if (confirm(
          `Are you sure you want to deactivate discount code "${code.code}"? This will stop it from being usable.`
        )) {
          router.post(
            route("admin.discount-codes.deactivate", code.id),
            {},
            {
              onError: (errors) => {
                console.error("Deactivate failed:", errors);
              }
            }
          );
        }
      } else {
        if (confirm(
          `Are you sure you want to activate discount code "${code.code}"? This will make it usable again.`
        )) {
          router.post(
            route("admin.discount-codes.activate", code.id),
            {},
            {
              onError: (errors) => {
                console.error("Activate failed:", errors);
              }
            }
          );
        }
      }
    };
    const getStatusClass = (status) => {
      const classes = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        expired: "bg-red-100 text-red-800",
        scheduled: "bg-yellow-100 text-yellow-800",
        exhausted: "bg-orange-100 text-orange-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusLabel = (status) => {
      const labels = {
        active: "Active",
        inactive: "Inactive",
        expired: "Expired",
        scheduled: "Scheduled",
        exhausted: "Exhausted"
      };
      return labels[status] || "Unknown";
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Discount Codes </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.discount-codes.create"),
              class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Discount Code `);
                } else {
                  return [
                    createTextVNode(" Create Discount Code ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Discount Codes "),
                createVNode(unref(Link), {
                  href: _ctx.route("admin.discount-codes.create"),
                  class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Create Discount Code ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6"${_scopeId}><div class="p-6"${_scopeId}><div class="flex flex-col sm:flex-row gap-4"${_scopeId}><div class="flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by code, name, or description..." class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="flex gap-2"${_scopeId}><select${ssrRenderAttr("value", unref(filters).status)} class="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}><option value=""${_scopeId}>All Status</option><option value="active"${_scopeId}>Active</option><option value="inactive"${_scopeId}>Inactive</option><option value="expired"${_scopeId}>Expired</option><option value="scheduled"${_scopeId}>Scheduled</option></select><select${ssrRenderAttr("value", unref(filters).type)} class="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}><option value=""${_scopeId}>All Types</option><option value="percentage"${_scopeId}> Percentage </option><option value="fixed_amount"${_scopeId}> Fixed Amount </option></select></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Code </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Name </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Type </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Value </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Usage </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Created </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}>`);
            if (!((_b = (_a = __props.discountCodes) == null ? void 0 : _a.data) == null ? void 0 : _b.length)) {
              _push2(`<tr class="text-center"${_scopeId}><td colspan="8" class="px-6 py-4 text-sm text-gray-500"${_scopeId}> No discount codes found. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(((_c = __props.discountCodes) == null ? void 0 : _c.data) || [], (code) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-mono font-medium text-gray-900"${_scopeId}>${ssrInterpolate(code.code)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(code.name)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([
                code.type === "percentage" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800",
                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              ])}"${_scopeId}>${ssrInterpolate(code.type === "percentage" ? "Percentage" : "Fixed Amount")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(code.formatted_value)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(code.used_count)}${ssrInterpolate(code.max_redemptions ? "/" + code.max_redemptions : "")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([getStatusClass(code.status), "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(code.status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(code.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(
                  "admin.discount-codes.show",
                  code.id
                ),
                class: "text-blue-600 hover:text-blue-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` View `);
                  } else {
                    return [
                      createTextVNode(" View ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(
                  "admin.discount-codes.edit",
                  code.id
                ),
                class: "text-indigo-600 hover:text-indigo-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Edit `);
                  } else {
                    return [
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="${ssrRenderClass(
                code.status === "active" ? "text-orange-600 hover:text-orange-900" : "text-green-600 hover:text-green-900"
              )}"${_scopeId}>${ssrInterpolate(code.status === "active" ? "Deactivate" : "Activate")}</button><button class="text-red-600 hover:text-red-900"${_scopeId}> Delete </button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (((_d = __props.discountCodes) == null ? void 0 : _d.links) && __props.discountCodes.links.length > 3) {
              _push2(`<div class="px-6 py-3 border-t border-gray-200"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.discountCodes.from || 0)} to ${ssrInterpolate(__props.discountCodes.to || 0)} of ${ssrInterpolate(__props.discountCodes.total || 0)} results </div><div class="flex space-x-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.discountCodes.links, (link, index) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: [
                      "px-3 py-2 text-sm border",
                      link.active ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    ]
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<span${_scopeId2}>${link.label ?? ""}</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            innerHTML: link.label
                          }, null, 8, ["innerHTML"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<span class="${ssrRenderClass([
                    "px-3 py-2 text-sm border bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                  ])}"${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                        createVNode("div", { class: "flex-1" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(filters).search = $event,
                            type: "text",
                            placeholder: "Search by code, name, or description...",
                            class: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(filters).search]
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode("select", {
                            value: unref(filters).status,
                            onChange: ($event) => unref(updateFilter)(
                              "status",
                              $event.target.value
                            ),
                            class: "border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            disabled: unref(isLoading)
                          }, [
                            createVNode("option", { value: "" }, "All Status"),
                            createVNode("option", { value: "active" }, "Active"),
                            createVNode("option", { value: "inactive" }, "Inactive"),
                            createVNode("option", { value: "expired" }, "Expired"),
                            createVNode("option", { value: "scheduled" }, "Scheduled")
                          ], 40, ["value", "onChange", "disabled"]),
                          createVNode("select", {
                            value: unref(filters).type,
                            onChange: ($event) => unref(updateFilter)(
                              "type",
                              $event.target.value
                            ),
                            class: "border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            disabled: unref(isLoading)
                          }, [
                            createVNode("option", { value: "" }, "All Types"),
                            createVNode("option", { value: "percentage" }, " Percentage "),
                            createVNode("option", { value: "fixed_amount" }, " Fixed Amount ")
                          ], 40, ["value", "onChange", "disabled"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Code "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Name "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Type "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Value "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Usage "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Created "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          !((_f = (_e = __props.discountCodes) == null ? void 0 : _e.data) == null ? void 0 : _f.length) ? (openBlock(), createBlock("tr", {
                            key: 0,
                            class: "text-center"
                          }, [
                            createVNode("td", {
                              colspan: "8",
                              class: "px-6 py-4 text-sm text-gray-500"
                            }, " No discount codes found. ")
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(((_g = __props.discountCodes) == null ? void 0 : _g.data) || [], (code) => {
                            return openBlock(), createBlock("tr", {
                              key: code.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-mono font-medium text-gray-900" }, toDisplayString(code.code), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(code.name), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: [
                                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                    code.type === "percentage" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                                  ]
                                }, toDisplayString(code.type === "percentage" ? "Percentage" : "Fixed Amount"), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(code.formatted_value), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(code.used_count) + toDisplayString(code.max_redemptions ? "/" + code.max_redemptions : ""), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusClass(code.status)]
                                }, toDisplayString(getStatusLabel(code.status)), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(code.created_at)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                createVNode("div", { class: "flex justify-end space-x-2" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route(
                                      "admin.discount-codes.show",
                                      code.id
                                    ),
                                    class: "text-blue-600 hover:text-blue-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" View ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode(unref(Link), {
                                    href: _ctx.route(
                                      "admin.discount-codes.edit",
                                      code.id
                                    ),
                                    class: "text-indigo-600 hover:text-indigo-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Edit ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => toggleDiscountCode(code),
                                    class: code.status === "active" ? "text-orange-600 hover:text-orange-900" : "text-green-600 hover:text-green-900"
                                  }, toDisplayString(code.status === "active" ? "Deactivate" : "Activate"), 11, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteDiscountCode(code),
                                    class: "text-red-600 hover:text-red-900"
                                  }, " Delete ", 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    ((_h = __props.discountCodes) == null ? void 0 : _h.links) && __props.discountCodes.links.length > 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "px-6 py-3 border-t border-gray-200"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.discountCodes.from || 0) + " to " + toDisplayString(__props.discountCodes.to || 0) + " of " + toDisplayString(__props.discountCodes.total || 0) + " results ", 1),
                        createVNode("div", { class: "flex space-x-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.discountCodes.links, (link, index) => {
                            return openBlock(), createBlock(Fragment, { key: index }, [
                              link.url ? (openBlock(), createBlock(unref(Link), {
                                key: 0,
                                href: link.url,
                                class: [
                                  "px-3 py-2 text-sm border",
                                  link.active ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", {
                                    innerHTML: link.label
                                  }, null, 8, ["innerHTML"])
                                ]),
                                _: 2
                              }, 1032, ["href", "class"])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: [
                                  "px-3 py-2 text-sm border bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                                ],
                                innerHTML: link.label
                              }, null, 8, ["innerHTML"]))
                            ], 64);
                          }), 128))
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/DiscountCodes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
