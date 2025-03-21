import api from './axios'

export const categories = async () => {
  try {
    const res = await api.get('/categories')
    return [res.data]
  } catch (error) {
    return [null, error]
  }
}
