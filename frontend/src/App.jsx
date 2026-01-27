import { useEffect, useRef } from "react";

import { useQuery } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";

import AppNotification from "../components/AppNotification";
import blogServices from "../services/blogs";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

import { removeUser, setUser } from "../src/reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogServices.setToken(user.token);
    }
  }, [dispatch]);

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    dispatch(removeUser());
    blogServices.setToken(null);
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
      <Footer />
    </div>
  );
};

export default App;
