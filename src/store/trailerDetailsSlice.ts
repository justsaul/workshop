import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { ItemStatus } from 'src/models/Status'
import { RootState } from 'src/store/store'
import { trailersAPI, Trailer } from 'src/api/trailers.api'

export interface TrailerDetailsState {
  details: ItemStatus<Trailer | null>
}

const initialState: TrailerDetailsState = {
  details: {
    status: 'idle',
    item: null,
  },
}

export const fetchTrailerDetails = createAsyncThunk(
  'trailerDetails/getDetails',
  async (id: string) => {
    return await trailersAPI.getByID(id)
  }
)

export const trailerDetailsSlice = createSlice({
  name: 'trailerDetails',
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailerDetails.pending, (state) => {
        state.details.status = 'loading'
      })
      .addCase(fetchTrailerDetails.fulfilled, (state, action) => {
        state.details.status = 'idle'
        state.details.item = action.payload
      })
      .addCase(fetchTrailerDetails.rejected, (state) => {
        state.details.status = 'failed'
      })
  },
})

export const { clearState } = trailerDetailsSlice.actions

export const selectTrailerDetails = (state: RootState) =>
  state.trailerDetailsSlice.details.item

export const selectTrailerDetailsStatus = (state: RootState) =>
  state.trailerDetailsSlice.details.status

export default trailerDetailsSlice.reducer
