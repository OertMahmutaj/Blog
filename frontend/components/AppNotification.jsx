import { useContext } from "react";
import NotificationContext from "../src/NotificationContext";

const AppNotification = () => {
  const { notifications } = useContext(NotificationContext);

  // if (!notification) {
  //   return null;
  // }

  const style = {
    border: "solid",
    height: 30,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    background: "green",
  };
  if (notifications.length === 0) return null;

  return (
    <div style={style} className="notification">
      {notifications[0].msg}
    </div>
  );
};

export default AppNotification
