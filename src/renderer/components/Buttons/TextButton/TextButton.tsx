import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, ButtonProps, Typography } from '@material-ui/core';

interface textButtonProps extends ButtonProps {
    children: string;
    icon?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            border: 'none',
            marginRight: '2rem',
            backgroundColor: 'none',
            fontSize: '16px',
            textTransform: 'none',
            cursor: 'pointer',
            height: 'fit-content',
        },
    })
);


const TextButton = (props: textButtonProps) => {
    const classes = useStyles();

    return (
        <Button {...props} className={classes.textButton}>
            <img src={props.icon} style={{ width: '20px', marginRight: '8px' }} alt="icon" />
            {props.children}
        </Button>
    );
}

export default TextButton;