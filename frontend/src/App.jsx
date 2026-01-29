import { useRef, useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import AppNotification from "../components/AppNotification";
import blogServices from "../services/blogs";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import ViewUsers from "../components/ViewUsers";

import UserContext from "./UserContext";

const App = () => {
  const blogFormRef = useRef();

  const { user, clearUser } = useContext(UserContext);

  const logoutHandler = () => {
    clearUser();
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogServices.getAll,
    refetchOnWindowFocus: false,
  });
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const blogs = result.data;

  return (
    <div>
      <h1>Blogs</h1>
      <AppNotification />
      {user && (
        <div>
          <Togglable buttonLabel="Make a new Blog" ref={blogFormRef}>
            <BlogForm user={user} />
          </Togglable>
        </div>
      )}

      {!user ? <LoginForm /> : <BlogList blogs={blogs} user={user} />}

      {user && (
        <div>
          <button onClick={logoutHandler}>logout</button>
        </div>
      )}
      <ViewUsers />
      <Footer />
    </div>
  );
};

export default App;
