import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { CollectionStatus } from 'src/models/Status'
import { RootState } from 'src/store/store'
import { trailersAPI, Trailer } from 'src/api/trailers.api'

export interface TrailerState {
  trailers: CollectionStatus<Trailer>
}

const initialState: TrailerState = {
  trailers: {
    status: 'idle',
    collection: [],
  },
}

export const fetchTrailers = createAsyncThunk(
  'trailer/getTrailers',
  async () => {
    return await trailersAPI.getAll()
  }
)

export const trailerSlice = createSlice({
  name: 'trailer',
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailers.pending, (state) => {
        state.trailers.status = 'loading'
      })
      .addCase(fetchTrailers.fulfilled, (state, action) => {
        state.trailers.status = 'idle'
        state.trailers.collection = action.payload
      })
      .addCase(fetchTrailers.rejected, (state) => {
        state.trailers.status = 'failed'
      })
  },
})

export const { clearState } = trailerSlice.actions

export const selectTrailers = (state: RootState) =>
  state.trailerSlice.trailers.collection
export const selectTrailerById = (state: RootState) => (id: Trailer['id']) => {
  return state.trailerSlice.trailers.collection.find(
    (trailer) => trailer.id === id
  )
}
export const selectTrailer = (id: string) => (state: RootState) =>
  state.trailerSlice.trailers.collection.find((trailer) => trailer.id === id)
export const selectTrailerStatus = (state: RootState) =>
  state.trailerSlice.trailers.status

export default trailerSlice.reducer
