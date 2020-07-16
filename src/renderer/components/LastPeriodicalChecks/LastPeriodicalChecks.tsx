import * as React from 'react';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, withStyles, TableBody, Button } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// Icons
import ClockCheckedIcon from 'Assets/icons/icons8-clock-checked-500.svg';
import { useHistory } from 'react-router-dom';

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

/* COMPONENT */
const LastPeriodicalChecks = () => {
    const history = useHistory();
    const classes = useStyles();
    var periodicalChecksData: PeriodicalCheck[] = [
        { files: 1, input: '/users/name/file/Tifffile.tiff', configuration: 'Default', periodicity: 'Daily, at 12:30' },
        { files: 12, input: '/users/name/file/', configuration: 'Default', periodicity: 'Weekly, at 12:30' },
        { files: 7, input: '/users/name/file/', configuration: 'Default', periodicity: 'Weekly, at 12:30' },
        { files: 3, input: '/users/name/file/', configuration: 'Default', periodicity: 'Weekly, at 12:30' }
    ];
    const [periodicalChecks, setPeriodicalChecks] = React.useState(periodicalChecksData);

    return (
        <>
            <Paper className={classes.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={ClockCheckedIcon} style={{ marginRight: '20px', width: '40px' }} />
                        Periodical Checks
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={() => history.push('/periodicalChecks')}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
                </Typography>
                {periodicalChecks.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label="span" size="small">
                            <TableHead>
                                <TableRow className={classes.tableHeadRow}>
                                    <TableCell className={classes.tableHeadCell}>Files</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Input</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Configuration</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Periodicity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {periodicalChecks.map((row, index) => {
                                    const opacity = index < periodicalChecks.length - 2 ? { opacity: 1 }
                                        : index === periodicalChecks.length - 2 ? { opacity: 0.6 }
                                            : { opacity: 0.3 };

                                    return (
                                        <StyledTableRow key={index} style={opacity}>
                                            <TableCell component="th" scope="row">
                                                {row.files}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.input}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.configuration}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.periodicity}
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

export default (LastPeriodicalChecks);