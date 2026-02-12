import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
const Login = () => {
  const navigate = useNavigate(); // Communicate with router provider to tell which route to navigate to
  const { theme, toggleTheme } = useTheme();
  const login = () => {
    //TO DO: Get the token from server and save it in local storage
    localStorage.setItem("token", "1234567890"); //Local storage is available across all tabs and windows of the same origin. It is a simple key-value store that allows you to save data in the browser. The data stored in local storage is persistent, meaning it will remain even after the browser is closed and reopened. It only deletes data when the user explicitly clears it or when the browser's storage limit is exceeded. Local storage is commonly used for storing user preferences, authentication tokens, and other data that needs to persist across sessions.
    localStorage.setItem("roleName", "admin"); //Set role as admin, editor or viewer to test the role based access control
    navigate("/dashboard");
  };

  return (
    <>
      <div className={`app-container ${theme === "dark" ? "dark-theme" : ""}`}>
        <div>
          <label>Username</label>
          <div>
            <input type="text" />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input type="text" />
          </div>
        </div>
        <div>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
