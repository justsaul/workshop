import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Landing } from 'src/pages/Landing'
import { TrailerDetails } from 'src/pages/TrailerDetails'
import { FavouritesPage } from 'src/pages/Favorites'

function App() {
  return (
    <div style={{ paddingTop: '100px' }}>
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/:id'} element={<TrailerDetails />} />
        <Route path={'/favourites'} element={<FavouritesPage />} />
      </Routes>
    </div>
  )
}

export default App
