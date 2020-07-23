import * as React from 'react';
import { useMainStyles } from 'Theme/Main';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import StatisticFileIcon from 'Assets/icons/icons8-combo-chart-500.svg';
import ConstructionFileIcon from 'Assets/icons/icons8-construction-500.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bigIcon: {
            width: '500px',
        },
        bigbox: {
            minHeight: '60vh',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
);

export default function Statistics() {
    const classes = useStyles();
    const mainClasses = useMainStyles();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={10} style={{ margin: 'auto' }}>
                    <Typography component="span" gutterBottom className={mainClasses.topTitle}>
                        <Box
                            fontSize="h4.fontSize"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img src={StatisticFileIcon} className={mainClasses.topTitleIcon} />
                            <span>Statistics</span>
                        </Box>
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10} style={{ margin: 'auto' }}>
                        <Paper className={`${mainClasses.paper} ${classes.bigbox}`}>
                            <Typography component="span" gutterBottom>
                                <Box
                                    fontSize="h6.fontSize"
                                    style={{ marginBottom: '40px', textAlign: 'center' }}
                                >
                                    In progress
                                </Box>
                            </Typography>
                            <img src={ConstructionFileIcon} className={classes.bigIcon} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
