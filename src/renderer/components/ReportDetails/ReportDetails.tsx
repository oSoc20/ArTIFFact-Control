import * as React from 'react';
// Material UI
import { Paper, makeStyles, Theme, createStyles, Typography, Button, Grid, Box, TableContainer, Table, TableHead, TableRow, TableBody, withStyles } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
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

/* STYLE */
const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            color: 'black',
            background: '#FCFCFC',
            boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            width: '100%'
        },
        tableHeadRow: {
            borderBottom: '1px solid black'
        },
        tableHeadCell: {
            color: '#39657B',
            fontWeight: 600
        },
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

    const toHHMMSS = (): string => {
        const secs = props.report.duration!.toString();
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":")
    }

    return <>
        <div style={{ width: '100%' }}>
            <Button style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }} onClick={() => { props.setReport(null) }}><img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back</Button>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={7} style={{ display: 'flex' }}>
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex' }}>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Summary
                            </Box>
                        </Typography>
                        <Grid container style={{ marginTop: '10px' }}>
                            <Grid item xs={6}>
                                <DoughnutChart labels={['Errors', 'passed', 'passed with warnings']} values={[props.report.errors!, props.report.passed!, props.report.warnings!]} focusedValue={props.report.passed} />
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
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex' }}>
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
                                        <Typography style={{ fontSize: '16px' }}>{props.report.date.toLocaleDateString()}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography className={classes.label}>Files</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography style={{ fontSize: '16px' }}>{props.report.files}</Typography>
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
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography className={classes.label}>Duration</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography style={{ fontSize: '16px' }}>{toHHMMSS()}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', marginTop: '15px', justifyContent: 'flex-end' }}>
                                <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => shell.openPath(props.report.input)}><img src={FolderIcon} style={{ width: '20px', marginRight: '8px' }} /> See report in directory</Button>
                                <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => props.removeReport(props.report)}><img src={DeleteBinIcon} style={{ width: '20px', marginRight: '8px' }} /> Delete report</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex', marginBottom: '10px' }}>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Download the report
                            </Box>
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <FormatCardList formats={props.report.formats} />
                            <Button style={{ fontSize: '16px', textTransform: 'none', marginLeft: 'auto', display: 'flex', marginBottom: 0 }}><img src={RatingsIcon} style={{ width: '20px', marginRight: '8px' }} /> Generate all reports</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <Paper className={classes.paper}>
                        <Typography component='span' style={{ display: 'flex' }}>
                            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                Individual reports
                            </Box>
                        </Typography>
                        {props.report !== undefined ?
                            <TableContainer style={{ marginTop: '20px' }}>
                                <Table aria-label="span" size="small">
                                    <TableHead>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell className={classes.tableHeadCell}>Result</TableCell>
                                            <TableCell className={classes.tableHeadCell}>Name</TableCell>
                                            <TableCell className={classes.tableHeadCell}>Path</TableCell>
                                            <TableCell className={classes.tableHeadCell}>Error</TableCell>
                                            <TableCell className={classes.tableHeadCell}>Passed</TableCell>
                                            <TableCell className={classes.tableHeadCell}>Formats</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow>
                                            <TableCell component="th" scope="row">
                                                {props.report.result ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {props.report.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {props.report.input}
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
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell component="th" scope="row">
                                                {props.report.result ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {props.report.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {props.report.input}
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
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            : <Typography style={{ marginTop: '15px' }}>No data found.</Typography>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </>
}

export default (ReportDetails);