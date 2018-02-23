import axios from 'axios'

export default {
  getComments (params) {
    return axios.get('/comments', {
      params: params
    })
  },
  postComment (params) {
    return axios.post('/comments', params)
  }
}
