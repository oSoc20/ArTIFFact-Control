import { makeStyles, createStyles, Theme } from "@material-ui/core";

/* OTHERS */
export const useMainStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
            minHeight: '100vh',
            overflowY: 'hidden',
            backgroundColor: theme.palette.grey[200]
        },
        paper: {
            flex: '1 1 0',
            minWidth: 0,
            padding: theme.spacing(2),
            color: 'black',
            background: theme.palette.grey[100],
            boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px'
        },
        topTitle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            textAlign: "center",
            marginTop: "1.5rem",
            fontFamily: "DIN 2014",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "36px",
            lineHeight: "46px",
            color: theme.palette.primary.dark
        },
        topTitleIcon: {
            width: '50px',
            marginRight: '20px'
        },
        boxTitle: {
            display: 'flex',
            alignItems: 'center'
        },
        titleIcon: {
            marginRight: '20px',
            width: '40px'
        }
    })
);