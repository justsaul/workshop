import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/store/store'

import { trailersAPI, Trailer } from 'src/api/trailers.api'
import { Root } from 'react-dom/client'

type Status = 'idle' | 'loading' | 'failed'

export interface TrailerState {
  trailers: Array<Trailer>
  details: Trailer | null
  status: Status
  detailsStatus: Status
}

const initialState: TrailerState = {
  trailers: [],
  details: null,
  status: 'idle',
  detailsStatus: 'idle',
}

export const fetchTrailerDetails = createAsyncThunk(
  'trailers/getDetails',
  async (id: string) => {
    return await trailersAPI.getByID(id)
  }
)

export const fetchTrailers = createAsyncThunk(
  'trailers/getTrailers',
  async () => {
    return await trailersAPI.getAll()
  }
)

export const trailerSlice = createSlice({
  name: 'trailer',
  initialState,
  reducers: {
    clearAllState: (state) => {
      state = initialState
    },
    clearTrailerDetailsState: (state) => {
      const { trailers, status } = state

      state = {
        trailers,
        status,
        details: initialState.details,
        detailsStatus: initialState.detailsStatus,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTrailers.fulfilled, (state, action) => {
        state.status = 'idle'
        state.trailers = action.payload
      })
      .addCase(fetchTrailers.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(fetchTrailerDetails.pending, (state) => {
        state.detailsStatus = 'loading'
      })
      .addCase(fetchTrailerDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'idle'
        state.details = action.payload
      })
      .addCase(fetchTrailerDetails.rejected, (state) => {
        state.detailsStatus = 'failed'
      })
  },
})

export const { clearAllState, clearTrailerDetailsState } = trailerSlice.actions

export const selectTrailers = (state: RootState) => state.trailers.trailers
export const selectTrailerById = (state: RootState) => (id: Trailer['id']) => {
  return state.trailers.trailers.find((trailer) => trailer.id === id)
}
export const selectTrailerDetails = (state: RootState) => state.trailers.details

export const selectTrailer = (id: string) => (state: RootState) =>
  state.trailers.trailers.find((trailer) => trailer.id === id)
export const selectTrailerStatus = (state: RootState) => state.trailers.status
export const selectTrailerDetailsStatus = (state: RootState) =>
  state.trailers.detailsStatus

export default trailerSlice.reducer
