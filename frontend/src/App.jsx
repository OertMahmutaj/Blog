import { useRef, useContext } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import blogServices from "../services/blogs";
import userServices from "../services/users";

import AppNotification from "../components/AppNotification";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import UsersList from "../components/UsersList";

import UserContext from "./UserContext";

const App = () => {
  const blogFormRef = useRef();
  const queryClient = useQueryClient();


  const { user, clearUser } = useContext(UserContext);

  const logoutHandler = () => {
    clearUser();
    queryClient.clear();
  };

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogServices.getAll,
    refetchOnWindowFocus: false,
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userServices.getAll,
    enabled: !!user,
    refetchOnWindowFocus: false,
  });
  if (blogsQuery.isLoading || usersQuery.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsQuery.data;
  const users = usersQuery.data;

  console.log(users)
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
      <UsersList users={users} />
      <Footer />
    </div>
  );
};

export default App;
