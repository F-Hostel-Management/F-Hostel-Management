import React from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@mui/material'

import App from './App'
import theme from './theme/CustomMUI'
import GlobalStyles from './theme/GlobalStyles'
import { store } from './stores/reduxStore'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'

import { RestCaller } from './utils/RestCaller'
import { setCurrentUser, setIsAuthenticated } from './slices/authSlice'
import { IUser } from './interface/IUser'

const startup = async () => {
    const response = await RestCaller.get('Users/info')
    if (!response || response.isError)
        return store.dispatch(setIsAuthenticated(false))

    const result: IUser = response.result
    store.dispatch(setCurrentUser(result))
}

;(async () => {
    await startup()
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <Provider store={store}>
                <GlobalStyles>
                    <ThemeProvider theme={theme}>
                        <App />
                        <ToastContainer />
                    </ThemeProvider>
                </GlobalStyles>
            </Provider>
        </React.StrictMode>
    )
})()
