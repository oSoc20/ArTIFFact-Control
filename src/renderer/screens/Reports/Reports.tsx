import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { isBefore, setHours, setMinutes, setSeconds, setMilliseconds, getDaysInMonth } from 'date-fns';
// Icons
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import ReportsTable from 'Components/ReportsTable/ReportsTable';

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
    var reportsData: Report[] = [
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/15/2020'), files: 27, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/16/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/16/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/16/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/16/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/17/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/17/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, score: 100 },
        { date: new Date('07/17/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, score: 100 }
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
                        <span>Reports</span>
                    </Box>
                    <span style={{ fontSize: '16px' }}>Click on an item to see the full report</span>
                </div>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={11} style={{ display: 'flex', margin: 'auto' }}>
                    <ReportsTable reports={reports} removeReport={removeReport} removeReportsOlderThan={removeReportsOlderThan} clearReports={clearReports} />
                </Grid>
            </Grid>
        </>
    )
}

export default (Reports);