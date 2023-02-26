import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { Status, CollectionStatus } from 'src/models/Status'
import { RootState } from 'src/store/store'
import { Favourite, favouritesAPI } from 'src/api/favourites.api'
import { Trailer } from 'src/api/trailers.api'

export interface FavouritesState {
  favourites: CollectionStatus<Favourite>
  deleteFavourite: {
    status: Status
  }
  setFavourite: {
    status: Status
  }
}

const initialState: FavouritesState = {
  favourites: {
    status: 'idle',
    collection: [],
  },
  deleteFavourite: {
    status: 'idle',
  },
  setFavourite: {
    status: 'idle',
  },
}

export const setFavourite = createAsyncThunk(
  'favourites/setFavourite',
  async (id: string) => {
    return await favouritesAPI.setFavourite(id)
  }
)

export const fetchFavourites = createAsyncThunk(
  'favourites/getAll',
  async () => {
    return await favouritesAPI.getAll()
  }
)

export const deleteFavourite = createAsyncThunk(
  'favourites/delete',
  async (id: string) => {
    return await favouritesAPI.deleteFavourite(id)
  }
)

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.favourites.status = 'loading'
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.favourites.status = 'idle'
        state.favourites.collection = action.payload
      })
      .addCase(fetchFavourites.rejected, (state) => {
        state.favourites.status = 'failed'
      })
      .addCase(setFavourite.pending, (state) => {
        state.setFavourite.status = 'loading'
      })
      .addCase(setFavourite.fulfilled, (state, action) => {
        state.setFavourite.status = 'idle'
      })
      .addCase(setFavourite.rejected, (state) => {
        state.setFavourite.status = 'failed'
      })
      .addCase(deleteFavourite.pending, (state) => {
        state.deleteFavourite.status = 'loading'
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.deleteFavourite.status = 'idle'
      })
      .addCase(deleteFavourite.rejected, (state) => {
        state.deleteFavourite.status = 'failed'
      })
  },
})

export const selectFetchFavouriteStatus = (state: RootState) =>
  state.favouriteSlice.favourites.status
export const selectDeleteFavouriteStatus = (state: RootState) =>
  state.favouriteSlice.deleteFavourite.status
export const selectSetFavouriteStatus = (state: RootState) =>
  state.favouriteSlice.setFavourite.status

export const selectFavouriteCollection = (state: RootState) =>
  state.favouriteSlice.favourites.collection

export const selectIsFavourite = (state: RootState) => (id: Trailer['id']) => {
  return state.favouriteSlice.favourites.collection.find(
    (item) => item.trailerId === id
  )
}

export const {} = favouritesSlice.actions

export default favouritesSlice.reducer
