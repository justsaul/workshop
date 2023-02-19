import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import trailerSlice from './trailerSlice'
import interestSlice from './inteterestsSlice'
import favouriteSlice from './favouritesSlice'

export const store = configureStore({
  reducer: {
    trailers: trailerSlice,
    interest: interestSlice,
    favourite: favouriteSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
