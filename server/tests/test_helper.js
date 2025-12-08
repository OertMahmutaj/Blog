const Blog = require('../models/blog').default
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Alice',
    likes: 10,
    url: 'asdas',
  },
  {
    title: 'Blog 2',
    author: 'Bob',
    likes: 5,
    url: 'asdas',
  }
]

const nonExistingId = async () => {
  const blog = new Blog(
    {
    title: 'test',
    author: 'to',
    likes: 'remove',
    url: 'hahaha',
  }
  )
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

//USERS

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb, usersInDb
}