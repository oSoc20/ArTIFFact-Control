import * as React from 'react';
// Material UI
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { format } from 'date-fns';
// Icons
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import ReportDetailsComponent from 'Components/ReportDetails/ReportDetails';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import { useMainStyles } from 'Theme/Main';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from 'src/renderer/reducers';
import { ReportsAction } from 'Actions/ReportActions';
import { connect } from 'react-redux';

/* INTERFACE */
interface ReportDetailsProps {
    report: ReportParent | null
}

/* COMPONENT */
const ReportDetails = (props: ReportDetailsProps) => {
    const mainClasses = useMainStyles();
    const history = useHistory();
    const location = useLocation();

    const reportParent: ReportParent = props.report!;
    const backButton: Boolean = (new URLSearchParams(location.search)).get("backButton")?.toLocaleLowerCase() === "true" ? true : false;
    const removeButton: Boolean = (new URLSearchParams(location.search)).get("removeButton")?.toLocaleLowerCase() === "true" ? true : false;

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

/* REDUX STORE */
const mapStateToProps = (state: RootState) => ({
    report: state.reports.report
});

const mapDispatchToProps = (dispatch: React.Dispatch<ReportsAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails);