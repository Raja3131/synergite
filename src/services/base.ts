import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://gokv9osl.directus.app/items',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE',
  },
})

export default apiClient
