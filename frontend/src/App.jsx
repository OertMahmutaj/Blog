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
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
  blogServices.getAll().then(initialBlogs => {
    console.log('Initial blogs from backend:', initialBlogs)
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

  const logoutHandler = () => {
  window.localStorage.removeItem('loggedNoteappUser') // clear stored user
  setUser(null) // clear state
  blogServices.setToken(null) // optional: remove token from service
}


  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
  try {
    await blogServices.deleteBlog(id)
    setBlogs(blogs.filter(b => b.id !== id))
  } catch (error) {
    console.error(error)
  }
}


  const blogsToShow = blogs

  

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

  console.log(typeof(blogs))
  console.log(blogs.map(n => n.author))

  if (user === null) {
  return (
    <div>
      <h1>Blogs</h1>
      <AppNotification message={errorMessage} />
      {loginForm()}
    </div>
  )
}
  <Togglable buttonLabel="reveal">
    <p>this line is at start hidden</p>
    <p>also this is hidden</p>
  </Togglable>

// If user is logged in
  return (
    <div>
      <h1>Blogs</h1>
      <AppNotification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm/>
          </Togglable>
        </div>
      )}

      <ul>
        {blogsToShow.map(blog => (
          <li key={blog.id} style={{ marginBottom: '10px', listStyle: 'none' }}>
            <Blog blog={blog} />
            <button 
              onClick={() => handleDelete(blog.id)} 
              style={{ marginLeft: '10px', padding: '4px 8px' }}
            >
              Delete
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
