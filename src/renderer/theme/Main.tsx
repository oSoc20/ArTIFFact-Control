import { makeStyles, createStyles, Theme, createMuiTheme } from "@material-ui/core";

/* MAIN CONFIGURATION */
export const theme = createMuiTheme({
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
            "100": '#F2F2F2',
            "200": '#E9E9E9',
            "300": '#959595'
        }
    }
});

/* OTHERS */
export const useMainStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            flex: '1 1 0', 
            minWidth: 0,
            padding: theme.spacing(2),
            color: 'black',
            background: '#FCFCFC',
            boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px'
        }
    })
);