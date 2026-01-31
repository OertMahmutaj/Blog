import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import NotificationContext from "../src/NotificationContext";

import Togglable from "./Togglable";

import blogServices from "../services/blogs";
import UserContext from "../src/UserContext";

const BlogItem = () => {
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { id } = useParams();
  // console.log(id);

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogServices.getBlog(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  //like logic
  const likeBlogMutation = useMutation({
    mutationFn: blogServices.like,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog", id], updatedBlog);

      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
    },
  });

  const handleLike = (blog) => {
    likeBlogMutation.mutate({
      id: blog.id,
      likes: blog.likes + 1,
    });

    setNotification(`You liked blog ${blog.title}`, 3000);
  };

  //delete logic

  const deleteBlogMutation = useMutation({
    mutationFn: blogServices.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setNotification(`Deleted blog ${blog.title}`, 3000);
    },
  });

  const handleDelete = (blog) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${blog.title}`,
    );
    if (!confirmDelete) return;

    try {
      deleteBlogMutation.mutate(blog.id);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user);
  console.log(blog);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load blog</div>;
  // console.log(blog);
  // if (blog) {
  //   return <div>is loading</div>;
  // }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Togglable buttonLabel="viewBlog">
        <p>
          {blog.title} by {blog.author}
        </p>
      </Togglable>
      <Togglable buttonLabel="viewLikesAndUrl">
        <div>
          <label>
            {" "}
            Properties
            <ul>
              {" "}
              <li>Url.: {blog.url}</li>
              <li>Likes.: {blog.likes}</li>
              {/* <li>{blog.user?.username}</li> */}
            </ul>
          </label>
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
      </Togglable>

      {user?.username === blog?.user?.username && (
        <button onClick={() => handleDelete(blog)}>Delete</button>
      )}
    </div>
  );
};

export default BlogItem;
