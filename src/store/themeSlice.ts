import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/store/store'

export interface ThemeState {
  theme: 'dark' | 'light'
}

const initialState: ThemeState = {
  theme: 'dark',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState['theme']>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      const oppositeTheme = state.theme === 'dark' ? 'light' : 'dark'
      state.theme = oppositeTheme
    },
  },
})

export const selectTheme = (state: RootState) => state.themeSlice.theme

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
