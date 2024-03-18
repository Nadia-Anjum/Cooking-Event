import {
  require_session
} from "/build/_shared/chunk-QUYRSHBJ.js";
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

// app/routes/events.$eventId.jsx
var import_node = __toESM(require_node(), 1);
var import_mongoose = __toESM(require_browser_umd(), 1);
var import_auth = __toESM(require_auth(), 1);
var import_session = __toESM(require_session(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\events.$eventId.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\events.$eventId.jsx"
  );
  import.meta.hot.lastModified = "1710277249878.3013";
}
function Event() {
  _s();
  const {
    event,
    authUser,
    similarEvents
  } = useLoaderData();
  console.log("EVENT", event);
  function confirmDelete(event2) {
    const response = confirm("Please confirm you want to delete this post event.");
    if (!response) {
      event2.preventDefault();
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "event-page", className: "page page2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "column1", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EventCard, { event }, void 0, false, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 73,
        columnNumber: 7
      }, this),
      authUser && authUser._id === event.user._id && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "btns", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { action: "update", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "Update" }, void 0, false, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 76,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { action: "destroy", method: "post", onSubmit: confirmDelete, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "Delete" }, void 0, false, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 79,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 74,
        columnNumber: 55
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$eventId.jsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "column2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "att-main", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "attend-container", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "Join Now: Get Involved in This Event!" }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 89,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Get ready to tantalize your taste buds! Whether you are a seasoned chef or just love good food, join our thrilling cooking event now!" }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 90,
            columnNumber: 9
          }, this),
          authUser && event.attendees && !event.attendees.includes(authUser._id) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { action: "", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "Join here" }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 92,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 91,
            columnNumber: 84
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 88,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "att-outcome", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "Attendees" }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 96,
            columnNumber: 9
          }, this),
          event.attendees && event.attendees.map((user) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
            user.name,
            " ",
            user.lastname
          ] }, user._id, true, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 97,
            columnNumber: 57
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 95,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "comment-section", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "Comments" }, void 0, false, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 104,
          columnNumber: 9
        }, this),
        authUser && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { action: "", method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "content", required: true }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 106,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", children: "Post Comment" }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 107,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 105,
          columnNumber: 22
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "comment-outcome-ul", children: event.comments.map((comment, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "comment-info", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: comment.content }, void 0, false, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 111,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Posted by: ",
            comment.user ? `${comment.user.name}` : "Unknown"
          ] }, void 0, true, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 112,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            textAlign: "end"
          }, children: [
            "Posted at: ",
            new Date(comment.createdAt).toLocaleString()
          ] }, void 0, true, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 113,
            columnNumber: 15
          }, this)
        ] }, index, true, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 110,
          columnNumber: 51
        }, this)) }, void 0, false, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 109,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 103,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$eventId.jsx",
      lineNumber: 85,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "similar-events-main", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "s-h2", children: "Similar Events" }, void 0, false, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 122,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "similar-events", children: similarEvents.map((similarEvent) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/events/${similarEvent._id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EventCard, { event: similarEvent }, void 0, false, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 125,
        columnNumber: 15
      }, this) }, similarEvent._id, false, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 124,
        columnNumber: 46
      }, this)) }, void 0, false, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 123,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$eventId.jsx",
      lineNumber: 121,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/events.$eventId.jsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
}
_s(Event, "lvgDoaW2dmSf+FDMt9AKilYsPhs=", false, function() {
  return [useLoaderData];
});
_c = Event;
var _c;
$RefreshReg$(_c, "Event");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Event as default
};
//# sourceMappingURL=/build/routes/events.$eventId-2S2HYZOV.js.map
