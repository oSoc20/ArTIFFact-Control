import * as React from 'react';
import { Box, Divider, makeStyles, createStyles, Theme, LinearProgress, Typography, withStyles, CircularProgress as Spinner } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            marginBottom: "1rem",
            marginLeft: "22px",
            marginRight: "22px",
            height: "1px",
            backgroundColor: "#2A4B5B"
        },
        progressContainer: {
            margin: "100px 65px 100px",
            textAlign: "center",
            "& small": {
                fontFamily: "'DIN 2014'",
            }
        },

    })
);

const ProgressBar = withStyles((theme) => (
    {
        root: {
            height: 20,
            borderRadius: 12,
            marginBottom: "3px"
        },
        colorPrimary: {
            backgroundColor: "#E0E0E0"
        },
        bar: {
            backgroundColor: "#54C77B"
        }

    }
))(LinearProgress);



interface CheckProgressProps {
    current: number;
    max: number;
}

const CheckProgress = (props: CheckProgressProps) => {
    const classes = useStyles();

    const getProgressValue = () => {
        return props.current * 100 / props.max;
    }

    const finished = () => props.current === props.max

    return (
        <div className={classes.progressContainer}>
            <ProgressBar value={getProgressValue()} variant={"determinate"} />
            {finished()? <small>Done!</small> : <small><Spinner size={"10px"}/> Checking file {props.current} of {props.max}</small>}
        </div>
    );
}


const Stage3 = () => {
    const classes = useStyles();

    return (
        <>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '22px', textAlign: "center" }}>
                    Checking the files...
                </Box>
            </Typography>
            <Divider className={classes.divider} />
            <CheckProgress current={10} max={100} />
        </>
    );
}

export default Stage3