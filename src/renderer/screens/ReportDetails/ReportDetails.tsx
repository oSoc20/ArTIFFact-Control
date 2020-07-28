import * as React from 'react';
// Material UI
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { format } from 'date-fns';
// Icons
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import ReportDetailsComponent from 'Components/ReportDetails/ReportDetails';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import { useMainStyles } from 'Theme/Main';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

/* COMPONENT */
const ReportDetails = () => {
    const mainClasses = useMainStyles();
    const history = useHistory();
    const location = useLocation();
    const reportParent: ReportParent = location.state.reportParent;
    const backButton: Boolean = location.state.backButton;
    const removeButton: Boolean = location.state.removeButton;

    console.log(reportParent);

    return (
        <>
            <Typography component="span" gutterBottom className={mainClasses.topTitle}>
                <div>
                    <Box fontSize='h4.fontSize' className={mainClasses.boxTitle} style={{ justifyContent: 'center' }}>
                        <img src={RatingsIcon} className={mainClasses.topTitleIcon} />
                        <span>
                            {"Report: " + format(reportParent.reports[0].date, "dd/MM/yyyy")}
                        </span>
                    </Box>
                </div>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} xl={10} style={{ margin: 'auto' }}>
                    {backButton ?
                        <Button style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }} onClick={() => { history.go(-1) }}><img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back</Button>
                        : null
                    }
                    <ReportDetailsComponent reportParent={reportParent} removeButton={removeButton} />
                </Grid>
            </Grid>
        </>
    )
}

export default withRouter(ReportDetails);