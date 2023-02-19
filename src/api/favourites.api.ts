import { httpInstance } from './base'

export type Favourite = {
  id: string
  trailerId: string
}

export const favouritesAPI = {
  getAll: async () => {
    const response = await httpInstance.get<Array<Favourite>>('/favourites')

    return response.data
  },
  setFavourite: async (id: Favourite['id']) => {
    const response = await httpInstance.post<Favourite>(`/favourites`, {
      trailerId: id,
    })

    return response.data
  },
  deleteFavourite: async (id: Favourite['id']) => {
    const response = await httpInstance.delete<Favourite>(`/favourites/${id}`)

    return response.data
  },
}
