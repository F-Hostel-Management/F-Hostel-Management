import React from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import GlobalStyles from './components/GlobalStyles'
import { ThemeProvider } from '@mui/material'

import App from './App'
import { store } from './stores/reduxStore'
import theme from './theme/'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </GlobalStyles>
        </Provider>
    </React.StrictMode>
)
