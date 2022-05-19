import { createTheme } from '@mui/material'

interface PaletteColor {
    light?: string
    main: string
    dark?: string
    contrastText?: string
}

const theme = createTheme({
    typography: {
        fontFamily: ["'Poppins'", 'sans-serif'].join(','),
        fontSize: 12,
        htmlFontSize: 10,
        h1: {
            fontSize: '4.8rem',
            fontWeight: '700',
        },
        h2: {
            fontSize: '4rem',
            fontWeight: '700',
        },
        h3: { fontSize: '3.2rem', fontWeight: '500' },
        h4: { fontSize: '2.4rem', fontWeight: '500' },
        subtitle1: { fontSize: '2rem', fontWeight: '500' },
        subtitle2: { fontSize: '1.6rem', fontWeight: '500' },
        body1: { fontSize: '2rem', fontWeight: '400' },
        body2: { fontSize: '1.6rem', fontWeight: '400' },
        caption: { fontSize: '1.4rem', fontWeight: '400' },
    },
    palette: {
        primary: {
            main: '#17A2B8',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ADB5BD',
            contrastText: '#344258',
        },
        success: {
            main: '#28A745',
            contrastText: '#ffffff',
        },
        info: {
            main: '#17A2B8',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#FFC107',
            contrastText: '#ffffff',
        },
        error: {
            main: '#DC3545',
            contrastText: '#ffffff',
        },
    },
})

export default theme
