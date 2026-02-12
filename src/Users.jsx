import { useSelector, useDispatch } from "react-redux";
import { addUsers } from "./usersSlice";
import { useTheme } from "./ThemeProvider";
const Users = () => {
  const users = useSelector((state) => state.usersReducer.users);
  const dispatch = useDispatch();
  const getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => dispatch(addUsers(data)));
  };
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <br />
      <span>{theme}</span>

      <br />
      <button onClick={getUsers}>Get Users</button>
      <br />

      <table style={{ border: "1px solid #333" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
