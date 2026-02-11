import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Settings from "./Settings.jsx";
import Users from "./Users.jsx";
import Unauthorized from "./Unauthorized.jsx";

const requireAuth = () => {
  if (localStorage.getItem("token") === "1234567890") {
    return null;
  }
  throw redirect("/login");
};

// const roles = ["admin", "editor", "viewer"];
// const componentsForRoles = [
//   { componentName: "settings", roleName: ["admin", "editor"] },
//   { componentName: "users", roleName: ["admin", "viewer"] },
// ];

// const requireRole = (componentName) => {
//   const role = localStorage.getItem("role");
//   const component = componentsForRoles.find(
//     (component) => component.componentName === componentName,
//   );
//   const reqRole = component.roleName.find((roleName) => roleName === role);

//   if (reqRole) return;
//   else return redirect("/unauthorized");
// };

const roles = ["admin", "editor", "viewer"];

const componentsForRoles = [
  { componentName: "settings", roles: ["admin", "editor"] },
  { componentName: "users", roles: ["admin", "viewer"] },
];

const requireRole = (componentName) => {
  return () => {
    const roleName = localStorage.getItem("roleName");
    const component = componentsForRoles.find(
      (c) => c.componentName === componentName,
    );

    if (!component) {
      throw redirect("/unauthorized");
    }

    const hasRole = component.roles.includes(roleName);
    if (hasRole) {
      return null;
    }

    throw redirect("/unauthorized");
  };
};

const router = createBrowserRouter([
  { path: "/", element: <App />, loader: requireAuth },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: requireAuth,
    children: [
      {
        path: "settings",
        element: <Settings />,
        loader: requireRole("settings"),
      },
      {
        path: "users",
        element: <Users />,
        loader: requireRole("users"),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

//----------------------------
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import counterReducer from "./counterSlice";
const store = configureStore({
  reducer: { counterReducer },
});
//----------------------------
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
