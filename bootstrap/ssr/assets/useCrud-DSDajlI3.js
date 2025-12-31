import { mergeProps, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, toDisplayString, useSSRContext, computed, ref, watch } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { a as _sfc_main$3 } from "./Button-DospE3Pk.js";
const _sfc_main$2 = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      required: true
    },
    meta: {
      type: Object,
      required: true
    },
    showStats: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const getPageNumber = (url) => {
      if (!url) return null;
      const match = url.match(/page=(\d+)/);
      return match ? parseInt(match[1]) : 1;
    };
    const isCurrentPage = (link) => {
      return link.active;
    };
    const shouldShowLink = (link, index) => {
      if (index === 0 || index === props.links.length - 1) return true;
      return link.active || Math.abs(getPageNumber(link.url) - props.meta.current_page) <= 2;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" }, _attrs))}><div class="flex-1 flex justify-between sm:hidden">`);
      if (__props.meta.prev_page_url) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.meta.prev_page_url,
          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Previous `);
            } else {
              return [
                createTextVNode(" Previous ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400"> Previous </div>`);
      }
      if (__props.meta.next_page_url) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.meta.next_page_url,
          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next `);
            } else {
              return [
                createTextVNode(" Next ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400"> Next </div>`);
      }
      _push(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">`);
      if (__props.showStats) {
        _push(`<div><p class="text-sm text-gray-700"> Showing <span class="font-medium">${ssrInterpolate(__props.meta.from || 0)}</span> to <span class="font-medium">${ssrInterpolate(__props.meta.to || 0)}</span> of <span class="font-medium">${ssrInterpolate(__props.meta.total || 0)}</span> results </p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.links && __props.links.length > 3) {
        _push(`<div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"><!--[-->`);
        ssrRenderList(__props.links, (link, index) => {
          _push(`<!--[-->`);
          if (index === 0 && link.url) {
            _push(ssrRenderComponent(unref(Link), {
              href: link.url,
              class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors",
              "aria-label": "Previous page"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else if (index === 0) {
            _push(`<span class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span>`);
          } else if (index === __props.links.length - 1 && link.url) {
            _push(ssrRenderComponent(unref(Link), {
              href: link.url,
              class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors",
              "aria-label": "Next page"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"${_scopeId}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else if (index === __props.links.length - 1) {
            _push(`<span class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></span>`);
          } else if (shouldShowLink(link, index)) {
            _push(`<!--[-->`);
            if (isCurrentPage(link)) {
              _push(`<span class="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600" aria-current="page">${ssrInterpolate(link.label)}</span>`);
            } else if (link.url) {
              _push(ssrRenderComponent(unref(Link), {
                href: link.url,
                class: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(link.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(link.label), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else if (!shouldShowLink(link, index) && (index < __props.links.length / 2 && getPageNumber(link.url) < __props.meta.current_page - 2 || index > __props.links.length / 2 && getPageNumber(link.url) > __props.meta.current_page + 2)) {
            _push(`<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    emptyMessage: {
      type: String,
      default: "No data available"
    },
    striped: {
      type: Boolean,
      default: true
    },
    hover: {
      type: Boolean,
      default: true
    }
  },
  emits: ["action"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const hasData = computed(() => {
      var _a;
      return ((_a = props.items) == null ? void 0 : _a.data) && props.items.data.length > 0;
    });
    const tableClasses = computed(() => ({
      "min-w-full divide-y divide-gray-200": true
    }));
    const rowClasses = computed(() => ({
      "hover:bg-gray-50": props.hover
    }));
    const renderCellContent = (item, column) => {
      if (column.render) {
        return column.render(item);
      }
      const value = getNestedValue(item, column.key);
      if (column.type === "currency") {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value || 0);
      }
      if (column.type === "date") {
        return value ? new Date(value).toLocaleDateString() : "-";
      }
      if (column.type === "badge") {
        return value;
      }
      return value || "-";
    };
    const getNestedValue = (obj, path) => {
      return path.split(".").reduce((current, key) => current == null ? void 0 : current[key], obj);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white shadow overflow-hidden sm:rounded-lg" }, _attrs))}>`);
      if (__props.isLoading) {
        _push(`<div class="relative"><div class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">`);
        _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="overflow-x-auto"><table class="${ssrRenderClass(tableClasses.value)}"><thead class="bg-gray-50"><tr><!--[-->`);
      ssrRenderList(__props.columns, (column) => {
        _push(`<th class="${ssrRenderClass([
          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
          column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
        ])}"><div class="flex items-center space-x-1"><span>${ssrInterpolate(column.label)}</span>`);
        if (column.sortable) {
          _push(`<span class="text-gray-400"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></th>`);
      });
      _push(`<!--]-->`);
      if (__props.actions.length > 0) {
        _push(`<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody class="bg-white divide-y divide-gray-200">`);
      if (!hasData.value && !__props.isLoading) {
        _push(`<tr><td${ssrRenderAttr("colspan", __props.columns.length + (__props.actions.length > 0 ? 1 : 0))} class="px-6 py-12 text-center"><div class="text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><p class="mt-2 text-sm">${ssrInterpolate(__props.emptyMessage)}</p></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(((_a = __props.items) == null ? void 0 : _a.data) || [], (item, index) => {
        _push(`<tr class="${ssrRenderClass([
          rowClasses.value,
          __props.striped && index % 2 === 1 ? "bg-gray-50" : ""
        ])}"><!--[-->`);
        ssrRenderList(__props.columns, (column) => {
          _push(`<td class="${ssrRenderClass([
            "px-6 py-4 whitespace-nowrap",
            column.class || "text-sm text-gray-900"
          ])}">`);
          ssrRenderSlot(_ctx.$slots, `cell-${column.key}`, {
            item,
            value: getNestedValue(item, column.key),
            column
          }, () => {
            var _a2;
            if (column.type === "badge") {
              _push(`<span class="${ssrRenderClass([
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                ((_a2 = column.badgeClass) == null ? void 0 : _a2.call(column, getNestedValue(item, column.key))) || "bg-gray-100 text-gray-800"
              ])}">${ssrInterpolate(renderCellContent(item, column))}</span>`);
            } else if (column.type === "link") {
              _push(ssrRenderComponent(unref(Link), {
                href: column.linkHref(item),
                class: column.linkClass || "text-blue-600 hover:text-blue-900"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(renderCellContent(item, column))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(renderCellContent(item, column)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (column.type === "avatar") {
              _push(`<div class="flex items-center"><div class="flex-shrink-0 h-10 w-10">`);
              if (getNestedValue(item, column.key)) {
                _push(`<img class="h-10 w-10 rounded-full"${ssrRenderAttr("src", getNestedValue(item, column.key))}${ssrRenderAttr("alt", item.name || "Avatar")}>`);
              } else {
                _push(`<div class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center"><span class="text-sm font-medium text-white">${ssrInterpolate((item.name || item.title || "U").charAt(0).toUpperCase())}</span></div>`);
              }
              _push(`</div>`);
              if (column.showName) {
                _push(`<div class="ml-4"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(item.name || item.title)}</div>`);
                if (item.email) {
                  _push(`<div class="text-sm text-gray-500">${ssrInterpolate(item.email)}</div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            } else {
              _push(`<span>${ssrInterpolate(renderCellContent(item, column))}</span>`);
            }
          }, _push, _parent);
          _push(`</td>`);
        });
        _push(`<!--]-->`);
        if (__props.actions.length > 0) {
          _push(`<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex justify-end space-x-2"><!--[-->`);
          ssrRenderList(__props.actions, (action) => {
            var _a2;
            _push(`<button style="${ssrRenderStyle(!action.condition || action.condition(item) ? null : { display: "none" })}" class="${ssrRenderClass([
              "text-sm font-medium",
              action.class || "text-blue-600 hover:text-blue-900"
            ])}"${ssrIncludeBooleanAttr((_a2 = action.disabled) == null ? void 0 : _a2.call(action, item)) ? " disabled" : ""}>${ssrInterpolate(action.label)}</button>`);
          });
          _push(`<!--]--></div></td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (hasData.value && __props.items.links) {
        _push(ssrRenderComponent(_sfc_main$2, {
          links: __props.items.links,
          meta: __props.items
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/DataTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SearchFilter",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    searchPlaceholder: {
      type: String,
      default: "Search..."
    },
    filters: {
      type: Array,
      default: () => []
    },
    showReset: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    const hasActiveFilters = computed(() => {
      return Object.values(props.modelValue).some(
        (value) => value !== "" && value !== null && value !== void 0
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 border-b border-gray-200" }, _attrs))}><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div class="flex-1 max-w-lg"><label for="search" class="sr-only">Search</label><div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><input id="search"${ssrRenderAttr("value", __props.modelValue.search || "")} type="text"${ssrRenderAttr("placeholder", __props.searchPlaceholder)} class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"></div></div><div class="flex flex-wrap items-center gap-3"><!--[-->`);
      ssrRenderList(__props.filters, (filter) => {
        _push(`<!--[-->`);
        if (filter.type === "select") {
          _push(`<div class="min-w-0"><label${ssrRenderAttr("for", filter.key)} class="sr-only">${ssrInterpolate(filter.label)}</label><select${ssrRenderAttr("id", filter.key)}${ssrRenderAttr("value", __props.modelValue[filter.key] || "")}${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><option value="">${ssrInterpolate(filter.placeholder || `All ${filter.label}`)}</option><!--[-->`);
          ssrRenderList(filter.options, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        } else if (filter.type === "date-range") {
          _push(`<div class="flex items-center space-x-2"><input${ssrRenderAttr("value", __props.modelValue[`${filter.key}_from`] || "")} type="date"${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><span class="text-gray-500">to</span><input${ssrRenderAttr("value", __props.modelValue[`${filter.key}_to`] || "")} type="date"${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"></div>`);
        } else if (filter.type === "number-range") {
          _push(`<div class="flex items-center space-x-2"><input${ssrRenderAttr("value", __props.modelValue[`${filter.key}_min`] || "")} type="number"${ssrRenderAttr("placeholder", `Min ${filter.label}`)}${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><span class="text-gray-500">-</span><input${ssrRenderAttr("value", __props.modelValue[`${filter.key}_max`] || "")} type="number"${ssrRenderAttr("placeholder", `Max ${filter.label}`)}${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"></div>`);
        } else if (filter.type === "toggle") {
          _push(`<div class="flex items-center"><input${ssrRenderAttr("id", filter.key)}${ssrIncludeBooleanAttr(__props.modelValue[filter.key] || false) ? " checked" : ""} type="checkbox"${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"><label${ssrRenderAttr("for", filter.key)} class="ml-2 text-sm text-gray-700">${ssrInterpolate(filter.label)}</label></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      if (__props.showReset && hasActiveFilters.value) {
        _push(`<button${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Reset </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (hasActiveFilters.value) {
        _push(`<div class="mt-4 flex flex-wrap items-center gap-2"><span class="text-sm text-gray-500">Active filters:</span><!--[-->`);
        ssrRenderList(__props.modelValue, (value, key) => {
          _push(`<!--[-->`);
          if (value && value !== "" && key !== "search") {
            _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${ssrInterpolate(key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()))}: ${ssrInterpolate(value)} <button type="button" class="ml-1.5 h-3 w-3 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"><svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path stroke-linecap="round" stroke-width="1.5" d="m1 1 6 6m0-6-6 6"></path></svg></button></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/SearchFilter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function useFilters(routeName, initialFilters = {}) {
  const filters = ref({
    search: initialFilters.search || "",
    category: initialFilters.category || "",
    status: initialFilters.status || "",
    sort: initialFilters.sort || "",
    per_page: initialFilters.per_page || 15,
    ...initialFilters
  });
  const isLoading = ref(false);
  const applyFilters = (newFilters = {}) => {
    isLoading.value = true;
    const cleanFilters = Object.fromEntries(
      Object.entries({ ...filters.value, ...newFilters }).filter(([_, value]) => value !== "" && value !== null && value !== void 0)
    );
    router.get(route(routeName), cleanFilters, {
      preserveState: true,
      replace: true,
      onFinish: () => {
        isLoading.value = false;
      }
    });
  };
  const resetFilters = () => {
    filters.value = {
      search: "",
      category: "",
      status: "",
      sort: "",
      per_page: 15
    };
    applyFilters();
  };
  const updateFilter = (key, value) => {
    filters.value[key] = value;
    applyFilters();
  };
  let searchTimeout;
  watch(() => filters.value.search, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        applyFilters();
      }, 300);
    }
  });
  watch([() => filters.value.category, () => filters.value.status, () => filters.value.sort], () => {
    applyFilters();
  });
  return {
    filters,
    isLoading,
    applyFilters,
    resetFilters,
    updateFilter
  };
}
function useCrud() {
  const isLoading = ref(false);
  const isDeleting = ref(false);
  const deleteItem = async (item, routeName, options = {}) => {
    const {
      confirmMessage = `Are you sure you want to delete "${item.title || item.name || "this item"}"?`,
      successMessage = "Item deleted successfully",
      onSuccess = null,
      onError = null
    } = options;
    if (!confirm(confirmMessage)) {
      return false;
    }
    isDeleting.value = true;
    router.delete(route(routeName, item.id), {
      onSuccess: () => {
        isDeleting.value = false;
        if (onSuccess) onSuccess();
        console.log(successMessage);
      },
      onError: (errors) => {
        isDeleting.value = false;
        if (onError) onError(errors);
        console.error("Delete failed:", errors);
      }
    });
    return true;
  };
  const bulkDelete = async (items, routeName, options = {}) => {
    const {
      confirmMessage = `Are you sure you want to delete ${items.length} items?`,
      successMessage = `${items.length} items deleted successfully`,
      onSuccess = null,
      onError = null
    } = options;
    if (!confirm(confirmMessage)) {
      return false;
    }
    isDeleting.value = true;
    router.delete(route(routeName), {
      data: { ids: items.map((item) => item.id) },
      onSuccess: () => {
        isDeleting.value = false;
        if (onSuccess) onSuccess();
        console.log(successMessage);
      },
      onError: (errors) => {
        isDeleting.value = false;
        if (onError) onError(errors);
        console.error("Bulk delete failed:", errors);
      }
    });
    return true;
  };
  const toggleStatus = (item, routeName, statusField = "is_active") => {
    isLoading.value = true;
    router.patch(route(routeName, item.id), {
      [statusField]: !item[statusField]
    }, {
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false;
      }
    });
  };
  const duplicate = (item, routeName) => {
    isLoading.value = true;
    router.post(route(routeName, item.id), {}, {
      onFinish: () => {
        isLoading.value = false;
      }
    });
  };
  return {
    isLoading,
    isDeleting,
    deleteItem,
    bulkDelete,
    toggleStatus,
    duplicate
  };
}
export {
  _sfc_main as _,
  useCrud as a,
  _sfc_main$1 as b,
  useFilters as u
};
