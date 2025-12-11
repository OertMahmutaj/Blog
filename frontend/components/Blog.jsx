const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <strong>{blog.title}</strong> by {blog.author}
    </div>
  )
}

export default Blog
