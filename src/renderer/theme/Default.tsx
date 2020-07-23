import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

/* MAIN CONFIGURATION */
export const DefaultTheme = createMuiTheme({
    typography: {
        fontFamily: [
            "'Open Sans'",
            "sans-serif"
        ].join(','),
        fontSize: 16
    },
    palette: {
        primary: {
            main: '#2A4B5B',
            light: '#598AA3',
            dark: '#2A4B5B'
        },
        secondary: {
            main: '#F69947',
            light: '#EAAC75',
            dark: '#BD6F2B'
        },
        success: {
            main: '#54C77B'
        },
        error: {
            main: '#F02929'
        },
        grey: {
            "100": '#FCFCFC',
            "200": '#F2F2F2',
            "300": '#E9E9E9',
            "400": '#959595',
            "500": '#282828'
        }
    }
});