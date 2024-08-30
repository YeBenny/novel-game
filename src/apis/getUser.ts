import httpRequest from "../services/HttpRequest"

interface UserRequestParams {
  id: string
}

export async function getUser(params: UserRequestParams) {
  const response = await httpRequest.post('/data/user.json', params)
    return response.data
}
