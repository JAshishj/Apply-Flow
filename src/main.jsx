import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import { AppProvider } from "./Context/Application_Context";
import Dashboard from "./Pages/Dashboard";
import Applications from "./Pages/Applications";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/Applications", element: <Applications /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
