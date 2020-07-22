import * as React from 'react';
// Themes
import { useMainStyles } from 'Theme/Main';
import { TableCell, StyledTableRow1, useTableStyles } from 'Theme/Table';
// Material UI
import { Paper, makeStyles, Theme, createStyles, Typography, Button, Grid, Box, TableContainer, Table, TableHead, TableRow, TableBody, Tooltip } from '@material-ui/core';
import FormatCardList from 'Components/FormatCardList/FormatCardList';
// Icons
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
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
interface ReportsTableProps {
    report: Report;
    setReport: (report: Report | null) => void;
    removeReport: (report: Report) => void;
}

/* COMPONENT */
const ReportDetails = (props: ReportsTableProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();
    const directory = props.report.filePath.replace(props.report.fileName, '');

    return <>
        <Button style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }} onClick={() => { props.setReport(null) }}><img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back</Button>
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
                            <DoughnutChart labels={['Errors', 'passed', 'passed with warnings']} values={[props.report.errors!, props.report.passed!, props.report.warnings!]} textValue={props.report.score + '%'} />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <ClearIcon style={{ color: '#F02929' }} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{props.report.errors} Error</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckIcon style={{ color: '#54C77B' }} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{props.report.passed} passed</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <WarningRoundedIcon style={{ color: '#F69947' }} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{props.report.warnings} passed with warnings</Typography>
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
                                    <Typography style={{ fontSize: '16px' }}>{format(props.report.date, 'dd/MM/yyyy hh:mm:ss')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={classes.label}>Files</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{ fontSize: '16px' }}>1</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={classes.label}>Score</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{ fontSize: '16px' }}>{props.report.score}%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', marginTop: '15px', justifyContent: 'flex-end' }}>
                            <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => shell.openPath(directory)}><img src={FolderIcon} style={{ width: '20px', marginRight: '8px' }} /> See report in directory</Button>
                            <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => props.removeReport(props.report)}><img src={DeleteBinIcon} style={{ width: '20px', marginRight: '8px' }} /> Delete report</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={mainClasses.paper}>
                    <Typography component='span'>
                        <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                            Download the report
                        </Box>
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '5px' }}>
                        <FormatCardList formats={props.report.formats} />
                        <Button style={{ fontSize: '16px', textTransform: 'none', marginLeft: 'auto', display: 'flex', marginBottom: 0 }}><img src={RatingsIcon} style={{ width: '20px', marginRight: '8px' }} /> Generate all exports formats</Button>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={mainClasses.paper}>
                    <Typography component='span'>
                        <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                            Individual reports
                            </Box>
                    </Typography>
                    {props.report !== undefined ?
                        <TableContainer style={{ marginTop: '20px' }}>
                            <Table aria-label="span" size="small">
                                <TableHead>
                                    <TableRow className={tableClasses.tableHeadRow}>
                                        <TableCell className={tableClasses.tableHeadCell}>Result</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Name</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Path</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Error</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Passed</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Formats</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow1>
                                        <TableCell component="th" scope="row">
                                            {props.report.result ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {props.report.fileName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Tooltip title={directory} aria-label={directory} placement="bottom">
                                                <div style={{ maxWidth: '275px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{directory}</div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {props.report.errors}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {props.report.passed}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <FormatCardList formats={props.report.formats} listWidth='200px' cardsWidth='34px' cardsHeight='41px' />
                                        </TableCell>
                                    </StyledTableRow1>
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