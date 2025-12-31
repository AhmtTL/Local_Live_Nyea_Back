import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-VxMcYlr7.js";
import { Head, Link } from "@inertiajs/vue3";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    recent_users: Array,
    recent_payments: Array,
    revenue_by_program: Array
  },
  setup(__props) {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Admin Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-screen-2xl sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}> Total Users </dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_users)}</dd></dl></div></div></div><div class="bg-gray-50 px-5 py-3"${_scopeId}><div class="text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.users.index"),
              class: "font-medium text-cyan-700 hover:text-cyan-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all users `);
                } else {
                  return [
                    createTextVNode(" View all users ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}> Total Programs </dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_programs)}</dd></dl></div></div></div><div class="bg-gray-50 px-5 py-3"${_scopeId}><div class="text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.programs.index"),
              class: "font-medium text-cyan-700 hover:text-cyan-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all programs `);
                } else {
                  return [
                    createTextVNode(" View all programs ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}> Total Revenue </dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(
              __props.stats.total_revenue
            ))}</dd></dl></div></div></div><div class="bg-gray-50 px-5 py-3"${_scopeId}><div class="text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.payments.index"),
              class: "font-medium text-cyan-700 hover:text-cyan-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all payments `);
                } else {
                  return [
                    createTextVNode(" View all payments ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}> Total Payments </dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_payments)}</dd></dl></div></div></div><div class="bg-gray-50 px-5 py-3"${_scopeId}><div class="text-sm"${_scopeId}><span class="text-gray-500"${_scopeId}>${ssrInterpolate(__props.stats.pending_payments)} pending, ${ssrInterpolate(__props.stats.failed_payments)} failed</span></div></div></div></div><div class="grid grid-cols-1 gap-6 lg:grid-cols-2"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}> Recent Users </h3><div class="flow-root"${_scopeId}><ul class="-my-3 divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recent_users, (user) => {
              var _a;
              _push2(`<li class="py-3 flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center"${_scopeId}><span class="text-sm font-medium text-white"${_scopeId}>${ssrInterpolate(((_a = user.name) == null ? void 0 : _a.charAt(
                0
              )) || "U")}</span></div></div><div class="ml-3"${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(user.name || "Unknown User")}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(user.email || "No email")}</p></div></div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(user.created_at))}</div></li>`);
            });
            _push2(`<!--]--></ul></div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.users.index"),
              class: "text-sm font-medium text-cyan-700 hover:text-cyan-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all users → `);
                } else {
                  return [
                    createTextVNode(" View all users → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}> Recent Payments </h3><div class="flow-root"${_scopeId}><ul class="-my-3 divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recent_payments, (payment) => {
              var _a, _b;
              _push2(`<li class="py-3 flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><span class="${ssrRenderClass([
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                getStatusBadgeClass(
                  payment.status
                )
              ])}"${_scopeId}>${ssrInterpolate(payment.status)}</span></div><div class="ml-3"${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_a = payment.user) == null ? void 0 : _a.name) || payment.guest_name || "Guest User")}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(((_b = payment.program) == null ? void 0 : _b.title) || "Unknown Program")}</p></div></div><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(payment.amount))}</div></li>`);
            });
            _push2(`<!--]--></ul></div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.payments.index"),
              class: "text-sm font-medium text-cyan-700 hover:text-cyan-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all payments → `);
                } else {
                  return [
                    createTextVNode(" View all payments → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="mt-8 bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}> Revenue by Program Test </h3><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Program </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Sales </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Revenue </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.revenue_by_program, (item) => {
              var _a;
              _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_a = item.program) == null ? void 0 : _a.title) || "Unknown Program")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(item.total_sales)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(
                item.total_revenue
              ))}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-screen-2xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-gray-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, " Total Users "),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_users), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-5 py-3" }, [
                        createVNode("div", { class: "text-sm" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.users.index"),
                            class: "font-medium text-cyan-700 hover:text-cyan-900"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View all users ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-gray-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, " Total Programs "),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_programs), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-5 py-3" }, [
                        createVNode("div", { class: "text-sm" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.programs.index"),
                            class: "font-medium text-cyan-700 hover:text-cyan-900"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View all programs ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-gray-400",
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, " Total Revenue "),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(
                                __props.stats.total_revenue
                              )), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-5 py-3" }, [
                        createVNode("div", { class: "text-sm" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.payments.index"),
                            class: "font-medium text-cyan-700 hover:text-cyan-900"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View all payments ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-gray-400",
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, " Total Payments "),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_payments), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-5 py-3" }, [
                        createVNode("div", { class: "text-sm" }, [
                          createVNode("span", { class: "text-gray-500" }, toDisplayString(__props.stats.pending_payments) + " pending, " + toDisplayString(__props.stats.failed_payments) + " failed", 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 gap-6 lg:grid-cols-2" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, " Recent Users "),
                        createVNode("div", { class: "flow-root" }, [
                          createVNode("ul", { class: "-my-3 divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.recent_users, (user) => {
                              var _a;
                              return openBlock(), createBlock("li", {
                                key: user.id,
                                class: "py-3 flex items-center justify-between"
                              }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "flex-shrink-0" }, [
                                    createVNode("div", { class: "h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center" }, [
                                      createVNode("span", { class: "text-sm font-medium text-white" }, toDisplayString(((_a = user.name) == null ? void 0 : _a.charAt(
                                        0
                                      )) || "U"), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(user.name || "Unknown User"), 1),
                                    createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(user.email || "No email"), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(user.created_at)), 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", { class: "mt-4" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.users.index"),
                            class: "text-sm font-medium text-cyan-700 hover:text-cyan-900"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View all users → ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, " Recent Payments "),
                        createVNode("div", { class: "flow-root" }, [
                          createVNode("ul", { class: "-my-3 divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.recent_payments, (payment) => {
                              var _a, _b;
                              return openBlock(), createBlock("li", {
                                key: payment.id,
                                class: "py-3 flex items-center justify-between"
                              }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "flex-shrink-0" }, [
                                    createVNode("span", {
                                      class: [
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        getStatusBadgeClass(
                                          payment.status
                                        )
                                      ]
                                    }, toDisplayString(payment.status), 3)
                                  ]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a = payment.user) == null ? void 0 : _a.name) || payment.guest_name || "Guest User"), 1),
                                    createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(((_b = payment.program) == null ? void 0 : _b.title) || "Unknown Program"), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(payment.amount)), 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", { class: "mt-4" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.payments.index"),
                            class: "text-sm font-medium text-cyan-700 hover:text-cyan-900"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View all payments → ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-8 bg-white overflow-hidden shadow rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, " Revenue by Program Test "),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Program "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Sales "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Revenue ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.revenue_by_program, (item) => {
                              var _a;
                              return openBlock(), createBlock("tr", {
                                key: item.program_id
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(((_a = item.program) == null ? void 0 : _a.title) || "Unknown Program"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(item.total_sales), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatCurrency(
                                  item.total_revenue
                                )), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
