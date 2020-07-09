import * as React from 'react';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, withStyles, TableBody, Button } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

/* STYLE */
const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

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
function createData(name: string, implementation: string, report: string) {
    return { name, implementation, report };
}

const rows = [
    createData('Default', 'Baseline TIFF 6.0', 'Json, PDF'),
    createData('Special', 'Extended TIFF 6.0', 'HTML'),
    createData('Special', 'Extended TIFF 6.0', 'HTML'),
    createData('Special', 'Extended TIFF 6.0', 'HTML'),
    createData('Special', 'Extended TIFF 6.0', 'HTML'),
    createData('Special', 'Extended TIFF 6.0', 'HTML'),
    createData('Special', 'Extended TIFF 6.0', 'HTML')
];

/* COMPONENT */
function LastConfigurations() {
    const classes = useStyles();
    const nbReports = rows.length;

    return (
        <>
            <Paper className={classes.paper}>
                <Typography component='span' style={{display: 'flex'}}>
                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <SettingsIcon style={{ marginRight: '15px', fontSize: '40px' }} />
                        Configuration
                    </Box>
                    <Button style={{marginLeft: 'auto', fontWeight: 600}}>More <ArrowForwardIcon style={{marginLeft:'3px', fontSize:'20px'}} /></Button>
                </Typography>
                <TableContainer style={{ marginTop: '20px' }}>
                    <Table aria-label="span" size="small">
                        <TableHead>
                            <TableRow className={classes.tableHeadRow}>
                                <TableCell className={classes.tableHeadCell}>Name</TableCell>
                                <TableCell className={classes.tableHeadCell}>Implementation</TableCell>
                                <TableCell className={classes.tableHeadCell}>Report</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                const opacity = index < nbReports - 2 ? { opacity: 1 }
                                    : index === nbReports - 2 ? { opacity: 0.6 }
                                        : { opacity: 0.3 };

                                return (
                                    <TableRow key={index} style={opacity}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.implementation}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.report}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

export default (LastConfigurations);