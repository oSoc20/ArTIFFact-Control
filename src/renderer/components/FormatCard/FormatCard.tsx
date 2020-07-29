import * as React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { format } from 'date-fns';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            background: theme.palette.grey[400],
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '.2s .2s all',
            position: 'relative',
            bottom: '0px',
            '&:hover': {
                cursor: 'pointer',
                bottom: '3px'
            }
        }
    })
);

/* INTERFACE */
interface FormatCardProps {
    format: Format,
    color?: string,
    width?: string,
    height?: string
}

/* COMPONENT */
const FormatCard = (props: FormatCardProps) => {
    const classes = useStyles();
    const color = props.color !== null ? props.color : undefined;
    const width = props.width !== undefined ? props.width : '65px';
    const height = props.height !== undefined ? props.height : '79px';
    const size = width !== undefined ? width.replace('px', '') : '';
    const fontSize= (Number.parseInt(size) / 4) + 'px'; 
    const borderRadius = (Number.parseInt(size) / 5) + 'px'; 

    return <>
        <div key={props.format.title} style={{ backgroundColor: color, borderRadius: borderRadius, width: width, height: height }} className={classes.card}>
            <Typography style={{fontSize: fontSize}}>{props.format.title.toUpperCase()}</Typography>
        </div>
    </>
}

export default (FormatCard);