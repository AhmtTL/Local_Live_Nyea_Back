import { unref, createVNode, resolveDynamicComponent, withCtx, createBlock, createTextVNode, openBlock, toDisplayString, createCommentVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-b70BBPZG.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { u as useServerSearch } from "./useServerSearch-C-KcNfn2.js";
import "./AdminLayout-EcLlKyRZ.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    sessions: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const { filters } = useServerSearch(
      "admin.workshop-sessions.index",
      props.filters
    );
    const { Layout } = useAdminLayout();
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
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
    const getUrgencyClass = (session) => {
      if (!session.is_active) return "bg-gray-100 text-gray-800 border-gray-200";
      if (session.remaining_spots <= 5)
        return "bg-red-100 text-red-800 border-red-200";
      if (session.remaining_spots <= 10)
        return "bg-orange-100 text-orange-800 border-orange-200";
      return "bg-green-100 text-green-800 border-green-200";
    };
    const getUrgencyText = (session) => {
      if (!session.is_active) return "📝 DRAFT";
      if (session.remaining_spots <= 5) return "🔥 CRITICAL";
      if (session.remaining_spots <= 10) return "⚡ HIGH DEMAND";
      return "✅ AVAILABLE";
    };
    const deleteSession = (sessionId) => {
      if (confirm("Are you sure you want to delete this workshop session?")) {
        router.delete(route("admin.workshop-sessions.destroy", sessionId));
      }
    };
    const duplicateSession = (sessionId) => {
      if (confirm(
        "Are you sure you want to duplicate this workshop session? A copy will be created with updated details."
      )) {
        router.post(route("admin.workshop-sessions.duplicate", sessionId));
      }
    };
    const togglePublish = (sessionId, currentStatus) => {
      const action = currentStatus ? "send to draft" : "publish";
      if (confirm(`Are you sure you want to ${action} this workshop session?`)) {
        router.post(route("admin.workshop-sessions.toggle-publish", sessionId));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Workshop Sessions Management" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}> Workshop Sessions </h2><p class="text-gray-600 mt-1"${_scopeId}> Manage workshop sessions across multiple locations </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.workshop-sessions.create"),
              class: "inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg> Add New Session `);
                } else {
                  return [
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
                        d: "M12 4v16m8-8H4"
                      })
                    ])),
                    createTextVNode(" Add New Session ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mb-6"${_scopeId}><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by location, city, country, or workshop name..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Workshop </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Program Type </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> School </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Location </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Availability </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.sessions.data, (session) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(
                  "admin.workshop-sessions.show",
                  session.id
                )
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b, _c, _d;
                  if (_push3) {
                    _push3(`<td class="px-6 py-4"${_scopeId2}><div class="text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate((_a = session.program) == null ? void 0 : _a.title)}</div><div class="text-sm text-gray-500"${_scopeId2}>${ssrInterpolate((_b = session.program) == null ? void 0 : _b.slug)}</div><div class="text-xs text-gray-600 mt-1"${_scopeId2}> 📅 ${ssrInterpolate(formatDateRange(session))} • ${ssrInterpolate(session.time)}</div></td>`);
                  } else {
                    return [
                      createVNode("td", { class: "px-6 py-4" }, [
                        createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString((_c = session.program) == null ? void 0 : _c.title), 1),
                        createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString((_d = session.program) == null ? void 0 : _d.slug), 1),
                        createVNode("div", { class: "text-xs text-gray-600 mt-1" }, " 📅 " + toDisplayString(formatDateRange(session)) + " • " + toDisplayString(session.time), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<td class="px-6 py-4 whitespace-nowrap"${_scopeId}>`);
              if (session.program_type === "mastery") {
                _push2(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"${_scopeId}> 👑 Mastery </span>`);
              } else {
                _push2(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200"${_scopeId}> ⚡ Essentials </span>`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>`);
              if (session.school) {
                _push2(`<div class="text-sm font-medium text-gray-900"${_scopeId}> 🏫 ${ssrInterpolate(session.school.name)}</div>`);
              } else {
                _push2(`<div class="text-sm text-gray-400 italic"${_scopeId}> No school assigned </div>`);
              }
              _push2(`</td><td class="px-6 py-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(session.location)}</div>`);
              if (session.venue_name) {
                _push2(`<div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(session.venue_name)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (session.city || session.country) {
                _push2(`<div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate([
                  session.city,
                  session.country
                ].filter(Boolean).join(", "))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(session.available_spots - session.booked_spots)}/${ssrInterpolate(session.available_spots)} available </div><div class="w-full bg-gray-200 rounded-full h-2 mt-1"${_scopeId}><div class="${ssrRenderClass(`h-2 rounded-full ${session.remaining_spots <= 5 ? "bg-red-500" : session.remaining_spots <= 10 ? "bg-orange-500" : "bg-green-500"}`)}" style="${ssrRenderStyle({
                width: `${session.booked_spots / session.available_spots * 100}%`
              })}"${_scopeId}></div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyClass(
                session
              )}`)}"${_scopeId}>${ssrInterpolate(getUrgencyText(session))}</span>`);
              if (session.is_featured) {
                _push2(`<div class="mt-1"${_scopeId}><span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"${_scopeId}> ⭐ Featured </span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex items-center justify-end space-x-2"${_scopeId}><button class="${ssrRenderClass([
                session.is_active ? "text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100" : "text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100",
                "px-3 py-1 rounded transition-colors text-sm font-medium"
              ])}"${ssrRenderAttr(
                "title",
                session.is_active ? "Send to draft" : "Publish session"
              )}${_scopeId}>${ssrInterpolate(session.is_active ? "📝 Send to Draft" : "📢 Publish")}</button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(
                  "admin.workshop-sessions.show",
                  session.id
                ),
                class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
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
                  "admin.workshop-sessions.edit",
                  session.id
                ),
                class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
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
              _push2(`<button class="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-sm" title="Duplicate this session"${_scopeId}> Duplicate </button><button class="text-red-600 hover:text-red-800 bg-gray-100 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm"${_scopeId}> Delete </button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.sessions.links) {
              _push2(`<div class="mt-6"${_scopeId}><nav class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.sessions.from)} to ${ssrInterpolate(__props.sessions.to)} of ${ssrInterpolate(__props.sessions.total)} results </p></div><div class="flex items-center space-x-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.sessions.links, (link) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: `px-3 py-2 text-sm rounded-md transition-colors ${link.active ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`
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
                  _push2(`<span class="px-3 py-2 text-sm rounded-md text-gray-300 cursor-not-allowed"${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div></nav></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, " Workshop Sessions "),
                          createVNode("p", { class: "text-gray-600 mt-1" }, " Manage workshop sessions across multiple locations ")
                        ]),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.workshop-sessions.create"),
                          class: "inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                        }, {
                          default: withCtx(() => [
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
                                d: "M12 4v16m8-8H4"
                              })
                            ])),
                            createTextVNode(" Add New Session ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", { class: "mb-6" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(filters).search = $event,
                          type: "text",
                          placeholder: "Search by location, city, country, or workshop name...",
                          class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(filters).search]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Workshop "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Program Type "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " School "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Location "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Availability "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.sessions.data, (session) => {
                              return openBlock(), createBlock("tr", {
                                key: session.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route(
                                    "admin.workshop-sessions.show",
                                    session.id
                                  )
                                }, {
                                  default: withCtx(() => {
                                    var _a, _b;
                                    return [
                                      createVNode("td", { class: "px-6 py-4" }, [
                                        createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString((_a = session.program) == null ? void 0 : _a.title), 1),
                                        createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString((_b = session.program) == null ? void 0 : _b.slug), 1),
                                        createVNode("div", { class: "text-xs text-gray-600 mt-1" }, " 📅 " + toDisplayString(formatDateRange(session)) + " • " + toDisplayString(session.time), 1)
                                      ])
                                    ];
                                  }),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  session.program_type === "mastery" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                                  }, " 👑 Mastery ")) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200"
                                  }, " ⚡ Essentials "))
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  session.school ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-sm font-medium text-gray-900"
                                  }, " 🏫 " + toDisplayString(session.school.name), 1)) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "text-sm text-gray-400 italic"
                                  }, " No school assigned "))
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(session.location), 1),
                                  session.venue_name ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-sm text-gray-500"
                                  }, toDisplayString(session.venue_name), 1)) : createCommentVNode("", true),
                                  session.city || session.country ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "text-xs text-gray-400"
                                  }, toDisplayString([
                                    session.city,
                                    session.country
                                  ].filter(Boolean).join(", ")), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(session.available_spots - session.booked_spots) + "/" + toDisplayString(session.available_spots) + " available ", 1),
                                  createVNode("div", { class: "w-full bg-gray-200 rounded-full h-2 mt-1" }, [
                                    createVNode("div", {
                                      class: `h-2 rounded-full ${session.remaining_spots <= 5 ? "bg-red-500" : session.remaining_spots <= 10 ? "bg-orange-500" : "bg-green-500"}`,
                                      style: {
                                        width: `${session.booked_spots / session.available_spots * 100}%`
                                      }
                                    }, null, 6)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyClass(
                                      session
                                    )}`
                                  }, toDisplayString(getUrgencyText(session)), 3),
                                  session.is_featured ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-1"
                                  }, [
                                    createVNode("span", { class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200" }, " ⭐ Featured ")
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("div", { class: "flex items-center justify-end space-x-2" }, [
                                    createVNode("button", {
                                      onClick: ($event) => togglePublish(
                                        session.id,
                                        session.is_active
                                      ),
                                      class: [
                                        session.is_active ? "text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100" : "text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100",
                                        "px-3 py-1 rounded transition-colors text-sm font-medium"
                                      ],
                                      title: session.is_active ? "Send to draft" : "Publish session"
                                    }, toDisplayString(session.is_active ? "📝 Send to Draft" : "📢 Publish"), 11, ["onClick", "title"]),
                                    createVNode(unref(Link), {
                                      href: _ctx.route(
                                        "admin.workshop-sessions.show",
                                        session.id
                                      ),
                                      class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" View ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode(unref(Link), {
                                      href: _ctx.route(
                                        "admin.workshop-sessions.edit",
                                        session.id
                                      ),
                                      class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Edit ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode("button", {
                                      onClick: ($event) => duplicateSession(
                                        session.id
                                      ),
                                      class: "text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-sm",
                                      title: "Duplicate this session"
                                    }, " Duplicate ", 8, ["onClick"]),
                                    createVNode("button", {
                                      onClick: ($event) => deleteSession(
                                        session.id
                                      ),
                                      class: "text-red-600 hover:text-red-800 bg-gray-100 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm"
                                    }, " Delete ", 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.sessions.links ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode("nav", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("p", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.sessions.from) + " to " + toDisplayString(__props.sessions.to) + " of " + toDisplayString(__props.sessions.total) + " results ", 1)
                          ]),
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.sessions.links, (link) => {
                              return openBlock(), createBlock(Fragment, {
                                key: link.label
                              }, [
                                link.url ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: link.url,
                                  class: `px-3 py-2 text-sm rounded-md transition-colors ${link.active ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", {
                                      innerHTML: link.label
                                    }, null, 8, ["innerHTML"])
                                  ]),
                                  _: 2
                                }, 1032, ["href", "class"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  innerHTML: link.label,
                                  class: "px-3 py-2 text-sm rounded-md text-gray-300 cursor-not-allowed"
                                }, null, 8, ["innerHTML"]))
                              ], 64);
                            }), 128))
                          ])
                        ])
                      ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WorkshopSessions/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
