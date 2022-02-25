import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

import styles from './styles/app.css'
import NavBar from "./components/NavBar";

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-11/12 mx-auto bg-neutral-200 h-screen flex flex-col">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <NavBar />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
