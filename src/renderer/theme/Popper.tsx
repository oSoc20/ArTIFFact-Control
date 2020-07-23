import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const usePopperStyles = makeStyles((theme: Theme) =>
    createStyles({
        popper: {
            padding: theme.spacing(2),
            color: 'black',
            background: theme.palette.grey[100],
            boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
        },
        closeIcon: {
            color: theme.palette.grey[400],
            "&:hover": {
                color: 'black',
                cursor: 'pointer'
            }
        }
    })
);