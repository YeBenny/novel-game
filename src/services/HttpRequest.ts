import axios from 'axios'

const request = axios.create({
  timeout: 30000,
})

request.defaults.withCredentials = true

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response): any => {
    if (response.status === 200) {
      const { code } = response.data
      if (code === 0) {
        return Promise.resolve(response.data)
      }
    }
  },
  (error) => {
    return Promise.reject({
      code: -1,
      source: 'api',
      message: error.toString(),
    })
  },
)

export default request
