import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import loginServices from "../services/login"

import NotificationContext from "../src/NotificationContext";
import UserContext from "../src/UserContext";

//styles
import { Button } from "../styles/Buttons.styles";
import { StyledInput } from "../styles/Input.styles";



const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  // const queryClient = useQueryClient();

  const { setNotification } = useContext(NotificationContext);
  const { setUser } = useContext(UserContext);

  const loginMutation = useMutation({
    mutationFn: loginServices.login,
    onSuccess: (returnedUser) => {
      setUsername("");
      setPassword("");
      setUser(returnedUser)
      navigate("/")
    },
    onError: () =>{
      setNotification("Wrong credentials", "error", 3000);
    }
  })

  const handleLogin = async (e) => {
    e.preventDefault();
      loginMutation.mutate({ username, password });
  };

  return (
    <form autoComplete="on" onSubmit={handleLogin}>
      <StyledInput
        type="text"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <StyledInput
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
