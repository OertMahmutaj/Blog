import { StyledNavLink } from "../styles/Navbar.styles";

const Blog = ({ blog }) => {

  if (!blog) {
    return <div>is loading</div>;
  }

  // console.log(blog.id)

  return (
    <div className="blog">
      <StyledNavLink to={`/blogs/${blog.id}`}>
        <strong>{blog.title}</strong>
      </StyledNavLink>
    </div>
  );
};

export default Blog;
