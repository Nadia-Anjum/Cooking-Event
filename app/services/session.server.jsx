// app/services/session.server.jsx
import { createCookieSessionStorage } from "@remix-run/node";

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // any names can be used here
    sameSite: "lax", // this helps with CSRF
    path: "/", // all routes have access to the session
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["s3cr3t"], 
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

// export the functions individually
export let { getSession, commitSession, destroySession } = sessionStorage;