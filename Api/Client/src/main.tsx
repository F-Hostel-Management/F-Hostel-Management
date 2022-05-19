import React from 'react'

import ReactDOM from 'react-dom/client'

import { ThemeProvider } from '@mui/material'

import App from './App'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme/'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalStyles>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </GlobalStyles>
    </React.StrictMode>
)
