import { useContext } from "react";
import NotificationContext from "../src/NotificationContext";

import { NotificationWrapper } from "../styles/Notification.styles";

const AppNotification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  return (
    <NotificationWrapper type={notification.type} className="notification">
      {notification.msg}
    </NotificationWrapper>
  );
};

export default AppNotification
