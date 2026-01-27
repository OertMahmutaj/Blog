import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../src/reducers/loginReducer";
import blogServices from "../services/blogs";

import { useContext } from "react";
import NotificationContext from "../src/NotificationContext";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setNotification } = useContext(NotificationContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
      const loggedUserJSON = JSON.stringify(user);
      window.localStorage.setItem("loggedNoteappUser", loggedUserJSON);
      blogServices.setToken(loggedUserJSON.token);
      console.log(loggedUserJSON);
      setNotification(`Welcome ${loggedUserJSON.username}`, 3000);
    } catch (error) {
      setNotification("Wrong credentials", 3000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
