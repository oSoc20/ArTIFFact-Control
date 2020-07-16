import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { isBefore, setHours, setMinutes, setSeconds, setMilliseconds, getDaysInMonth } from 'date-fns';
// Icons
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import ReportsTable from 'Components/ReportsTable/ReportsTable';
import ReportDetails from 'Components/ReportDetails/ReportDetails';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            textAlign: "center",
            marginTop: "2rem",
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
        },
        box: {
            marginBottom: '15px'
        }
    })
);

/* COMPONENT */
const Reports = () => {
    const classes = useStyles();
    const [report, setReport] = React.useState<Report | null>(null);
    var reportsData: Report[] = [
        { name: 'Tifffile01.tiff', date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile01.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile02.tiff', date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile02.tiff', result: false, errors: 2, passed: 3, score: 40 },
        { name: 'Tifffile03.tiff', date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile03.tiff', result: false, errors: 7, passed: 3, score: 0 },
        { name: 'Tifffile04.tiff', date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile04.tiff', result: false, errors: 5, passed: 3, score: 20 },
        { name: 'Tifffile05.tiff', date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile05.tiff', result: false, errors: 1, passed: 3, score: 90 },
        { name: 'Tifffile.tiff', date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile.tiff', date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile.tiff', date: new Date('07/16/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile.tiff', date: new Date('07/17/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile.tiff', date: new Date('08/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile.tiff', date: new Date('08/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile.tiff', date: new Date('08/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile.tiff', date: new Date('08/16/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { name: 'Tifffile06.tiff', date: new Date('08/17/2020'), files: 27, input: '/users/name/file/Tifffile06.tiff', result: false, errors: 2, passed: 3, score: 50 },
        { name: 'Tifffile.tiff', date: new Date('08/17/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 1, passed: 3, score: 60 }
    ];
    const [reports, setReports] = React.useState(reportsData);

    const removeReport = (index: number) => {
        let tempReports = [...reports];
        tempReports.splice(index, 1);
        setReports(tempReports);
    }

    const removeReportsOlderThan = (date: Date | null) => {
        if (date !== null) {
            let tempReports = [...reports];
            let selectedDate = date;
            selectedDate = setHours(selectedDate, 0);
            selectedDate = setMinutes(selectedDate, 0);
            selectedDate = setSeconds(selectedDate, 0);
            selectedDate = setMilliseconds(selectedDate, 0);

            tempReports = tempReports.filter(report => {
                let reportDate = report.date;
                reportDate = setHours(reportDate, 0);
                reportDate = setMinutes(reportDate, 0);
                reportDate = setSeconds(reportDate, 0);
                reportDate = setMilliseconds(reportDate, 0);
                return !isBefore(reportDate, selectedDate);
            });
            setReports(tempReports);
        }
    }

    const clearReports = () => {
        setReports([]);
    }

    return (
        <>
            <Typography component="span" gutterBottom className={classes.title}>
                <div>
                    <Box fontSize='h4.fontSize' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <img src={RatingsIcon} className={classes.titleIcon} />
                        <span>
                            Reports
                            {report !== null ?
                                ": " + report.name
                                : null
                            }
                        </span>
                    </Box>
                    {report === null ?
                        <span style={{ fontSize: '16px' }}>Click on an item to see the full report</span>
                        : null
                    }
                </div>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={11} style={{ display: 'flex', margin: 'auto' }}>
                    {report === null ?
                        <ReportsTable reports={reports} removeReport={removeReport} removeReportsOlderThan={removeReportsOlderThan} clearReports={clearReports} setReport={setReport} />
                        : <ReportDetails report={report} setReport={setReport} />
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default (Reports);