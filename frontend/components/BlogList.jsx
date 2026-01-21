import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../src/reducers/blogReducer";
import { setNotification } from "../src/reducers/notificationReducer";
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default BlogList;
