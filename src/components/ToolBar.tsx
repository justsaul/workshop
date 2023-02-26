import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Toolbar, Typography, AppBar } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectTheme, toggleTheme } from 'src/store/themeSlice'

export const ToolBar = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          YouFlix
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button
            key={`button-theme-switch`}
            component={Button}
            sx={{ color: '#fff' }}
            onClick={() => {
              dispatch(toggleTheme())
            }}
          >
            {theme === 'dark' ? <DarkMode /> : <LightMode />}
          </Button>
          {['home', 'favourites'].map((item) => (
            <Button
              key={`button-${item}`}
              component={Link}
              to={item === 'home' ? '/' : item}
              sx={{ color: '#fff' }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
