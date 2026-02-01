import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../src/UserContext";
import NotificationContext from "../src/NotificationContext";

const Logout = () => {
  const queryClient = useQueryClient();
  const { clearUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearUser();
    queryClient.clear();
    setNotification(`Goodbye idiot`, "success", 3000);
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
