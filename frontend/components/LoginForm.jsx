import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../src/reducers/loginReducer";
import blogServices from "../services/blogs";
import loginServices from "../services/login"

import { useContext } from "react";
import NotificationContext from "../src/NotificationContext";
import UserContext from "../src/UserContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { setNotification } = useContext(NotificationContext);
  const { setUser } = useContext(UserContext);

  const loginMutation = useMutation({
    mutationFn: loginServices.login,
    onSuccess: (returnedUser) => {
      setUsername("");
      setPassword("");
      setUser(returnedUser)
      // setNotification(`Welcome ${returnedUser.username}`, 3000);
    },
    onError: () =>{
      setNotification("Wrong credentials", 3000);
    }
  })

  const handleLogin = async (e) => {
    e.preventDefault();
      loginMutation.mutate({ username, password });
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
