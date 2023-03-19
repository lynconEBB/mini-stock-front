import { Alert, CssBaseline, Snackbar } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import theme from './theme'
import Routes from './routes'
import { ProvideAuth } from './hooks/useAuth'
import { useState } from 'react'
import MessageContext from './contexts/messageContext'



function App() {
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [severity, setSeverity] = useState("error");

  const showMessage = (value, severity) => {
    setMessageText(value);
    setSeverity(severity);
    setMessageOpen(true);
  }

  return (
    <ProvideAuth>
      <MessageContext.Provider value={ {showMessage} }>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
        <Snackbar open={messageOpen}
          autoHideDuration={6000}
          onClose={() => setMessageOpen(false)}>
          <Alert variant="filled" severity={severity}>{messageText}</Alert>
        </Snackbar>
      </MessageContext.Provider>
    </ProvideAuth>
  )
}

export default App
