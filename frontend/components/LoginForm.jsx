import { useState, useContext } from "react";
import loginServices from "../services/login"

import NotificationContext from "../src/NotificationContext";
import UserContext from "../src/UserContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";

const LoginForm = () => {
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
    <form autoComplete="on" onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
