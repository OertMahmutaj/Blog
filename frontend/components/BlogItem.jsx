import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import NotificationContext from "../src/NotificationContext";

import Togglable from "./Togglable";

import blogServices from "../services/blogs";
import UserContext from "../src/UserContext";
import { useField } from "../hooks/customHooks";

const BlogItem = () => {
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const comment = useField("text");

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
    queryClient.removeQueries({ queryKey: ["blog", id] }); 
    setNotification(`Deleted blog ${blog.title}`, 3000);
    navigate("/blogs")
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
  //comment logic
  const commentBlogMutation = useMutation({
    mutationFn: ({ id, comment }) => blogServices.commentBlog({ id, comment }),
  });

  const handleComment = (event) => {
    event.preventDefault();
    if (!comment.value) return;

    commentBlogMutation.mutate(
      { id: blog.id, comment: comment.value },
      {
        onSuccess: (updatedBlog) => {
          queryClient.setQueryData(["blog", blog.id], updatedBlog);
          queryClient.setQueryData(["blogs"], (oldBlogs) =>
            oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
          );
          setNotification(`Commented on ${blog.title}`, 3000);
          commentReset();
        },
      },
    );
  };

  const { reset: commentReset, ...commentInput } = comment;

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load blog</div>;

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
              <li>Comments:</li>
              <ul>
                {blog.comments?.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </ul>
          </label>
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
      </Togglable>
      <Togglable buttonLabel={"Comment"}>
        <form onSubmit={handleComment}>
          <input placeholder="comment" {...commentInput} />
          <button type="submit">Comment</button>
        </form>
      </Togglable>

      {user?.username === blog?.user?.username && (
        <button onClick={() => handleDelete(blog)}>Delete</button>
      )}
    </div>
  );
};

export default BlogItem;
