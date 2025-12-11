import { useState, useEffect } from 'react'
import Blog from '../components/Blog'
import Notification from '../components/Notification'
import blogServices from '../services/blogs'
import loginService from '../services/login'
import Footer from '../components/Footer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
      setUser(user)
      blogServices.setToken(user.token)   
    }
  }, [])

  const logoutHandler = () => {
  window.localStorage.removeItem('loggedNoteappUser') // clear stored user
  setUser(null) // clear state
  blogServices.setToken(null) // optional: remove token from service
}


  const addBlog = async (event) => {
  event.preventDefault()
  const blogObject = {
    author: newAuthor,
    title: newTitle,
    url: newUrl
  }

  try {
    const returnedBlog = await blogServices.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))   // add to list
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    setSuccessMessage(`A new blog "${returnedBlog.title}" added by ${user.username}`)
    setTimeout(() => setSuccessMessage(null), 5000) // clear after 5s
  } catch (error) {
    console.error(error)
  }
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


  const handleBlogChange = (event) => {
  const { name, value } = event.target

  if (name === 'author') setNewAuthor(value)
  if (name === 'title') setNewTitle(value)
  if (name === 'url') setNewUrl(value)
}


  const blogsToShow = blogs


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>

      <input name="author" value={newAuthor} onChange={handleBlogChange} />
      <input name="title" value={newTitle} onChange={handleBlogChange} />
      <input name="url" value={newUrl} onChange={handleBlogChange} />

      <button type="submit">save</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  )

  console.log(typeof(blogs))
  console.log(blogs.map(n => n.author))

  if (user === null) {
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {loginForm()}
    </div>
  )
}

// If user is logged in
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      <div>
        <p>{user.name} logged in</p>
        {blogForm()}
      </div>

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
