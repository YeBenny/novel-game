import httpRequest from '../services/HttpRequest'

export async function getJWT() {
  const result = await httpRequest.get('/get-jwt')
  return result.data
}
