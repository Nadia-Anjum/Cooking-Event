var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";

// app/db/connectDb.server.js
import mongoose2 from "mongoose";

// app/db/models.js
import { mongoose } from "mongoose";
import bcrypt from "bcrypt";
var { Schema } = mongoose, eventSchema = new Schema(
  {
    title: String,
    date: String,
    time: String,
    location: String,
    image: String,
    caption: String,
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //New field for attendees
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: !0 }
), userSchema = new mongoose.Schema(
  {
    image: String,
    mail: {
      type: String,
      required: !0,
      // Ensure user emails are required
      unique: !0
      // Ensure user emails are unique
    },
    name: String,
    lastname: String,
    title: String,
    password: {
      type: String,
      required: !0,
      // Ensure user passwords are required
      select: !1
      // Automatically exclude from query results
    },
    eventsAttending: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
    // New field for events attending
  },
  { timestamps: !0 }
), commentSchema = new Schema(
  {
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  },
  { timestamps: !0 }
);
userSchema.pre("save", async function(next) {
  let user = this;
  if (!user.isModified("password"))
    return next();
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt), next();
});
var models = [
  {
    name: "Event",
    schema: eventSchema,
    collection: "event"
  },
  {
    name: "User",
    schema: userSchema,
    collection: "user"
  },
  {
    name: "Comment",
    schema: commentSchema,
    collection: "comment"
  }
];

// app/db/connectDb.server.js
var { MONGODB_URL, NODE_ENV } = process.env;
if (!MONGODB_URL) {
  let errorMessage = NODE_ENV === "production" ? "Please define the MONGODB_URL environment variable \u2014 pointing to your full connection string, including database name." : "Please define the MONGODB_URL environment variable inside an .env file \u2014 pointing to your full connection string, including database name.";
  throw new Error(errorMessage);
}
function connectDb() {
  let modelCreationType = "Creating";
  NODE_ENV === "development" && (mongoose2.set("overwriteModels", !0), Object.keys(mongoose2.models).length > 0 && (modelCreationType = "Overwriting")), console.log(
    // E.g. "Mongoose: Creating 2 models (Book, Author)"
    "Mongoose: %s %d %s (%s)",
    modelCreationType,
    models.length,
    models.length === 1 ? "model" : "models",
    models.map((model) => model.name).join(", ")
  );
  for (let model of models)
    mongoose2.model(model.name, model.schema, model.collection);
  let readyState = mongoose2.connection.readyState;
  if (readyState > 0) {
    console.log(
      "Mongoose: Re-using existing connection (readyState: %d)",
      readyState
    );
    return;
  }
  mongoose2.connection.on("error", (error) => {
    console.error("Mongoose: error %s", error);
  });
  for (let event of ["connected", "reconnected", "disconnected", "close"])
    mongoose2.connection.on(event, () => console.log("Mongoose: %s", event));
  mongoose2.connect(MONGODB_URL).catch((error) => {
    console.error(error);
  });
}

// app/db/seedingDb.server.js
import mongoose3 from "mongoose";
async function seedDb() {
  await mongoose3.models.Event.countDocuments() === 0 && (console.log("Seeding database..."), insertData());
}
async function insertData() {
  let events = [
    {
      image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 0,
      caption: "Unlock the art of mexican cuisine at our cooking event!",
      title: "Mexican cooking event",
      location: "Copenhagen, Denmark",
      date: /* @__PURE__ */ new Date("2024-01-03")
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1665394004212-0d014eb6da68?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 20,
      caption: "Experience the fusion of flavor and wellness at our gourmet cooking class for nutritious meals!",
      title: "A healthy meal for a healthy life",
      location: "Copenhagen, Denmark",
      date: /* @__PURE__ */ new Date("2024-01-04")
    },
    {
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 30,
      caption: "Brunch time! get ready to learn how to make the best brunch ever!",
      title: "Good brunch for good people",
      location: "Copenhagen, Denmark",
      date: /* @__PURE__ */ new Date("2024-01-06")
    }
  ];
  await mongoose3.models.Event.insertMany(events);
  let users = [
    {
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mail: "john@doe.dk",
      name: "John Doe",
      lastname: "Doe2",
      title: "Chef",
      password: "password"
    }
  ];
  await mongoose3.models.User.insertMany(users);
}

// app/entry.server.jsx
import { jsxDEV } from "react/jsx-dev-runtime";
connectDb();
await seedDb();
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isBotRequest(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 74,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 124,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData as useLoaderData2
} from "@remix-run/react";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-LLL3QT3G.css";

