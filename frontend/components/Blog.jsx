import Togglable from "./Togglable"

const Blog = ({ blog, handleClick, children }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if(!blog) {
    return(
      <div>is loading</div>
    )
  }
  // console.log(blog.user?.username)

  return (
    <div style={blogStyle} className="blog">
      <strong>{blog.title}</strong>
    
    <Togglable buttonLabel="viewBlog">
      <ul>{blog.author}</ul>
      <ul>{blog.title}</ul>
    </Togglable>
    <Togglable buttonLabel="viewLikesAndUrl">
      <div>
        <label> Properties
      <ul>{blog.url}</ul>
      <ul>{blog.likes}</ul>
      <ul>{blog.user?.username}</ul>
      <button onClick={handleClick}>Like</button>
      {children}
        </label>
      </div>
    </Togglable>
    </div>
  )
}

export default Blog
