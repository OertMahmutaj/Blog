import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// const getToken = () => {
//   const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
//   if (loggedUserJSON) {
//     return `Bearer ${JSON.parse(loggedUserJSON).token}`
//   }
//   return null
// }


const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
    return response.data
}

const create = async newObject => {

  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id, blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const updatedBlog = { likes: blog.likes + 1 }  // only likes

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data  // backend response has populated user
}


const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, create, setToken, deleteBlog, like }