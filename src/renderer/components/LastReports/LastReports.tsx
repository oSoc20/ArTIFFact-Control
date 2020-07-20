import * as React from 'react';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, withStyles, TableBody, Button } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// Icons
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import { useHistory } from 'react-router-dom';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';

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
        box: {
            display: 'flex',
            alignItems: 'center'
        },
        tableHeadRow: {
            borderBottom: '1px solid black'
        },
        tableHeadCell: {
            color: '#39657B',
            fontWeight: 600
        }
    })
);

/* INTERFACES */
interface LastReportsProps {
    setActiveItem: (item: string) => void
}

/* COMPONENT */
const LastReports = (props: LastReportsProps) => {
    const history = useHistory();
    const classes = useStyles();
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
            <Paper className={classes.paper}>
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
                                <TableRow className={classes.tableHeadRow}>
                                    <TableCell className={classes.tableHeadCell}>Date</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Files</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Input</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.map((report, index) => {
                                    const opacity = index < reports.length - 2 ? { opacity: 1 }
                                        : index === reports.length - 2 ? { opacity: 0.6 }
                                            : { opacity: 0.3 };

                                    return (
                                        <StyledTableRow key={index} style={opacity}>
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
                                        </StyledTableRow>
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