import { unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { u as useAdminLayout } from "./useAdminLayout-b70BBPZG.js";
import { Head, Link, router } from "@inertiajs/vue3";
import "./AdminLayout-EcLlKyRZ.js";
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
    const getUrgencyClass = (urgencyLevel) => {
      switch (urgencyLevel) {
        case "critical":
          return "bg-red-100 text-red-800 border-red-200";
        case "high":
          return "bg-orange-100 text-orange-800 border-orange-200";
        default:
          return "bg-green-100 text-green-800 border-green-200";
      }
    };
    const getUrgencyText = (session) => {
      if (session.remaining_spots <= 5) return "CRITICAL";
      if (session.remaining_spots <= 10) return "HIGH DEMAND";
      return "AVAILABLE";
    };
    const togglePublish = () => {
      const action = props.session.is_active ? "send to draft" : "publish";
      if (confirm(
        `Are you sure you want to ${action} this resource session?`
      )) {
        router.post(
          route(
            "admin.resource-sessions.toggle-publish",
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
      _push(ssrRenderComponent(unref(Head), { title: "Resource Session Details" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>Resource Session Details</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.resource-sessions.index"),
              class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`← Back to Sessions`);
                } else {
                  return [
                    createTextVNode("← Back to Sessions")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="font-semibold"${_scopeId}>Title:</div><div${_scopeId}>${ssrInterpolate(props.session.title)}</div></div><div${_scopeId}><div class="font-semibold"${_scopeId}>Location:</div><div${_scopeId}>${ssrInterpolate(props.session.location)}</div></div><div${_scopeId}><div class="font-semibold"${_scopeId}>Date:</div><div${_scopeId}>${ssrInterpolate(props.session.date)}</div></div><div${_scopeId}><div class="font-semibold"${_scopeId}>Available Spots:</div><div${_scopeId}>${ssrInterpolate(props.session.available_spots)}</div></div><div${_scopeId}><div class="font-semibold"${_scopeId}>Status:</div><div class="${ssrRenderClass(
              getAvailabilityClass()
            )}"${_scopeId}>${ssrInterpolate(getAvailabilityStatus())}</div></div><div${_scopeId}><div class="font-semibold"${_scopeId}>Urgency:</div><div class="${ssrRenderClass(
              getUrgencyClass(getUrgencyText(props.session))
            )}"${_scopeId}>${ssrInterpolate(getUrgencyText(props.session))}</div></div></div><div class="mt-6"${_scopeId}><button class="${ssrRenderClass([
              props.session.is_active ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600",
              "px-4 py-2 rounded-lg transition-all"
            ])}"${_scopeId}>${ssrInterpolate(props.session.is_active ? "Send to Draft" : "Publish")}</button></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, "Resource Session Details"),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.resource-sessions.index"),
                          class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("← Back to Sessions")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold" }, "Title:"),
                          createVNode("div", null, toDisplayString(props.session.title), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold" }, "Location:"),
                          createVNode("div", null, toDisplayString(props.session.location), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold" }, "Date:"),
                          createVNode("div", null, toDisplayString(props.session.date), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold" }, "Available Spots:"),
                          createVNode("div", null, toDisplayString(props.session.available_spots), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold" }, "Status:"),
                          createVNode("div", {
                            class: getAvailabilityClass()
                          }, toDisplayString(getAvailabilityStatus()), 3)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold" }, "Urgency:"),
                          createVNode("div", {
                            class: getUrgencyClass(getUrgencyText(props.session))
                          }, toDisplayString(getUrgencyText(props.session)), 3)
                        ])
                      ]),
                      createVNode("div", { class: "mt-6" }, [
                        createVNode("button", {
                          onClick: togglePublish,
                          class: [
                            "px-4 py-2 rounded-lg transition-all",
                            props.session.is_active ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
                          ]
                        }, toDisplayString(props.session.is_active ? "Send to Draft" : "Publish"), 3)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ResourceSessions/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
