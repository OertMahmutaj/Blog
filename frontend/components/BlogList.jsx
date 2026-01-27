import { useDispatch, useSelector } from "react-redux";
import { updateBlog, removeBlog } from "../src/reducers/blogReducer";
import { useContext } from "react";
import Blog from "./Blog";
import NotificationContext from "../src/NotificationContext";
import blogServices from "../services/blogs"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { setNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogServices.like,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogServices.deleteBlog,
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      setNotification('Blog deleted', 3000)
    },
  })

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    // console.log(updatedBlog)
    likeBlogMutation.mutate({ id: blog.id, likes: updatedBlog.likes })
    setNotification(`You liked blog ${blog.title}`, 3000);
  };

  const handleDelete = (blog) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${blog.title}`,
    );
    if (!confirmDelete) return;

    try {
      deleteBlogMutation.mutate(blog.id);
    } catch (error) {
          console.error(error)
        
    }
  };
  // console.log(user);
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleClick={() => handleLike(blog)}>
          {user?.username === blog?.user?.username && (
            <button onClick={() => handleDelete(blog)}>Delete</button>
          )}
        </Blog>
      ))}
    </div>
  );
};
export default BlogList;
