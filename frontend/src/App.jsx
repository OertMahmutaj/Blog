import { useRef, useContext } from "react";
import { Routes, Route } from "react-router-dom";

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
import User from "../components/User";
import BlogItem from "../components/BlogItem";
import Navbar from "../components/Navbar";

import UserContext from "./UserContext";

import { Title, Wrapper } from "../styles/Title.styles";
import { StyledNavLink } from "../styles/Navbar.styles";
import { GlobalStyle } from "../styles/Global.styles";
import { Button } from "../styles/Buttons.styles";

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

  // console.log(users);
  return (
    <div>
      <GlobalStyle />
      <StyledNavLink to={"/"}>
        <Wrapper>
          <Title>Blogs</Title>
        </Wrapper>
      </StyledNavLink>
      <Navbar />
      <AppNotification />

      {user && (
        <Togglable buttonLabel="Make a new Blog" ref={blogFormRef}>
          <BlogForm user={user} />
        </Togglable>
      )}
      <Routes>
        <Route path="/users/:id" element={<User />} />
        {user && <Route path="/blogs/:id" element={<BlogItem />} />}
        {!user ? (
          <Route path="/login" element={<LoginForm />} />
        ) : (
          <Route
            path="/blogs"
            element={<BlogList blogs={blogs} user={user} />}
          />
        )}
        {user && <Route path="/users" element={<UsersList users={users} />} />}
        {user && <Route path="/users/:id" element={<User />} />}
        {!user && <Route path="/login" element={<LoginForm />} />}
      </Routes>
      <p>{user && <Button onClick={logoutHandler}>logout</Button>}</p>
      <Footer />
    </div>
  );
};

export default App;
