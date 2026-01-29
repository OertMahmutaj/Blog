import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";
// import { ViewUsersContextProvider } from "./ViewUsersContext";

import App from "./App";

import { Provider } from "react-redux";
// import store from "./store";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
    {/* <Provider> */}
    {/* <ViewUsersContextProvider> */}
      <NotificationContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </NotificationContextProvider>
    {/* </ViewUsersContextProvider> */}
    {/* </Provider> */}
  </QueryClientProvider>
  </BrowserRouter>,
);
