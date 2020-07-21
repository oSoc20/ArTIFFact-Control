import * as React from 'react';
// Themes
import {useMainStyles} from 'Theme/Main';
import {TableCell, StyledTableRow1, useTableStyles} from 'Theme/Table';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
// Icons
import ClockCheckedIcon from 'Assets/icons/icons8-clock-checked-500.svg';
import { useHistory } from 'react-router-dom';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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
interface LastPeriodicalChecksProps {
    setActiveItem: (item: string) => void
}

/* COMPONENT */
const LastPeriodicalChecks = (props: LastPeriodicalChecksProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();

    const history = useHistory();
    var periodicalChecksData: PeriodicalCheck[] = [
        { files: 1, input: '/users/name/file/Tifffile.tiff', configuration: 'Default', periodicity: 'Daily, at 12:30' },
        { files: 12, input: '/users/name/file/', configuration: 'Default', periodicity: 'Weekly, at 12:30' },
        { files: 7, input: '/users/name/file/', configuration: 'Default', periodicity: 'Weekly, at 12:30' },
        { files: 3, input: '/users/name/file/', configuration: 'Default', periodicity: 'Weekly, at 12:30' }
    ];
    const [periodicalChecks, setPeriodicalChecks] = React.useState(periodicalChecksData);

    return (
        <>
            <Paper className={mainClasses.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={ClockCheckedIcon} style={{ marginRight: '20px', width: '40px' }} />
                        Periodical Checks
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={() => {props.setActiveItem('periodicalChecks'); history.push('/periodicalChecks')}}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
                </Typography>
                {periodicalChecks.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label="span" size="small">
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Files</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Input</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Configuration</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Periodicity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {periodicalChecks.map((row, index) => {
                                    const opacity = index < periodicalChecks.length - 2 ? { opacity: 1 }
                                        : index === periodicalChecks.length - 2 ? { opacity: 0.6 }
                                            : { opacity: 0.3 };

                                    return (
                                        <StyledTableRow1 key={index} style={opacity}>
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
export default connect(null, mapDispatchToProps)(LastPeriodicalChecks);