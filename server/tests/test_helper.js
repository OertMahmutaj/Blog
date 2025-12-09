const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Alice',
    likes: 10,
    url: 'asdas',
    user: null
  },
  {
    title: 'Blog 2',
    author: 'Bob',
    likes: 5,
    url: 'asdas',
    user: null
  }
]

const initialUsers = [
  {
    username: 'firstUser',
    passwordHash: 'firstUserPasswordHashed',
    blogs: []
  }
]

const nonExistingId = async () => {
  const dummyUser = await User.findOne()
  const blog = new Blog({
    title: 'test',
    author: 'to',
    likes: 50,
    url: 'hahaha',
    user: dummyUser ? dummyUser._id : null
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => {
    const blogObj = blog.toJSON()
    blogObj.user = blogObj.user.toString() 
    return blogObj
  })
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogInDb,
  usersInDb
}
