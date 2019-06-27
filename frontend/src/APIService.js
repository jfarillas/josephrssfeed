import axios from 'axios';

const API_URL = 'https://node.rssfeeds.jfarillas.com';
const HOST = location.protocol+'//'+location.hostname;

export class APIService{

  constructor(){
  }

  login(data, store) {
    const url = `${HOST}/api/v1/login`;
    return axios.post(url, {
        'email': data.email,
        'password': data.password
    }).then(response => {
      store.dispatch('loggedIn', true);  
    });
  }

  getList(category = null) {
    const url = (category === null) ? `${API_URL}/list` : `${API_URL}/${category}`;
    return axios.get(url).then(response => response.data);
  }
}
