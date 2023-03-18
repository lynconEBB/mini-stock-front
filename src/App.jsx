import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import theme from './theme'
import Routes from './routes'
import { ProvideAuth } from './hooks/useAuth'
import { useState } from 'react'

function App() {

  useState()

  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ProvideAuth>
  )
}

export default App
