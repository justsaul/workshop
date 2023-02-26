import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import trailerSlice from './trailerSlice'
import trailerDetailsSlice from './trailerDetailsSlice'
import interestSlice from './inteterestsSlice'
import themeSlice from './themeSlice'
import favouriteSlice from './favouritesSlice'

export const store = configureStore({
  reducer: {
    trailerSlice,
    interestSlice,
    favouriteSlice,
    trailerDetailsSlice,
    themeSlice,
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
