const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

// Populate database before tests
beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = await new User({ username: 'DUDE', passwordHash }).save()

  const blogsWithUser = helper.initialBlogs.map(b => ({
    ...b,
    user: user._id
  }))

  await Blog.insertMany(blogsWithUser)
})

test('blogs are returned as json', async () => {
  console.log('entered')
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(b => b.title)
  assert.strictEqual(titles.includes('Blog 1'), true)
})

test('new blog can be added, try with charlie as author', async () => {

  const users = await helper.usersInDb()
  const token = await helper.loginAndGetToken(users[0].username, 'sekret')
  
  const newBlog = { 
    title: 'Blog 3', 
    author: 'Charlie', 
    likes: 7, 
    url: 'asdas', 
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

  const authors = blogAtEnd.map(n => n.author)
  assert(authors.includes('Charlie'))
})

test('new blog can be added, if likes property missing defaults to 0', async () => {

  const users = await helper.usersInDb()
  const token = await helper.loginAndGetToken(users[0].username, 'sekret')

  const newBlog = { 
    title: 'Blog 4', 
    author: 'Dom', 
    url: 'asdas'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

  const author = blogAtEnd.map(n => n.author)
  assert(author.includes('Dom'))
  
  const likes = blogAtEnd.map(n => n.likes)
  assert(likes.includes(0))
})

test('blog without content can`t be added', async () =>{

  const users = await helper.usersInDb()
  const token = await helper.loginAndGetToken(users[0].username, 'sekret')

  const newBlog = {}

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogAtEnd = await helper.blogInDb()

  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogInDb()
  const blogsToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogsToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.deepStrictEqual(resultBlog.body, blogsToView)
})

test('a specific blog can be deleted', async () =>{

  const users = await helper.usersInDb()
  const token = await helper.loginAndGetToken(users[0].username, 'sekret')

  const blogsAtStart = await helper.blogInDb()
  const blogsToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogsToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogAtEnd = await helper.blogInDb()

  const author = blogAtEnd.map(r => r.author)
  assert(!author.includes(blogsToDelete.author))

  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1)
})

test('unique property id is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert(blog.id)             // each blog has an 'id'
    assert.strictEqual(blog._id, undefined) // _id is removed
  })
})

test('missing url or title does not create a blog', async () => {

  const users = await helper.usersInDb()
  const token = await helper.loginAndGetToken(users[0].username, 'sekret')

  const newBlog = {
    title : 'Blog 5',
    author : 'Ray',
  }

  await api 
  .post(`/api/blogs`)
  .send(newBlog)
  .set('Authorization', `Bearer ${token}`)
  .expect(400)

  const blogAtEnd = await helper.blogInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
})

test('test fails with status code 404 if blog does not exist', async () =>{
  const validNonexistingId = await helper.nonExistingId()

  await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
})

test('test fails with status code 400 if id is not valid', async () =>{
  const invalidId = '5a3d5da59070081a82a3445'

  await api.get(`/api/blogs/${invalidId}`).expect(400)
})

test('blog updated successfully', async ()=>{

  const users = await helper.usersInDb()
  const token = await helper.loginAndGetToken(users[0].username, 'sekret')

  const blogsAtStart = await helper.blogInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: 'Blog 1',
    author: 'Alice',
    likes: 11,
    url: 'asdas',
  }

  const resultBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body.likes, 11)
})

//USERS

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api.post('/api/users').send(newUser).expect(201)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })
})

test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'DUDE',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

after(async () => {
  await mongoose.connection.close()
})
