import { HttpOptions } from 'src/models/HttpOptions'
import { httpInstance } from './base'

export type Trailer = {
  id: string
  title: string
  url: string
  content: string
}

export const trailersAPI = {
  getAll: async (options?: HttpOptions) => {
    const response = await httpInstance.get<Array<Trailer>>('trailers', {
      signal: options?.signal,
    })

    return response.data
  },
  getByID: async (id: Trailer['id'], options?: HttpOptions) => {
    const response = await httpInstance.get<Trailer>(`trailers/${id}`, {
      signal: options?.signal,
    })

    return response.data
  },
}
