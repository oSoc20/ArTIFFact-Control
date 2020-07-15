import * as React from 'react';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, withStyles, TableBody, Button } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

/* ASSETS */
const ratingsIcon = require('Assets/icons/icons8-ratings-500.svg');

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
function createData(date: string, files: number, input: string, result: boolean) {
    let ICON = result ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />;
    return { date, files, input, ICON };
}

const rows = [
    createData('7/07/2020', 1, '/users/name/file/Tifffile.tiff', true),
    createData('7/07/2020', 12, '/users/name/file/Tifffile.tiff', false),
    createData('7/07/2020', 12, '/users/name/file/Tifffile.tiff', false),
    createData('7/07/2020', 12, '/users/name/file/Tifffile.tiff', true),
    createData('7/07/2020', 12, '/users/name/file/Tifffile.tiff', true)
];

/* COMPONENT */
function LastReports() {
    const classes = useStyles();
    const nbReports = rows.length;

    return (
        <>
            <Paper className={classes.paper}>
                <Typography component='span' style={{display: 'flex'}}>
                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold' fontFamily='"OpenSans"'>
                        <img src={ratingsIcon} style={{ marginRight: '20px', width: '40px' }} />
                        Last reports
                    </Box>
                    <Button style={{marginLeft: 'auto', fontWeight: 600, textTransform: 'none'}}>More <ArrowForwardIcon style={{marginLeft:'3px', fontSize:'20px'}} /></Button>
                </Typography>
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
                            {rows.map((row, index) => {
                                const opacity = index < nbReports - 2 ? { opacity: 1 }
                                    : index === nbReports - 2 ? { opacity: 0.6 }
                                        : { opacity: 0.3 };

                                return (
                                    <StyledTableRow key={index} style={opacity}>
                                        <TableCell component="th" scope="row">
                                            {row.date}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.files}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.input}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.ICON}
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

export default (LastReports);