import React from 'react'

import ReactDOM from 'react-dom/client'

import { ThemeProvider } from '@mui/material'

import App from './App'
import theme from './theme/CustomMUI'
import GlobalStyles from './theme/GlobalStyles'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalStyles>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </GlobalStyles>
    </React.StrictMode>
)
