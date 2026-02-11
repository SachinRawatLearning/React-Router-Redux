import { Link, Outlet } from "react-router-dom";
//Outlet defined in which order the child routes will be rendered. It is a placeholder component that renders the matching child route's element when the parent route is active. When a parent route is matched, the Outlet component will render the corresponding child route's element based on the current URL. This allows for nested routing and helps in organizing the application's structure by defining parent-child relationships between routes.
const Dashboard = () => {
  return (
    <>
      <nav>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/users">Users</Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Dashboard;
