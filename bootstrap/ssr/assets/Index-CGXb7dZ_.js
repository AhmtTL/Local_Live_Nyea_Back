import { unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { u as useServerSearch } from "./useServerSearch-C-KcNfn2.js";
import { u as useAdminLayout } from "./useAdminLayout-b70BBPZG.js";
import "./AdminLayout-EcLlKyRZ.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    programs: Object,
    categories: Array,
    filters: Object,
    canViewRevenue: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const { Layout } = useAdminLayout();
    const { filters, isLoading, updateFilter } = useServerSearch(
      "admin.programs.index",
      props.filters,
      {
        immediateFilters: ["category"]
      }
    );
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    };
    const deleteProgram = (program) => {
      if (confirm(`Are you sure you want to delete program "${program.title}"?`)) {
        router.delete(route("admin.programs.destroy", program.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Programs" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="md:flex md:items-center md:justify-between mb-8"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"${_scopeId}> Programs </h2><p class="mt-1 text-sm text-gray-500"${_scopeId}> Manage educational programs and track their performance </p></div><div class="mt-4 flex md:mt-0 md:ml-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.programs.create"),
              class: "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Add Program `);
                } else {
                  return [
                    createTextVNode(" Add Program ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 border-b border-gray-200 sm:px-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4"${_scopeId}><div class="flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search programs..." class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div><div class="flex-shrink-0"${_scopeId}><select${ssrRenderAttr("value", unref(filters).category)} class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}><option value=""${_scopeId}>All Categories</option><!--[-->`);
            ssrRenderList(__props.categories, (cat) => {
              _push2(`<option${ssrRenderAttr("value", cat.name)}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Program </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Price </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Duration </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Type </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Interest / Sales </th>`);
            if (__props.canViewRevenue) {
              _push2(`<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Revenue </th>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.programs.data, (program) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(program.title)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(program.category || "No category")}</div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(program.formatted_price)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(program.duration || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(program.type.charAt(0).toUpperCase() + program.type.slice(1))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(program.interested_users_count)} / ${ssrInterpolate(program.paid_payments_count)}</td>`);
              if (__props.canViewRevenue) {
                _push2(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(
                  program.total_revenue
                ))}</td>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(
                  "admin.programs.show",
                  program.id
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
                  "admin.programs.edit",
                  program.id
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
              _push2(`<button class="text-red-600 hover:text-red-900"${_scopeId}> Delete </button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.programs.links && __props.programs.links.length > 3) {
              _push2(`<div class="px-4 py-3 border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
              if (__props.programs.prev_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.programs.prev_page_url,
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
              if (__props.programs.next_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.programs.next_page_url,
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
              _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.programs.from)} to ${ssrInterpolate(__props.programs.to)} of ${ssrInterpolate(__props.programs.total)} results </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"${_scopeId}><!--[-->`);
              ssrRenderList(__props.programs.links, (link, index) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: [
                      "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                      link.active ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                      index === 0 ? "rounded-l-md" : "",
                      index === __props.programs.links.length - 1 ? "rounded-r-md" : ""
                    ]
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(link.label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(link.label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-300"${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></nav></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "md:flex md:items-center md:justify-between mb-8" }, [
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("h2", { class: "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate" }, " Programs "),
                      createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Manage educational programs and track their performance ")
                    ]),
                    createVNode("div", { class: "mt-4 flex md:mt-0 md:ml-4" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.programs.create"),
                        class: "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Add Program ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 border-b border-gray-200 sm:px-6" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4" }, [
                        createVNode("div", { class: "flex-1" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(filters).search = $event,
                            type: "text",
                            placeholder: "Search programs...",
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(filters).search]
                          ])
                        ]),
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("select", {
                            value: unref(filters).category,
                            onChange: ($event) => unref(updateFilter)(
                              "category",
                              $event.target.value
                            ),
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                            disabled: unref(isLoading)
                          }, [
                            createVNode("option", { value: "" }, "All Categories"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                              return openBlock(), createBlock("option", {
                                key: cat.id,
                                value: cat.name
                              }, toDisplayString(cat.name), 9, ["value"]);
                            }), 128))
                          ], 40, ["value", "onChange", "disabled"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Program "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Price "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Duration "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Type "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Interest / Sales "),
                            __props.canViewRevenue ? (openBlock(), createBlock("th", {
                              key: 0,
                              class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            }, " Revenue ")) : createCommentVNode("", true),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.programs.data, (program) => {
                            return openBlock(), createBlock("tr", {
                              key: program.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", null, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(program.title), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(program.category || "No category"), 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(program.formatted_price), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(program.duration || "-"), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(program.type.charAt(0).toUpperCase() + program.type.slice(1)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(program.interested_users_count) + " / " + toDisplayString(program.paid_payments_count), 1),
                              __props.canViewRevenue ? (openBlock(), createBlock("td", {
                                key: 0,
                                class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                              }, toDisplayString(formatCurrency(
                                program.total_revenue
                              )), 1)) : createCommentVNode("", true),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                createVNode("div", { class: "flex justify-end space-x-2" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route(
                                      "admin.programs.show",
                                      program.id
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
                                      "admin.programs.edit",
                                      program.id
                                    ),
                                    class: "text-indigo-600 hover:text-indigo-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Edit ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteProgram(program),
                                    class: "text-red-600 hover:text-red-900"
                                  }, " Delete ", 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    __props.programs.links && __props.programs.links.length > 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "px-4 py-3 border-t border-gray-200 sm:px-6"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                          __props.programs.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: __props.programs.prev_page_url,
                            class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Previous ")
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true),
                          __props.programs.next_page_url ? (openBlock(), createBlock(unref(Link), {
                            key: 1,
                            href: __props.programs.next_page_url,
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
                            createVNode("p", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.programs.from) + " to " + toDisplayString(__props.programs.to) + " of " + toDisplayString(__props.programs.total) + " results ", 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("nav", { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.programs.links, (link, index) => {
                                return openBlock(), createBlock(Fragment, { key: index }, [
                                  link.url ? (openBlock(), createBlock(unref(Link), {
                                    key: 0,
                                    href: link.url,
                                    class: [
                                      "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                                      link.active ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                                      index === 0 ? "rounded-l-md" : "",
                                      index === __props.programs.links.length - 1 ? "rounded-r-md" : ""
                                    ]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(link.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href", "class"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    innerHTML: link.label,
                                    class: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-300"
                                  }, null, 8, ["innerHTML"]))
                                ], 64);
                              }), 128))
                            ])
                          ])
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Programs/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
