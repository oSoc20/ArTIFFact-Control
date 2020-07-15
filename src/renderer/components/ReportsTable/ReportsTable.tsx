import * as React from 'react';
// Material UI
import { Paper, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, withStyles, TableBody, Button } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
// Icons
import DeleteBinIcon from 'Assets/icons/icons8-delete-bin-500.svg';
import ClearOptionIcon from 'Assets/icons/icons8-clear-option-500.svg';

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
            }
        }
    })
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

/* INTERFACE */
interface ReportsTableProps {
    reports: Array<Report>;
    removeReports: (index: number) => void
}

/* COMPONENT */
const ReportsTable = (props: ReportsTableProps) => {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.paper}>
                <TableContainer style={{ height: '450px', overflow: "auto" }} >
                    <Table aria-label="span" size="small" stickyHeader>
                        <TableHead>
                            <TableRow className={classes.tableHeadRow}>
                                <TableCell className={classes.tableHeadCell}>Date</TableCell>
                                <TableCell className={classes.tableHeadCell}>Files</TableCell>
                                <TableCell className={classes.tableHeadCell}>Input</TableCell>
                                <TableCell className={classes.tableHeadCell}>Result</TableCell>
                                <TableCell className={classes.tableHeadCell}>Errors</TableCell>
                                <TableCell className={classes.tableHeadCell}>Passed</TableCell>
                                <TableCell className={classes.tableHeadCell}>Score</TableCell>
                                <TableCell className={classes.tableHeadCell}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.reports.map((report, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {report.date}
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
                                        <TableCell component="th" scope="row">
                                            {report.errors} errors
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {report.passed} Passed
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {report.score}%
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Button onClick={() => props.removeReports(index)}><img src={DeleteBinIcon} style={{ width: '24px' }} /></Button>
                                        </TableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <Button style={{ marginTop: '20px', fontSize: '14px', textTransform: 'none' }}><img src={ClearOptionIcon} style={{ width: '20px', marginRight: '8px' }} /> Clear options</Button>
                </div>
            </Paper>
        </>
    )
}

export default (ReportsTable);