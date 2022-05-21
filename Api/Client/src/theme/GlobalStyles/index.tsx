import React, { FC } from 'react'

import { createGlobalStyle } from 'styled-components'

import './GlobalStyles.css'

interface Props {
    children: React.ReactElement
}

const GlobalStyle = createGlobalStyle`
:root {
    --color-primary: #17A2B8;
    --color-secondary: #ADB5BD;
    --color-green: #28A745;
    --color-blue: #0d6efd;
    --color-yellow: #FFC107;
    --color-red: #DC3545;
    --color-purple: #6F42C1;
    --color-white: #FFFF;
    --color-pink: #E83E8C;
    --color-gray-100: #f8f9fa;
    --color-gray-200: #e9ecef;
    --color-gray-300: #dee2e6;
    --color-gray-400: #ced4da;
    --color-gray-500: #ebebee;
    --color-gray-600: #6c757d;
    --color-gray-700: #495057;
    --color-gray-800: #343a40;
    --color-gray-900: #212529;

    --bgr-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
    --text-color-dark: #212529;
    --text-color-light: #5b626b;

    --nav-height: 60px;
}
`

const GlobalStyles: FC<Props> = ({ children }) => {
    return (
        <React.Fragment>
            <GlobalStyle />
            {children}
        </React.Fragment>
    )
}

export default GlobalStyles
