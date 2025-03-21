import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosRequestHeaders,
  AxiosError,
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'https://app.ecwid.com/api/v3/108362264',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Static auth token
    const token = 'public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs'
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...')
      window.location.href = '/login' // Redirect not using, because of static auth token
    }
    return Promise.reject(error)
  },
)

export default api
