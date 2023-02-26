import React, { useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { selectTheme } from 'src/store/themeSlice'
import { useAppSelector } from 'src/store/hooks'

type ThemeProps = {
  children: React.ReactNode
}

export const Theme: React.FC<ThemeProps> = ({ children }) => {
  const theme = useAppSelector(selectTheme)

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  )

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}
