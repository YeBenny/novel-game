import httpRequest from '../services/HttpRequest'

export async function getJWT() {
  const result = await httpRequest.get(
    `${import.meta.env.VITE_BASE_JWT_URL}/get-jwt`,
  )
  return result.data
}
