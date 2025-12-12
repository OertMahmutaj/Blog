import { useState, useEffect } from 'react'
import blogServices from '../services/blogs'
import AppNotification from './AppNotification'

const BlogForm = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setTimeout(() => setUser(user), 0)
        blogServices.setToken(user.token)   
      }
    }, [])

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
    } catch {
      setErrorMessage('wrong just wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (event) => {
  const { name, value } = event.target

  if (name === 'author') setNewAuthor(value)
  if (name === 'title') setNewTitle(value)
  if (name === 'url') setNewUrl(value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>

      Author
      <input name="author" value={newAuthor} onChange={handleBlogChange} />
      Title
      <input name="title" value={newTitle} onChange={handleBlogChange} />
      Url
      <input name="url" value={newUrl} onChange={handleBlogChange} />

      <button type="submit">save</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  )

  return (
    <div>
    <AppNotification message={errorMessage} />
      <h2>Create a new blog</h2>
        <div>
          {blogForm()}
        </div>
    </div>
  )
}

export default BlogForm