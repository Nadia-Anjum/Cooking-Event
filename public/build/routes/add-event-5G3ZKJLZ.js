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

// app/routes/add-event.jsx
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
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\add-event.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\add-event.jsx"
  );
  import.meta.hot.lastModified = "1710277249876.3066";
}
var meta = () => {
  return [{
    title: "Cooking classes - Add New Event"
  }];
};
function AddEvent() {
  _s();
  const [image, setImage] = (0, import_react2.useState)("https://placehold.co/600x400?text=Add+your+amazing+image");
  const navigate = useNavigate();
  function handleCancel() {
    navigate(-1);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Add an Event" }, void 0, false, {
      fileName: "app/routes/add-event.jsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { id: "event-form", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-row", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-column", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "title", children: "Title" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 56,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "title", name: "title", type: "text", placeholder: "Event Title..." }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 57,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "caption", children: "Caption" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 59,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "caption", name: "caption", type: "text", "aria-label": "caption", placeholder: "Write a caption..." }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 60,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "date", children: "Date" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 62,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "date", name: "date", type: "date" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 63,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "time", children: "Time" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 65,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "time", name: "time", type: "time" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 66,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 54,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-column", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "location", children: "Location" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 70,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "location", name: "location", type: "text", placeholder: "Event Location..." }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 71,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "image", children: "Image URL" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 73,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "image", type: "url", onChange: (e) => setImage(e.target.value), placeholder: "Paste an image URL..." }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 74,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "image-preview", children: "Image Preview" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 76,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { id: "image-preview", className: "image-preview", src: image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL", alt: "Choose", onError: (e) => e.target.src = "https://placehold.co/600x400?text=Error+loading+image" }, void 0, false, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 77,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 69,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/add-event.jsx",
        lineNumber: 53,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "btns", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "Save" }, void 0, false, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "btn-cancel", onClick: handleCancel, children: "Cancel" }, void 0, false, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 83,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/add-event.jsx",
        lineNumber: 81,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/add-event.jsx",
      lineNumber: 52,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/add-event.jsx",
    lineNumber: 50,
    columnNumber: 10
  }, this);
}
_s(AddEvent, "QpCxe6nt8u8U+ySuIgQvx54vUkc=", false, function() {
  return [useNavigate];
});
_c = AddEvent;
var _c;
$RefreshReg$(_c, "AddEvent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AddEvent as default,
  meta
};
//# sourceMappingURL=/build/routes/add-event-5G3ZKJLZ.js.map
