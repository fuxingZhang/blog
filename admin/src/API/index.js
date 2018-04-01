import axios from 'axios'

const Util = {
  host: 'http://localhost:3000/api/'
  // host: 'http://39.108.115.22:3000/api/'
  // host: 'http://' + location.host + '/api/'
}

const request = axios.create({
  baseURL: Util.host,
  validateStatus: function (status) {
    return status < 600; // Reject only if the status code is greater than or equal to 500
  }
})

request.interceptors.response.use((response) => {
  if( response.status == 401 ){
    location.hash = '/login'
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

export default {
  login(data){
    return request.post('/login',data)
  },
  register(data){
    return request.post('/register',data)
  },
  logout(){
    return request.post('/logout')
  },
  getUsers(){
    return request.get('/users')
  },
  getTags(){
    return request.get('/tags')
  },
  addTag(tag){
    return request.post('/tag', {tag})
  },
  deleteTag(tag){
    return request.delete('/tag/' + tag)
  },
  addArtical(data){
    return request.post('/artical', data)
  },
  getArticalList(pageSize,page){
    return request.get(`/articals?pageSize=${pageSize}&page=${page}`)
  },
  getArtical(page){
    return request.get(`/artical/${page}`)
  },
  upadteArtical(id,data){
    return request.put(`/artical/${id}`,data)
  }
}
