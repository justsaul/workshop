import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Paper } from '@mui/material'

import { store } from 'src/store/store'
import { ToolBar } from 'src/components/ToolBar'
import { Theme } from 'src/components/Theme'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Theme>
          <Paper>
            <ToolBar />
            <App />
          </Paper>
        </Theme>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
