import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { isBefore, setHours, setMinutes, setSeconds, setMilliseconds, format } from 'date-fns';
// Icons
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import ReportsTable from 'Components/ReportsTable/ReportsTable';
import ReportDetails from 'Components/ReportDetails/ReportDetails';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import { RootState } from 'src/renderer/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReportsAction, removeReports, loadReports } from 'Actions/ReportActions';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            textAlign: "center",
            marginTop: "1.5rem",
            fontFamily: "DIN 2014",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "36px",
            lineHeight: "46px",
            color: "#2A4B5B"
        },
        titleIcon: {
            width: '50px',
            marginRight: '20px'
        }
    })
);

interface ReportsProps {
    loadReports: () => void;
    removeReports: (reports: ReportParent) => void;
    reports: Array<ReportParent>;
}

/* COMPONENT */
const Reports = (props: ReportsProps) => {
    const classes = useStyles();
    const [reportParent, setReportParent] = React.useState<ReportParent | null>(null);

    React.useEffect(() => {
        props.loadReports();
    }, []);

    const removeReportParent = (reportParent: ReportParent) => {
        console.log('PARRY THIS CASUAL', reportParent, props.reports)
        if (props.reports !== null && props.reports.length > 0) {
            props.removeReports(reportParent);
            setReportParent(null);
        }
    }

    const removeReportsOlderThan = (date: Date | null) => {
        if (date !== null && props.reports !== null && props.reports.length > 0) {
            let tempReportParents = [...props.reports];
            let selectedDate = date;
            selectedDate = setHours(selectedDate, 0);
            selectedDate = setMinutes(selectedDate, 0);
            selectedDate = setSeconds(selectedDate, 0);
            selectedDate = setMilliseconds(selectedDate, 0);

            tempReportParents.forEach((reportParent: ReportParent) => {
                let report: Report = reportParent.reports[0];
                let reportDate = report.date;
                reportDate = setHours(reportDate, 0);
                reportDate = setMinutes(reportDate, 0);
                reportDate = setSeconds(reportDate, 0);
                reportDate = setMilliseconds(reportDate, 0);
                if(isBefore(reportDate, selectedDate)) {
                    props.removeReports(reportParent);
                }
            });
        }
    }

    const clearReportParents = () => {
        props.reports.forEach((reportParent: ReportParent) => {
            props.removeReports(reportParent);
        });
    }

    return (
        <>
            <Typography component="span" gutterBottom className={classes.title}>
                <div>
                    <Box fontSize='h4.fontSize' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <img src={RatingsIcon} className={classes.titleIcon} />
                        <span>
                            {reportParent === null ?
                                "Reports"
                                : "Report: " + format(reportParent.reports[0].date, "dd/MM/yyyy")
                            }
                        </span>
                    </Box>
                    {reportParent === null ?
                        <span style={{ fontSize: '16px' }}>Click on an item to see the full report</span>
                        : null
                    }
                </div>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} xl={10} style={{ margin: 'auto' }}>
                    {reportParent === null ?
                        <ReportsTable reportParents={props.reports} removeReportParent={removeReportParent} removeReportParentsOlderThan={removeReportsOlderThan} clearReportParents={clearReportParents} setReportParent={setReportParent} />
                        :
                        <>
                            <Button style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }} onClick={() => { setReportParent!(null) }}><img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back</Button>
                            <ReportDetails reportParent={reportParent} setReportParent={setReportParent} removeReportParent={removeReportParent} />
                        </>
                    }
                </Grid>
            </Grid>
        </>
    )
}

/* Redux functions */

/**
 * Function that maps all required state variables to props.
 * @param state Rootstate that has all reducers combined
 */
const mapStateToProps = (state: RootState) => ({
    reports: state.reports.reports
});

/**
 * Function that maps dispatch functions to props
 * @param dispatch the dispatch function used by Redux
 */
const mapDispatchToProps = (dispatch: Dispatch<ReportsAction>) => ({
    loadReports: () => dispatch(loadReports()),
    removeReports: (reports: ReportParent) => dispatch(removeReports(reports))
});


export default connect(mapStateToProps, mapDispatchToProps)(Reports);