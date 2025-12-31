import { unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-KyMrG-Br.js";
import { Head, Link, router } from "@inertiajs/vue3";
import "./AdminLayout-VxMcYlr7.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    session: Object
  },
  setup(__props) {
    const props = __props;
    const { Layout } = useAdminLayout();
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateRange = (session) => {
      if (session.start_date && session.end_date) {
        return `${formatDate(session.start_date)} - ${formatDate(
          session.end_date
        )}`;
      }
      return formatDate(session.date);
    };
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
    const getAvailabilityStatus = () => {
      if (!props.session.is_active) return "DRAFT";
      if (props.session.remaining_spots <= 5) return "CRITICAL";
      if (props.session.remaining_spots <= 10) return "HIGH DEMAND";
      return "AVAILABLE";
    };
    const getAvailabilityClass = () => {
      if (!props.session.is_active)
        return "bg-gray-100 text-gray-800 border-gray-200";
      if (props.session.remaining_spots <= 5)
        return "bg-red-100 text-red-800 border-red-200";
      if (props.session.remaining_spots <= 10)
        return "bg-orange-100 text-orange-800 border-orange-200";
      return "bg-green-100 text-green-800 border-green-200";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Training Camp Session Details" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}> Training Camp Session Details </h2><p class="text-gray-600 mt-1"${_scopeId}> 🏕️ ${ssrInterpolate((_a = __props.session.program) == null ? void 0 : _a.title)}</p></div><div class="flex items-center space-x-3"${_scopeId}><button class="${ssrRenderClass([
              __props.session.is_active ? "text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200" : "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 border border-green-200",
              "px-4 py-2 rounded-lg transition-colors font-medium"
            ])}"${_scopeId}>${ssrInterpolate(__props.session.is_active ? "📝 Send to Draft" : "📢 Publish")}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route(
                "admin.training-camp-sessions.edit",
                __props.session.id
              ),
              class: "bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Session `);
                } else {
                  return [
                    createTextVNode(" Edit Session ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
            _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}><div class="bg-orange-50 border border-orange-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-orange-900 mb-4"${_scopeId}> ⛰️ Location Details </h3><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Location</label><div class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.location)}</div></div>`);
            if (__props.session.venue_name) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Venue</label><div class="text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.venue_name)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.session.city || __props.session.country) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>City &amp; Country</label><div class="text-gray-900"${_scopeId}>${ssrInterpolate([
                __props.session.city,
                __props.session.country
              ].filter(Boolean).join(", "))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.session.venue_address) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Address</label><div class="text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.venue_address)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.session.school) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Associated School</label><div class="text-gray-900 flex items-center"${_scopeId}> 🏫 ${ssrInterpolate(__props.session.school.name)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.session.organization_logo) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Organization Logo</label><div class="mt-2"${_scopeId}><img${ssrRenderAttr(
                "src",
                __props.session.organization_logo
              )} alt="Organization Logo" class="h-16 w-16 object-contain border border-gray-300 rounded-lg bg-white p-2"${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.session.location_highlights && __props.session.location_highlights.length > 0) {
              _push2(`<div class="mt-4"${_scopeId}><label class="text-sm font-medium text-gray-700 mb-2 block"${_scopeId}>Location Highlights</label><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.session.location_highlights, (highlight) => {
                _push2(`<span class="inline-flex items-center bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full border border-orange-200"${_scopeId}> ✨ ${ssrInterpolate(highlight)}</span>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-green-50 border border-green-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-green-900 mb-4"${_scopeId}> 📅 Schedule </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div class="md:col-span-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>${ssrInterpolate(__props.session.start_date && __props.session.end_date ? "Date Range" : "Date")}</label><div class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatDateRange(__props.session))}</div></div>`);
            if (__props.session.timezone) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Timezone</label><div class="text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.timezone)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.session.special_notes) {
              _push2(`<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-yellow-900 mb-4"${_scopeId}> 📝 Special Notes </h3><div class="text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.special_notes)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6"${_scopeId}><div class="bg-white border border-gray-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Program Type </h3><div class="flex justify-center"${_scopeId}>`);
            if (__props.session.program_type === "mastery") {
              _push2(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"${_scopeId}> 👑 Mastery Program </span>`);
            } else {
              _push2(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200"${_scopeId}> ⚡ Essentials Program </span>`);
            }
            _push2(`</div></div><div class="bg-white border border-gray-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Status </h3><div class="space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Active</span><span class="${ssrRenderClass(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${__props.session.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`)}"${_scopeId}>${ssrInterpolate(__props.session.is_active ? "Published" : "Draft")}</span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Featured</span><span class="${ssrRenderClass(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${__props.session.is_featured ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`)}"${_scopeId}>${ssrInterpolate(__props.session.is_featured ? "Yes" : "No")}</span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Availability</span><span class="${ssrRenderClass(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityClass()}`)}"${_scopeId}>${ssrInterpolate(getAvailabilityStatus())}</span></div></div></div><div class="bg-white border border-gray-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Capacity </h3><div class="space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Available Spots</span><span class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.available_spots)}</span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Booked</span><span class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.booked_spots)}</span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Remaining</span><span class="${ssrRenderClass(`font-semibold ${__props.session.remaining_spots <= 5 ? "text-red-600" : __props.session.remaining_spots <= 10 ? "text-orange-600" : "text-green-600"}`)}"${_scopeId}>${ssrInterpolate(__props.session.remaining_spots)}</span></div><div class="w-full bg-gray-200 rounded-full h-3 mt-2"${_scopeId}><div class="${ssrRenderClass(`h-3 rounded-full transition-all duration-300 ${__props.session.remaining_spots <= 5 ? "bg-red-500" : __props.session.remaining_spots <= 10 ? "bg-orange-500" : "bg-green-500"}`)}" style="${ssrRenderStyle({
              width: `${__props.session.booked_spots / __props.session.available_spots * 100}%`
            })}"${_scopeId}></div></div></div></div><div class="bg-white border border-gray-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Pricing </h3><div class="space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Session Price</span><span class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.session.formatted_effective_price)}</span></div>`);
            if ((_b = __props.session.program) == null ? void 0 : _b.base_price) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Base Price</span><span class="text-gray-700"${_scopeId}>$${ssrInterpolate(__props.session.program.base_price)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.session.price_difference !== 0) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Price Difference</span><span class="${ssrRenderClass(`font-medium ${__props.session.price_difference > 0 ? "text-purple-600" : "text-green-600"}`)}"${_scopeId}>${ssrInterpolate(__props.session.price_difference > 0 ? "+" : "")}$${ssrInterpolate(Math.abs(
                __props.session.price_difference
              ))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white border border-gray-200 rounded-lg p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Actions </h3><div class="space-y-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route(
                "admin.training-camp-sessions.duplicate",
                __props.session.id
              ),
              method: "post",
              class: "w-full inline-flex items-center justify-center px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium rounded-lg transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 📋 Duplicate Session `);
                } else {
                  return [
                    createTextVNode(" 📋 Duplicate Session ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="${ssrRenderClass([
              __props.session.is_active ? "bg-orange-100 hover:bg-orange-200 text-orange-800" : "bg-green-100 hover:bg-green-200 text-green-800",
              "w-full px-4 py-2 font-medium rounded-lg transition-colors"
            ])}"${_scopeId}>${ssrInterpolate(__props.session.is_active ? "📝 Send to Draft" : "📢 Publish Session")}</button></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, " Training Camp Session Details "),
                          createVNode("p", { class: "text-gray-600 mt-1" }, " 🏕️ " + toDisplayString((_c = __props.session.program) == null ? void 0 : _c.title), 1)
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
                              "admin.training-camp-sessions.edit",
                              __props.session.id
                            ),
                            class: "bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Edit Session ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
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
                      createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                        createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                          createVNode("div", { class: "bg-orange-50 border border-orange-200 rounded-lg p-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-orange-900 mb-4" }, " ⛰️ Location Details "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Location"),
                                createVNode("div", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.session.location), 1)
                              ]),
                              __props.session.venue_name ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Venue"),
                                createVNode("div", { class: "text-gray-900" }, toDisplayString(__props.session.venue_name), 1)
                              ])) : createCommentVNode("", true),
                              __props.session.city || __props.session.country ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, "City & Country"),
                                createVNode("div", { class: "text-gray-900" }, toDisplayString([
                                  __props.session.city,
                                  __props.session.country
                                ].filter(Boolean).join(", ")), 1)
                              ])) : createCommentVNode("", true),
                              __props.session.venue_address ? (openBlock(), createBlock("div", { key: 2 }, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Address"),
                                createVNode("div", { class: "text-gray-900" }, toDisplayString(__props.session.venue_address), 1)
                              ])) : createCommentVNode("", true),
                              __props.session.school ? (openBlock(), createBlock("div", { key: 3 }, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Associated School"),
                                createVNode("div", { class: "text-gray-900 flex items-center" }, " 🏫 " + toDisplayString(__props.session.school.name), 1)
                              ])) : createCommentVNode("", true),
                              __props.session.organization_logo ? (openBlock(), createBlock("div", { key: 4 }, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Organization Logo"),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("img", {
                                    src: __props.session.organization_logo,
                                    alt: "Organization Logo",
                                    class: "h-16 w-16 object-contain border border-gray-300 rounded-lg bg-white p-2"
                                  }, null, 8, ["src"])
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            __props.session.location_highlights && __props.session.location_highlights.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-4"
                            }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-700 mb-2 block" }, "Location Highlights"),
                              createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.session.location_highlights, (highlight) => {
                                  return openBlock(), createBlock("span", {
                                    key: highlight,
                                    class: "inline-flex items-center bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full border border-orange-200"
                                  }, " ✨ " + toDisplayString(highlight), 1);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "bg-green-50 border border-green-200 rounded-lg p-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-green-900 mb-4" }, " 📅 Schedule "),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, toDisplayString(__props.session.start_date && __props.session.end_date ? "Date Range" : "Date"), 1),
                                createVNode("div", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(formatDateRange(__props.session)), 1)
                              ]),
                              __props.session.timezone ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Timezone"),
                                createVNode("div", { class: "text-gray-900" }, toDisplayString(__props.session.timezone), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          __props.session.special_notes ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "bg-yellow-50 border border-yellow-200 rounded-lg p-6"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-yellow-900 mb-4" }, " 📝 Special Notes "),
                            createVNode("div", { class: "text-gray-900" }, toDisplayString(__props.session.special_notes), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", { class: "bg-white border border-gray-200 rounded-lg p-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Program Type "),
                            createVNode("div", { class: "flex justify-center" }, [
                              __props.session.program_type === "mastery" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                              }, " 👑 Mastery Program ")) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200"
                              }, " ⚡ Essentials Program "))
                            ])
                          ]),
                          createVNode("div", { class: "bg-white border border-gray-200 rounded-lg p-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Status "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Active"),
                                createVNode("span", {
                                  class: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${__props.session.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`
                                }, toDisplayString(__props.session.is_active ? "Published" : "Draft"), 3)
                              ]),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Featured"),
                                createVNode("span", {
                                  class: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${__props.session.is_featured ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`
                                }, toDisplayString(__props.session.is_featured ? "Yes" : "No"), 3)
                              ]),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Availability"),
                                createVNode("span", {
                                  class: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityClass()}`
                                }, toDisplayString(getAvailabilityStatus()), 3)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "bg-white border border-gray-200 rounded-lg p-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Capacity "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Available Spots"),
                                createVNode("span", { class: "font-semibold text-gray-900" }, toDisplayString(__props.session.available_spots), 1)
                              ]),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Booked"),
                                createVNode("span", { class: "font-semibold text-gray-900" }, toDisplayString(__props.session.booked_spots), 1)
                              ]),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Remaining"),
                                createVNode("span", {
                                  class: `font-semibold ${__props.session.remaining_spots <= 5 ? "text-red-600" : __props.session.remaining_spots <= 10 ? "text-orange-600" : "text-green-600"}`
                                }, toDisplayString(__props.session.remaining_spots), 3)
                              ]),
                              createVNode("div", { class: "w-full bg-gray-200 rounded-full h-3 mt-2" }, [
                                createVNode("div", {
                                  class: `h-3 rounded-full transition-all duration-300 ${__props.session.remaining_spots <= 5 ? "bg-red-500" : __props.session.remaining_spots <= 10 ? "bg-orange-500" : "bg-green-500"}`,
                                  style: {
                                    width: `${__props.session.booked_spots / __props.session.available_spots * 100}%`
                                  }
                                }, null, 6)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "bg-white border border-gray-200 rounded-lg p-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Pricing "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Session Price"),
                                createVNode("span", { class: "font-semibold text-gray-900" }, toDisplayString(__props.session.formatted_effective_price), 1)
                              ]),
                              ((_d = __props.session.program) == null ? void 0 : _d.base_price) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center justify-between"
                              }, [
                                createVNode("span", { class: "text-gray-600" }, "Base Price"),
                                createVNode("span", { class: "text-gray-700" }, "$" + toDisplayString(__props.session.program.base_price), 1)
                              ])) : createCommentVNode("", true),
                              __props.session.price_difference !== 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex items-center justify-between"
                              }, [
                                createVNode("span", { class: "text-gray-600" }, "Price Difference"),
                                createVNode("span", {
                                  class: `font-medium ${__props.session.price_difference > 0 ? "text-purple-600" : "text-green-600"}`
                                }, toDisplayString(__props.session.price_difference > 0 ? "+" : "") + "$" + toDisplayString(Math.abs(
                                  __props.session.price_difference
                                )), 3)
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "bg-white border border-gray-200 rounded-lg p-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Actions "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route(
                                  "admin.training-camp-sessions.duplicate",
                                  __props.session.id
                                ),
                                method: "post",
                                class: "w-full inline-flex items-center justify-center px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium rounded-lg transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 📋 Duplicate Session ")
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              createVNode("button", {
                                onClick: togglePublish,
                                class: [
                                  __props.session.is_active ? "bg-orange-100 hover:bg-orange-200 text-orange-800" : "bg-green-100 hover:bg-green-200 text-green-800",
                                  "w-full px-4 py-2 font-medium rounded-lg transition-colors"
                                ]
                              }, toDisplayString(__props.session.is_active ? "📝 Send to Draft" : "📢 Publish Session"), 3)
                            ])
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
      }), _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/TrainingCampSessions/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
