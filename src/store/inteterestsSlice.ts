import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { Status, CollectionStatus } from 'src/models/Status'
import type { RootState } from 'src/store/store'
import type { PayloadOptions } from 'src/models/PayloadOptions'
import { interestAPI, Interest } from 'src/api/interest.api'

export interface InterestState {
  interests: CollectionStatus<Interest>
  topInterests: Array<Interest>
  updateInterests: {
    status: Status
  }
}

const initialState: InterestState = {
  interests: {
    status: 'idle',
    collection: [],
  },
  topInterests: [],
  updateInterests: {
    status: 'idle',
  },
}

export const fetchInterests = createAsyncThunk(
  'interest/fetchInterests',
  async ({ options }: { options?: PayloadOptions }) => {
    return await interestAPI.getAll({ signal: options?.signal })
  }
)

export const setInterest = createAsyncThunk(
  'interest/setInterest',
  async ({ id, options }: { id: string; options?: PayloadOptions }) => {
    return await interestAPI.setInterest(id, { signal: options?.signal })
  }
)

export const interestSlice = createSlice({
  name: 'interest',
  initialState,
  reducers: {
    clearAll: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInterest.pending, (state) => {
        state.updateInterests.status = 'loading'
      })
      .addCase(setInterest.fulfilled, (state, action) => {
        state.updateInterests.status = 'idle'
      })
      .addCase(setInterest.rejected, (state) => {
        state.updateInterests.status = 'failed'
      })
      .addCase(fetchInterests.pending, (state) => {
        state.interests.status = 'loading'
      })
      .addCase(fetchInterests.fulfilled, (state, action) => {
        state.interests.status = 'idle'
        state.interests.collection = action.payload
      })
      .addCase(fetchInterests.rejected, (state) => {
        state.interests.status = 'failed'
      })
  },
})

export const { clearAll } = interestSlice.actions

export const selectInterests = (state: RootState) =>
  state.interestSlice.interests
export const selectSortedInterests = (state: RootState) => {
  const interestsRepresentation =
    state.interestSlice.interests.collection.reduce(
      (accumulator: Record<string, number>, entry: Interest) => {
        if (accumulator[entry.trailerId]) {
          return {
            ...accumulator,
            [entry.trailerId]: accumulator[entry.trailerId] + 1,
          }
        }
        return {
          ...accumulator,
          [entry.trailerId]: 1,
        }
      },
      {} as Record<string, number>
    )

  return Object.entries(interestsRepresentation)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
}

export const selectInterestsStatus = (state: RootState) =>
  state.interestSlice.interests.status
export const selectUpdateStatus = (state: RootState) =>
  state.interestSlice.updateInterests.status
export const selectTopInterests = (state: RootState) =>
  state.interestSlice.topInterests

export default interestSlice.reducer