// app/components/Nav.jsx
import { NavLink } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Fragment, jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function Nav() {
  let user = useLoaderData(), [darkMode, setDarkMode] = useState(!1), [navOpen, setNavOpen] = useState(!1), toggleDarkMode = () => {
    setDarkMode(!darkMode), document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
  };
  return /* @__PURE__ */ jsxDEV2("nav", { children: [
    /* @__PURE__ */ jsxDEV2(NavLink, { className: "logo", to: "/events", children: "CK-EVENT" }, void 0, !1, {
      fileName: "app/components/Nav.jsx",
      lineNumber: 23,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2(FiMenu, { className: "burger", onClick: () => {
      setNavOpen(!navOpen);
    } }, void 0, !1, {
      fileName: "app/components/Nav.jsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    " ",
    /* @__PURE__ */ jsxDEV2("div", { className: `nav-links ${navOpen ? "open" : ""}`, id: "navLinks", children: [
      " ",
      /* @__PURE__ */ jsxDEV2(NavLink, { to: "/events", children: "Events" }, void 0, !1, {
        fileName: "app/components/Nav.jsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      !user.isAuthenticated && /* @__PURE__ */ jsxDEV2(NavLink, { to: "/signin", children: "Sign in" }, void 0, !1, {
        fileName: "app/components/Nav.jsx",
        lineNumber: 27,
        columnNumber: 35
      }, this),
      user.isAuthenticated && /* @__PURE__ */ jsxDEV2(Fragment, { children: [
        /* @__PURE__ */ jsxDEV2(NavLink, { to: "/add-event", children: "Add event" }, void 0, !1, {
          fileName: "app/components/Nav.jsx",
          lineNumber: 30,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV2(NavLink, { to: "/profile", children: "Profile" }, void 0, !1, {
          fileName: "app/components/Nav.jsx",
          lineNumber: 31,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Nav.jsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(
        "div",
        {
          className: "toggle-button",
          onClick: toggleDarkMode,
          onKeyDown: (e) => e.key === "Enter" && toggleDarkMode(),
          role: "button",
          tabIndex: 0,
          children: darkMode ? /* @__PURE__ */ jsxDEV2(FaSun, {}, void 0, !1, {
            fileName: "app/components/Nav.jsx",
            lineNumber: 41,
            columnNumber: 23
          }, this) : /* @__PURE__ */ jsxDEV2(FaMoon, {}, void 0, !1, {
            fileName: "app/components/Nav.jsx",
            lineNumber: 41,
            columnNumber: 35
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/Nav.jsx",
          lineNumber: 34,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/Nav.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Nav.jsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}

// app/services/auth.server.jsx
import { Authenticator, AuthorizationError } from "remix-auth";

// app/services/session.server.jsx
import { createCookieSessionStorage } from "@remix-run/node";
var sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    // any names can be used here
    sameSite: "lax",
    // this helps with CSRF
    path: "/",
    // all routes have access to the session
    httpOnly: !0,
    // for security reasons, make this cookie http only
    secrets: ["s3cr3t"],
    secure: !1
    // enable this in prod only
  }
}), { getSession, commitSession, destroySession } = sessionStorage;

// app/services/auth.server.jsx
import { FormStrategy } from "remix-auth-form";
import bcrypt2 from "bcrypt";
import mongoose4 from "mongoose";
var authenticator = new Authenticator(sessionStorage, {
  sessionErrorKey: "sessionErrorKey"
  // keep in sync
});
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let mail = form.get("mail"), password = form.get("password"), user = null;
    if (!mail || mail.trim().length === 0)
      throw new AuthorizationError("Bad Credentials: Email is required");
    if (!password || password.trim().length === 0)
      throw new AuthorizationError("Bad Credentials: Password is required");
    if (user = await verifyUser({ mail, password }), !user)
      throw new AuthorizationError("User not found");
    return console.log(user), user;
  }),
  "user-pass"
);
async function verifyUser({ mail, password }) {
  let user = await mongoose4.models.User.findOne({ mail }).select("+password");
  if (!user)
    throw new AuthorizationError("No user found with this email.");
  if (!await bcrypt2.compare(password, user.password))
    throw new AuthorizationError("Invalid password.");
  return user.password = void 0, user;
}

// app/root.jsx
import { json } from "@remix-run/node";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var links = () => [
  {
    rel: "stylesheet",
    href: tailwind_default
  }
];
function meta() {
  return [{ title: "Cooking Classes" }];
}
async function loader({ request }) {
  let user = await authenticator.isAuthenticated(request);
  return json({ isAuthenticated: !!user });
}
function App() {
  let user = useLoaderData2();
  return console.log(user), /* @__PURE__ */ jsxDEV3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 41,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { children: [
      /* @__PURE__ */ jsxDEV3(Nav, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 44,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 45,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 46,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 47,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV3(LiveReload, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 48,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 43,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.jsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/routes/events.$eventId.destroy.jsx
var events_eventId_destroy_exports = {};
__export(events_eventId_destroy_exports, {
  action: () => action
});
import { redirect } from "@remix-run/node";
import mongoose5 from "mongoose";
async function action({ params }) {
  return await mongoose5.models.Event.findByIdAndDelete(params.eventId).populate("user"), redirect("/events");
}

// app/routes/events.$eventId_.update.jsx
var events_eventId_update_exports = {};
__export(events_eventId_update_exports, {
  action: () => action2,
  default: () => UpdateEvent,
  loader: () => loader2
});
import { json as json2, redirect as redirect2 } from "@remix-run/node";
import { Form, useLoaderData as useLoaderData3, useNavigate } from "@remix-run/react";
import mongoose6 from "mongoose";
import { useState as useState2 } from "react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
async function loader2({ params, request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  });
  let event = await mongoose6.models.Event.findById(params.eventId).populate("user");
  return json2({ event });
}
function UpdateEvent() {
  let { event } = useLoaderData3(), [image, setImage] = useState2(event.image), navigate = useNavigate();
  function handleCancel() {
    navigate(-1);
  }
  return /* @__PURE__ */ jsxDEV4("div", { className: "page", children: [
    /* @__PURE__ */ jsxDEV4("h1", { children: "Update Post" }, void 0, !1, {
      fileName: "app/routes/events.$eventId_.update.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Form, { id: "event-form", method: "post", children: [
      /* @__PURE__ */ jsxDEV4("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxDEV4("div", { className: "form-column", children: [
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "title", children: "Title" }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 33,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { id: "title", name: "title", type: "text", defaultValue: event.title, placeholder: "Event Title..." }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 34,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "caption", children: "Caption" }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 36,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4(
            "input",
            {
              id: "caption",
              defaultValue: event.caption,
              name: "caption",
              type: "text",
              "aria-label": "caption",
              placeholder: "Write a caption..."
            },
            void 0,
            !1,
            {
              fileName: "app/routes/events.$eventId_.update.jsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "date", children: "Date" }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 46,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { id: "date", name: "date", type: "date", defaultValue: event.date }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 47,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "time", children: "Time" }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 49,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { id: "time", name: "time", type: "time", defaultValue: event.time }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 50,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 31,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "form-column", children: [
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "location", children: "Location" }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 55,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { id: "location", name: "location", type: "text", defaultValue: event.location, placeholder: "Event Location..." }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 56,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "image", children: "Image URL" }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 58,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4(
            "input",
            {
              name: "image",
              defaultValue: event.image,
              type: "url",
              onChange: (e) => setImage(e.target.value),
              placeholder: "Paste an image URL..."
            },
            void 0,
            !1,
            {
              fileName: "app/routes/events.$eventId_.update.jsx",
              lineNumber: 59,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "image-preview", children: "Image Preview" }, void 0, !1, {
            fileName: "app/routes/events.$eventId_.update.jsx",
            lineNumber: 67,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV4(
            "img",
            {
              id: "image-preview",
              className: "image-preview",
              src: image || "https://placehold.co/600x400?text=Paste+an+image+URL",
              alt: "Choose",
              onError: (e) => e.target.src = "https://placehold.co/600x400?text=Error+loading+image"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/events.$eventId_.update.jsx",
              lineNumber: 68,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 54,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/events.$eventId_.update.jsx",
        lineNumber: 30,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV4("input", { name: "uid", type: "text", defaultValue: event.uid, hidden: !0 }, void 0, !1, {
        fileName: "app/routes/events.$eventId_.update.jsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { className: "btns", children: [
        /* @__PURE__ */ jsxDEV4("button", { children: "Save" }, void 0, !1, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4("button", { type: "button", className: "btn-cancel", onClick: handleCancel, children: "Cancel" }, void 0, !1, {
          fileName: "app/routes/events.$eventId_.update.jsx",
          lineNumber: 82,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/events.$eventId_.update.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/events.$eventId_.update.jsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/events.$eventId_.update.jsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
async function action2({ request, params }) {
  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  }), eventToUpdate = await mongoose6.models.Event.findById(params.eventId);
  if (eventToUpdate.user.toString() !== authUser._id.toString())
    return redirect2(`/events/${params.eventId}`);
  let formData = await request.formData(), event = Object.fromEntries(formData);
  return eventToUpdate.caption = event.caption, eventToUpdate.image = event.image, eventToUpdate.location = event.location, eventToUpdate.time = event.time, eventToUpdate.date = event.date, eventToUpdate.title = event.title, await eventToUpdate.save(), redirect2(`/events/${params.eventId}`);
}

// app/routes/events.$eventId.jsx
var events_eventId_exports = {};
__export(events_eventId_exports, {
  action: () => action3,
  default: () => Event,
  loader: () => loader3
});
import { json as json3, redirect as redirect3 } from "@remix-run/node";
import { Form as Form2, useLoaderData as useLoaderData4 } from "@remix-run/react";
import mongoose7 from "mongoose";

// app/components/EventCard.jsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function EventCard({ event }) {
  return /* @__PURE__ */ jsxDEV5("article", { className: "event-card", children: [
    /* @__PURE__ */ jsxDEV5("h2", { children: event.title }, void 0, !1, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 4,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("img", { src: event.image, alt: event.caption }, void 0, !1, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 5,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("p", { children: [
      "Event by: ",
      event.user ? `${event.user.name} ${event.user.lastname}` : "Unknown"
    ] }, void 0, !0, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("h3", { children: event.caption }, void 0, !1, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("p", { children: [
      event.date,
      ", ",
      event.time
    ] }, void 0, !0, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("p", { children: event.location }, void 0, !1, {
      fileName: "app/components/EventCard.jsx",
      lineNumber: 9,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/EventCard.jsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/routes/events.$eventId.jsx
import { Link } from "react-router-dom";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
async function loader3({ request, params }) {
  let authUser = null;
  try {
    authUser = await authenticator.isAuthenticated(request);
  } catch (error) {
    console.error(error);
  }
  let event = await mongoose7.models.Event.findById(params.eventId).populate("user").populate("attendees").populate({
    path: "comments.user",
    model: "User"
  }).exec(), similarEvents = await mongoose7.models.Event.find({ user: event.user._id }).populate("user").limit(5).exec();
  return json3({ event, authUser, similarEvents });
}
function Event() {
  let { event, authUser, similarEvents } = useLoaderData4();
  console.log("EVENT", event);
  function confirmDelete(event2) {
    confirm("Please confirm you want to delete this post event.") || event2.preventDefault();
  }
  return /* @__PURE__ */ jsxDEV6("div", { id: "event-page", className: "page page2", children: [
    /* @__PURE__ */ jsxDEV6("div", { className: "column1", children: [
      /* @__PURE__ */ jsxDEV6(EventCard, { event }, void 0, !1, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 48,
        columnNumber: 7
      }, this),
      authUser && authUser._id === event.user._id && /* @__PURE__ */ jsxDEV6("div", { className: "btns", children: [
        /* @__PURE__ */ jsxDEV6(Form2, { action: "update", children: /* @__PURE__ */ jsxDEV6("button", { children: "Update" }, void 0, !1, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 52,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Form2, { action: "destroy", method: "post", onSubmit: confirmDelete, children: /* @__PURE__ */ jsxDEV6("button", { children: "Delete" }, void 0, !1, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 54,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/events.$eventId.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { className: "column2", children: [
      /* @__PURE__ */ jsxDEV6("div", { className: "att-main", children: [
        /* @__PURE__ */ jsxDEV6("div", { className: "attend-container", children: [
          /* @__PURE__ */ jsxDEV6("h2", { children: "Join Now: Get Involved in This Event!" }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 66,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV6("p", { children: "Get ready to tantalize your taste buds! Whether you are a seasoned chef or just love good food, join our thrilling cooking event now!" }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 67,
            columnNumber: 9
          }, this),
          authUser && event.attendees && !event.attendees.includes(authUser._id) && /* @__PURE__ */ jsxDEV6(Form2, { action: "", method: "post", children: /* @__PURE__ */ jsxDEV6("button", { children: "Join here" }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 69,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 65,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV6("ul", { className: "att-outcome", children: [
          /* @__PURE__ */ jsxDEV6("h2", { children: "Attendees" }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 75,
            columnNumber: 9
          }, this),
          event.attendees && event.attendees.map((user) => /* @__PURE__ */ jsxDEV6("li", { children: [
            user.name,
            " ",
            user.lastname
          ] }, user._id, !0, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 77,
            columnNumber: 11
          }, this))
        ] }, void 0, !0, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 74,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 63,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "comment-section", children: [
        /* @__PURE__ */ jsxDEV6("h2", { children: "Comments" }, void 0, !1, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 85,
          columnNumber: 9
        }, this),
        authUser && /* @__PURE__ */ jsxDEV6(Form2, { action: "", method: "post", children: [
          /* @__PURE__ */ jsxDEV6("textarea", { name: "content", required: !0 }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 88,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV6("button", { type: "submit", children: "Post Comment" }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 89,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6("ul", { className: "comment-outcome-ul", children: event.comments.map((comment, index) => /* @__PURE__ */ jsxDEV6("li", { className: "comment-info", children: [
          /* @__PURE__ */ jsxDEV6("p", { children: comment.content }, void 0, !1, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 95,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("p", { children: [
            "Posted by: ",
            comment.user ? `${comment.user.name}` : "Unknown"
          ] }, void 0, !0, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 96,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("p", { style: { textAlign: "end" }, children: [
            "Posted at: ",
            new Date(comment.createdAt).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/events.$eventId.jsx",
            lineNumber: 97,
            columnNumber: 15
          }, this)
        ] }, index, !0, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 94,
          columnNumber: 13
        }, this)) }, void 0, !1, {
          fileName: "app/routes/events.$eventId.jsx",
          lineNumber: 92,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 84,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/events.$eventId.jsx",
      lineNumber: 62,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { className: "similar-events-main", children: [
      /* @__PURE__ */ jsxDEV6("h2", { className: "s-h2", children: "Similar Events" }, void 0, !1, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "similar-events", children: similarEvents.map((similarEvent) => /* @__PURE__ */ jsxDEV6(Link, { to: `/events/${similarEvent._id}`, children: /* @__PURE__ */ jsxDEV6(EventCard, { event: similarEvent }, void 0, !1, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 109,
        columnNumber: 15
      }, this) }, similarEvent._id, !1, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 108,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "app/routes/events.$eventId.jsx",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/events.$eventId.jsx",
      lineNumber: 104,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/events.$eventId.jsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
}
async function action3({ request, params }) {
  let authUser = (await sessionStorage.getSession(request.headers.get("Cookie"))).get("user"), eventId = params.eventId;
  if (!authUser)
    return redirect3("/login");
  let User = mongoose7.models.User, Event2 = mongoose7.models.Event, user = await User.findById(authUser._id), event = await Event2.findById(eventId);
  if (request.method === "POST") {
    let content = (await request.formData()).get("content");
    if (content) {
      let Comment = mongoose7.models.Comment, comment = new Comment({ content, user: authUser._id, event: eventId });
      await comment.save(), event.comments.push(comment), await event.save();
    }
  }
  return event.attendees && !event.attendees.includes(authUser._id) && (event.attendees.push(authUser._id), await event.save()), user.eventsAttending && !user.eventsAttending.includes(eventId) && (user.eventsAttending.push(eventId), await user.save()), redirect3(`/events/${eventId}`);
}

// app/routes/events._index.jsx
var events_index_exports = {};
__export(events_index_exports, {
  default: () => Index,
  loader: () => loader4
});
import { json as json4 } from "@remix-run/node";
import { Link as Link2, useLoaderData as useLoaderData5, useSearchParams } from "@remix-run/react";
import mongoose8 from "mongoose";
import { useState as useState3 } from "react";
import { Form as Form3 } from "@remix-run/react";
import { useEffect } from "react";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
async function loader4({ request }) {
  let url = new URL(request.url), searchQuery = new URLSearchParams(url.search).get("search") || "", query = {};
  searchQuery && (query = {
    $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { date: { $regex: searchQuery, $options: "i" } },
      { location: { $regex: searchQuery, $options: "i" } }
    ]
  });
  let events = await mongoose8.models.Event.find(query).populate("user").sort({ createdAt: -1 }).exec();
  return json4({ events });
}
function Index() {
  let { events } = useLoaderData5(), [searchParams, setSearchParams] = useSearchParams(), searchQuery = searchParams.get("search") || "", [isLoading, setIsLoading] = useState3(!1), handleSearch = (event) => {
    event.preventDefault();
    let searchValue = event.target.elements.search.value;
    searchValue.trim() !== "" && setIsLoading(!0), setSearchParams({ search: searchValue });
  }, handleInputChange = (event) => {
    let searchValue = event.target.value;
    searchValue.trim() !== "" && setIsLoading(!0), setSearchParams({ search: searchValue });
  };
  return useEffect(() => {
    setIsLoading(!1);
  }, [searchQuery]), /* @__PURE__ */ jsxDEV7("div", { className: "page page1", children: [
    /* @__PURE__ */ jsxDEV7("div", { className: "hero-image", children: [
      /* @__PURE__ */ jsxDEV7("img", { src: "https://images.unsplash.com/photo-1554998171-89445e31c52b?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hero" }, void 0, !1, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 77,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "hero-text", children: [
        /* @__PURE__ */ jsxDEV7("h1", { children: "Cooking Events" }, void 0, !1, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 79,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV7("p", { children: "Embark on a flavorful adventure as we travel the world through its diverse cuisines. From spicy Thai curries to hearty Italian pastas, join us in creating culinary delights from every corner of the globe." }, void 0, !1, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 80,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 78,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 76,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "page", children: [
      /* @__PURE__ */ jsxDEV7(Form3, { onSubmit: handleSearch, children: /* @__PURE__ */ jsxDEV7("div", { className: "searchbar-container", children: [
        /* @__PURE__ */ jsxDEV7("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxDEV7(
            "input",
            {
              className: `searchbar ${isLoading ? "loading" : ""}`,
              type: "text",
              name: "search",
              defaultValue: searchQuery,
              placeholder: "Search events...",
              onChange: handleInputChange
            },
            void 0,
            !1,
            {
              fileName: "app/routes/events._index.jsx",
              lineNumber: 88,
              columnNumber: 25
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7("div", { id: "search-spinner", "aria-hidden": !0, hidden: !isLoading }, void 0, !1, {
            fileName: "app/routes/events._index.jsx",
            lineNumber: 96,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 87,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV7("button", { type: "submit", className: "btn-search", children: "Search" }, void 0, !1, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 98,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 86,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 85,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7("section", { className: "grid", children: events.map((event) => /* @__PURE__ */ jsxDEV7(Link2, { className: "event-link", to: `${event._id}`, children: /* @__PURE__ */ jsxDEV7(EventCard, { event }, void 0, !1, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 104,
        columnNumber: 25
      }, this) }, event._id, !1, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 103,
        columnNumber: 21
      }, this)) }, void 0, !1, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 101,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 83,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/events._index.jsx",
    lineNumber: 75,
    columnNumber: 9
  }, this);
}

// app/routes/add-event.jsx
var add_event_exports = {};
__export(add_event_exports, {
  action: () => action4,
  default: () => AddEvent,
  loader: () => loader5,
  meta: () => meta2
});
import { redirect as redirect4 } from "@remix-run/node";
import { Form as Form4, useNavigate as useNavigate2 } from "@remix-run/react";
import mongoose9 from "mongoose";
import { useState as useState4 } from "react";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var meta2 = () => [{ title: "Cooking classes - Add New Event" }];
async function loader5({ request }) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  });
}
function AddEvent() {
  let [image, setImage] = useState4("https://placehold.co/600x400?text=Add+your+amazing+image"), navigate = useNavigate2();
  function handleCancel() {
    navigate(-1);
  }
  return /* @__PURE__ */ jsxDEV8("div", { className: "page", children: [
    /* @__PURE__ */ jsxDEV8("h1", { children: "Add an Event" }, void 0, !1, {
      fileName: "app/routes/add-event.jsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(Form4, { id: "event-form", method: "post", children: [
      /* @__PURE__ */ jsxDEV8("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxDEV8("div", { className: "form-column", children: [
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "title", children: "Title" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 35,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { id: "title", name: "title", type: "text", placeholder: "Event Title..." }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 36,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "caption", children: "Caption" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 38,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { id: "caption", name: "caption", type: "text", "aria-label": "caption", placeholder: "Write a caption..." }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 39,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "date", children: "Date" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 41,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { id: "date", name: "date", type: "date" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 42,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "time", children: "Time" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 44,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { id: "time", name: "time", type: "time" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 45,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 33,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV8("div", { className: "form-column", children: [
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "location", children: "Location" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 49,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { id: "location", name: "location", type: "text", placeholder: "Event Location..." }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 50,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "image", children: "Image URL" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 52,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { name: "image", type: "url", onChange: (e) => setImage(e.target.value), placeholder: "Paste an image URL..." }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 53,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "image-preview", children: "Image Preview" }, void 0, !1, {
            fileName: "app/routes/add-event.jsx",
            lineNumber: 55,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8(
            "img",
            {
              id: "image-preview",
              className: "image-preview",
              src: image || "https://placehold.co/600x400?text=Paste+an+image+URL",
              alt: "Choose",
              onError: (e) => e.target.src = "https://placehold.co/600x400?text=Error+loading+image"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/add-event.jsx",
              lineNumber: 56,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 48,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/add-event.jsx",
        lineNumber: 32,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV8("div", { className: "btns", children: [
        /* @__PURE__ */ jsxDEV8("button", { children: "Save" }, void 0, !1, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 67,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV8("button", { type: "button", className: "btn-cancel", onClick: handleCancel, children: "Cancel" }, void 0, !1, {
          fileName: "app/routes/add-event.jsx",
          lineNumber: 68,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/add-event.jsx",
        lineNumber: 66,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/add-event.jsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/add-event.jsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}
async function action4({ request }) {
  let formData = await request.formData(), event = Object.fromEntries(formData), user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  });
  return console.log(user), event.user = user._id, await mongoose9.models.Event.create(event), redirect4("/events");
}

// app/routes/profile.jsx
var profile_exports = {};
__export(profile_exports, {
  action: () => action5,
  default: () => Profile,
  loader: () => loader6
});
import { Form as Form5, useLoaderData as useLoaderData6 } from "@remix-run/react";
import mongoose10 from "mongoose";
import { json as json5 } from "@remix-run/node";
import { redirect as redirect5 } from "@remix-run/node";
import { Link as Link3 } from "react-router-dom";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
async function loader6({ request }) {
  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  }), user = await mongoose10.models.User.findById(authUser._id).populate("eventsAttending"), events = await mongoose10.models.Event.find({ user: user._id }).populate("user").exec();
  return json5({ user, events });
}
function Profile() {
  let { user, events } = useLoaderData6();
  return console.log(user), /* @__PURE__ */ jsxDEV9("div", { className: "page profileIntro", children: [
    /* @__PURE__ */ jsxDEV9("h1", { children: "Profile" }, void 0, !1, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "profile-container", children: [
      /* @__PURE__ */ jsxDEV9("div", { children: /* @__PURE__ */ jsxDEV9("p", { className: "profileP", children: [
        "Name: ",
        user.name,
        " ",
        user.lastname,
        " ",
        /* @__PURE__ */ jsxDEV9("br", {}, void 0, !1, {
          fileName: "app/routes/profile.jsx",
          lineNumber: 37,
          columnNumber: 47
        }, this),
        "Mail: ",
        user.mail
      ] }, void 0, !0, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 36,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Form5, { method: "post", children: /* @__PURE__ */ jsxDEV9("button", { children: "Log out" }, void 0, !1, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("h2", { className: "profile-header2", children: "My added events" }, void 0, !1, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "profile-event", children: events.map((event) => /* @__PURE__ */ jsxDEV9(Link3, { to: `/events/${event._id}`, children: /* @__PURE__ */ jsxDEV9(EventCard, { event }, void 0, !1, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 53,
      columnNumber: 11
    }, this) }, event._id, !1, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 52,
      columnNumber: 9
    }, this)) }, void 0, !1, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { id: "events-attending", children: [
      /* @__PURE__ */ jsxDEV9("h2", { className: "profile-header2", children: "Events Attending" }, void 0, !1, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("ul", { className: "profile-event-attendings", children: user.eventsAttending.map((event) => /* @__PURE__ */ jsxDEV9("li", { className: "li-attendingsProfile", children: [
        /* @__PURE__ */ jsxDEV9(Link3, { to: `/events/${event._id}`, children: [
          /* @__PURE__ */ jsxDEV9("h2", { children: event.title }, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 65,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV9("br", {}, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 66,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV9("img", { src: event.image, alt: event.title }, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 67,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV9("br", {}, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 68,
            columnNumber: 17
          }, this),
          event.caption,
          /* @__PURE__ */ jsxDEV9("br", {}, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 70,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV9("br", {}, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 71,
            columnNumber: 17
          }, this),
          event.date,
          ", ",
          event.time,
          ", ",
          event.location
        ] }, void 0, !0, {
          fileName: "app/routes/profile.jsx",
          lineNumber: 64,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV9(Form5, { method: "post", children: [
          /* @__PURE__ */ jsxDEV9("input", { type: "hidden", name: "eventId", value: event._id }, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 75,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV9("button", { type: "submit", className: "cancelAt", children: "Cancel" }, void 0, !1, {
            fileName: "app/routes/profile.jsx",
            lineNumber: 76,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/profile.jsx",
          lineNumber: 74,
          columnNumber: 15
        }, this)
      ] }, event._id, !0, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 63,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "app/routes/profile.jsx",
        lineNumber: 61,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("br", {}, void 0, !1, {
      fileName: "app/routes/profile.jsx",
      lineNumber: 83,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/profile.jsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}
async function action5({ request }) {
  let body = new URLSearchParams(await request.text());
  if (body.has("eventId")) {
    let eventId = body.get("eventId"), authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin"
    }), User = mongoose10.models.User, Event2 = mongoose10.models.Event, user = await User.findById(authUser._id), event = await Event2.findById(eventId);
    return user.eventsAttending = user.eventsAttending.filter((id) => id.toString() !== eventId), await user.save(), event.attendees && (event.attendees = event.attendees.filter((attendeeId) => attendeeId.toString() !== authUser._id.toString()), await event.save()), redirect5("/profile");
  }
  await authenticator.logout(request, { redirectTo: "/signin" });
}

// app/routes/signin.jsx
var signin_exports = {};
__export(signin_exports, {
  action: () => action6,
  default: () => SignIn,
  loader: () => loader7
});
import { Form as Form6, useLoaderData as useLoaderData7, NavLink as NavLink2 } from "@remix-run/react";
import { json as json6 } from "@remix-run/node";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
async function loader7({ request }) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/events"
  });
  let error = (await sessionStorage.getSession(request.headers.get("Cookie"))).get("sessionErrorKey");
  return json6({ error });
}
function SignIn() {
  let loaderData = useLoaderData7();
  return console.log("loaderData", loaderData), /* @__PURE__ */ jsxDEV10("div", { id: "sign-in-page", className: "page", children: [
    /* @__PURE__ */ jsxDEV10("h1", { children: "Sign In" }, void 0, !1, {
      fileName: "app/routes/signin.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10("div", { className: "form-container", children: [
      /* @__PURE__ */ jsxDEV10(Form6, { id: "sign-in-form", method: "post", children: [
        /* @__PURE__ */ jsxDEV10("label", { htmlFor: "mail", children: "Mail" }, void 0, !1, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 28,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV10(
          "input",
          {
            id: "mail",
            type: "email",
            name: "mail",
            "aria-label": "mail",
            placeholder: "Type your mail...",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signin.jsx",
            lineNumber: 29,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDEV10("label", { htmlFor: "password", children: "Password" }, void 0, !1, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 36,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV10(
          "input",
          {
            id: "password",
            type: "password",
            name: "password",
            "aria-label": "password",
            placeholder: "Type your password...",
            autoComplete: "current-password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signin.jsx",
            lineNumber: 37,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDEV10("div", { className: "btns", children: /* @__PURE__ */ jsxDEV10("button", { className: "signinbtn", children: "Sign In" }, void 0, !1, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 46,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 45,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV10("div", { className: "error-message", children: loaderData?.error ? /* @__PURE__ */ jsxDEV10("p", { children: loaderData?.error?.message }, void 0, !1, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 48,
          columnNumber: 61
        }, this) : null }, void 0, !1, {
          fileName: "app/routes/signin.jsx",
          lineNumber: 48,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 27,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV10("img", { src: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "food img" }, void 0, !1, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 50,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signin.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10("p", { style: { textAlign: "center" }, children: [
      "If you do not have an account then sign up here: ",
      /* @__PURE__ */ jsxDEV10(NavLink2, { to: "/signup", children: /* @__PURE__ */ jsxDEV10("b", { children: "Sign up here" }, void 0, !1, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 54,
        columnNumber: 80
      }, this) }, void 0, !1, {
        fileName: "app/routes/signin.jsx",
        lineNumber: 54,
        columnNumber: 58
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signin.jsx",
      lineNumber: 53,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/signin.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
async function action6({ request }) {
  return console.log("handle"), await authenticator.authenticate("user-pass", request, {
    successRedirect: "/events",
    failureRedirect: "/signin"
  });
}

// app/routes/signup.jsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action7,
  default: () => SignUp,
  loader: () => loader8
});
import { json as json7, redirect as redirect6 } from "@remix-run/node";
import { Form as Form7, NavLink as NavLink3, useLoaderData as useLoaderData8 } from "@remix-run/react";
import mongoose11 from "mongoose";
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
async function loader8({ request }) {
  let error = (await sessionStorage.getSession(request.headers.get("Cookie"))).get("sessionErrorKey");
  return json7({ error });
}
function SignUp() {
  let loaderData = useLoaderData8();
  return console.log("loaderData", loaderData), /* @__PURE__ */ jsxDEV11("div", { id: "sign-up-page", className: "page", children: [
    /* @__PURE__ */ jsxDEV11("h1", { children: "Sign Up" }, void 0, !1, {
      fileName: "app/routes/signup.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV11(Form7, { id: "sign-up-form", method: "post", children: [
      /* @__PURE__ */ jsxDEV11("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxDEV11("div", { className: "input-field", children: [
          /* @__PURE__ */ jsxDEV11("label", { htmlFor: "name", children: "Name" }, void 0, !1, {
            fileName: "app/routes/signup.jsx",
            lineNumber: 26,
            columnNumber: 10
          }, this),
          /* @__PURE__ */ jsxDEV11(
            "input",
            {
              id: "name",
              type: "text",
              name: "name",
              "aria-label": "name",
              placeholder: "Type your name...",
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/signup.jsx",
              lineNumber: 27,
              columnNumber: 10
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/signup.jsx",
          lineNumber: 25,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV11("div", { className: "input-field", children: [
          /* @__PURE__ */ jsxDEV11("label", { htmlFor: "lastname", children: "Last Name" }, void 0, !1, {
            fileName: "app/routes/signup.jsx",
            lineNumber: 36,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV11(
            "input",
            {
              id: "lastname",
              type: "text",
              name: "lastname",
              "aria-label": "lastname",
              placeholder: "Type your last name...",
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/signup.jsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/signup.jsx",
          lineNumber: 35,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 24,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV11("label", { htmlFor: "mail", children: "Mail" }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11(
        "input",
        {
          id: "mail",
          type: "email",
          name: "mail",
          "aria-label": "mail",
          placeholder: "Type your mail...",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.jsx",
          lineNumber: 47,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV11("label", { htmlFor: "password", children: "Password" }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11(
        "input",
        {
          id: "password",
          type: "password",
          name: "password",
          "aria-label": "password",
          placeholder: "Type your password...",
          autoComplete: "current-password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.jsx",
          lineNumber: 55,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV11("div", { className: "btns", children: /* @__PURE__ */ jsxDEV11("button", { children: "Sign up" }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 63,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { className: "error-message", children: loaderData?.error ? /* @__PURE__ */ jsxDEV11("p", { children: loaderData?.error?.message }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 65,
        columnNumber: 63
      }, this) : null }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 65,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV11("p", { style: { textAlign: "center" }, children: [
      "Already have an account? ",
      /* @__PURE__ */ jsxDEV11(NavLink3, { to: "/signin", children: /* @__PURE__ */ jsxDEV11("b", { children: "Sign in here." }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 68,
        columnNumber: 56
      }, this) }, void 0, !1, {
        fileName: "app/routes/signup.jsx",
        lineNumber: 68,
        columnNumber: 34
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.jsx",
      lineNumber: 67,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/signup.jsx",
    lineNumber: 20,
    columnNumber: 7
  }, this);
}
async function action7({ request }) {
  let formData = await request.formData(), newUser = Object.fromEntries(formData);
  if (!newUser.mail || !newUser.mail.trim().includes("@") || !newUser.mail.trim().includes(".")) {
    let session = await sessionStorage.getSession(request.headers.get("Cookie"));
    session.set("sessionErrorKey", { message: "Invalid email address" });
    let cookie = await sessionStorage.commitSession(session);
    return redirect6("/signup", { headers: { "Set-Cookie": cookie } });
  }
  if (!newUser.password || newUser.password.trim().length < 8 || !/[a-z]/i.test(newUser.password.trim()) || !/[0-9]/.test(newUser.password.trim())) {
    let session = await sessionStorage.getSession(request.headers.get("Cookie"));
    session.set("sessionErrorKey", { message: "Password must be at least 8 characters long and contain at least one letter and one number" });
    let cookie = await sessionStorage.commitSession(session);
    return redirect6("/signup", { headers: { "Set-Cookie": cookie } });
  }
  return await mongoose11.models.User.create(newUser) ? redirect6("/signin") : redirect6("/signup");
}

// app/routes/_index.jsx
var index_exports = {};
__export(index_exports, {
  loader: () => loader9,
  meta: () => meta3
});
import { redirect as redirect7 } from "@remix-run/node";
var meta3 = () => [{ title: "Cooking classes" }];
async function loader9() {
  return redirect7("/events");
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-TI2CDGZI.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-6IXSECH5.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-QHXNCULF.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-RKQR3CTL.js", imports: ["/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-FW7M6VLH.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/add-event": { id: "routes/add-event", parentId: "root", path: "add-event", index: void 0, caseSensitive: void 0, module: "/build/routes/add-event-5G3ZKJLZ.js", imports: ["/build/_shared/chunk-SARLQUTN.js", "/build/_shared/chunk-5DGVIEP4.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/events.$eventId": { id: "routes/events.$eventId", parentId: "root", path: "events/:eventId", index: void 0, caseSensitive: void 0, module: "/build/routes/events.$eventId-2S2HYZOV.js", imports: ["/build/_shared/chunk-QUYRSHBJ.js", "/build/_shared/chunk-MBJ5RI2F.js", "/build/_shared/chunk-SARLQUTN.js", "/build/_shared/chunk-5DGVIEP4.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/events.$eventId.destroy": { id: "routes/events.$eventId.destroy", parentId: "routes/events.$eventId", path: "destroy", index: void 0, caseSensitive: void 0, module: "/build/routes/events.$eventId.destroy-2JO335JF.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/events.$eventId_.update": { id: "routes/events.$eventId_.update", parentId: "root", path: "events/:eventId/update", index: void 0, caseSensitive: void 0, module: "/build/routes/events.$eventId_.update-PKYALSWW.js", imports: ["/build/_shared/chunk-SARLQUTN.js", "/build/_shared/chunk-5DGVIEP4.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/events._index": { id: "routes/events._index", parentId: "root", path: "events", index: !0, caseSensitive: void 0, module: "/build/routes/events._index-LXUVV6UH.js", imports: ["/build/_shared/chunk-MBJ5RI2F.js", "/build/_shared/chunk-5DGVIEP4.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/profile": { id: "routes/profile", parentId: "root", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/profile-2YW3PTNI.js", imports: ["/build/_shared/chunk-MBJ5RI2F.js", "/build/_shared/chunk-SARLQUTN.js", "/build/_shared/chunk-5DGVIEP4.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/signin": { id: "routes/signin", parentId: "root", path: "signin", index: void 0, caseSensitive: void 0, module: "/build/routes/signin-43ZK3O5Y.js", imports: ["/build/_shared/chunk-QUYRSHBJ.js", "/build/_shared/chunk-SARLQUTN.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-G3LTTYAL.js", imports: ["/build/_shared/chunk-QUYRSHBJ.js", "/build/_shared/chunk-5DGVIEP4.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "85709d0c", hmr: { runtime: "/build/_shared\\chunk-QHXNCULF.js", timestamp: 1710283853635 }, url: "/build/manifest-85709D0C.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/events.$eventId.destroy": {
    id: "routes/events.$eventId.destroy",
    parentId: "routes/events.$eventId",
    path: "destroy",
    index: void 0,
    caseSensitive: void 0,
    module: events_eventId_destroy_exports
  },
  "routes/events.$eventId_.update": {
    id: "routes/events.$eventId_.update",
    parentId: "root",
    path: "events/:eventId/update",
    index: void 0,
    caseSensitive: void 0,
    module: events_eventId_update_exports
  },
  "routes/events.$eventId": {
    id: "routes/events.$eventId",
    parentId: "root",
    path: "events/:eventId",
    index: void 0,
    caseSensitive: void 0,
    module: events_eventId_exports
  },
  "routes/events._index": {
    id: "routes/events._index",
    parentId: "root",
    path: "events",
    index: !0,
    caseSensitive: void 0,
    module: events_index_exports
  },
  "routes/add-event": {
    id: "routes/add-event",
    parentId: "root",
    path: "add-event",
    index: void 0,
    caseSensitive: void 0,
    module: add_event_exports
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/signin": {
    id: "routes/signin",
    parentId: "root",
    path: "signin",
    index: void 0,
    caseSensitive: void 0,
    module: signin_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
