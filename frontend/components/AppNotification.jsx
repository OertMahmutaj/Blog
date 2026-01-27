import { useContext } from "react";
import NotificationContext from "../src/NotificationContext";

const AppNotification = () => {
  const { notification } = useContext(NotificationContext);

  // if (!notification) {
  //   return null;
  // }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    background: "green",
  };
  return <div style={style}>{notification}</div>;
};

export default AppNotification;
