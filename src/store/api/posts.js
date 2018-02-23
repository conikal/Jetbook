import axios from 'axios'
export default {
  getPosts (params) {
    return axios.get('/posts', {
      params: params
    })
  },
  getPost (slug) {
    return axios.get('/posts', {
      params: { slug: slug }
    })
  }
}
