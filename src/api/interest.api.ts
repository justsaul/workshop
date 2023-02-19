import { httpInstance } from './base'

export type Interest = {
  id: string
  trailerId: string
}

export const interestAPI = {
  getAll: async () => {
    const response = await httpInstance.get<Array<Interest>>('/interest')

    return response.data
  },
  setInterest: async (id: Interest['id']) => {
    const response = await httpInstance.post<Interest>(`interest`, {
      trailerId: id,
    })

    return response.data
  },
}
