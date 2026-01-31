import { createContext, useReducer, useRef } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);
  const timeoutRef = useRef(null);

  const clearNotification = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    dispatch({ type: "CLEAR_NOTIFICATION" });
  };

  const setNotification = (msg, type = "success", timeout = 3000) => {
    clearNotification();

    const newNotification = {
      msg,
      timeout,
      type,
      id: Date.now(),
    };

    dispatch({ type: "SET_NOTIFICATION", payload: newNotification });

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
      timeoutRef.current = null;
    }, timeout);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
