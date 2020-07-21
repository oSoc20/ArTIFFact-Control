import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles, Paper, Container } from '@material-ui/core';
import LastReports from '../../components/LastReports/LastReports';
import LastConfigurations from '../../components/LastConfigurations/LastConfigurations';
import LastPeriodicalChecks from '../../components/LastPeriodicalChecks/LastPeriodicalChecks';
import { useMainStyles } from 'Theme/Main';

/* COMPONENT */
const Dashboard = () => {
    const mainClasses = useMainStyles();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} xl={10} style={{margin: 'auto'}}>
                    <Typography component="span" gutterBottom>
                        <Box fontSize='h4.fontSize' fontFamily='"DIN 2014"'>
                            Dashboard
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12} xl={10} style={{margin: 'auto'}}>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12} lg={7} style={{display: 'flex'}}>
                            <LastReports />
                        </Grid>
                        <Grid item xs={12} lg={5} style={{display: 'flex'}}>
                            <LastConfigurations />
                        </Grid>
                        <Grid item xs={12}>
                            <LastPeriodicalChecks />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default (Dashboard);