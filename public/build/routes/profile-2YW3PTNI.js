import {
  EventCard
} from "/build/_shared/chunk-MBJ5RI2F.js";
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
  Link,
  init_dist,
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

// app/routes/profile.jsx
var import_auth = __toESM(require_auth(), 1);
var import_mongoose = __toESM(require_browser_umd(), 1);
var import_node = __toESM(require_node(), 1);
var import_node2 = __toESM(require_node(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\profile.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\profile.jsx"
  );
  import.meta.hot.lastModified = "1710277249883.806";
}
function Profile() {
  _s();
  const {
    user,
    events
  } = useLoaderData();
  console.log(user);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "page profileIntro", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Profile" }, void 0, false, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "profile-container", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "profileP", children: [
        "Name: ",
        user.name,
        " ",
        user.lastname,
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
          fileName: "app/routes/profile.jsx",
          lineNumber: 61,
          columnNumber: 47
        }, this),
        "Mail: ",
        user.mail
      ] }, void 0, true, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 60,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "Log out" }, void 0, false, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 67,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 66,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "profile-header2", children: "My added events" }, void 0, false, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "profile-event", children: events.map((event) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/events/${event._id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EventCard, { event }, void 0, false, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 76,
      columnNumber: 11
    }, this) }, event._id, false, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 75,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "events-attending", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "profile-header2", children: "Events Attending" }, void 0, false, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "profile-event-attendings", children: user.eventsAttending.map((event) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "li-attendingsProfile", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/events/${event._id}`, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: event.title }, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 86,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 87,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: event.image, alt: event.title }, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 88,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 89,
            columnNumber: 17
          }, this),
          event.caption,
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 91,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 92,
            columnNumber: 17
          }, this),
          event.date,
          ", ",
          event.time,
          ", ",
          event.location
        ] }, void 0, true, {
          fileName: "app/routes/profile.jsx",
          lineNumber: 85,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "eventId", value: event._id }, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 96,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "cancelAt", children: "Cancel" }, void 0, false, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 97,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/profile.jsx",
          lineNumber: 95,
          columnNumber: 15
        }, this)
      ] }, event._id, true, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 84,
        columnNumber: 44
      }, this)) }, void 0, false, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 103,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/profile.jsx",
    lineNumber: 56,
    columnNumber: 10
  }, this);
}
_s(Profile, "DZSILNgvCuY7JgNc9CJU+C6gISs=", false, function() {
  return [useLoaderData];
});
_c = Profile;
var _c;
$RefreshReg$(_c, "Profile");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Profile as default
};
//# sourceMappingURL=/build/routes/profile-2YW3PTNI.js.map
