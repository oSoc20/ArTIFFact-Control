import * as React from 'react';
// Themes
import { useMainStyles } from 'Theme/Main';
import { TableCell, StyledTableRow1, useTableStyles } from 'Theme/Table';
// Material UI
import { Paper, makeStyles, Theme, createStyles, Typography, Button, Grid, Box, TableContainer, Table, TableHead, TableRow, TableBody, Tooltip } from '@material-ui/core';
import FormatCardList from 'Components/FormatCardList/FormatCardList';
// Icons
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import DeleteBinIcon from 'Assets/icons/icons8-delete-bin-500.svg';
import FolderIcon from 'Assets/icons/folder.svg';
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import DoughnutChart from 'Components/DoughnutChart/DoughnutChart';
import { shell } from 'electron';
import { format } from 'date-fns';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            fontSize: '16px',
            fontWeight: 700,
            color: theme.palette.primary.main
        }
    })
);

/* INTERFACE */
interface ReportsDetailsProps {
    reportParent: ReportParent;
    setReportParent?: (report: ReportParent | null) => void;
    removeReportParent?: (report: ReportParent) => void;
}

/* COMPONENT */
const ReportDetails = (props: ReportsDetailsProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();

    const directory = props.reportParent !== null ? props.reportParent.reports[0].filePath.replace(props.reportParent.reports[0].fileName, '') : '';
    const date = format(props.reportParent.reports[0].date, "dd/MM/yyyy hh:mm:ss a");
    const files = props.reportParent.reports.length;
    let result = true; let errors = 0; let passed = 0; let warnings = 0; let score = 0;
    props.reportParent.reports.forEach(report => {
        if (!report.result)
            result = false;
        if (report.errors !== undefined)
            errors += report.errors;
        if (report.passed !== undefined)
            passed += report.passed;
        if (report.warnings !== undefined)
            warnings += report.warnings;
    });
    score = passed / (errors + passed + warnings) * 100

    return <>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={7} style={{ display: 'flex' }}>
                <Paper className={mainClasses.paper}>
                    <Typography component='span'>
                        <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                            Summary
                        </Box>
                    </Typography>
                    <Grid container style={{ marginTop: '10px' }}>
                        <Grid item xs={6}>
                            <DoughnutChart labels={['Errors', 'passed', 'passed with warnings']} values={[errors, passed, warnings]} textValue={score + '%'} />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <ClearIcon style={{ color: '#F02929' }} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{errors} Error</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckIcon style={{ color: '#54C77B' }} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{passed} passed</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <WarningRoundedIcon style={{ color: '#F69947' }} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{warnings} passed with warnings</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={5} style={{ display: 'flex' }}>
                <Paper className={mainClasses.paper}>
                    <Typography component='span'>
                        <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                            Data
                        </Box>
                    </Typography>
                    <Grid container spacing={1} style={{ marginTop: '10px' }}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={classes.label}>Date</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{ fontSize: '16px' }}>{date}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={classes.label}>Files</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{ fontSize: '16px' }}>{files}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={classes.label}>Score</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{ fontSize: '16px' }}>{score}%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', marginTop: '15px', justifyContent: 'flex-end' }}>
                            <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => shell.openPath(directory)}><img src={FolderIcon} style={{ width: '20px', marginRight: '8px' }} /> See report in directory</Button>
                            {props.removeReportParent !== undefined ?
                                <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => props.removeReportParent!(props.reportParent)}><img src={DeleteBinIcon} style={{ width: '20px', marginRight: '8px' }} /> Delete report</Button>
                                : null
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {props.reportParent.formats !== undefined && props.reportParent.formats !== null && props.reportParent.formats.length > 0 ?
                <Grid item xs={12}>
                    <Paper className={mainClasses.paper}>
                        <Typography component='span'>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Download the report
                            </Box>
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '5px' }}>
                            <FormatCardList formats={props.reportParent.formats} />
                            <Button style={{ fontSize: '16px', textTransform: 'none', marginLeft: 'auto', display: 'flex', marginBottom: 0 }}><img src={RatingsIcon} style={{ width: '20px', marginRight: '8px' }} /> Generate all exports formats</Button>
                        </div>
                    </Paper>
                </Grid>
                : null
            }
            <Grid item xs={12}>
                <Paper className={mainClasses.paper}>
                    <Typography component='span'>
                        <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                            Individual reports
                        </Box>
                    </Typography>
                    {props.reportParent !== undefined && props.reportParent !== null ?
                        <TableContainer style={{ marginTop: '20px' }}>
                            <Table aria-label="span" size="small">
                                <TableHead>
                                    <TableRow className={tableClasses.tableHeadRow}>
                                        <TableCell className={tableClasses.tableHeadCell}>Result</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Name</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Path</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Error</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Passed</TableCell>
                                        {props.reportParent.formats !== undefined && props.reportParent.formats !== null && props.reportParent.formats.length > 0 ?
                                            <TableCell className={tableClasses.tableHeadCell}>Formats</TableCell>
                                            : null
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.reportParent.reports.map((report, index) => {
                                        return (
                                            <StyledTableRow1 key={index}>
                                                <TableCell>
                                                    {report.result ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />}
                                                </TableCell>
                                                <TableCell>
                                                    {report.fileName}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title={directory} aria-label={directory} placement="bottom">
                                                        <div style={{ maxWidth: '275px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{directory}</div>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    {report.errors}
                                                </TableCell>
                                                <TableCell>
                                                    {report.passed}
                                                </TableCell>
                                                {report.formats !== undefined && report.formats !== null && report.formats.length > 0 ?
                                                    <TableCell>
                                                        <FormatCardList formats={report.formats} listWidth='200px' cardsWidth='34px' cardsHeight='41px' />
                                                    </TableCell>
                                                    : null
                                                }
                                            </StyledTableRow1>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : <Typography style={{ marginTop: '15px' }}>No data found.</Typography>
                    }
                </Paper>
            </Grid>
        </Grid>
    </>
}

export default (ReportDetails);