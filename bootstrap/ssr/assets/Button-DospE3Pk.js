import { mergeProps, useSSRContext, computed, createVNode, resolveDynamicComponent, withCtx, createBlock, createCommentVNode, renderSlot, openBlock } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderVNode, ssrRenderAttr, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "LoadingSpinner",
  __ssrInlineRender: true,
  props: {
    size: {
      type: String,
      default: "md"
      // 'sm', 'md', 'lg'
    },
    color: {
      type: String,
      default: "blue"
      // 'blue', 'gray', 'white'
    }
  },
  setup(__props) {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12"
    };
    const colorClasses = {
      blue: "text-blue-600",
      gray: "text-gray-400",
      white: "text-white"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center" }, _attrs))}><svg class="${ssrRenderClass([
        "animate-spin",
        sizeClasses[__props.size],
        colorClasses[__props.color]
      ])}" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LoadingSpinner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
const _sfc_main = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary"
      // 'primary', 'secondary', 'danger', 'success', 'warning', 'ghost', 'link'
    },
    size: {
      type: String,
      default: "md"
      // 'xs', 'sm', 'md', 'lg', 'xl'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: String,
      default: "md"
      // 'none', 'sm', 'md', 'lg', 'full'
    },
    leftIcon: {
      type: String,
      default: null
    },
    rightIcon: {
      type: String,
      default: null
    },
    as: {
      type: String,
      default: "button"
    },
    href: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "button"
    }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isDisabled = computed(() => props.disabled || props.loading);
    const variantClasses = computed(() => {
      const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white border border-transparent focus:ring-blue-500",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white border border-transparent focus:ring-gray-500",
        danger: "bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500",
        success: "bg-green-600 hover:bg-green-700 text-white border border-transparent focus:ring-green-500",
        warning: "bg-yellow-600 hover:bg-yellow-700 text-white border border-transparent focus:ring-yellow-500",
        ghost: "bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500",
        link: "bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-700 border-transparent focus:ring-blue-500 underline"
      };
      if (isDisabled.value) {
        return "bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed";
      }
      return variants[props.variant] || variants.primary;
    });
    const sizeClasses = computed(() => {
      const sizes = {
        xs: "px-2.5 py-1.5 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-6 py-3 text-base"
      };
      return sizes[props.size] || sizes.md;
    });
    const roundedClasses = computed(() => {
      const rounded = {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      };
      return rounded[props.rounded] || rounded.md;
    });
    const blockClasses = computed(() => {
      return props.block ? "w-full" : "";
    });
    const buttonClasses = computed(() => {
      return [
        baseClasses,
        variantClasses.value,
        sizeClasses.value,
        roundedClasses.value,
        blockClasses.value
      ].join(" ");
    });
    const handleClick = (event) => {
      if (!isDisabled.value) {
        emit("click", event);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as), mergeProps({
        href: __props.as === "a" ? __props.href : void 0,
        type: __props.as === "button" ? __props.type : void 0,
        disabled: isDisabled.value,
        class: buttonClasses.value,
        onClick: handleClick
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.leftIcon && !__props.loading) {
              _push2(`<svg class="${ssrRenderClass([
                "h-4 w-4",
                _ctx.$slots.default ? __props.size === "xs" ? "mr-1" : "mr-2" : ""
              ])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path${ssrRenderAttr("d", __props.leftIcon)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.loading) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                size: __props.size === "xs" ? "sm" : "sm",
                color: __props.variant === "ghost" || __props.variant === "link" ? "gray" : "white",
                class: _ctx.$slots.default ? __props.size === "xs" ? "mr-1" : "mr-2" : ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (__props.rightIcon && !__props.loading) {
              _push2(`<svg class="${ssrRenderClass([
                "h-4 w-4",
                _ctx.$slots.default ? __props.size === "xs" ? "ml-1" : "ml-2" : ""
              ])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path${ssrRenderAttr("d", __props.rightIcon)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.leftIcon && !__props.loading ? (openBlock(), createBlock("svg", {
                key: 0,
                class: [
                  "h-4 w-4",
                  _ctx.$slots.default ? __props.size === "xs" ? "mr-1" : "mr-2" : ""
                ],
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  d: __props.leftIcon,
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2"
                }, null, 8, ["d"])
              ], 2)) : createCommentVNode("", true),
              __props.loading ? (openBlock(), createBlock(_sfc_main$1, {
                key: 1,
                size: __props.size === "xs" ? "sm" : "sm",
                color: __props.variant === "ghost" || __props.variant === "link" ? "gray" : "white",
                class: _ctx.$slots.default ? __props.size === "xs" ? "mr-1" : "mr-2" : ""
              }, null, 8, ["size", "color", "class"])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default"),
              __props.rightIcon && !__props.loading ? (openBlock(), createBlock("svg", {
                key: 2,
                class: [
                  "h-4 w-4",
                  _ctx.$slots.default ? __props.size === "xs" ? "ml-1" : "ml-2" : ""
                ],
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  d: __props.rightIcon,
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2"
                }, null, 8, ["d"])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
