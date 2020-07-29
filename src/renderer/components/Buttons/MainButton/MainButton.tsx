import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, ButtonProps, Typography } from '@material-ui/core';

interface mainButtonProps extends ButtonProps {
    children: string | React.ReactNode;

    /* when containing paper has a fixed height add absolute prop */
    absolute?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainButtonAbsolute: {
            display: 'flex',
            position: 'absolute',
            bottom: '38px',
            right: '38px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '12px',
            color: '#FCFCFC',
            padding: '6px 30px',
            fontFamily: "'Open Sans'",
            textTransform: 'none',
            height: "45px",
            '&:disabled': {
                backgroundColor: theme.palette.grey[300],
                color: '#FCFCFC',
            },
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: '#FCFCFC',
            },
        },
        mainButton: {
            display: 'flex',
            margin: ' 30px 22px 0 auto',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '12px',
            color: '#FCFCFC',
            padding: '6px 30px',
            fontFamily: "'Open Sans'",
            textTransform: 'none',
            height: "45px",
            '&:disabled': {
                backgroundColor: theme.palette.grey[300],
                color: '#FCFCFC',
            },
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: '#FCFCFC',
            },
        },
    })
);


const MainButton = (props: mainButtonProps) => {
    const classes = useStyles();

    return (
        <Button {...props} className={props.absolute ? classes.mainButtonAbsolute : classes.mainButton}>
            {props.children}
        </Button>
    );
}

export default MainButton;