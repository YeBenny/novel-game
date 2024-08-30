import axios from 'axios'

// Set config defaults when creating the instance
const httpRequest = axios.create({
    // baseURL: 'https://api.example.com',
    baseURL: '',
    timeout: 3000
})

// Handle response

export default httpRequest
