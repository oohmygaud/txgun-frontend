import axios from 'axios';

const getApi = () => {

    return axios.create({
        baseURL: 'http://localhost:8000/',
        headers: { 'Authorization': "Bearer "+ localStorage.getItem('authToken') }
    })
}

export default getApi;