import { mergeProps, createSlots, withCtx, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./BaseLayout-DdSYcoSB.js";
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const navigationItems = [
      { label: "Dashboard", route: "admin.dashboard", active: "admin.dashboard" },
      { label: "Users", route: "admin.users.index", active: "admin.users.*" },
      // { label: 'Influencers', route: 'admin.influencers.index', active: 'admin.influencers.*' },
      { label: "Programs", route: "admin.programs.index", active: "admin.programs.*" },
      { label: "Referrals", route: "admin.referrals.index", active: "admin.referrals.*" },
      { label: "Workshop Sessions", route: "admin.workshop-sessions.index", active: "admin.workshop-sessions.*" },
      { label: "Training Camp Sessions", route: "admin.training-camp-sessions.index", active: "admin.training-camp-sessions.*" },
      { label: "Registrations", route: "admin.registrations.index", active: "admin.registrations.*" },
      { label: "Discount Codes", route: "admin.discount-codes.index", active: "admin.discount-codes.*" },
      { label: "Payments", route: "admin.payments.index", active: "admin.payments.*" }
    ];
    const dropdownItems = [
      { label: "Main Site", route: "admin.dashboard" },
      { label: "Log Out", route: "logout", method: "post", as: "button" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        variant: "admin",
        "logo-route": "admin.dashboard",
        "logo-src": "/images/logo.svg",
        "logo-alt": "NY Empire Academy",
        title: "Admin Panel",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
