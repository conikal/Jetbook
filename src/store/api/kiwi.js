import axios from 'axios';

const API = 'https://api.skypicker.com/';

export default {
  constructor(options) {
    Object.assign(this, options);
  },

  places(params = {}) {
    return this.call('places', params)
  },

  search(params = {}) {
    return this.call('flights', params)
  },

  call(method, params = {}) {
    const defaultParams = { v: 2, partner: 'picky', partner_market: 'vn' };
    const queryParams = { arrayFormat: 'brackets' };
    const url = API + method;

    return axios.get(url, {
      params: Object.assign(defaultParams, params)
    })
  }
}