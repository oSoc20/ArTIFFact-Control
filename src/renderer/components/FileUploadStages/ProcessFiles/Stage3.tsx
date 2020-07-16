import * as React from 'react';
import { Box, Divider, makeStyles, createStyles, Theme, LinearProgress, Typography, withStyles } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            marginBottom: "1rem",
            marginLeft: "22px",
            marginRight: "22px",
            height: "1px",
            backgroundColor: "#2A4B5B"
        },
        progressBar: {
            marginTop: "100px",
            marginBottom: "150px",
            marginLeft: "65px",
            marginRight: "65px",
            height: "20px",
            borderRadius: "12px",
            background: "#E0E0E0"
        }
    })
);

const ProgressBar = withStyles((theme) => (
    {
        root: {
            height: 20,
            borderRadius: 12,
            margin: "100px 65px 100px"
        },
        colorPrimary: {
            backgroundColor: "#E0E0E0"
        },
        bar: {
            backgroundColor: "#54C77B"
        }

    }
))(LinearProgress);


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
            <ProgressBar value={50} variant={"determinate"} />
        </>
    );
}

export default Stage3