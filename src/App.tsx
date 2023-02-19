import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { Landing } from 'src/pages/Landing'
import { TrailerDetails } from 'src/pages/TrailerDetails'
import { FavouritesPage } from 'src/pages/Favorites'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <main>
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
            {['home', 'favourites'].map((item) => (
              <Button
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
      <div style={{ paddingTop: '100px' }}>
        <Routes>
          <Route path={'/'} element={<Landing />} />
          <Route path={'/:id'} element={<TrailerDetails />} />
          <Route path={'/favourites'} element={<FavouritesPage />} />
        </Routes>
      </div>
    </main>
  )
}

export default App
