import { httpInstance } from './base'

export type Trailer = {
  id: string
  title: string
  url: string
  content: string
}

export const trailersAPI = {
  getAll: async () => {
    const response = await httpInstance.get<Array<Trailer>>('/trailers')

    return response.data
  },
  getByID: async (id: Trailer['id']) => {
    const response = await httpInstance.get<Trailer>(`trailers/${id}`)

    return response.data
  },
}
