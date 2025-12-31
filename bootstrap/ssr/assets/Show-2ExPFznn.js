import { unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { u as useAdminLayout } from "./useAdminLayout-KyMrG-Br.js";
import "./AdminLayout-VxMcYlr7.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    program: Object,
    canViewRevenue: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const { Layout } = useAdminLayout();
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
        refunded: "bg-gray-100 text-gray-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getInterestLevelBadgeClass = (level) => {
      const classes = {
        high: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        low: "bg-red-100 text-red-800"
      };
      return classes[level] || "bg-gray-100 text-gray-800";
    };
    const deleteProgram = () => {
      if (confirm(
        `Are you sure you want to delete program "${props.program.title}"?`
      )) {
        router.delete(route("admin.programs.destroy", props.program.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.program.title
      }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.title)}</h1><p class="mt-1 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(__props.program.category || "No category")}</p></div><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.programs.edit", __props.program.id),
              class: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Program `);
                } else {
                  return [
                    createTextVNode(" Edit Program ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"${_scopeId}> Delete Program </button>`);
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
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"${_scopeId}><div class="lg:col-span-2"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h2 class="text-xl font-semibold text-gray-900 mb-4"${_scopeId}> Program Details </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Title </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.title)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Slug </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.slug)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Price </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.formatted_price)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Duration </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.duration || "Not specified")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Category </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.category || "No category")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Type </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.type.charAt(0).toUpperCase() + __props.program.type.slice(1))}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Created </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.program.created_at))}</dd></div></div>`);
            if (__props.program.description) {
              _push2(`<div class="mt-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Description </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.description)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.program.features && __props.program.features.length) {
              _push2(`<div class="mt-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Features </dt><dd class="mt-2"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.program.features, (feature) => {
                _push2(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"${_scopeId}>${ssrInterpolate(feature)}</span>`);
              });
              _push2(`<!--]--></div></dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.program.image) {
              _push2(`<div class="mt-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Image </dt><dd class="mt-2"${_scopeId}><img${ssrRenderAttr("src", __props.program.image)}${ssrRenderAttr("alt", __props.program.title)} class="w-full max-w-md h-48 object-cover rounded-lg"${_scopeId}></dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="space-y-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Program Statistics </h3><div class="space-y-4"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Total Interested Users </dt><dd class="mt-1 text-2xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.stats.total_interested)}</dd></div>`);
            if (__props.canViewRevenue) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Total Payments </dt><dd class="mt-1 text-2xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.program.stats.total_payments)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.canViewRevenue) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Total Revenue </dt><dd class="mt-1 text-2xl font-semibold text-green-600"${_scopeId}>${ssrInterpolate(formatCurrency(
                __props.program.stats.total_revenue
              ))}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.canViewRevenue) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Conversion Rate </dt><dd class="mt-1 text-2xl font-semibold text-blue-600"${_scopeId}>${ssrInterpolate(__props.program.stats.conversion_rate)}% </dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Interested Users </h3>`);
            if (__props.program.interested_users.length) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.program.interested_users, (user) => {
                _push2(`<div class="flex items-center justify-between p-4 border rounded-lg"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(user.name)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(user.email)}</p><p class="text-xs text-gray-400"${_scopeId}> Interested: ${ssrInterpolate(formatDate(user.interested_at))}</p>`);
                if (user.notes) {
                  _push2(`<p class="text-xs text-gray-600 mt-1"${_scopeId}>${ssrInterpolate(user.notes)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><span class="${ssrRenderClass([
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  getInterestLevelBadgeClass(
                    user.interest_level
                  )
                ])}"${_scopeId}>${ssrInterpolate(user.interest_level)}</span></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<p class="text-gray-500 text-center py-8"${_scopeId}> No interested users yet. </p>`);
            }
            _push2(`</div></div>`);
            if (__props.canViewRevenue) {
              _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Recent Payments </h3>`);
              if (__props.program.payments.length) {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(__props.program.payments, (payment) => {
                  _push2(`<div class="flex items-center justify-between p-4 border rounded-lg"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(payment.user ? payment.user.name : payment.guest_name || "Guest User")}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payment.user ? payment.user.email : payment.guest_email || "No email")}</p><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(payment.created_at))}</p>`);
                  if (payment.paid_at) {
                    _push2(`<p class="text-xs text-gray-400"${_scopeId}> Paid: ${ssrInterpolate(formatDate(payment.paid_at))}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (!payment.user) {
                    _push2(`<p class="text-xs text-orange-600 mt-1"${_scopeId}> Guest Payment </p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="text-right"${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(payment.amount))}</p><span class="${ssrRenderClass([
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusBadgeClass(
                      payment.status
                    )
                  ])}"${_scopeId}>${ssrInterpolate(payment.status)}</span></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<p class="text-gray-500 text-center py-8"${_scopeId}> No payments yet. </p>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, toDisplayString(__props.program.title), 1),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(__props.program.category || "No category"), 1)
                        ]),
                        createVNode("div", { class: "flex space-x-2" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.programs.edit", __props.program.id),
                            class: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Edit Program ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: deleteProgram,
                            class: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          }, " Delete Program "),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.programs.index"),
                            class: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Back to Programs ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" }, [
                    createVNode("div", { class: "lg:col-span-2" }, [
                      createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                        createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                          createVNode("h2", { class: "text-xl font-semibold text-gray-900 mb-4" }, " Program Details "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Title "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.program.title), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Slug "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.program.slug), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Price "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.program.formatted_price), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Duration "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.program.duration || "Not specified"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Category "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.program.category || "No category"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Type "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.program.type.charAt(0).toUpperCase() + __props.program.type.slice(1)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Created "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDate(__props.program.created_at)), 1)
                            ])
                          ]),
                          __props.program.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-6"
                          }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Description "),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.program.description), 1)
                          ])) : createCommentVNode("", true),
                          __props.program.features && __props.program.features.length ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-6"
                          }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Features "),
                            createVNode("dd", { class: "mt-2" }, [
                              createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.program.features, (feature) => {
                                  return openBlock(), createBlock("span", {
                                    key: feature,
                                    class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  }, toDisplayString(feature), 1);
                                }), 128))
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          __props.program.image ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "mt-6"
                          }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Image "),
                            createVNode("dd", { class: "mt-2" }, [
                              createVNode("img", {
                                src: __props.program.image,
                                alt: __props.program.title,
                                class: "w-full max-w-md h-48 object-cover rounded-lg"
                              }, null, 8, ["src", "alt"])
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                        createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Program Statistics "),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Total Interested Users "),
                              createVNode("dd", { class: "mt-1 text-2xl font-semibold text-gray-900" }, toDisplayString(__props.program.stats.total_interested), 1)
                            ]),
                            __props.canViewRevenue ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Total Payments "),
                              createVNode("dd", { class: "mt-1 text-2xl font-semibold text-gray-900" }, toDisplayString(__props.program.stats.total_payments), 1)
                            ])) : createCommentVNode("", true),
                            __props.canViewRevenue ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Total Revenue "),
                              createVNode("dd", { class: "mt-1 text-2xl font-semibold text-green-600" }, toDisplayString(formatCurrency(
                                __props.program.stats.total_revenue
                              )), 1)
                            ])) : createCommentVNode("", true),
                            __props.canViewRevenue ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Conversion Rate "),
                              createVNode("dd", { class: "mt-1 text-2xl font-semibold text-blue-600" }, toDisplayString(__props.program.stats.conversion_rate) + "% ", 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Interested Users "),
                        __props.program.interested_users.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.program.interested_users, (user) => {
                            return openBlock(), createBlock("div", {
                              key: user.id,
                              class: "flex items-center justify-between p-4 border rounded-lg"
                            }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(user.name), 1),
                                createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(user.email), 1),
                                createVNode("p", { class: "text-xs text-gray-400" }, " Interested: " + toDisplayString(formatDate(user.interested_at)), 1),
                                user.notes ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-gray-600 mt-1"
                                }, toDisplayString(user.notes), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("span", {
                                class: [
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                  getInterestLevelBadgeClass(
                                    user.interest_level
                                  )
                                ]
                              }, toDisplayString(user.interest_level), 3)
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-gray-500 text-center py-8"
                        }, " No interested users yet. "))
                      ])
                    ]),
                    __props.canViewRevenue ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    }, [
                      createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Recent Payments "),
                        __props.program.payments.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.program.payments, (payment) => {
                            return openBlock(), createBlock("div", {
                              key: payment.id,
                              class: "flex items-center justify-between p-4 border rounded-lg"
                            }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(payment.user ? payment.user.name : payment.guest_name || "Guest User"), 1),
                                createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(payment.user ? payment.user.email : payment.guest_email || "No email"), 1),
                                createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(formatDate(payment.created_at)), 1),
                                payment.paid_at ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-gray-400"
                                }, " Paid: " + toDisplayString(formatDate(payment.paid_at)), 1)) : createCommentVNode("", true),
                                !payment.user ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  class: "text-xs text-orange-600 mt-1"
                                }, " Guest Payment ")) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(payment.amount)), 1),
                                createVNode("span", {
                                  class: [
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                    getStatusBadgeClass(
                                      payment.status
                                    )
                                  ]
                                }, toDisplayString(payment.status), 3)
                              ])
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-gray-500 text-center py-8"
                        }, " No payments yet. "))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Programs/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
