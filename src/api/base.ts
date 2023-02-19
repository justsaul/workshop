import axios from 'axios'

export const httpInstance = axios.create({
  baseURL: 'http://localhost:3001',
})
