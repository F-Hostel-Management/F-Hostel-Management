import React from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@mui/material'

import App from './App'
import theme from './theme/CustomMUI'
import GlobalStyles from './theme/GlobalStyles'
import { store } from './stores/reduxStore'

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
