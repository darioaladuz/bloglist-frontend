import axios from 'axios'
const baseUrl = 'https://dariodean.herokuapp.com/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }