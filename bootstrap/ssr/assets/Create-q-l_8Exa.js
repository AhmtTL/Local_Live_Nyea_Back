import { createVNode, resolveDynamicComponent, unref, withCtx, createTextVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, toDisplayString, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderVNode, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { u as useAdminLayout } from "./useAdminLayout-KyMrG-Br.js";
import "./AdminLayout-VxMcYlr7.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const { Layout } = useAdminLayout();
    const form = useForm({
      code: "",
      name: "",
      description: "",
      type: "percentage",
      value: "",
      currency: "USD",
      min_amount: "",
      max_redemptions: "",
      starts_at: "",
      expires_at: "",
      is_active: true
    });
    const submit = () => {
      console.log("Form submission started", form.data());
      console.log("Form errors before submit:", form.errors);
      form.post("/admin/discount-codes", {
        onError: (errors) => {
          console.log("Form submission errors:", errors);
        },
        onSuccess: () => {
          console.log("Form submitted successfully");
        },
        onBefore: () => {
          console.log("Form submission starting...");
        },
        onFinish: () => {
          console.log("Form submission finished");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Layout)), _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Create Discount Code </h2>`);
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
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Create Discount Code "),
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
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-3xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><form class="p-6 space-y-6"${_scopeId}><div${_scopeId}><label for="code" class="block text-sm font-medium text-gray-700"${_scopeId}> Discount Code * </label><input id="code"${ssrRenderAttr("value", unref(form).code)} type="text" required placeholder="e.g., SAVE20" pattern="[A-Za-z0-9_-]+" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.code }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).errors.code) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.code)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-2 text-sm text-gray-500"${_scopeId}> Code will be automatically converted to uppercase. Use letters, numbers, hyphens (-), and underscores (_) only. No spaces allowed. </p></div><div${_scopeId}><label for="name" class="block text-sm font-medium text-gray-700"${_scopeId}> Display Name * </label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" required placeholder="e.g., 20% Off Summer Sale" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.name }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="description" class="block text-sm font-medium text-gray-700"${_scopeId}> Description </label><textarea id="description" rows="3" placeholder="Optional description for internal use" class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.description
            }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="type" class="block text-sm font-medium text-gray-700"${_scopeId}> Discount Type * </label><select id="type" required class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.type
            }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}><option value="percentage"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "percentage") : ssrLooseEqual(unref(form).type, "percentage")) ? " selected" : ""}${_scopeId}> Percentage </option><option value="fixed_amount"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "fixed_amount") : ssrLooseEqual(unref(form).type, "fixed_amount")) ? " selected" : ""}${_scopeId}> Fixed Amount </option></select>`);
            if (unref(form).errors.type) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.type)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="value" class="block text-sm font-medium text-gray-700"${_scopeId}> Discount Value * </label><div class="mt-1 relative rounded-md shadow-sm"${_scopeId}>`);
            if (unref(form).type === "fixed_amount") {
              _push2(`<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><span class="text-gray-500 sm:text-sm"${_scopeId}>$</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input id="value"${ssrRenderAttr("value", unref(form).value)} type="number" step="0.01" min="0"${ssrRenderAttr(
              "max",
              unref(form).type === "percentage" ? 100 : void 0
            )} required${ssrRenderAttr(
              "placeholder",
              unref(form).type === "percentage" ? "e.g., 20" : "e.g., 50.00"
            )} class="${ssrRenderClass([[
              {
                "border-red-500": unref(form).errors.value
              },
              unref(form).type === "fixed_amount" ? "pl-7" : ""
            ], "block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).type === "percentage") {
              _push2(`<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"${_scopeId}><span class="text-gray-500 sm:text-sm"${_scopeId}>%</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(form).errors.value) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (unref(form).type === "fixed_amount") {
              _push2(`<div${_scopeId}><label for="currency" class="block text-sm font-medium text-gray-700"${_scopeId}> Currency * </label><select id="currency" required class="${ssrRenderClass([{
                "border-red-500": unref(form).errors.currency
              }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}><option value="USD"${ssrIncludeBooleanAttr(Array.isArray(unref(form).currency) ? ssrLooseContain(unref(form).currency, "USD") : ssrLooseEqual(unref(form).currency, "USD")) ? " selected" : ""}${_scopeId}>USD - US Dollar</option><option value="EUR"${ssrIncludeBooleanAttr(Array.isArray(unref(form).currency) ? ssrLooseContain(unref(form).currency, "EUR") : ssrLooseEqual(unref(form).currency, "EUR")) ? " selected" : ""}${_scopeId}>EUR - Euro</option><option value="GBP"${ssrIncludeBooleanAttr(Array.isArray(unref(form).currency) ? ssrLooseContain(unref(form).currency, "GBP") : ssrLooseEqual(unref(form).currency, "GBP")) ? " selected" : ""}${_scopeId}>GBP - British Pound</option><option value="CAD"${ssrIncludeBooleanAttr(Array.isArray(unref(form).currency) ? ssrLooseContain(unref(form).currency, "CAD") : ssrLooseEqual(unref(form).currency, "CAD")) ? " selected" : ""}${_scopeId}> CAD - Canadian Dollar </option></select>`);
              if (unref(form).errors.currency) {
                _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.currency)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="border-t border-gray-200 pt-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}> Business Rules </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="min_amount" class="block text-sm font-medium text-gray-700"${_scopeId}> Minimum Order Amount </label><div class="mt-1 relative rounded-md shadow-sm"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><span class="text-gray-500 sm:text-sm"${_scopeId}>$</span></div><input id="min_amount"${ssrRenderAttr("value", unref(form).min_amount)} type="number" step="0.01" min="0" placeholder="0.00" class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.min_amount
            }, "pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}></div>`);
            if (unref(form).errors.min_amount) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.min_amount)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-2 text-sm text-gray-500"${_scopeId}> Leave empty for no minimum requirement </p></div><div${_scopeId}><label for="max_redemptions" class="block text-sm font-medium text-gray-700"${_scopeId}> Maximum Uses </label><input id="max_redemptions"${ssrRenderAttr("value", unref(form).max_redemptions)} type="number" min="1" placeholder="Unlimited" class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.max_redemptions
            }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).errors.max_redemptions) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.max_redemptions)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-2 text-sm text-gray-500"${_scopeId}> Total number of times this code can be used </p></div></div></div><div class="border-t border-gray-200 pt-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}> Validity Period </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="starts_at" class="block text-sm font-medium text-gray-700"${_scopeId}> Start Date &amp; Time </label><input id="starts_at"${ssrRenderAttr("value", unref(form).starts_at)} type="datetime-local" class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.starts_at
            }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).errors.starts_at) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.starts_at)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-2 text-sm text-gray-500"${_scopeId}> Leave empty to start immediately </p></div><div${_scopeId}><label for="expires_at" class="block text-sm font-medium text-gray-700"${_scopeId}> Expiry Date &amp; Time </label><input id="expires_at"${ssrRenderAttr("value", unref(form).expires_at)} type="datetime-local" class="${ssrRenderClass([{
              "border-red-500": unref(form).errors.expires_at
            }, "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
            if (unref(form).errors.expires_at) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.expires_at)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-2 text-sm text-gray-500"${_scopeId}> Leave empty for no expiry </p></div></div></div><div class="border-t border-gray-200 pt-6"${_scopeId}><div class="flex items-center"${_scopeId}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"${_scopeId}><label for="is_active" class="ml-2 block text-sm text-gray-900"${_scopeId}> Active </label></div><p class="mt-2 text-sm text-gray-500"${_scopeId}> Inactive codes cannot be used by customers </p></div><div class="border-t border-gray-200 pt-6 flex justify-end space-x-3"${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Creating..." : "Create Discount Code")}</button></div></form></div></div></div>`);
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
                        createVNode("label", {
                          for: "code",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Discount Code * "),
                        withDirectives(createVNode("input", {
                          id: "code",
                          "onUpdate:modelValue": ($event) => unref(form).code = $event,
                          type: "text",
                          required: "",
                          placeholder: "e.g., SAVE20",
                          pattern: "[A-Za-z0-9_-]+",
                          class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", { "border-red-500": unref(form).errors.code }],
                          onInput: ($event) => unref(form).code = $event.target.value.replace(
                            /[^A-Za-z0-9_-]/g,
                            ""
                          )
                        }, null, 42, ["onUpdate:modelValue", "onInput"]), [
                          [vModelText, unref(form).code]
                        ]),
                        unref(form).errors.code ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.code), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Code will be automatically converted to uppercase. Use letters, numbers, hyphens (-), and underscores (_) only. No spaces allowed. ")
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
                          placeholder: "e.g., 20% Off Summer Sale",
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
                          placeholder: "Optional description for internal use",
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "type",
                            class: "block text-sm font-medium text-gray-700"
                          }, " Discount Type * "),
                          withDirectives(createVNode("select", {
                            id: "type",
                            "onUpdate:modelValue": ($event) => unref(form).type = $event,
                            required: "",
                            class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                              "border-red-500": unref(form).errors.type
                            }]
                          }, [
                            createVNode("option", { value: "percentage" }, " Percentage "),
                            createVNode("option", { value: "fixed_amount" }, " Fixed Amount ")
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).type]
                          ]),
                          unref(form).errors.type ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "value",
                            class: "block text-sm font-medium text-gray-700"
                          }, " Discount Value * "),
                          createVNode("div", { class: "mt-1 relative rounded-md shadow-sm" }, [
                            unref(form).type === "fixed_amount" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            }, [
                              createVNode("span", { class: "text-gray-500 sm:text-sm" }, "$")
                            ])) : createCommentVNode("", true),
                            withDirectives(createVNode("input", {
                              id: "value",
                              "onUpdate:modelValue": ($event) => unref(form).value = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              max: unref(form).type === "percentage" ? 100 : void 0,
                              required: "",
                              placeholder: unref(form).type === "percentage" ? "e.g., 20" : "e.g., 50.00",
                              class: ["block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", [
                                {
                                  "border-red-500": unref(form).errors.value
                                },
                                unref(form).type === "fixed_amount" ? "pl-7" : ""
                              ]]
                            }, null, 10, ["onUpdate:modelValue", "max", "placeholder"]), [
                              [vModelText, unref(form).value]
                            ]),
                            unref(form).type === "percentage" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                            }, [
                              createVNode("span", { class: "text-gray-500 sm:text-sm" }, "%")
                            ])) : createCommentVNode("", true)
                          ]),
                          unref(form).errors.value ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.value), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      unref(form).type === "fixed_amount" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", {
                          for: "currency",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Currency * "),
                        withDirectives(createVNode("select", {
                          id: "currency",
                          "onUpdate:modelValue": ($event) => unref(form).currency = $event,
                          required: "",
                          class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                            "border-red-500": unref(form).errors.currency
                          }]
                        }, [
                          createVNode("option", { value: "USD" }, "USD - US Dollar"),
                          createVNode("option", { value: "EUR" }, "EUR - Euro"),
                          createVNode("option", { value: "GBP" }, "GBP - British Pound"),
                          createVNode("option", { value: "CAD" }, " CAD - Canadian Dollar ")
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).currency]
                        ]),
                        unref(form).errors.currency ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.currency), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "border-t border-gray-200 pt-6" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, " Business Rules "),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "min_amount",
                              class: "block text-sm font-medium text-gray-700"
                            }, " Minimum Order Amount "),
                            createVNode("div", { class: "mt-1 relative rounded-md shadow-sm" }, [
                              createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                                createVNode("span", { class: "text-gray-500 sm:text-sm" }, "$")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "min_amount",
                                "onUpdate:modelValue": ($event) => unref(form).min_amount = $event,
                                type: "number",
                                step: "0.01",
                                min: "0",
                                placeholder: "0.00",
                                class: ["pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                                  "border-red-500": unref(form).errors.min_amount
                                }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).min_amount]
                              ])
                            ]),
                            unref(form).errors.min_amount ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.min_amount), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Leave empty for no minimum requirement ")
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "max_redemptions",
                              class: "block text-sm font-medium text-gray-700"
                            }, " Maximum Uses "),
                            withDirectives(createVNode("input", {
                              id: "max_redemptions",
                              "onUpdate:modelValue": ($event) => unref(form).max_redemptions = $event,
                              type: "number",
                              min: "1",
                              placeholder: "Unlimited",
                              class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                                "border-red-500": unref(form).errors.max_redemptions
                              }]
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).max_redemptions]
                            ]),
                            unref(form).errors.max_redemptions ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.max_redemptions), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Total number of times this code can be used ")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t border-gray-200 pt-6" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, " Validity Period "),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "starts_at",
                              class: "block text-sm font-medium text-gray-700"
                            }, " Start Date & Time "),
                            withDirectives(createVNode("input", {
                              id: "starts_at",
                              "onUpdate:modelValue": ($event) => unref(form).starts_at = $event,
                              type: "datetime-local",
                              class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                                "border-red-500": unref(form).errors.starts_at
                              }]
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).starts_at]
                            ]),
                            unref(form).errors.starts_at ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.starts_at), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Leave empty to start immediately ")
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "expires_at",
                              class: "block text-sm font-medium text-gray-700"
                            }, " Expiry Date & Time "),
                            withDirectives(createVNode("input", {
                              id: "expires_at",
                              "onUpdate:modelValue": ($event) => unref(form).expires_at = $event,
                              type: "datetime-local",
                              class: ["mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500", {
                                "border-red-500": unref(form).errors.expires_at
                              }]
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).expires_at]
                            ]),
                            unref(form).errors.expires_at ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.expires_at), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Leave empty for no expiry ")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t border-gray-200 pt-6" }, [
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
                        }, toDisplayString(unref(form).processing ? "Creating..." : "Create Discount Code"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/DiscountCodes/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
