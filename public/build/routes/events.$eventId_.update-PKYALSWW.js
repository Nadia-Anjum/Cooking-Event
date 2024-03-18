import {
  require_auth
} from "/build/_shared/chunk-SARLQUTN.js";
import {
  require_browser_umd
} from "/build/_shared/chunk-5DGVIEP4.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  useLoaderData,
  useNavigate
} from "/build/_shared/chunk-6IXSECH5.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-QHXNCULF.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/events.$eventId_.update.jsx
var import_node = __toESM(require_node(), 1);
var import_mongoose = __toESM(require_browser_umd(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_auth = __toESM(require_auth(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\events.$eventId_.update.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\events.$eventId_.update.jsx"
  );
  import.meta.hot.lastModified = "1710277249879.3015";
}
function UpdateEvent() {
  _s();
  const {
    event
  } = useLoaderData();
  const [image, setImage] = (0, import_react2.useState)(event.image);
  const navigate = useNavigate();
  function handleCancel() {
    navigate(-1);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Update Post" }, void 0, false, {
      fileName: "app/routes/events.$eventId_.update.jsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { id: "event-form", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-row", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-column", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "title", children: "Title" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 55,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "title", name: "title", type: "text", defaultValue: event.title, placeholder: "Event Title..." }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 56,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "caption", children: "Caption" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 58,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "caption", defaultValue: event.caption, name: "caption", type: "text", "aria-label": "caption", placeholder: "Write a caption..." }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 59,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "date", children: "Date" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 61,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "date", name: "date", type: "date", defaultValue: event.date }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 62,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "time", children: "Time" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 64,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "time", name: "time", type: "time", defaultValue: event.time }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 65,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 53,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-column", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "location", children: "Location" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 70,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "location", name: "location", type: "text", defaultValue: event.location, placeholder: "Event Location..." }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 71,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "image", children: "Image URL" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 73,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "image", defaultValue: event.image, type: "url", onChange: (e) => setImage(e.target.value), placeholder: "Paste an image URL..." }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 74,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "image-preview", children: "Image Preview" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 76,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { id: "image-preview", className: "image-preview", src: image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL", alt: "Choose", onError: (e) => e.target.src = "https://placehold.co/600x400?text=Error+loading+image" }, void 0, false, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 77,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 69,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$eventId_.update.jsx",
        lineNumber: 52,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "uid", type: "text", defaultValue: event.uid, hidden: true }, void 0, false, {
        fileName: "app/routes/events.$eventId_.update.jsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "btns", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "Save" }, void 0, false, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "btn-cancel", onClick: handleCancel, children: "Cancel" }, void 0, false, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 85,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$eventId_.update.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$eventId_.update.jsx",
      lineNumber: 51,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/events.$eventId_.update.jsx",
    lineNumber: 49,
    columnNumber: 10
  }, this);
}
_s(UpdateEvent, "rzQ0TXj2wf2d0VQS1yPfc+Mmm44=", false, function() {
  return [useLoaderData, useNavigate];
});
_c = UpdateEvent;
var _c;
$RefreshReg$(_c, "UpdateEvent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  UpdateEvent as default
};
//# sourceMappingURL=/build/routes/events.$eventId_.update-PKYALSWW.js.map
