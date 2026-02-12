// import { Link, Outlet, NavLink } from "react-router-dom";
// //Outlet defined in which order the child routes will be rendered. It is a placeholder component that renders the matching child route's element when the parent route is active. When a parent route is matched, the Outlet component will render the corresponding child route's element based on the current URL. This allows for nested routing and helps in organizing the application's structure by defining parent-child relationships between routes.
// function Dashboard() {
//   return (
//     <>
//       <nav>
//         <NavLink
//           className={({ isActive }) => isActive && "active-link"}
//           to="/dashboard/settings"
//         >
//           Settings
//         </NavLink>
//         <NavLink
//           className={({ isActive }) => isActive && "active-link"}
//           to="/dashboard/users"
//         >
//           Users
//         </NavLink>
//         <NavLink
//           className={({ isActive }) => isActive && "active-link"}
//           to="/dashboard/webworkers"
//         >
//           Web Worker
//         </NavLink>
//       </nav>

//       <Outlet />
//     </>
//   );
// }

// // const Dashboard = () => {
// //   return (
// //     <>
// //       <nav>
// //         <Link to="/dashboard/settings">Settings</Link>
// //         <Link to="/dashboard/users">Users</Link>
// //       </nav>

// //       <Outlet />
// //     </>
// //   );
// // };

// export default Dashboard;
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
//Outlet defined in which order the child routes will be rendered. It is a placeholder component that renders the matching child route's element when the parent route is active. When a parent route is matched, the Outlet component will render the corresponding child route's element based on the current URL. This allows for nested routing and helps in organizing the application's structure by defining parent-child relationships between routes.
import { useTheme } from "./ThemeProvider";

function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  //const [theme, setTheme] = useState("light");

  // const toggleTheme = () => {
  //   setTheme((theme) => (theme === "light" ? "dark" : "light"));
  // };
  return (
    <>
      <div className={`app-container ${theme === "dark" ? "dark-theme" : ""}`}>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <nav>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to="/dashboard/settings"
          >
            Settings
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to="/dashboard/users"
          >
            User
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to="/dashboard/webworkers"
          >
            Web Worker
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to="/dashboard/fibonacci"
          >
            Fibonacci
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
