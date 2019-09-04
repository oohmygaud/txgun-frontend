import axios from 'axios'

/* global process */
export const baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8000/' : 'https://api.txgun.io/'

export const getApi = () => {
  const token = localStorage.getItem('authToken')
  const headers = token ? { Authorization: `Bearer ${token}` } : null
  return axios.create({
    baseURL, headers
  })
}
