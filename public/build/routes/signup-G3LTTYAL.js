import {
  require_session
} from "/build/_shared/chunk-QUYRSHBJ.js";
import {
  require_browser_umd
} from "/build/_shared/chunk-5DGVIEP4.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  NavLink,
  useLoaderData
} from "/build/_shared/chunk-6IXSECH5.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-QHXNCULF.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/signup.jsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);
var import_mongoose = __toESM(require_browser_umd(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\signup.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\signup.jsx"
  );
  import.meta.hot.lastModified = "1710277249886.7974";
}
function SignUp() {
  _s();
  const loaderData = useLoaderData();
  console.log("loaderData", loaderData);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "sign-up-page", className: "page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Sign Up" }, void 0, false, {
      fileName: "app/routes/signup.jsx",
      lineNumber: 43,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { id: "sign-up-form", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "input-group", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "input-field", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "name", children: "Name" }, void 0, false, {
            fileName: "app/routes/signup.jsx",
            lineNumber: 48,
            columnNumber: 10
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "name", type: "text", name: "name", "aria-label": "name", placeholder: "Type your name...", required: true }, void 0, false, {
            fileName: "app/routes/signup.jsx",
            lineNumber: 49,
            columnNumber: 10
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/signup.jsx",
          lineNumber: 47,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "input-field", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "lastname", children: "Last Name" }, void 0, false, {
            fileName: "app/routes/signup.jsx",
            lineNumber: 53,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "lastname", type: "text", name: "lastname", "aria-label": "lastname", placeholder: "Type your last name...", required: true }, void 0, false, {
            fileName: "app/routes/signup.jsx",
            lineNumber: 54,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/signup.jsx",
          lineNumber: 52,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 46,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "mail", children: "Mail" }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "mail", type: "email", name: "mail", "aria-label": "mail", placeholder: "Type your mail...", required: true }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", children: "Password" }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "password", type: "password", name: "password", "aria-label": "password", placeholder: "Type your password...", autoComplete: "current-password" }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "btns", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "Sign up" }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 65,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 64,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "error-message", children: loaderData?.error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: loaderData?.error?.message }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 67,
        columnNumber: 63
      }, this) : null }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 67,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/signup.jsx",
      lineNumber: 44,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
      textAlign: "center"
    }, children: [
      "Already have an account? ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLink, { to: "/signin", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Sign in here." }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 72,
        columnNumber: 56
      }, this) }, void 0, false, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 72,
        columnNumber: 34
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/signup.jsx",
      lineNumber: 69,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/signup.jsx",
    lineNumber: 42,
    columnNumber: 10
  }, this);
}
_s(SignUp, "ceKF1Gd7W4lGV+M78eBsU+KQIkw=", false, function() {
  return [useLoaderData];
});
_c = SignUp;
var _c;
$RefreshReg$(_c, "SignUp");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  SignUp as default
};
//# sourceMappingURL=/build/routes/signup-G3LTTYAL.js.map
