import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { isBefore, setHours, setMinutes, setSeconds, setMilliseconds, format } from 'date-fns';
// Icons
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import ReportsTable from 'Components/ReportsTable/ReportsTable';
import ReportDetails from 'Components/ReportDetails/ReportDetails';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import { useMainStyles } from 'Theme/Main';

/* COMPONENT */
const Reports = () => {
    const mainClasses = useMainStyles();
    const [reportParent, setReportParent] = React.useState<ReportParent | null>(null);
    const [reportParents, setReportParents] = React.useState<Array<ReportParent> | null>([
        {
            reports: [
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date(), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }] },
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date(), result: false, errors: 1, passed: 0, warnings: 0, score: 0, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }] },
            ],
            formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }]
        },
        {
            reports: [
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020 17:52:16'), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }] },
            ],
            formats: null
        }
    ]);

    const removeReportParent = (reportParent: ReportParent) => {
        if (reportParents !== null && reportParents.length > 0) {
            let tempReportParents = [...reportParents];
            let index = tempReportParents.indexOf(reportParent);
            tempReportParents.splice(index, 1);
            setReportParents(tempReportParents);
            setReportParent(null);
        }
    }

    const removeReportsOlderThan = (date: Date | null) => {
        if (date !== null && reportParents !== null && reportParents.length > 0) {
            let tempReportParents = [...reportParents];
            let selectedDate = date;
            selectedDate = setHours(selectedDate, 0);
            selectedDate = setMinutes(selectedDate, 0);
            selectedDate = setSeconds(selectedDate, 0);
            selectedDate = setMilliseconds(selectedDate, 0);

            tempReportParents = tempReportParents.filter((reportParent: ReportParent) => {
                let report: Report = reportParent.reports[0];
                let reportDate = report.date;
                reportDate = setHours(reportDate, 0);
                reportDate = setMinutes(reportDate, 0);
                reportDate = setSeconds(reportDate, 0);
                reportDate = setMilliseconds(reportDate, 0);
                return !isBefore(reportDate, selectedDate);
            });
            setReportParents(tempReportParents);
        }
    }

    const clearReportParents = () => {
        setReportParents([]);
    }

    return (
        <>
            <Typography component="span" gutterBottom className={mainClasses.topTitle}>
                <div>
                    <Box fontSize='h4.fontSize' className={mainClasses.boxTitle} style={{justifyContent: 'center'}}>
                        <img src={RatingsIcon} className={mainClasses.topTitleIcon} />
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
                        <ReportsTable reportParents={reportParents} removeReportParent={removeReportParent} removeReportParentsOlderThan={removeReportsOlderThan} clearReportParents={clearReportParents} setReportParent={setReportParent} />
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

export default (Reports);