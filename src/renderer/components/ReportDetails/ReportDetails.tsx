import * as React from 'react';
// Material UI
import { Paper, makeStyles, Theme, createStyles, Typography, Button, Grid, Box } from '@material-ui/core';
// Icons
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            color: 'black',
            background: '#FCFCFC',
            boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px'
        }
    })
);

/* INTERFACE */
interface ReportsTableProps {
    report: Report;
    setReport: (report: Report | null) => void;
}

/* COMPONENT */
const ReportDetails = (props: ReportsTableProps) => {
    const classes = useStyles();

    return <>
        <div style={{ width: '100%' }}>
            <Button style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }} onClick={() => { props.setReport(null) }}><img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back</Button>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex' }}>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Summary
                            </Box>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex' }}>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Data
                            </Box>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex' }}>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Download the report
                            </Box>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex' }}>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Individual reports
                            </Box>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </>
}

export default (ReportDetails);