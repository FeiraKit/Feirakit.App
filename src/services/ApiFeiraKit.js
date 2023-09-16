import axios from 'axios'
import { API_URL } from '@env'
const apiFeiraKit = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: {},
})
export default apiFeiraKit
