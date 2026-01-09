import { mergeProps, createSlots, withCtx, renderSlot, useSSRContext, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./AdminLayout-EcLlKyRZ.js";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./BaseLayout-DdSYcoSB.js";
const _sfc_main$1 = {
  __name: "DevLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const navigationItems = [
      {
        label: "Programs",
        route: "admin.programs.index",
        active: "admin.programs.*"
      },
      {
        label: "Referrals",
        route: "admin.referrals.index",
        active: "admin.referrals.*"
      },
      {
        label: "Workshop Sessions",
        route: "admin.workshop-sessions.index",
        active: "admin.workshop-sessions.*"
      },
      {
        label: "Training Camp Sessions",
        route: "admin.training-camp-sessions.index",
        active: "admin.training-camp-sessions.*"
      },
      {
        label: "Registrations",
        route: "admin.registrations.index",
        active: "admin.registrations.*"
      },
      {
        label: "Discount Codes",
        route: "admin.discount-codes.index",
        active: "admin.discount-codes.*"
      }
    ];
    const dropdownItems = [
      { label: "Log Out", route: "logout", method: "post", as: "button" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        variant: "admin",
        "logo-route": "admin.programs.index",
        "logo-src": "/images/logo.svg",
        "logo-alt": "NY Empire Academy",
        title: "Dev Panel",
        "navigation-items": navigationItems,
        "dropdown-items": dropdownItems
      }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 2
      }, [
        _ctx.$slots.header ? {
          name: "header",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "header")
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/DevLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SchoolLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const navigationItems = [
      {
        label: "Registrations",
        route: "admin.registrations.index",
        active: "admin.registrations.*"
      }
    ];
    const dropdownItems = [
      { label: "Log Out", route: "logout", method: "post", as: "button" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        variant: "admin",
        "logo-route": "admin.registrations.index",
        "logo-src": "/images/logo.svg",
        "logo-alt": "NY Empire Academy",
        title: "School Portal",
        "navigation-items": navigationItems,
        "dropdown-items": dropdownItems
      }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 2
      }, [
        _ctx.$slots.header ? {
          name: "header",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "header")
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/SchoolLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function useAdminLayout() {
  const page = usePage();
  const user = computed(() => page.props.auth.user);
  const userRole = computed(() => {
    var _a;
    return (_a = user.value) == null ? void 0 : _a.role;
  });
  const isDev = computed(() => userRole.value === "dev");
  const isAdmin = computed(() => userRole.value === "admin");
  const isSchool = computed(() => userRole.value === "school");
  const Layout = computed(() => {
    if (isDev.value) return _sfc_main$1;
    if (isSchool.value) return _sfc_main;
    return _sfc_main$3;
  });
  return {
    Layout,
    user,
    userRole,
    isDev,
    isAdmin,
    isSchool
  };
}
export {
  useAdminLayout as u
};
