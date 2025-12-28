import { useState, useEffect } from 'react'
import AppNotification from './AppNotification'

const BlogForm = ({ createBlog }) => {
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
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl
    }

    // Call the parent callback
    createBlog(blogObject)

    // Keep extra logic intact
    setBlogs(blogs.concat(blogObject))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')

    // if (user) {
    //   setSuccessMessage(`A new blog "${blogObject.title}" added by ${user.username}`)
    //   setTimeout(() => setSuccessMessage(null), 5000)
    // }
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    if (name === 'author') setNewAuthor(value)
    if (name === 'title') setNewTitle(value)
    if (name === 'url') setNewUrl(value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label>
        Author
        <input
          name="author"
          value={newAuthor}
          onChange={handleBlogChange}
          placeholder='write author here'
        />
      </label>
      <label>
        Title
        <input
          name="title"
          value={newTitle}
          onChange={handleBlogChange}
          placeholder='write title here'
        />
      </label>
      <label>
        Url
        <input
          name="url"
          value={newUrl}
          onChange={handleBlogChange}
          id='url-id'
          placeholder='write url here'
        />
      </label>
      <button type="submit">save</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  )

  return (
    <div>
      <AppNotification message={errorMessage} />
      <h2>Create a new blog</h2>
      {blogForm()}
    </div>
  )
}

export default BlogForm
