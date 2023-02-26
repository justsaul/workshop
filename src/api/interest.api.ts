import { HttpOptions } from 'src/models/HttpOptions'
import { httpInstance } from './base'

export type Interest = {
  id: string
  trailerId: string
}

export const interestAPI = {
  getAll: async (options?: HttpOptions) => {
    const response = await httpInstance.get<Array<Interest>>('interest', {
      signal: options?.signal,
    })

    return response.data
  },
  setInterest: async (id: Interest['id'], options?: HttpOptions) => {
    const response = await httpInstance.post<Interest>(
      `interest`,
      {
        trailerId: id,
      },
      {
        signal: options?.signal,
      }
    )

    return response.data
  },
}
