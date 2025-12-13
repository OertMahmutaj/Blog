const BlogItem = ({ blog, handleLike }) => {
  return (
    <div>
      <p>{blog.title} by {blog.author}</p>
      <button onClick={() => handleLike(blog)}>Like</button>
    </div>
  )
}

export default BlogItem
