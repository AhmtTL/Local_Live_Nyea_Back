import { onMounted, onUnmounted, computed, ref, mergeProps, useSSRContext, unref, withCtx, renderSlot, createBlock, openBlock, createTextVNode, toDisplayString, Fragment, renderList, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as ApplicationLogo } from "./ApplicationLogo-B2173abF.js";
import { Link } from "@inertiajs/vue3";
const _sfc_main$4 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: String,
      default: "py-1 bg-white"
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      } else if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle([
        open.value ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: "get"
    },
    as: {
      type: String,
      default: "a"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        method: __props.method,
        as: __props.as,
        class: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    },
    method: {
      type: String,
      default: "get"
    },
    as: {
      type: String,
      default: "a"
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        method: __props.method,
        as: __props.as,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "BaseLayout",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "authenticated"
      // 'authenticated' | 'admin'
    },
    logoRoute: {
      type: String,
      default: "dashboard"
    },
    logoSrc: {
      type: String,
      default: null
    },
    logoAlt: {
      type: String,
      default: "Logo"
    },
    title: {
      type: String,
      default: ""
    },
    navigationItems: {
      type: Array,
      default: () => []
    },
    dropdownItems: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const showingNavigationDropdown = ref(false);
    const layoutClasses = computed(() => {
      return {
        "bg-gray-100": props.variant === "authenticated",
        "bg-gray-50": props.variant === "admin"
      };
    });
    const navClasses = computed(() => {
      return {
        "border-b border-gray-100 bg-white": props.variant === "authenticated",
        "border-b border-gray-200 bg-white shadow-sm": props.variant === "admin"
      };
    });
    const defaultDropdownItems = [
      { label: "Profile", route: "profile.edit" },
      { label: "Log Out", route: "logout", method: "post", as: "button" }
    ];
    const finalDropdownItems = computed(() => {
      return props.dropdownItems.length > 0 ? props.dropdownItems : defaultDropdownItems;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([layoutClasses.value, "min-h-screen"])}"><nav class="${ssrRenderClass(navClasses.value)}"><div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex"><div class="flex shrink-0 items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route(__props.logoRoute)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.logoSrc) {
              _push2(`<img${ssrRenderAttr("src", __props.logoSrc)}${ssrRenderAttr("alt", __props.logoAlt)} class="h-20 w-20"${_scopeId}>`);
            } else {
              _push2(ssrRenderComponent(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              __props.logoSrc ? (openBlock(), createBlock("img", {
                key: 0,
                src: __props.logoSrc,
                alt: __props.logoAlt,
                class: "h-20 w-20"
              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(ApplicationLogo, {
                key: 1,
                class: "block h-9 w-auto fill-current text-gray-800"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.title) {
        _push(`<span class="ml-3 text-lg font-semibold text-gray-700">${ssrInterpolate(__props.title)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"><!--[-->`);
      ssrRenderList(__props.navigationItems, (item) => {
        _push(ssrRenderComponent(_sfc_main$2, {
          key: item.route,
          href: _ctx.route(item.route),
          active: _ctx.route().current(item.active || item.route)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="hidden sm:ms-6 sm:flex sm:items-center">`);
      if (_ctx.$page.props.auth.user) {
        _push(`<div class="relative ms-3">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          align: "right",
          width: "48"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b2;
            if (_push2) {
              _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"${_scopeId}>${ssrInterpolate(((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name) || "User")} <svg class="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
            } else {
              return [
                createVNode("span", { class: "inline-flex rounded-md" }, [
                  createVNode("button", {
                    type: "button",
                    class: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                  }, [
                    createTextVNode(toDisplayString(((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name) || "User") + " ", 1),
                    (openBlock(), createBlock("svg", {
                      class: "-me-0.5 ms-2 h-4 w-4",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ])
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(finalDropdownItems.value, (item) => {
                _push2(ssrRenderComponent(_sfc_main$3, {
                  key: (item == null ? void 0 : item.route) || Math.random(),
                  href: (item == null ? void 0 : item.route) ? _ctx.route(item.route) : "#",
                  method: (item == null ? void 0 : item.method) || "get",
                  as: (item == null ? void 0 : item.as) || "a"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate((item == null ? void 0 : item.label) || "")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString((item == null ? void 0 : item.label) || ""), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(finalDropdownItems.value, (item) => {
                  return openBlock(), createBlock(_sfc_main$3, {
                    key: (item == null ? void 0 : item.route) || Math.random(),
                    href: (item == null ? void 0 : item.route) ? _ctx.route(item.route) : "#",
                    method: (item == null ? void 0 : item.method) || "get",
                    as: (item == null ? void 0 : item.as) || "a"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString((item == null ? void 0 : item.label) || ""), 1)
                    ]),
                    _: 2
                  }, 1032, ["href", "method", "as"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="-me-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
        hidden: showingNavigationDropdown.value,
        "inline-flex": !showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
        hidden: !showingNavigationDropdown.value,
        "inline-flex": showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
        block: showingNavigationDropdown.value,
        hidden: !showingNavigationDropdown.value
      }, "sm:hidden"])}"><div class="space-y-1 pb-3 pt-2"><!--[-->`);
      ssrRenderList(__props.navigationItems, (item) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: item.route,
          href: _ctx.route(item.route),
          active: _ctx.route().current(item.active || item.route)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (_ctx.$page.props.auth.user) {
        _push(`<div class="border-t border-gray-200 pb-1 pt-4"><div class="px-4"><div class="text-base font-medium text-gray-800">${ssrInterpolate(((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name) || "User")}</div><div class="text-sm font-medium text-gray-500">${ssrInterpolate(((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.email) || "No email")}</div></div><div class="mt-3 space-y-1"><!--[-->`);
        ssrRenderList(finalDropdownItems.value, (item) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: (item == null ? void 0 : item.route) || Math.random(),
            href: (item == null ? void 0 : item.route) ? _ctx.route(item.route) : "#",
            method: (item == null ? void 0 : item.method) || "get",
            as: (item == null ? void 0 : item.as) || "a"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate((item == null ? void 0 : item.label) || "")}`);
              } else {
                return [
                  createTextVNode(toDisplayString((item == null ? void 0 : item.label) || ""), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-white shadow"><div class="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/BaseLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
