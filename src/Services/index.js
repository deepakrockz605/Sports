import axios from 'axios'

export default axios.create({
  baseURL: 'https://portfolio-api-node.herokuapp.com/api/'
})
