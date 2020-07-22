import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { isBefore, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';
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
        { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{title: 'HTML', url: null}, {title: 'PDF', url: null}, {title: 'XML', url: null}, {title: 'JSON', url: null}, {title: 'METS', url: null}] },
        { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: true, errors: 1, passed: 0, warnings: 0, score: 0, infos: 0, formats: [{title: 'HTML', url: null}, {title: 'PDF', url: null}, {title: 'XML', url: null}] },
    ];
    const [reports, setReports] = React.useState(reportsData);

    const removeReport = (report: Report) => {
        let tempReports = [...reports];
        let index = tempReports.indexOf(report);
        tempReports.splice(index, 1);
        setReports(tempReports);
        setReport(null);
    }

    const removeReportsOlderThan = (date: Date | null) => {
        if (date !== null) {
            let tempReports = [...reports];
            let selectedDate = date;
            selectedDate = setHours(selectedDate, 0);
            selectedDate = setMinutes(selectedDate, 0);
            selectedDate = setSeconds(selectedDate, 0);
            selectedDate = setMilliseconds(selectedDate, 0);

            tempReports = tempReports.filter((report: Report) => {
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
                            {report === null ?
                                "Reports"
                                : "Report: " + report.fileName
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
                <Grid item xs={12} xl={10} style={{margin: 'auto'}}>
                    {report === null ?
                        <ReportsTable reports={reports} removeReport={removeReport} removeReportsOlderThan={removeReportsOlderThan} clearReports={clearReports} setReport={setReport} />
                        : <ReportDetails report={report} setReport={setReport} removeReport={removeReport} />
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default (Reports);