import axios from 'axios'

export const baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8000/' : 'https://api.txgun.io/'

export const getApi = () => {

    return axios.create({
        baseURL,
        headers: { 'Authorization': "Bearer "+ localStorage.getItem('authToken') }
    })
}
