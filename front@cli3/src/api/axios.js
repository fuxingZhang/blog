import Axios from 'axios'

const Util = {
  //host: 'http://localhost/api/'
  host: 'http://39.108.115.22/api/'
  // host: 'http://' + location.host + '/api/'
}

let axios = Axios.create({
  baseURL: Util.host,
  timeout: 10000,
  validateStatus: function (status) {
    return status < 600; // Reject only if the status code is greater than or equal to 500
  }
})

axios.interceptors.request.use( request => {
  return request
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use( response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default axios
