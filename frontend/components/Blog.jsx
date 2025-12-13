import Togglable from "./Togglable"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog.user?.username)
  return (
    <div style={blogStyle} className="blog">
      <strong>{blog.title}</strong>
    
    <Togglable buttonLabel="viewBlog">
      <ul>{blog.author}</ul>
      <ul>{blog.url}</ul>
      <ul>{blog.likes}</ul>
      <ul>{blog.user?.username}</ul>
    </Togglable>
    </div>
  )
}

export default Blog
