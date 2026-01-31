import { createContext, useReducer, useEffect } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, action.payload]; // add new notification to queue
    case "REMOVE_NOTIFICATION":
      return state.slice(1); // remove the first notification
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  useEffect(() => {
    if (notifications.length === 0) return;

    const timer = setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION" });
    }, notifications[0].timeout || 3000);

    return () => clearTimeout(timer);
  }, [notifications]);

  const setNotification = (msg, timeout = 3000) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: { msg, timeout } });
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
