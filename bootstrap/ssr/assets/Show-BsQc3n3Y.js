import { createVNode, resolveDynamicComponent, unref, withCtx, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderVNode, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { u as useAdminLayout } from "./useAdminLayout-b70BBPZG.js";
import "./AdminLayout-EcLlKyRZ.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    discountCode: {
      type: Object,
      required: true
    },
    redemptions: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const { Layout } = useAdminLayout();
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
    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Discount Code: ${ssrInterpolate(__props.discountCode.code)}</h2><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.discount-codes.edit", __props.discountCode.id),
              class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
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
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.discount-codes.index"),
              class: "bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to List `);
                } else {
                  return [
                    createTextVNode(" Back to List ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Discount Code: " + toDisplayString(__props.discountCode.code), 1),
                createVNode("div", { class: "flex space-x-2" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.discount-codes.edit", __props.discountCode.id),
                    class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Edit ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.discount-codes.index"),
                    class: "bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Back to List ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-6"${_scopeId}> Discount Code Details </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Code </dt><dd class="mt-1 text-sm text-gray-900 font-mono"${_scopeId}>${ssrInterpolate(__props.discountCode.code)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Name </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.discountCode.name)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Status </dt><dd class="mt-1"${_scopeId}><span class="${ssrRenderClass([
              getStatusClass(__props.discountCode.status),
              "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            ])}"${_scopeId}>${ssrInterpolate(getStatusLabel(__props.discountCode.status))}</span></dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Type </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.discountCode.type === "percentage" ? "Percentage" : "Fixed Amount")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Value </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.discountCode.formatted_value)}</dd></div>`);
            if (__props.discountCode.currency) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Currency </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.discountCode.currency)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.discountCode.min_amount) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Minimum Amount </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}> $${ssrInterpolate(__props.discountCode.min_amount)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Usage </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.discountCode.used_count)}${ssrInterpolate(__props.discountCode.max_redemptions ? "/" + __props.discountCode.max_redemptions : " (unlimited)")}</dd></div>`);
            if (__props.discountCode.starts_at) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Start Date </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.discountCode.starts_at))}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.discountCode.expires_at) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Expiry Date </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.discountCode.expires_at))}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Created </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.discountCode.created_at))}</dd></div>`);
            if (__props.discountCode.creator) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Created By </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = __props.discountCode.creator) == null ? void 0 : _a.name) || "Unknown")}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.discountCode.description) {
              _push2(`<div class="mt-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Description </dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.discountCode.description)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.discountCode.stripe_coupon_id) {
              _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}> Stripe Integration </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Stripe Coupon ID </dt><dd class="mt-1 text-sm text-gray-900 font-mono"${_scopeId}>${ssrInterpolate(__props.discountCode.stripe_coupon_id)}</dd></div>`);
              if (__props.discountCode.stripe_promotion_code_id) {
                _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}> Stripe Promotion Code ID </dt><dd class="mt-1 text-sm text-gray-900 font-mono"${_scopeId}>${ssrInterpolate(__props.discountCode.stripe_promotion_code_id)}</dd></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.redemptions && __props.redemptions.length > 0) {
              _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-6"${_scopeId}> Recent Redemptions </h3><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Customer Email </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount Discounted </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Session ID </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Date </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.redemptions, (redemption) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(redemption.user_email)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}> $${ssrInterpolate(redemption.amount_discounted)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono"${_scopeId}>${ssrInterpolate(redemption.stripe_session_id)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDateTime(
                  redemption.created_at
                ))}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            } else {
              _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-center"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-2"${_scopeId}> No Redemptions Yet </h3><p class="text-gray-500"${_scopeId}> This discount code hasn&#39;t been used by any customers yet. </p></div></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-6" }, " Discount Code Details "),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Code "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 font-mono" }, toDisplayString(__props.discountCode.code), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Name "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.discountCode.name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Status "),
                          createVNode("dd", { class: "mt-1" }, [
                            createVNode("span", {
                              class: [
                                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                getStatusClass(__props.discountCode.status)
                              ]
                            }, toDisplayString(getStatusLabel(__props.discountCode.status)), 3)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Type "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.discountCode.type === "percentage" ? "Percentage" : "Fixed Amount"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Value "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.discountCode.formatted_value), 1)
                        ]),
                        __props.discountCode.currency ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Currency "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.discountCode.currency), 1)
                        ])) : createCommentVNode("", true),
                        __props.discountCode.min_amount ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Minimum Amount "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, " $" + toDisplayString(__props.discountCode.min_amount), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Usage "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.discountCode.used_count) + toDisplayString(__props.discountCode.max_redemptions ? "/" + __props.discountCode.max_redemptions : " (unlimited)"), 1)
                        ]),
                        __props.discountCode.starts_at ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Start Date "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.discountCode.starts_at)), 1)
                        ])) : createCommentVNode("", true),
                        __props.discountCode.expires_at ? (openBlock(), createBlock("div", { key: 3 }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Expiry Date "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.discountCode.expires_at)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Created "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.discountCode.created_at)), 1)
                        ]),
                        __props.discountCode.creator ? (openBlock(), createBlock("div", { key: 4 }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Created By "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(((_b = __props.discountCode.creator) == null ? void 0 : _b.name) || "Unknown"), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      __props.discountCode.description ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Description "),
                        createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.discountCode.description), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  __props.discountCode.stripe_coupon_id ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
                  }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, " Stripe Integration "),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Stripe Coupon ID "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 font-mono" }, toDisplayString(__props.discountCode.stripe_coupon_id), 1)
                        ]),
                        __props.discountCode.stripe_promotion_code_id ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, " Stripe Promotion Code ID "),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 font-mono" }, toDisplayString(__props.discountCode.stripe_promotion_code_id), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  __props.redemptions && __props.redemptions.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
                  }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-6" }, " Recent Redemptions "),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Customer Email "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount Discounted "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Session ID "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Date ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.redemptions, (redemption) => {
                              return openBlock(), createBlock("tr", {
                                key: redemption.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(redemption.user_email), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, " $" + toDisplayString(redemption.amount_discounted), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono" }, toDisplayString(redemption.stripe_session_id), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDateTime(
                                  redemption.created_at
                                )), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
                  }, [
                    createVNode("div", { class: "p-6 text-center" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, " No Redemptions Yet "),
                      createVNode("p", { class: "text-gray-500" }, " This discount code hasn't been used by any customers yet. ")
                    ])
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/DiscountCodes/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
