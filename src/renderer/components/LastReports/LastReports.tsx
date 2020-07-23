import * as React from 'react';
// Themes
import { useMainStyles } from 'Theme/Main';
import { TableCell, StyledTableRow1, useTableStyles } from 'Theme/Table';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
import { format } from 'date-fns';
// Icons
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import { useHistory } from 'react-router-dom';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';

/* INTERFACES */
interface LastReportsProps {
    setActiveItem: (item: string) => void
}

/* COMPONENT */
const LastReports = (props: LastReportsProps) => {
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();
    const maxItems = 5;

    const history = useHistory();
    const [reportParents, setReportParents] = React.useState<Array<ReportParent>>([
        {
            reports: [
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }] },
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: false, errors: 1, passed: 0, warnings: 0, score: 0, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }] },
            ],
            formats: null
        },
        {
            reports: [
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }] },
            ],
            formats: null
        },
        {
            reports: [
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }] },
            ],
            formats: null
        },
        {
            reports: [
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }] },
            ],
            formats: null
        },
        {
            reports: [
                { fileName: 'file_example_TIFF_1MB.tiff', filePath: "D:\\Bureau\\Téléchargements\\file_example_TIFF_1MB.tiff", date: new Date('07/15/2020'), result: true, errors: 0, passed: 1, warnings: 0, score: 100, infos: 0, formats: [{ title: 'HTML', url: null }, { title: 'PDF', url: null }, { title: 'XML', url: null }, { title: 'JSON', url: null }, { title: 'METS', url: null }] },
            ],
            formats: null
        }
    ]);

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
                {reportParents.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label="span" size="small">
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Date</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Files</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Input</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportParents.map((reportParent, index) => {
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
const mapDispatchToProps = (dispatch: React.Dispatch<SidebarAction>) => ({
    setActiveItem: (item: string) => dispatch(setActiveItem(item))
});

// Connect to the Redux store
export default connect(null, mapDispatchToProps)(LastReports);