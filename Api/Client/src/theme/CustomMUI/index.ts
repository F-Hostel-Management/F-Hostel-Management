import { createTheme } from '@mui/material'
declare module '@mui/material/styles/createPalette' {
    interface Palette {
        purple: Palette['primary']
        pink: Palette['primary']
        white: Palette['primary']
        green: Palette['primary']
        gray: Palette['primary']
        orange: Palette['primary']
    }
    interface PaletteOptions {
        purple: PaletteOptions['primary']
        pink: PaletteOptions['primary']
        white: PaletteOptions['primary']
        green: PaletteOptions['primary']
        gray: PaletteOptions['primary']
        orange: PaletteOptions['primary']
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        purple: true
        green: true
        pink: true
        white: true
        gray: true
        orange: true
    }
}

declare module '@mui/material/Badge' {
    interface BadgePropsColorOverrides {
        purple: true
        green: true
        pink: true
        white: true
        gray: true
        orange: true
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        purple: true
        green: true
        pink: true
        white: true
        gray: true
        orange: true
        [key: string]: true
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        purple: true
        green: true
        pink: true
        white: true
        gray: true
        orange: true
        [key: string]: true
    }
}

const theme = createTheme({
    typography: {
        fontSize: 14,
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
            contrastText: '#fff',
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
        purple: {
            main: '#6F42C1',
            contrastText: '#ffffff',
        },
        pink: {
            main: '#E83E8C',
            contrastText: '#ffffff',
        },
        green: {
            main: '#28A745',
            contrastText: '#ffffff',
        },
        gray: {
            main: '#495057',
            contrastText: '#ffffff',
        },
        orange: {
            main: '#f96332',
            contrastText: '#ffffff',
        },
        white: {
            main: '#FFFF',
            contrastText: '#212529',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
})

export default theme
