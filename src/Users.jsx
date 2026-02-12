import { useSelector, useDispatch } from "react-redux";
import { addUsers } from "./usersSlice";
import { useTheme } from "./ThemeProvider";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

function getUserDetailsHTML(user) {
  let html = "";
  function recursiveHelper(user) {
    for (let key in user) {
      if (typeof user[key] === "object" && !Array.isArray(user[key])) {
        recursiveHelper(user[key]);
      } else {
        html += `<div>${key}: ${user[key]}</div>`;
      }
    }
  }
  recursiveHelper(user);
  return html;
}

const Users = () => {
  const users = useSelector((state) => state.usersReducer.users);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  let { id } = useParams(); //take params from the url based on what is defined in routes. In this case, it is users/:id. So, it will take the id from the url and store it in the id variable. For example, if the url is /dashboard/users/1, then id will be 1.
  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id == id);
      setUserDetails(user);
    }
  }, [id]);
  const getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => dispatch(addUsers(data)));
  };
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <br />

      <div></div>

      <br />

      <button onClick={getUsers}>Get Users </button>

      <br />

      <div>
        <div
          style={{
            width: "250px",
            border: "1px solid #999",
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          {users.map((user) => (
            <div>
              <Link to={`/dashboard/users/${user.id}`}>{user.name}</Link>
            </div>
          ))}
        </div>
        <div
          style={{
            width: "500px",
            border: "1px solid #999",
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: getUserDetailsHTML(userDetails),
            }}
          />
          {/* {JSON.stringify(userDetails)} */}
          {/* {getUserDetailsHTML(userDetails)} */}
        </div>
      </div>
    </>
  );
};
export default Users;
