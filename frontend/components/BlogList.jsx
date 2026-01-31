import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  // const likeBlogMutation = useMutation({
  //   mutationFn: blogServices.like,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["blogs"] });
  //   },
  // });

  // const deleteBlogMutation = useMutation({
  //   mutationFn: blogServices.deleteBlog,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["blogs"] });
  //     setNotification("Blog deleted", 3000);
  //   },
  // });

  // const handleLike = (blog) => {
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //   };
  //   // console.log(updatedBlog)
  //   likeBlogMutation.mutate({ id: blog.id, likes: updatedBlog.likes });
  //   setNotification(`You liked blog ${blog.title}`, 3000);
  // };

  // const handleDelete = (blog) => {
  //   const confirmDelete = window.confirm(
  //     `Are you sure you want to delete ${blog.title}`,
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     deleteBlogMutation.mutate(blog.id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // console.log(user);
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog}>
          {/* {user?.username === blog?.user?.username && (
            <button onClick={() => handleDelete(blog)}>Delete</button>
          )} */}
          {/* <BlogItem handleLike={handleLike}/> */}
        </Blog>
      ))}
    </div>
  );
};
export default BlogList;
