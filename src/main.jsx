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
import WebWorkerComponent from "./WebWorkerComponent.jsx";
import FibonacciComponent from "./Fibonacci.jsx";
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
      {
        path: "webworkers",
        element: <WebWorkerComponent />,
      },
      {
        path: "fibonacci",
        element: <FibonacciComponent />,
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
import usersReducer from "./usersSlice";
import { ThemeProvider } from "./ThemeProvider.jsx";
const store = configureStore({
  reducer: { counterReducer, usersReducer },
});
//----------------------------
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
//A provider is a component that contains a context and puts children components inside it. The provider component is responsible for providing the context value to its child components. It allows the child components to access and consume the context value without having to pass it down through props at every level of the component tree. By wrapping the application with a provider, you can make the context value available to all components within that provider's subtree, enabling them to access and use the shared data or functionality provided by the context.
