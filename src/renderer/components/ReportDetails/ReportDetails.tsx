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
import { RootState } from 'src/renderer/reducers';
import { ReportsAction, removeReports } from 'Actions/ReportActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            fontSize: '16px',
            fontWeight: 700,
            color: theme.palette.primary.main
        },
        secondaryColor: {
            color: theme.palette.secondary.main
        },
        successColor: {
            color: theme.palette.success.main
        },
        errorColor: {
            color: theme.palette.error.main
        }
    })
);

/* INTERFACE */
interface ReportsDetailsProps {
    reportParent: ReportParent;
    removeButton?: Boolean;
    removeReportParent: (report: ReportParent) => void;
}

/* COMPONENT */
const ReportDetails = (props: ReportsDetailsProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();
    const history = useHistory();

    const directory = props.reportParent !== null ? props.reportParent.reports[0].filePath.replace(props.reportParent.reports[0].fileName, '') : '';
    const date = format(props.reportParent.reports[0].date, "dd/MM/yyyy hh:mm:ss a");
    const files = props.reportParent.reports.length;
    let result = true; let errors = 0; let passed = 0; let warnings = 0; let score = 0;
    props.reportParent.reports.forEach(report => {
        if (!report.result)
            result = false;
        if (report.errors !== undefined && report.errors > 0)
            errors++;
        if (report.passed !== undefined && report.passed > 0)
            passed++;
        if (report.warnings !== undefined && report.warnings > 0)
            warnings++;
    });
    score = passed / (errors + passed + warnings) * 100;

    const removeReportParent = () => {
        props.removeReportParent(props.reportParent);
        history.go(-1);
    }

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
                            <DoughnutChart labels={['Errors', 'passed', 'passed with warnings']} values={[errors, passed, warnings]} textValue={score.toFixed(0) + '%'} />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <ClearIcon className={classes.errorColor} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{errors} Error</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckIcon className={classes.successColor} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{passed} passed</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <WarningRoundedIcon className={classes.secondaryColor} /><Typography style={{ fontSize: '16px', marginLeft: '10px' }}>{warnings} passed with warnings</Typography>
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
                                    <Typography style={{ fontSize: '16px' }}>{score.toFixed(0)}%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', marginTop: '15px', justifyContent: 'flex-end' }}>
                            <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => shell.openPath(directory)}><img src={FolderIcon} style={{ width: '20px', marginRight: '8px' }} /> See report in directory</Button>
                            {props.removeButton !== undefined ?
                                <Button style={{ fontSize: '16px', textTransform: 'none' }} onClick={() => removeReportParent()}><img src={DeleteBinIcon} style={{ width: '20px', marginRight: '8px' }} /> Delete report</Button>
                                : null
                            }
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
                        {props.reportParent.formats !== null && props.reportParent.formats.length > 0 ?
                            <>
                                <FormatCardList formats={props.reportParent.formats} />
                                <Button style={{ fontSize: '16px', textTransform: 'none', marginLeft: 'auto', display: 'flex', marginBottom: 0 }}><img src={RatingsIcon} style={{ width: '20px', marginRight: '8px' }} /> Generate all exports formats</Button>
                            </>
                            : <Typography>No export format.</Typography>
                        }
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
                    {props.reportParent !== undefined && props.reportParent !== null ?
                        <TableContainer style={{ marginTop: '20px' }}>
                            <Table aria-label="span" size="small">
                                <TableHead>
                                    <TableRow className={tableClasses.tableHeadRow}>
                                        <TableCell className={tableClasses.tableHeadCell}>Result</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Name</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Path</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Errors</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Warnings</TableCell>
                                        <TableCell className={tableClasses.tableHeadCell}>Formats</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.reportParent.reports.map((report, index) => {
                                        return (
                                            <StyledTableRow1 key={index}>
                                                <TableCell>
                                                    {report.result ? <CheckIcon className={classes.successColor} /> : <ClearIcon className={classes.errorColor} />}
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
                                                    {report.warnings}
                                                </TableCell>
                                                <TableCell>
                                                    {props.reportParent.formats !== null && props.reportParent.formats.length > 0 ?
                                                        <FormatCardList formats={report.formats} listWidth='200px' cardsWidth='34px' cardsHeight='41px' />
                                                        : "No export format."
                                                    }
                                                </TableCell>
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

/* Redux functions */
const mapStateToProps = (state: RootState) => ({
    
});

const mapDispatchToProps = (dispatch: React.Dispatch<ReportsAction>) => ({
    removeReportParent: (reports: ReportParent) => dispatch(removeReports(reports))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails);