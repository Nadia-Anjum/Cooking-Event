import {
  require_session
} from "/build/_shared/chunk-QUYRSHBJ.js";
import {
  require_auth
} from "/build/_shared/chunk-SARLQUTN.js";
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

// app/routes/signin.jsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);
var import_auth = __toESM(require_auth(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\signin.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\signin.jsx"
  );
  import.meta.hot.lastModified = "1710277249884.804";
}
function SignIn() {
  _s();
  const loaderData = useLoaderData();
  console.log("loaderData", loaderData);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "sign-in-page", className: "page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Sign In" }, void 0, false, {
      fileName: "app/routes/signin.jsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-container", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { id: "sign-in-form", method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "mail", children: "Mail" }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 49,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "mail", type: "email", name: "mail", "aria-label": "mail", placeholder: "Type your mail...", required: true }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 50,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", children: "Password" }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 52,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "password", type: "password", name: "password", "aria-label": "password", placeholder: "Type your password...", autoComplete: "current-password" }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 53,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "btns", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "signinbtn", children: "Sign In" }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 56,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 55,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "error-message", children: loaderData?.error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: loaderData?.error?.message }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 58,
          columnNumber: 61
        }, this) : null }, void 0, false, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 58,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 48,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "food img" }, void 0, false, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 60,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/signin.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
      textAlign: "center"
    }, children: [
      "If you do not have an account then sign up here: ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLink, { to: "/signup", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Sign up here" }, void 0, false, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 66,
        columnNumber: 80
      }, this) }, void 0, false, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 66,
        columnNumber: 58
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/signin.jsx",
      lineNumber: 63,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/signin.jsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_s(SignIn, "ceKF1Gd7W4lGV+M78eBsU+KQIkw=", false, function() {
  return [useLoaderData];
});
_c = SignIn;
var _c;
$RefreshReg$(_c, "SignIn");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  SignIn as default
};
//# sourceMappingURL=/build/routes/signin-43ZK3O5Y.js.map
