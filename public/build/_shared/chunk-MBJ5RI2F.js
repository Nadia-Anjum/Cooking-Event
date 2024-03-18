import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-QHXNCULF.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/EventCard.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\EventCard.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\EventCard.jsx"
  );
  import.meta.hot.lastModified = "1710277249862.3125";
}
function EventCard({
  event
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", { className: "event-card", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: event.title }, void 0, false, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: event.image, alt: event.caption }, void 0, false, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
      "Event by: ",
      event.user ? `${event.user.name} ${event.user.lastname}` : "Unknown"
    ] }, void 0, true, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: event.caption }, void 0, false, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
      event.date,
      ", ",
      event.time
    ] }, void 0, true, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: event.location }, void 0, false, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 30,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/EventCard.jsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c = EventCard;
var _c;
$RefreshReg$(_c, "EventCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  EventCard
};
//# sourceMappingURL=/build/_shared/chunk-MBJ5RI2F.js.map
