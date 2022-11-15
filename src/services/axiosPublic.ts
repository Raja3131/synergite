import axios from 'axios'

const axiosPublic = axios.create({
  baseURL:
    'http://ec2-18-222-212-17.us-east-2.compute.amazonaws.com:8080/synergy-rest-service',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosPublic
