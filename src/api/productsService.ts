import api from './axios'

export const products = async () => {
  try {
    const res = await api.get('/products')
    return [res.data]
  } catch (error) {
    return [null, error]
  }
}
