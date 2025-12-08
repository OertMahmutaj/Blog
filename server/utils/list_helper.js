const dummy = () => 1

const totalLikes = (blogs) => {
  if (blogs.length === 0) return null
  
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Count blogs per author
  const counts = {}
  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })

  // Find author with most blogs
  let maxAuthor = null
  let maxBlogs = 0
  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  // create a map of author => total likes
  const likesMap = blogs.reduce((map, blog) => {
    map[blog.author] = (map[blog.author] || 0) + blog.likes
    return map
  }, {})

  // find the author with the most likes
  let maxAuthor = null
  let maxLikes = 0

  for (const author in likesMap) {
    if (likesMap[author] > maxLikes) {
      maxLikes = likesMap[author]
      maxAuthor = author
    }
  }

  return { author: maxAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
