import * as React from 'react';
// Themes
import { useMainStyles } from 'Theme/Main';
import { TableCell, StyledTableRow1, useTableStyles } from 'Theme/Table';
// Material UI
import { Typography, Paper, Box, createStyles, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
import { format } from 'date-fns';
// Icons
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import { useHistory } from 'react-router-dom';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';
import { RootState } from 'Reducers';


/* INTERFACES */
interface LastReportsProps {
    setActiveItem: (item: string) => void;
    reports: Array<ReportParent>;
}

/* COMPONENT */
const LastReports = (props: LastReportsProps) => {
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();
    const maxItems = 5;

    const history = useHistory();
   
    return (
        <>
            <Paper className={mainClasses.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={mainClasses.boxTitle} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={RatingsIcon} className={mainClasses.titleIcon} />
                        Last reports
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={() => { props.setActiveItem('reports'); history.push('/reports') }}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
                </Typography>
                {props.reports.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label='span' size='small'>
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Date</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Files</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Input</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.reports.map((reportParent: ReportParent, index: number) => {
                                    if (index < maxItems) {
                                        const opacity = index < maxItems - 2 ? { opacity: 1 }
                                            : index === maxItems - 2 ? { opacity: 0.6 }
                                                : { opacity: 0.3 };
                                        const date = format(reportParent.reports[0].date, 'dd/MM/yyyy');
                                        const directory = reportParent.reports[0].filePath.replace(reportParent.reports[0].fileName, '');
                                        const files = reportParent.reports.length;
                                        let result = true;
                                        reportParent.reports.forEach(report => {
                                            if (!report.result)
                                                result = false;
                                        });

                                        return (
                                            <StyledTableRow1 key={index} style={opacity}>
                                                <TableCell>
                                                    {date}
                                                </TableCell>
                                                <TableCell>
                                                    {files}
                                                </TableCell>
                                                <TableCell>
                                                    {directory}
                                                </TableCell>
                                                <TableCell>
                                                    {result ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />}
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

/**
 * Function that maps all required state variables to props.
 * @param state Rootstate that has all reducers combined
 */
const mapStateToProps = (state: RootState) => ({
    reports: state.reports.reports
});


const mapDispatchToProps = (dispatch: React.Dispatch<SidebarAction>) => ({
    setActiveItem: (item: string) => dispatch(setActiveItem(item))
});

// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(LastReports);