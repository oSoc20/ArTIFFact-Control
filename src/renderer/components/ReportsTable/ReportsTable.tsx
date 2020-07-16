import * as React from 'react';
// Material UI
import { Paper, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, withStyles, TableBody, Button, Popper, Fade, Typography, PopperPlacementType, FormControlLabel, Radio, Grid, RadioGroup } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
// Icons
import EventNoteIcon from '@material-ui/icons/EventNote';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DeleteBinIcon from 'Assets/icons/icons8-delete-bin-500.svg';
import ClearOptionIcon from 'Assets/icons/icons8-clear-option-500.svg';
import CustomDatePicker from 'Components/CustomDatePicker/CustomDatePicker';

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
        },
        popup: {
            padding: theme.spacing(2),
            color: 'black',
            background: '#FCFCFC',
            boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
        },
        closeIcon: {
            color: theme.palette.grey[100],
            "&:hover": {
                color: 'black',
                cursor: 'pointer'
            }
        }
    })
);

/* INTERFACE */
interface ReportsTableProps {
    reports: Array<Report>;
    removeReport: (index: number) => void,
    removeReportsOlderThan: (date: Date | null) => void,
    clearReports: () => void
}

/* COMPONENT */
const ReportsTable = (props: ReportsTableProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();
    const [action, setAction] = React.useState('clearAll');
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    );

    const handleClick = (newPlacement: PopperPlacementType) => (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAction((event.target as HTMLInputElement).value);
    };

    const handleClear = () => {
        if (action == 'clearAll') {
            props.clearReports();
        } else if (action == 'olderThan') {
            props.removeReportsOlderThan(selectedDate);
        }

        setOpen(false)
    }

    return <>
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
                                        <Button onClick={() => props.removeReport(index)}><img src={DeleteBinIcon} style={{ width: '24px' }} /></Button>
                                    </TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Button style={{ marginTop: '20px', fontSize: '14px', textTransform: 'none' }} onClick={handleClick("left")}><img src={ClearOptionIcon} style={{ width: '20px', marginRight: '8px' }} /> Clear options</Button>
            </div>
            <Popper open={open} anchorEl={anchorEl} placement={placement} style={{ marginRight: '5px' }} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <Paper className={classes.popup}>
                            <Grid container>
                                <Grid item xs={12} style={{ textAlign: 'right' }}>
                                    <CloseIcon className={classes.closeIcon} style={{ width: '22px' }} onClick={() => setOpen(false)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <RadioGroup aria-label="action" name="action" value={action} onChange={handleActionChange}>
                                        <FormControlLabel value="clearAll" control={
                                            <Radio color="primary" />
                                        } label={
                                            <Typography>Clear all</Typography>
                                        } />
                                        <FormControlLabel value="olderThan" control={
                                            <Radio color="primary" />
                                        } label={
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography style={{ marginRight: '10px' }}>Older than</Typography>
                                                <div style={{ width: '160px' }}><CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} /></div>
                                            </div>
                                        } />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: 'right', marginTop: '10px' }}>
                                    <Button variant="contained" color="primary" style={{ textTransform: 'none', borderRadius: '5px' }} onClick={handleClear}>Clear</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Paper>
    </>
}

export default (ReportsTable);