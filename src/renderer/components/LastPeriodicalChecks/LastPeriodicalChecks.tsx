import * as React from 'react';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, withStyles, TableBody, Button } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import AlarmOnOutlinedIcon from '@material-ui/icons/AlarmOnOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

/* ASSETS */
const clockCheckedIcon = require('Assets/icons/icons8-clock-checked-500.svg');

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

/* FUNCTIONS */
function createData(files: number, input: string, configuration: string, periodicity: string) {
    return { files, input, configuration, periodicity };
}

const rows = [
    createData(1, '/users/name/file/Tifffile.tiff', 'Default', 'Daily, at 12:30'),
    createData(12, '/users/name/file/', 'Default', 'Weekly, at 12:30'),
    createData(7, '/users/name/file/', 'Default', 'Weekly, at 12:30'),
    createData(3, '/users/name/file/', 'Default', 'Weekly, at 12:30')
];

/* COMPONENT */
function LastPeriodicalChecks() {
    const classes = useStyles();
    const nbReports = rows.length;

    return (
        <>
            <Paper className={classes.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={clockCheckedIcon} style={{ marginRight: '20px', width: '40px' }} />
                        Periodical Checks
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
                </Typography>
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
                            {rows.map((row, index) => {
                                const opacity = index < nbReports - 2 ? { opacity: 1 }
                                    : index === nbReports - 2 ? { opacity: 0.6 }
                                        : { opacity: 0.3 };

                                return (
                                    <StyledTableRow key={index} style={opacity}>
                                        <TableCell component="th" scope="row">
                                            {row.files}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.files}
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
            </Paper>
        </>
    )
}

export default (LastPeriodicalChecks);