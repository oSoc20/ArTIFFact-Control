import * as React from 'react';
// Themes
import { useMainStyles } from 'Theme/Main';
import { TableCell, StyledTableRow1, useTableStyles } from 'Theme/Table';
// Material UI
import { Typography, Paper, Box, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
// Icons
import ClockCheckedIcon from 'Assets/icons/icons8-clock-checked-500.svg';
import { useHistory } from 'react-router-dom';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';

/* INTERFACES */
interface LastPeriodicalChecksProps {
    setActiveItem: (item: string) => void
}

/* COMPONENT */
const LastPeriodicalChecks = (props: LastPeriodicalChecksProps) => {
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();
    const maxItems = 5;

    const history = useHistory();
    var periodicalChecksData: Array<PeriodicalCheck> = [];
    const [periodicalChecks, setPeriodicalChecks] = React.useState(periodicalChecksData);

    return (
        <>
            <Paper className={mainClasses.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={mainClasses.boxTitle} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={ClockCheckedIcon} className={mainClasses.titleIcon} />
                        Periodical Checks
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={() => { props.setActiveItem('periodicalChecks'); history.push('/periodicalChecks') }}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
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
                                    if (index < maxItems) {
                                        const opacity = index < maxItems - 2 ? { opacity: 1 }
                                            : index === maxItems - 2 ? { opacity: 0.6 }
                                                : { opacity: 0.3 };

                                        return (
                                            <StyledTableRow1 key={index} style={opacity}>
                                                <TableCell>
                                                    {row.files}
                                                </TableCell>
                                                <TableCell>
                                                    {row.input}
                                                </TableCell>
                                                <TableCell>
                                                    {row.configuration}
                                                </TableCell>
                                                <TableCell>
                                                    {row.periodicity}
                                                </TableCell>
                                            </StyledTableRow1>
                                        );
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Typography style={{ marginTop: '15px' }}>No data found.</Typography>
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