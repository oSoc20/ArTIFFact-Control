import * as React from 'react';
// Themes
import {useMainStyles} from 'Theme/Main';
import {TableCell, StyledTableRow1, useTableStyles} from 'Theme/Table';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
// Icons
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import { useHistory } from 'react-router-dom';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            alignItems: 'center'
        }
    })
);

/* INTERFACES */
interface LastReportsProps {
    setActiveItem: (item: string) => void
}

/* COMPONENT */
const LastReports = (props: LastReportsProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();

    const history = useHistory();
    var reportsData: Report[] = [
        { name: 'Tifffile.tiff', date: new Date('7/07/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, warnings: 0, score: 100, duration: 99 },
        { name: 'Tifffile.tiff', date: new Date('7/07/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, warnings: 0, score: 100, duration: 99 },
        { name: 'Tifffile.tiff', date: new Date('7/07/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, warnings: 0, score: 100, duration: 99 },
        { name: 'Tifffile.tiff', date: new Date('7/07/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, warnings: 0, score: 80, duration: 99 },
        { name: 'Tifffile.tiff', date: new Date('7/07/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: true, errors: 0, passed: 3, warnings: 0, score: 100, duration: 99 },
        { name: 'Tifffile.tiff', date: new Date('7/07/2020'), files: 1, input: '/users/name/file/Tifffile.tiff', result: false, errors: 0, passed: 3, warnings: 0, score: 100, duration: 99 }
    ];
    const [reports, setReports] = React.useState(reportsData);

    return (
        <>
            <Paper className={mainClasses.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={RatingsIcon} style={{ marginRight: '20px', width: '40px' }} />
                        Last reports
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={() => {props.setActiveItem('reports'); history.push('/reports')}}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
                </Typography>
                {reports.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label="span" size="small">
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Date</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Files</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Input</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.map((report, index) => {
                                    const opacity = index < reports.length - 2 ? { opacity: 1 }
                                        : index === reports.length - 2 ? { opacity: 0.6 }
                                            : { opacity: 0.3 };

                                    return (
                                        <StyledTableRow1 key={index} style={opacity}>
                                            <TableCell component="th" scope="row">
                                                {report.date.toLocaleDateString()}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {report.files}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {report.input}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {report.result ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />}
                                            </TableCell>
                                        </StyledTableRow1>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Typography style={{marginTop: '15px'}}>No data found.</Typography>
                }
            </Paper>
        </>
    )
}

/* REDUX STORE */
const mapDispatchToProps = (dispatch: React.Dispatch<SidebarAction>) => ({
    setActiveItem: (item: string) => dispatch(setActiveItem(item))
});

// Connect to the Redux store
export default connect(null, mapDispatchToProps)(LastReports);