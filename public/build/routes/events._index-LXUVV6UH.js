import {
  EventCard
} from "/build/_shared/chunk-MBJ5RI2F.js";
import {
  require_browser_umd
} from "/build/_shared/chunk-5DGVIEP4.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  Link2 as Link,
  useLoaderData,
  useSearchParams
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

// app/routes/events._index.jsx
var import_node = __toESM(require_node(), 1);
var import_mongoose = __toESM(require_browser_umd(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\events._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\events._index.jsx"
  );
  import.meta.hot.lastModified = "1710277249881.2935";
}
function Index() {
  _s();
  const {
    events
  } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [isLoading, setIsLoading] = (0, import_react2.useState)(false);
  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.search.value;
    if (searchValue.trim() !== "") {
      setIsLoading(true);
    }
    setSearchParams({
      search: searchValue
    });
  };
  const handleInputChange = (event) => {
    const searchValue = event.target.value;
    if (searchValue.trim() !== "") {
      setIsLoading(true);
    }
    setSearchParams({
      search: searchValue
    });
  };
  (0, import_react4.useEffect)(() => {
    setIsLoading(false);
  }, [searchQuery]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "page page1", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hero-image", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "https://images.unsplash.com/photo-1554998171-89445e31c52b?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hero" }, void 0, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 109,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hero-text", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Cooking Events" }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 111,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Embark on a flavorful adventure as we travel the world through its diverse cuisines. From spicy Thai curries to hearty Italian pastas, join us in creating culinary delights from every corner of the globe." }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 112,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 110,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 108,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "page", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { onSubmit: handleSearch, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "searchbar-container", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          position: "relative"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: `searchbar ${isLoading ? "loading" : ""}`, type: "text", name: "search", defaultValue: searchQuery, placeholder: "Search events...", onChange: handleInputChange }, void 0, false, {
            fileName: "app/routes/events._index.jsx",
            lineNumber: 122,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "search-spinner", "aria-hidden": true, hidden: !isLoading }, void 0, false, {
            fileName: "app/routes/events._index.jsx",
            lineNumber: 123,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 119,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "btn-search", children: "Search" }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 125,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 118,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 117,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "grid", children: events.map((event) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "event-link", to: `${event._id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EventCard, { event }, void 0, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 130,
        columnNumber: 25
      }, this) }, event._id, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 129,
        columnNumber: 38
      }, this)) }, void 0, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 128,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 115,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/events._index.jsx",
    lineNumber: 107,
    columnNumber: 10
  }, this);
}
_s(Index, "TLXXQxiP5l0Hv6PvA1nIO5MTIZ8=", false, function() {
  return [useLoaderData, useSearchParams];
});
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/events._index-LXUVV6UH.js.map
