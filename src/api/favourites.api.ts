import { HttpOptions } from 'src/models/HttpOptions'
import { httpInstance } from './base'

export type Favourite = {
  id: string
  trailerId: string
}

export const favouritesAPI = {
  getAll: async (options: HttpOptions) => {
    const response = await httpInstance.get<Array<Favourite>>('favourites', {
      signal: options.signal,
    })

    return response.data
  },
  setFavourite: async (id: Favourite['id'], options: HttpOptions) => {
    const response = await httpInstance.post<Favourite>(
      `favourites`,
      {
        trailerId: id,
      },
      {
        signal: options.signal,
      }
    )

    return response.data
  },
  deleteFavourite: async (id: Favourite['id'], options: HttpOptions) => {
    const response = await httpInstance.delete<Favourite>(`favourites/${id}`, {
      signal: options.signal,
    })

    return response.data
  },
}
