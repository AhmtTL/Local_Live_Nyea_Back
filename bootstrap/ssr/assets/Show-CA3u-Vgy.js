import { computed, unref, createVNode, resolveDynamicComponent, withCtx, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-b70BBPZG.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Button-DospE3Pk.js";
import "./AdminLayout-EcLlKyRZ.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    referral: Object
  },
  setup(__props) {
    const props = __props;
    const { Layout } = useAdminLayout();
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
    const totalRevenue = computed(() => {
      var _a;
      return ((_a = props.referral.conversions) == null ? void 0 : _a.reduce(
        (sum, conversion) => sum + parseFloat(conversion.amount),
        0
      )) || 0;
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Referral - ${(_a = __props.referral.user) == null ? void 0 : _a.name} - ${(_b = __props.referral.school) == null ? void 0 : _b.name}`
      }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><div${_scopeId}><div class="flex items-center space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.referrals.index"),
              class: "text-gray-500 hover:text-gray-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15 19l-7-7 7-7"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Referral Details </h2></div><p class="mt-1 text-sm text-gray-600"${_scopeId}> View referral performance and conversion history </p></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              variant: "secondary",
              href: _ctx.route("admin.referrals.index"),
              as: "Link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Referrals `);
                } else {
                  return [
                    createTextVNode(" Back to Referrals ")
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
                  createVNode("div", { class: "flex items-center space-x-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.referrals.index"),
                      class: "text-gray-500 hover:text-gray-700"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15 19l-7-7 7-7"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Referral Details ")
                  ]),
                  createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " View referral performance and conversion history ")
                ]),
                createVNode(_sfc_main$1, {
                  variant: "secondary",
                  href: _ctx.route("admin.referrals.index"),
                  as: "Link"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Back to Referrals ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8 space-y-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-6"${_scopeId}> Referral Overview </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>Influencer</label><p class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate((_a2 = __props.referral.user) == null ? void 0 : _a2.name)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate((_b2 = __props.referral.user) == null ? void 0 : _b2.email)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>School</label><p class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate((_c = __props.referral.school) == null ? void 0 : _c.name)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>Referral Code</label><div class="mt-1 flex items-center space-x-2"${_scopeId}><p class="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded"${_scopeId}>${ssrInterpolate(__props.referral.referral_code)}</p><button class="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Copy to clipboard"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId}></path></svg></button></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>Created Date</label><p class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.referral.created_at))}</p></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>Referral Link</label><div class="mt-1 flex items-center space-x-2"${_scopeId}><p class="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded break-all"${_scopeId}>${ssrInterpolate(__props.referral.referral_link)}</p><button class="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Copy to clipboard"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId}></path></svg></button></div></div></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"${_scopeId}><svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"${_scopeId}></path></svg></div></div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}> Total Conversions </p><p class="text-2xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.referral.conversions_count || 0)}</p></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"${_scopeId}><svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></div></div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}> Total Revenue </p><p class="text-2xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</p></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"${_scopeId}><svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg></div></div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}> Average Order Value </p><p class="text-2xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.referral.conversions_count > 0 ? formatCurrency(
              totalRevenue.value / __props.referral.conversions_count
            ) : formatCurrency(0))}</p></div></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="px-6 py-4 border-b border-gray-200"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}> Conversion History </h3><p class="mt-1 text-sm text-gray-600"${_scopeId}> List of successful referral conversions </p></div>`);
            if (__props.referral.conversions && __props.referral.conversions.length > 0) {
              _push2(`<div class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.referral.conversions, (conversion) => {
                var _a3;
                _push2(`<div class="p-6 hover:bg-gray-50"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex-1"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(conversion.customer_name)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(conversion.customer_email)}</p>`);
                if (conversion.customer_grade) {
                  _push2(`<p class="text-sm text-gray-500"${_scopeId}> Grade: ${ssrInterpolate(conversion.customer_grade)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="mt-2 flex items-center space-x-4 text-sm text-gray-500"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(conversion.created_at))}</span><span${_scopeId}>•</span><span${_scopeId}>Payment ID: ${ssrInterpolate(conversion.payment_id)}</span></div></div><div class="text-right"${_scopeId}><p class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(conversion.amount))}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(((_a3 = conversion.program) == null ? void 0 : _a3.title) || "Program")}</p></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="p-6 text-center"${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}> No conversions yet </h3><p class="mt-1 text-sm text-gray-500"${_scopeId}> This referral hasn&#39;t generated any conversions yet. </p></div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8 space-y-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-6" }, " Referral Overview "),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Influencer"),
                            createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString((_d = __props.referral.user) == null ? void 0 : _d.name), 1),
                            createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString((_e = __props.referral.user) == null ? void 0 : _e.email), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "School"),
                            createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString((_f = __props.referral.school) == null ? void 0 : _f.name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Referral Code"),
                            createVNode("div", { class: "mt-1 flex items-center space-x-2" }, [
                              createVNode("p", { class: "text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded" }, toDisplayString(__props.referral.referral_code), 1),
                              createVNode("button", {
                                onClick: ($event) => copyToClipboard(
                                  __props.referral.referral_code
                                ),
                                class: "p-1 text-gray-400 hover:text-gray-600 transition-colors",
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
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Created Date"),
                            createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDate(__props.referral.created_at)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Referral Link"),
                            createVNode("div", { class: "mt-1 flex items-center space-x-2" }, [
                              createVNode("p", { class: "text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded break-all" }, toDisplayString(__props.referral.referral_link), 1),
                              createVNode("button", {
                                onClick: ($event) => copyToClipboard(
                                  __props.referral.referral_link
                                ),
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
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("div", { class: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 text-blue-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                })
                              ]))
                            ])
                          ]),
                          createVNode("div", { class: "ml-4" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-500" }, " Total Conversions "),
                            createVNode("p", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(__props.referral.conversions_count || 0), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("div", { class: "w-8 h-8 bg-green-100 rounded-full flex items-center justify-center" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 text-green-600",
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
                            ])
                          ]),
                          createVNode("div", { class: "ml-4" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-500" }, " Total Revenue "),
                            createVNode("p", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(formatCurrency(totalRevenue.value)), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("div", { class: "w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 text-purple-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                })
                              ]))
                            ])
                          ]),
                          createVNode("div", { class: "ml-4" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-500" }, " Average Order Value "),
                            createVNode("p", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(__props.referral.conversions_count > 0 ? formatCurrency(
                              totalRevenue.value / __props.referral.conversions_count
                            ) : formatCurrency(0)), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900" }, " Conversion History "),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " List of successful referral conversions ")
                    ]),
                    __props.referral.conversions && __props.referral.conversions.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "divide-y divide-gray-200"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.referral.conversions, (conversion) => {
                        var _a3;
                        return openBlock(), createBlock("div", {
                          key: conversion.id,
                          class: "p-6 hover:bg-gray-50"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("div", { class: "flex items-center space-x-4" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(conversion.customer_name), 1),
                                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(conversion.customer_email), 1),
                                  conversion.customer_grade ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-sm text-gray-500"
                                  }, " Grade: " + toDisplayString(conversion.customer_grade), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "mt-2 flex items-center space-x-4 text-sm text-gray-500" }, [
                                createVNode("span", null, toDisplayString(formatDate(conversion.created_at)), 1),
                                createVNode("span", null, "•"),
                                createVNode("span", null, "Payment ID: " + toDisplayString(conversion.payment_id), 1)
                              ])
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(conversion.amount)), 1),
                              createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(((_a3 = conversion.program) == null ? void 0 : _a3.title) || "Program"), 1)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-6 text-center"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "mx-auto h-12 w-12 text-gray-400",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        })
                      ])),
                      createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, " No conversions yet "),
                      createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " This referral hasn't generated any conversions yet. ")
                    ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Referrals/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
