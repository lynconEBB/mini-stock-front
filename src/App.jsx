import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import theme from './theme'
import Routes from './routes'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes/>
    </ThemeProvider>
  )
}

export default App
