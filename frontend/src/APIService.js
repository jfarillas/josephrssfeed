import axios from 'axios';
const API_URL = 'http://localhost:3000';

export class APIService{

  constructor(){
  }

  getList(category = null) {
    const url = (category === null) ? `${API_URL}/list` : `${API_URL}/${category}`;
    return axios.get(url).then(response => response.data);
  }
}