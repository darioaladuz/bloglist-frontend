import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

const deleteBlog = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }

  await axios.delete(`${baseUrl}/${blog._id}`, config);
}

const update = async (blog, id) => {
  await axios.put(`${baseUrl}/${id}`, blog)
}

export default { getAll, create, deleteBlog, update, setToken }