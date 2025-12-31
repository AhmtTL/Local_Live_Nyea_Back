import { unref, withCtx, isRef, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-VxMcYlr7.js";
import { Head } from "@inertiajs/vue3";
import { u as useFilters, a as useCrud, _ as _sfc_main$2, b as _sfc_main$3 } from "./useCrud-DSDajlI3.js";
import { _ as _sfc_main$4 } from "./Button-DospE3Pk.js";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    influencers: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const { filters: searchFilters, isLoading } = useFilters("admin.influencers.index", props.filters);
    const { deleteItem } = useCrud();
    const columns = [
      {
        key: "name",
        label: "Influencer",
        type: "avatar",
        showName: true,
        class: "text-sm text-gray-900"
      },
      {
        key: "referral_code",
        label: "Referral Code",
        class: "text-sm text-gray-900 font-mono"
      },
      {
        key: "referred_count",
        label: "Referred",
        class: "text-sm text-gray-900"
      },
      {
        key: "payments_count",
        label: "Payments",
        class: "text-sm text-gray-900"
      },
      {
        key: "total_spent",
        label: "Total Spent",
        type: "currency",
        class: "text-sm text-gray-900"
      },
      {
        key: "created_at",
        label: "Joined",
        type: "date",
        class: "text-sm text-gray-500"
      }
    ];
    const actions = [
      {
        key: "view",
        label: "View",
        class: "bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium"
      },
      {
        key: "edit",
        label: "Edit",
        class: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-md text-sm font-medium"
      },
      {
        key: "remove-influencer",
        label: "Remove Influencer",
        class: "bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-md text-sm font-medium"
      },
      {
        key: "delete",
        label: "Delete",
        class: "bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium"
      }
    ];
    const searchFilterConfig = [
      {
        key: "is_active",
        label: "Status",
        type: "select",
        options: [
          { value: "1", label: "Active" },
          { value: "0", label: "Inactive" }
        ]
      },
      {
        key: "created_at",
        label: "Joined Date",
        type: "date-range"
      }
    ];
    const handleTableAction = ({ action, item }) => {
      if (!item || !item.id) {
        console.error("Invalid item data:", item);
        return;
      }
      switch (action) {
        case "view":
          window.location.href = route("admin.influencers.show", item.id);
          break;
        case "edit":
          window.location.href = route("admin.users.edit", item.id);
          break;
        case "remove-influencer":
          if (confirm(`Are you sure you want to remove the influencer tag from "${item.name}"?`)) {
            const form = document.createElement("form");
            form.method = "POST";
            form.action = route("admin.influencers.remove-influencer", item.id);
            const csrfToken = document.querySelector('meta[name="csrf-token"]');
            if (csrfToken) {
              const csrfInput = document.createElement("input");
              csrfInput.type = "hidden";
              csrfInput.name = "_token";
              csrfInput.value = csrfToken.getAttribute("content");
              form.appendChild(csrfInput);
            }
            document.body.appendChild(form);
            form.submit();
          }
          break;
        case "delete":
          deleteItem(item, "admin.users.destroy", {
            confirmMessage: `Are you sure you want to delete influencer "${item.name || "this influencer"}"?`
          });
          break;
      }
    };
    const resetFilters = () => {
      searchFilters.value = {
        search: "",
        is_active: "",
        created_at_from: "",
        created_at_to: ""
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Influencers" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><div${_scopeId}><h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Influencers Management </h2><p class="mt-1 text-sm text-gray-600"${_scopeId}> Manage influencer accounts and referral codes </p></div><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              variant: "secondary",
              href: _ctx.route("admin.users.index"),
              as: "a",
              "left-icon": "M12 4v16m8-8H4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Manage Users `);
                } else {
                  return [
                    createTextVNode(" Manage Users ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("div", null, [
                  createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Influencers Management "),
                  createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Manage influencer accounts and referral codes ")
                ]),
                createVNode("div", { class: "flex space-x-2" }, [
                  createVNode(_sfc_main$4, {
                    variant: "secondary",
                    href: _ctx.route("admin.users.index"),
                    as: "a",
                    "left-icon": "M12 4v16m8-8H4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Manage Users ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(searchFilters),
              "onUpdate:modelValue": ($event) => isRef(searchFilters) ? searchFilters.value = $event : null,
              "search-placeholder": "Search influencers by name, email, or referral code...",
              filters: searchFilterConfig,
              "is-loading": unref(isLoading),
              onReset: resetFilters
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              items: __props.influencers,
              columns,
              actions,
              "is-loading": unref(isLoading),
              "empty-message": "No influencers found. Tag users as influencers to get started.",
              onAction: handleTableAction
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode(_sfc_main$2, {
                      modelValue: unref(searchFilters),
                      "onUpdate:modelValue": ($event) => isRef(searchFilters) ? searchFilters.value = $event : null,
                      "search-placeholder": "Search influencers by name, email, or referral code...",
                      filters: searchFilterConfig,
                      "is-loading": unref(isLoading),
                      onReset: resetFilters
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "is-loading"]),
                    createVNode(_sfc_main$3, {
                      items: __props.influencers,
                      columns,
                      actions,
                      "is-loading": unref(isLoading),
                      "empty-message": "No influencers found. Tag users as influencers to get started.",
                      onAction: handleTableAction
                    }, null, 8, ["items", "is-loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Influencers/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
