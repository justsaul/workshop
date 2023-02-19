import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/store/store'

import { interestAPI, Interest } from 'src/api/interest.api'

type Status = 'idle' | 'loading' | 'failed'

export interface InterestState {
  interests: Array<Interest>
  status: Status
  updateInterestStatus: Status
  topInterests: Array<Interest>
}

const initialState: InterestState = {
  topInterests: [],
  interests: [],
  status: 'idle',
  updateInterestStatus: 'idle',
}

export const fetchInterests = createAsyncThunk(
  'interest/fetchInterests',
  async () => {
    return await interestAPI.getAll()
  }
)

export const setInterest = createAsyncThunk(
  'interest/setInterest',
  async (id: string) => {
    return await interestAPI.setInterest(id)
  }
)

export const interestSlice = createSlice({
  name: 'interest',
  initialState,
  reducers: {
    clearAll: (state) => {
      state = initialState
    },
    calculateTopInterests: (state) => {
      // TODO based on occurance, display top 3 elements here.
      const topInterests = state.topInterests
      state.topInterests = topInterests
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInterest.pending, (state) => {
        state.updateInterestStatus = 'loading'
      })
      .addCase(setInterest.fulfilled, (state, action) => {
        state.updateInterestStatus = 'idle'
      })
      .addCase(setInterest.rejected, (state) => {
        state.updateInterestStatus = 'failed'
      })
      .addCase(fetchInterests.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchInterests.fulfilled, (state, action) => {
        state.status = 'idle'
        state.interests = action.payload
      })
      .addCase(fetchInterests.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { clearAll, calculateTopInterests } = interestSlice.actions

export const selectInterests = (state: RootState) => state.interest.interests
export const selectInterestsStatus = (state: RootState) => state.interest.status
export const selectUpdateStatus = (state: RootState) =>
  state.interest.updateInterestStatus
export const selectTopInterests = (state: RootState) =>
  state.interest.topInterests

export default interestSlice.reducer
