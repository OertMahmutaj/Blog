import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  if (!blog) {
    return <div>is loading</div>;
  }

  // console.log(blog.id)

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <strong>{blog.title}</strong>
      </Link>
    </div>
  );
};

export default Blog;
