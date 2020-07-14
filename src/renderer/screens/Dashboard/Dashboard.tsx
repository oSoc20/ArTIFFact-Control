import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import LastReports from '../../components/LastReports/LastReports';
import LastConfigurations from '../../components/LastConfigurations/LastConfigurations';
import LastPeriodicalChecks from '../../components/LastPeriodicalChecks/LastPeriodicalChecks';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            marginBottom: '15px'
        }
    })
);

/* COMPONENT */
function Dashboard() {
    const classes = useStyles();

    return (
        <>
            <Typography component="span" gutterBottom>
                <Box fontSize='h4.fontSize' fontFamily='"DIN 2014"' className={classes.box}>
                    Dashboard
                </Box>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={7} style={{display: 'flex'}}>
                    <LastReports />
                </Grid>
                <Grid item xs={12} lg={5} style={{display: 'flex'}}>
                    <LastConfigurations />
                </Grid>
                <Grid item xs={12} style={{display: 'flex'}}>
                    <LastPeriodicalChecks />
                </Grid>
            </Grid>
        </>
    )
}

export default (Dashboard);