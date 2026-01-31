import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// const getToken = () => {
//   const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
//   if (loggedUserJSON) {
//     return `Bearer ${JSON.parse(loggedUserJSON).token}`
//   }
//   return null
// }

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to load blogs");
  }
  const data = await response.json();
  // console.log(data)
  return data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const like = async ({ id, likes }) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, { likes }, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token }};
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getBlog = async (id) => {
  const config ={
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data
}

export default { getAll, create, setToken, deleteBlog, like, getBlog };
