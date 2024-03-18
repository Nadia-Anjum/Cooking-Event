import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import Nav from "./components/Nav";
import { authenticator } from "./services/auth.server";
import { json } from "@remix-run/node";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function meta() {
  return [{ title: "Cooking Classes" }];
}

export async function loader({ request }) {
  const user = await authenticator.isAuthenticated(request);
  return json({ isAuthenticated: !!user});
}

export default function App() {
  const user = useLoaderData();
  console.log(user);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
            <Nav />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
    </html>
  );
}
