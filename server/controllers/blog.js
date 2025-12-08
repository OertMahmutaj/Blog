const blogRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  Blog.find({}).then(blog => {
    response.json(blog)
  })
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end() // valid id, not found
    }
  } catch (error) {
    next(error) // CastError will be handled by errorHandler -> 400
  }
})


blogRouter.delete('/:id', async (request, response) =>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    )
    if (!updatedBlog) {
      response.json(updatedBlog)
    } 
    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
})


module.exports = blogRouter