import { ref, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-EcLlKyRZ.js";
import { Head, Link } from "@inertiajs/vue3";
import "./BaseLayout-DdSYcoSB.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    payment: Object
  },
  setup(__props) {
    const props = __props;
    ref(false);
    ref(props.payment.status);
    ref(props.payment.notes);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };
    const formatDateTime = (date) => {
      return new Date(date).toLocaleString();
    };
    const getStatusBadgeClass = (status) => {
      const classes = {
        "paid": "bg-green-100 text-green-800",
        "pending": "bg-yellow-100 text-yellow-800",
        "failed": "bg-red-100 text-red-800",
        "processing": "bg-blue-100 text-blue-800",
        "refunded": "bg-gray-100 text-gray-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getCustomerName = () => {
      var _a;
      return ((_a = props.payment.user) == null ? void 0 : _a.name) || props.payment.guest_name || "Guest User";
    };
    const getCustomerEmail = () => {
      var _a;
      return ((_a = props.payment.user) == null ? void 0 : _a.email) || props.payment.guest_email || "No email";
    };
    const getCustomerPhone = () => {
      var _a;
      return ((_a = props.payment.user) == null ? void 0 : _a.phone) || props.payment.guest_phone || "No phone";
    };
    const getCustomerSchool = () => {
      var _a;
      return ((_a = props.payment.user) == null ? void 0 : _a.school_name) || props.payment.guest_school_name || "No school";
    };
    const getCustomerGrade = () => {
      var _a;
      return ((_a = props.payment.user) == null ? void 0 : _a.grade) || props.payment.guest_grade || "No grade";
    };
    const getCustomerCity = () => {
      var _a;
      return ((_a = props.payment.user) == null ? void 0 : _a.city) || props.payment.guest_city || "No city";
    };
    const isGuestPayment = () => {
      return !props.payment.user;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Payment #${__props.payment.id}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Payment Details </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.payments.index"),
              class: "bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← Back to Payments `);
                } else {
                  return [
                    createTextVNode(" ← Back to Payments ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Payment Details "),
                createVNode(unref(Link), {
                  href: _ctx.route("admin.payments.index"),
                  class: "bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" ← Back to Payments ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0 h-12 w-12"${_scopeId}><div class="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center"${_scopeId}><span class="text-lg font-medium text-white"${_scopeId}>${ssrInterpolate(getCustomerName().charAt(0))}</span></div></div><div class="ml-4"${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>Payment #${ssrInterpolate(__props.payment.id)}</h1><p class="mt-1 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(getCustomerName())} - ${ssrInterpolate(getCustomerEmail())}</p><div class="mt-2"${_scopeId}><span class="${ssrRenderClass(["inline-flex items-center px-3 py-1 rounded-full text-sm font-medium", getStatusBadgeClass(__props.payment.status)])}"${_scopeId}>${ssrInterpolate(__props.payment.status.toUpperCase())}</span>`);
            if (__props.payment.manual_override) {
              _push2(`<span class="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"${_scopeId}> MANUAL OVERRIDE </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"${_scopeId}><div class="lg:col-span-2"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h2 class="text-xl font-semibold text-gray-900 mb-4"${_scopeId}>Payment Information</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Payment ID</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>#${ssrInterpolate(__props.payment.id)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Amount</dt><dd class="mt-1"${_scopeId}>`);
            if (__props.payment.is_deposit || __props.payment.payment_plan_type) {
              _push2(`<div class="space-y-3"${_scopeId}><div class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.payment.payment_plan_total_amount || __props.payment.amount))} <span class="text-sm font-normal text-blue-600 ml-2"${_scopeId}>Split Payment</span></div><div class="text-sm text-gray-600"${_scopeId}><div class="flex justify-between mb-1"${_scopeId}><span${_scopeId}>Deposit Paid:</span><span class="font-medium text-green-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.payment.payment_plan_deposit_amount || __props.payment.amount))}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Balance Due:</span><span class="font-medium text-orange-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.payment.payment_plan_balance_amount || 0))}</span></div></div></div>`);
            } else {
              _push2(`<div class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.payment.amount))}</div>`);
            }
            _push2(`</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Currency</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.payment.currency)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Status</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(__props.payment.status)])}"${_scopeId}>${ssrInterpolate(__props.payment.status)}</span></dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Program</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = __props.payment.program) == null ? void 0 : _a.title) || "Unknown Program")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Stripe Payment Intent ID</dt><dd class="mt-1 text-sm text-gray-900 font-mono"${_scopeId}>${ssrInterpolate(__props.payment.stripe_payment_intent_id || "N/A")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Stripe Customer ID</dt><dd class="mt-1 text-sm text-gray-900 font-mono"${_scopeId}>${ssrInterpolate(__props.payment.stripe_customer_id || "N/A")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Created At</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.payment.created_at))}</dd></div>`);
            if (__props.payment.paid_at) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Paid At</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.payment.paid_at))}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.payment.updated_at && __props.payment.updated_at !== __props.payment.created_at) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Last Updated</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.payment.updated_at))}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.payment.notes) {
              _push2(`<div class="mt-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Notes</dt><dd class="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md"${_scopeId}>${ssrInterpolate(__props.payment.notes)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.payment.workshop_session) {
              _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Workshop Session Details</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Session ID</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>#${ssrInterpolate(__props.payment.workshop_session.id)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Program Type</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}><span class="${ssrRenderClass([
                __props.payment.workshop_session.program_type === "mastery" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800",
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
              ])}"${_scopeId}>${ssrInterpolate(__props.payment.workshop_session.program_type)}</span></dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Date</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.payment.workshop_session.date))}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Location</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.payment.workshop_session.location || "TBD")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Available Spots</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.payment.workshop_session.available_spots || "N/A")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Booked Spots</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.payment.workshop_session.booked_spots || 0)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Remaining Spots</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate((__props.payment.workshop_session.available_spots || 0) - (__props.payment.workshop_session.booked_spots || 0))}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Session Status</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}><span class="${ssrRenderClass([
                __props.payment.workshop_session.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              ])}"${_scopeId}>${ssrInterpolate(__props.payment.workshop_session.is_active ? "Active" : "Inactive")}</span></dd></div>`);
              if (__props.payment.workshop_session.price_override) {
                _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Price Override</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.payment.workshop_session.price_override))}</dd></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Session Created</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.payment.workshop_session.created_at))}</dd></div></div>`);
              if (__props.payment.workshop_session.description) {
                _push2(`<div class="mt-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Description</dt><dd class="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md"${_scopeId}>${ssrInterpolate(__props.payment.workshop_session.description)}</dd></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.payment.balance_payments && __props.payment.balance_payments.length > 0) {
              _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Balance Payment</h3><!--[-->`);
              ssrRenderList(__props.payment.balance_payments, (balancePayment) => {
                _push2(`<div class="bg-gray-50 rounded-lg p-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Amount</dt><dd class="mt-1 text-sm font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(balancePayment.amount))}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Status</dt><dd class="mt-1"${_scopeId}><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(balancePayment.status)])}"${_scopeId}>${ssrInterpolate(balancePayment.status)}</span></dd></div>`);
                if (balancePayment.paid_at) {
                  _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Paid At</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(balancePayment.paid_at))}</dd></div>`);
                } else if (__props.payment.payment_plan_balance_due_at) {
                  _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Due Date</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.payment.payment_plan_balance_due_at))}</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>${ssrInterpolate(isGuestPayment() ? "Guest Information" : "Customer Information")}</h3><div class="space-y-4"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Name</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getCustomerName())}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Email</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getCustomerEmail())}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Phone</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getCustomerPhone())}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>School</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getCustomerSchool())}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Grade</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getCustomerGrade())}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>City</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getCustomerCity())}</dd></div>`);
            if (!isGuestPayment()) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Customer Type</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"${_scopeId}> Registered User </span></dd></div>`);
            } else {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Customer Type</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"${_scopeId}> Guest Checkout </span></dd></div>`);
            }
            _push2(`</div></div></div></div></div>`);
            if (__props.payment.metadata && Object.keys(__props.payment.metadata).length > 0) {
              _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Payment Metadata</h3><div class="bg-gray-50 rounded-lg p-4"${_scopeId}><pre class="text-sm text-gray-700 whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(JSON.stringify(__props.payment.metadata, null, 2))}</pre></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-screen-2xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0 h-12 w-12" }, [
                            createVNode("div", { class: "h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center" }, [
                              createVNode("span", { class: "text-lg font-medium text-white" }, toDisplayString(getCustomerName().charAt(0)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "ml-4" }, [
                            createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, "Payment #" + toDisplayString(__props.payment.id), 1),
                            createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(getCustomerName()) + " - " + toDisplayString(getCustomerEmail()), 1),
                            createVNode("div", { class: "mt-2" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-3 py-1 rounded-full text-sm font-medium", getStatusBadgeClass(__props.payment.status)]
                              }, toDisplayString(__props.payment.status.toUpperCase()), 3),
                              __props.payment.manual_override ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                              }, " MANUAL OVERRIDE ")) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" }, [
                    createVNode("div", { class: "lg:col-span-2" }, [
                      createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                        createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                          createVNode("h2", { class: "text-xl font-semibold text-gray-900 mb-4" }, "Payment Information"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Payment ID"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, "#" + toDisplayString(__props.payment.id), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Amount"),
                              createVNode("dd", { class: "mt-1" }, [
                                __props.payment.is_deposit || __props.payment.payment_plan_type ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "space-y-3"
                                }, [
                                  createVNode("div", { class: "text-lg font-semibold text-gray-900" }, [
                                    createTextVNode(toDisplayString(formatCurrency(__props.payment.payment_plan_total_amount || __props.payment.amount)) + " ", 1),
                                    createVNode("span", { class: "text-sm font-normal text-blue-600 ml-2" }, "Split Payment")
                                  ]),
                                  createVNode("div", { class: "text-sm text-gray-600" }, [
                                    createVNode("div", { class: "flex justify-between mb-1" }, [
                                      createVNode("span", null, "Deposit Paid:"),
                                      createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(formatCurrency(__props.payment.payment_plan_deposit_amount || __props.payment.amount)), 1)
                                    ]),
                                    createVNode("div", { class: "flex justify-between" }, [
                                      createVNode("span", null, "Balance Due:"),
                                      createVNode("span", { class: "font-medium text-orange-600" }, toDisplayString(formatCurrency(__props.payment.payment_plan_balance_amount || 0)), 1)
                                    ])
                                  ])
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "text-lg font-semibold text-gray-900"
                                }, toDisplayString(formatCurrency(__props.payment.amount)), 1))
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Currency"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.payment.currency), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Status"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, [
                                createVNode("span", {
                                  class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(__props.payment.status)]
                                }, toDisplayString(__props.payment.status), 3)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Program"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(((_b = __props.payment.program) == null ? void 0 : _b.title) || "Unknown Program"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Stripe Payment Intent ID"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 font-mono" }, toDisplayString(__props.payment.stripe_payment_intent_id || "N/A"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Stripe Customer ID"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 font-mono" }, toDisplayString(__props.payment.stripe_customer_id || "N/A"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Created At"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.payment.created_at)), 1)
                            ]),
                            __props.payment.paid_at ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Paid At"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.payment.paid_at)), 1)
                            ])) : createCommentVNode("", true),
                            __props.payment.updated_at && __props.payment.updated_at !== __props.payment.created_at ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Last Updated"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.payment.updated_at)), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          __props.payment.notes ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-6"
                          }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Notes"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md" }, toDisplayString(__props.payment.notes), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      __props.payment.workshop_session ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6"
                      }, [
                        createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Workshop Session Details"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Session ID"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, "#" + toDisplayString(__props.payment.workshop_session.id), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Program Type"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, [
                                createVNode("span", {
                                  class: [
                                    __props.payment.workshop_session.program_type === "mastery" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800",
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                  ]
                                }, toDisplayString(__props.payment.workshop_session.program_type), 3)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Date"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDate(__props.payment.workshop_session.date)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Location"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.payment.workshop_session.location || "TBD"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Available Spots"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.payment.workshop_session.available_spots || "N/A"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Booked Spots"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.payment.workshop_session.booked_spots || 0), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Remaining Spots"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString((__props.payment.workshop_session.available_spots || 0) - (__props.payment.workshop_session.booked_spots || 0)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Session Status"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, [
                                createVNode("span", {
                                  class: [
                                    __props.payment.workshop_session.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                  ]
                                }, toDisplayString(__props.payment.workshop_session.is_active ? "Active" : "Inactive"), 3)
                              ])
                            ]),
                            __props.payment.workshop_session.price_override ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Price Override"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatCurrency(__props.payment.workshop_session.price_override)), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Session Created"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.payment.workshop_session.created_at)), 1)
                            ])
                          ]),
                          __props.payment.workshop_session.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-6"
                          }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Description"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md" }, toDisplayString(__props.payment.workshop_session.description), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true),
                      __props.payment.balance_payments && __props.payment.balance_payments.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6"
                      }, [
                        createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Balance Payment"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.payment.balance_payments, (balancePayment) => {
                            return openBlock(), createBlock("div", {
                              key: balancePayment.id,
                              class: "bg-gray-50 rounded-lg p-4"
                            }, [
                              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                                createVNode("div", null, [
                                  createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Amount"),
                                  createVNode("dd", { class: "mt-1 text-sm font-semibold text-gray-900" }, toDisplayString(formatCurrency(balancePayment.amount)), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Status"),
                                  createVNode("dd", { class: "mt-1" }, [
                                    createVNode("span", {
                                      class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(balancePayment.status)]
                                    }, toDisplayString(balancePayment.status), 3)
                                  ])
                                ]),
                                balancePayment.paid_at ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Paid At"),
                                  createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(balancePayment.paid_at)), 1)
                                ])) : __props.payment.payment_plan_balance_due_at ? (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Due Date"),
                                  createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.payment.payment_plan_balance_due_at)), 1)
                                ])) : createCommentVNode("", true)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                        createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, toDisplayString(isGuestPayment() ? "Guest Information" : "Customer Information"), 1),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Name"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(getCustomerName()), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Email"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(getCustomerEmail()), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Phone"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(getCustomerPhone()), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "School"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(getCustomerSchool()), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Grade"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(getCustomerGrade()), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "City"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(getCustomerCity()), 1)
                            ]),
                            !isGuestPayment() ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Customer Type"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, [
                                createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" }, " Registered User ")
                              ])
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Customer Type"),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, [
                                createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800" }, " Guest Checkout ")
                              ])
                            ]))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  __props.payment.metadata && Object.keys(__props.payment.metadata).length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white overflow-hidden shadow-sm sm:rounded-lg"
                  }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Payment Metadata"),
                      createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                        createVNode("pre", { class: "text-sm text-gray-700 whitespace-pre-wrap" }, toDisplayString(JSON.stringify(__props.payment.metadata, null, 2)), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Payments/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
