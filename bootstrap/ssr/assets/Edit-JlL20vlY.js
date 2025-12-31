import { createVNode, resolveDynamicComponent, unref, withCtx, createTextVNode, withModifiers, toDisplayString, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderVNode, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { u as useAdminLayout } from "./useAdminLayout-KyMrG-Br.js";
import "./AdminLayout-VxMcYlr7.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    discountCode: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const { Layout } = useAdminLayout();
    const props = __props;
    const form = useForm({
      name: ((_a = props.discountCode) == null ? void 0 : _a.name) || "",
      description: ((_b = props.discountCode) == null ? void 0 : _b.description) || "",
      is_active: ((_c = props.discountCode) == null ? void 0 : _c.is_active) ?? true,
      max_redemptions: ((_d = props.discountCode) == null ? void 0 : _d.max_redemptions) || null
      // Added max_redemptions
    });
    const submit = () => {
      var _a2;
      form.patch(route("admin.discount-codes.update", (_a2 = props.discountCode) == null ? void 0 : _a2.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Edit Discount Code: ${ssrInterpolate(__props.discountCode.code)}</h2>`);
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Edit Discount Code: " + toDisplayString(__props.discountCode.code), 1),
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
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-3xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><form class="p-6 space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}> Discount Code </label><div class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"${_scopeId}>${ssrInterpolate(__props.discountCode.code)}</div><p class="mt-2 text-sm text-gray-500"${_scopeId}> Discount codes cannot be changed after creation </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}> Discount Type </label><div class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"${_scopeId}>${ssrInterpolate(__props.discountCode.type === "percentage" ? "Percentage" : "Fixed Amount")}</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}> Discount Value </label><div class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"${_scopeId}>${ssrInterpolate(__props.discountCode.type === "percentage" ? __props.discountCode.value + "%" : "$" + __props.discountCode.value)}</div></div></div><div${_scopeId}><label for="name" class="block text-sm font-medium text-gray-700"${_scopeId}> Display Name * </label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" required class="${ssrRenderClass([{ "border-red-500": unref(form).errors.name }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="description" class="block text-sm font-medium text-gray-700"${_scopeId}> Description </label><textarea id="description" rows="3" class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.description
            }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-gray-50 p-4 rounded-lg"${_scopeId}><h3 class="text-sm font-medium text-gray-900 mb-2"${_scopeId}> Usage Information </h3><div class="text-sm text-gray-600"${_scopeId}><p${_scopeId}> Times Used: <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.discountCode.used_count)}</span></p>`);
            if (__props.discountCode.max_redemptions) {
              _push2(`<p${_scopeId}> Remaining Uses: <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.discountCode.max_redemptions - __props.discountCode.used_count)}</span></p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label for="max_redemptions" class="block text-sm font-medium text-gray-700"${_scopeId}> Maximum Redemptions: </label><input placeholder="Leave blank for unlimited" id="max_redemptions"${ssrRenderAttr("value", unref(form).max_redemptions)} type="number" min="1" class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.max_redemptions
            }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).errors.max_redemptions) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.max_redemptions)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><div class="flex items-center"${_scopeId}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"${_scopeId}><label for="is_active" class="ml-2 block text-sm text-gray-900"${_scopeId}> Active </label></div><p class="mt-2 text-sm text-gray-500"${_scopeId}> Inactive codes cannot be used by customers </p></div><div class="border-t border-gray-200 pt-6 flex justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.discount-codes.index"),
              class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Updating..." : "Update Discount Code")}</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-3xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "p-6 space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Discount Code "),
                        createVNode("div", { class: "mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500" }, toDisplayString(__props.discountCode.code), 1),
                        createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Discount codes cannot be changed after creation ")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Discount Type "),
                          createVNode("div", { class: "mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500" }, toDisplayString(__props.discountCode.type === "percentage" ? "Percentage" : "Fixed Amount"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Discount Value "),
                          createVNode("div", { class: "mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500" }, toDisplayString(__props.discountCode.type === "percentage" ? __props.discountCode.value + "%" : "$" + __props.discountCode.value), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "name",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Display Name * "),
                        withDirectives(createVNode("input", {
                          id: "name",
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          required: "",
                          class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", { "border-red-500": unref(form).errors.name }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "description",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Description "),
                        withDirectives(createVNode("textarea", {
                          id: "description",
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "3",
                          class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                            "border-red-500": unref(form).errors.description
                          }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        unref(form).errors.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                        createVNode("h3", { class: "text-sm font-medium text-gray-900 mb-2" }, " Usage Information "),
                        createVNode("div", { class: "text-sm text-gray-600" }, [
                          createVNode("p", null, [
                            createTextVNode(" Times Used: "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.discountCode.used_count), 1)
                          ]),
                          __props.discountCode.max_redemptions ? (openBlock(), createBlock("p", { key: 0 }, [
                            createTextVNode(" Remaining Uses: "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.discountCode.max_redemptions - __props.discountCode.used_count), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "max_redemptions",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Maximum Redemptions: "),
                        withDirectives(createVNode("input", {
                          placeholder: "Leave blank for unlimited",
                          id: "max_redemptions",
                          "onUpdate:modelValue": ($event) => unref(form).max_redemptions = $event,
                          type: "number",
                          min: "1",
                          class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                            "border-red-500": unref(form).errors.max_redemptions
                          }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).max_redemptions]
                        ]),
                        unref(form).errors.max_redemptions ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.max_redemptions), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          withDirectives(createVNode("input", {
                            id: "is_active",
                            "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                            type: "checkbox",
                            class: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).is_active]
                          ]),
                          createVNode("label", {
                            for: "is_active",
                            class: "ml-2 block text-sm text-gray-900"
                          }, " Active ")
                        ]),
                        createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Inactive codes cannot be used by customers ")
                      ]),
                      createVNode("div", { class: "border-t border-gray-200 pt-6 flex justify-end space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.discount-codes.index"),
                          class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        }, toDisplayString(unref(form).processing ? "Updating..." : "Update Discount Code"), 9, ["disabled"])
                      ])
                    ], 32)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/DiscountCodes/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
