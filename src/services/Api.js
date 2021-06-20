import axios from 'axios';

const localURL = 'http://10.0.2.2:8080/'
const productionURL = 'https://siss-api.herokuapp.com/'

const api = axios.create({
    baseURL: productionURL
})

export default api;