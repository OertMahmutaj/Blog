import { useState, useEffect, useRef } from 'react'
import Blog from '../components/Blog'
import AppNotification from '../components/AppNotification'
import blogServices from '../services/blogs'
import loginService from '../services/login'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogServices.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setTimeout(() => setUser(user), 0)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    blogServices.setToken(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogServices.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`A new blog "${returnedBlog.title}" added by ${user.username}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      setErrorMessage('wrong just wrong')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmDelete) return
    try {
      await blogServices.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleLike = async (blog) => {
    if (!blog.id) return
    try {
      const updatedBlog = await blogServices.like(blog.id, blog)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    } catch (error) {
      console.error(error)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <AppNotification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <AppNotification message={errorMessage || successMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} user={user} />
          </Togglable>
        </div>
      )}

      <ul style={{ padding: 0 }}>
        {blogs.map(blog => (
          <li key={blog.id} style={{ marginBottom: '10px', listStyle: 'none' }}>
            <Blog blog={blog} />
            {user.username && blog.user && user.username === blog.user.username && (
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            )}
            <button
              onClick={() => handleLike(blog)}
              style={{ marginLeft: '10px', padding: '4px 8px' }}
            >
              Like
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div>
          <button onClick={logoutHandler}>logout</button>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
