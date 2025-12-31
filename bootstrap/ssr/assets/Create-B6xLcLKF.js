import { unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-VxMcYlr7.js";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./InputLabel-BdCx2Ft7.js";
import { P as PrimaryButton } from "./PrimaryButton-CIooT64n.js";
import { _ as _sfc_main$3 } from "./TextInput-BEWjE_Xr.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "user",
      is_active: true,
      school_name: ""
    });
    const submit = () => {
      form.post(route("admin.users.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Create User" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}> Create New User </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.users.index"),
              class: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Users `);
                } else {
                  return [
                    createTextVNode(" Back to Users ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-6 md:grid-cols-2"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: "Full Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: "Email Address"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password_confirmation",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "role",
              value: "Role"
            }, null, _parent2, _scopeId));
            _push2(`<select id="role" class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"${_scopeId}><option value="user"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "user") : ssrLooseEqual(unref(form).role, "user")) ? " selected" : ""}${_scopeId}>User</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "admin") : ssrLooseEqual(unref(form).role, "admin")) ? " selected" : ""}${_scopeId}>Admin</option><option value="school"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "school") : ssrLooseEqual(unref(form).role, "school")) ? " selected" : ""}${_scopeId}>School</option><option value="dev"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "dev") : ssrLooseEqual(unref(form).role, "dev")) ? " selected" : ""}${_scopeId}>Dev</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.role
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "is_active",
              value: "Status"
            }, null, _parent2, _scopeId));
            _push2(`<select id="is_active" class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"${_scopeId}><option${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, true) : ssrLooseEqual(unref(form).is_active, true)) ? " selected" : ""}${_scopeId}>Active</option><option${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, false) : ssrLooseEqual(unref(form).is_active, false)) ? " selected" : ""}${_scopeId}>Inactive</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.is_active
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "school_name",
              value: "School Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "school_name",
              modelValue: unref(form).school_name,
              "onUpdate:modelValue": ($event) => unref(form).school_name = $event,
              type: "text",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.school_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create User `);
                } else {
                  return [
                    createTextVNode(" Create User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, " Create New User "),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.users.index"),
                          class: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Back to Users ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "name",
                              value: "Full Name"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              type: "text",
                              class: "mt-1 block w-full",
                              required: "",
                              autofocus: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.name
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "email",
                              value: "Email Address"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "email",
                              modelValue: unref(form).email,
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.email
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "password",
                              value: "Password"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "password",
                              modelValue: unref(form).password,
                              "onUpdate:modelValue": ($event) => unref(form).password = $event,
                              type: "password",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.password
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "password_confirmation",
                              value: "Confirm Password"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "password_confirmation",
                              modelValue: unref(form).password_confirmation,
                              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                              type: "password",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.password_confirmation
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "role",
                              value: "Role"
                            }),
                            withDirectives(createVNode("select", {
                              id: "role",
                              "onUpdate:modelValue": ($event) => unref(form).role = $event,
                              class: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            }, [
                              createVNode("option", { value: "user" }, "User"),
                              createVNode("option", { value: "admin" }, "Admin"),
                              createVNode("option", { value: "school" }, "School"),
                              createVNode("option", { value: "dev" }, "Dev")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).role]
                            ]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.role
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "is_active",
                              value: "Status"
                            }),
                            withDirectives(createVNode("select", {
                              id: "is_active",
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              class: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            }, [
                              createVNode("option", { value: true }, "Active"),
                              createVNode("option", { value: false }, "Inactive")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).is_active]
                            ]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.is_active
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "school_name",
                            value: "School Name"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "school_name",
                            modelValue: unref(form).school_name,
                            "onUpdate:modelValue": ($event) => unref(form).school_name = $event,
                            type: "text",
                            class: "mt-1 block w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.school_name
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center justify-end" }, [
                          createVNode(PrimaryButton, {
                            class: ["ml-4", { "opacity-25": unref(form).processing }],
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Create User ")
                            ]),
                            _: 1
                          }, 8, ["class", "disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
