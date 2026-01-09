import { unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-EcLlKyRZ.js";
import { Head, Link, router } from "@inertiajs/vue3";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    user: Object
  },
  setup(__props) {
    const props = __props;
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
        "paid": "bg-green-100 text-green-800",
        "pending": "bg-yellow-100 text-yellow-800",
        "failed": "bg-red-100 text-red-800",
        "refunded": "bg-gray-100 text-gray-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const deleteUser = () => {
      if (confirm(`Are you sure you want to delete user "${props.user.name}"?`)) {
        router.delete(route("admin.users.destroy", props.user.id));
      }
    };
    const tagAsInfluencer = () => {
      if (confirm(`Are you sure you want to tag "${props.user.name}" as an influencer?`)) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = route("admin.users.tag-influencer", props.user.id);
        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
          const csrfInput = document.createElement("input");
          csrfInput.type = "hidden";
          csrfInput.name = "_token";
          csrfInput.value = csrfToken.getAttribute("content");
          form.appendChild(csrfInput);
        }
        document.body.appendChild(form);
        form.submit();
      }
    };
    const removeInfluencerTag = () => {
      if (confirm(`Are you sure you want to remove the influencer tag from "${props.user.name}"?`)) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = route("admin.users.remove-influencer", props.user.id);
        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
          const csrfInput = document.createElement("input");
          csrfInput.type = "hidden";
          csrfInput.name = "_token";
          csrfInput.value = csrfToken.getAttribute("content");
          form.appendChild(csrfInput);
        }
        document.body.appendChild(form);
        form.submit();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.user.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0 h-12 w-12"${_scopeId}><div class="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center"${_scopeId}><span class="text-lg font-medium text-white"${_scopeId}>${ssrInterpolate(__props.user.name.charAt(0))}</span></div></div><div class="ml-4"${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.user.name)}</h1><p class="mt-1 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(__props.user.email)}</p></div></div><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.users.edit", __props.user.id),
              class: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit User `);
                } else {
                  return [
                    createTextVNode(" Edit User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!__props.user.is_influencer) {
              _push2(`<button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"${_scopeId}> Tag as Influencer </button>`);
            } else {
              _push2(`<button class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"${_scopeId}> Remove Influencer Tag </button>`);
            }
            _push2(`<button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"${_scopeId}> Delete User </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.users.index"),
              class: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Users `);
                } else {
                  return [
                    createTextVNode(" Back to Users ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"${_scopeId}><div class="lg:col-span-2"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h2 class="text-xl font-semibold text-gray-900 mb-4"${_scopeId}>User Information</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Full Name</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.user.name)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Email Address</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.user.email)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>School Name</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.user.school_name || "-")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Email Verified</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}><span class="${ssrRenderClass([__props.user.email_verified_at ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(__props.user.email_verified_at ? "Verified" : "Not Verified")}</span></dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Registration Date</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.user.created_at))}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Total Spent</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.user.total_spent))}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Influencer Status</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}><span class="${ssrRenderClass([__props.user.is_influencer ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(__props.user.is_influencer ? "Influencer" : "Regular User")}</span></dd></div></div></div></div></div><div class="space-y-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Quick Stats</h3><div class="space-y-4"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Interested Programs</dt><dd class="mt-1 text-2xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.user.interested_programs.length)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Total Payments</dt><dd class="mt-1 text-2xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.user.payments.length)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Total Spent</dt><dd class="mt-1 text-2xl font-semibold text-green-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.user.total_spent))}</dd></div></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Interested Programs</h3>`);
            if (__props.user.interested_programs.length) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.user.interested_programs, (program) => {
                _push2(`<div class="flex items-center justify-between p-4 border rounded-lg"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(program.title)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatCurrency(program.price))}</p>`);
                if (program.notes) {
                  _push2(`<p class="text-xs text-gray-600 mt-1"${_scopeId}>${ssrInterpolate(program.notes)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<p class="text-gray-500 text-center py-8"${_scopeId}>No program interests yet.</p>`);
            }
            _push2(`</div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Payment History</h3>`);
            if (__props.user.payments.length) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.user.payments, (payment) => {
                _push2(`<div class="flex items-center justify-between p-4 border rounded-lg"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(payment.program.title)}</p><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(payment.created_at))}</p>`);
                if (payment.paid_at) {
                  _push2(`<p class="text-xs text-gray-400"${_scopeId}>Paid: ${ssrInterpolate(formatDate(payment.paid_at))}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (payment.stripe_payment_intent_id) {
                  _push2(`<p class="text-xs text-gray-500"${_scopeId}> ID: ${ssrInterpolate(payment.stripe_payment_intent_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (payment.notes) {
                  _push2(`<p class="text-xs text-gray-600 mt-1"${_scopeId}>${ssrInterpolate(payment.notes)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="text-right"${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(payment.amount))}</p><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(payment.status)])}"${_scopeId}>${ssrInterpolate(payment.status)}</span></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<p class="text-gray-500 text-center py-8"${_scopeId}>No payments yet.</p>`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0 h-12 w-12" }, [
                            createVNode("div", { class: "h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center" }, [
                              createVNode("span", { class: "text-lg font-medium text-white" }, toDisplayString(__props.user.name.charAt(0)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "ml-4" }, [
                            createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, toDisplayString(__props.user.name), 1),
                            createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(__props.user.email), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex space-x-2" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.users.edit", __props.user.id),
                            class: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Edit User ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          !__props.user.is_influencer ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: tagAsInfluencer,
                            class: "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          }, " Tag as Influencer ")) : (openBlock(), createBlock("button", {
                            key: 1,
                            onClick: removeInfluencerTag,
                            class: "bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                          }, " Remove Influencer Tag ")),
                          createVNode("button", {
                            onClick: deleteUser,
                            class: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          }, " Delete User "),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.users.index"),
                            class: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Back to Users ")
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
                          createVNode("h2", { class: "text-xl font-semibold text-gray-900 mb-4" }, "User Information"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Full Name"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.user.name), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Email Address"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.user.email), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "School Name"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.user.school_name || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Email Verified"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, [
                                createVNode("span", {
                                  class: [__props.user.email_verified_at ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"]
                                }, toDisplayString(__props.user.email_verified_at ? "Verified" : "Not Verified"), 3)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Registration Date"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDate(__props.user.created_at)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Total Spent"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatCurrency(__props.user.total_spent)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Influencer Status"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, [
                                createVNode("span", {
                                  class: [__props.user.is_influencer ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"]
                                }, toDisplayString(__props.user.is_influencer ? "Influencer" : "Regular User"), 3)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                        createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Quick Stats"),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Interested Programs"),
                              createVNode("dd", { class: "mt-1 text-2xl font-semibold text-gray-900" }, toDisplayString(__props.user.interested_programs.length), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Total Payments"),
                              createVNode("dd", { class: "mt-1 text-2xl font-semibold text-gray-900" }, toDisplayString(__props.user.payments.length), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Total Spent"),
                              createVNode("dd", { class: "mt-1 text-2xl font-semibold text-green-600" }, toDisplayString(formatCurrency(__props.user.total_spent)), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Interested Programs"),
                        __props.user.interested_programs.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.user.interested_programs, (program) => {
                            return openBlock(), createBlock("div", {
                              key: program.id,
                              class: "flex items-center justify-between p-4 border rounded-lg"
                            }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(program.title), 1),
                                createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(formatCurrency(program.price)), 1),
                                program.notes ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-gray-600 mt-1"
                                }, toDisplayString(program.notes), 1)) : createCommentVNode("", true)
                              ])
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-gray-500 text-center py-8"
                        }, "No program interests yet."))
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Payment History"),
                        __props.user.payments.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.user.payments, (payment) => {
                            return openBlock(), createBlock("div", {
                              key: payment.id,
                              class: "flex items-center justify-between p-4 border rounded-lg"
                            }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(payment.program.title), 1),
                                createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(formatDate(payment.created_at)), 1),
                                payment.paid_at ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-gray-400"
                                }, "Paid: " + toDisplayString(formatDate(payment.paid_at)), 1)) : createCommentVNode("", true),
                                payment.stripe_payment_intent_id ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  class: "text-xs text-gray-500"
                                }, " ID: " + toDisplayString(payment.stripe_payment_intent_id), 1)) : createCommentVNode("", true),
                                payment.notes ? (openBlock(), createBlock("p", {
                                  key: 2,
                                  class: "text-xs text-gray-600 mt-1"
                                }, toDisplayString(payment.notes), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(payment.amount)), 1),
                                createVNode("span", {
                                  class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(payment.status)]
                                }, toDisplayString(payment.status), 3)
                              ])
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-gray-500 text-center py-8"
                        }, "No payments yet."))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
