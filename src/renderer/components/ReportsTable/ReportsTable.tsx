import * as React from 'react';
// Themes
import { useMainStyles } from 'Theme/Main';
import { usePopperStyles } from 'Theme/Popper';
import { TableCell, StyledTableRow2, useTableStyles } from 'Theme/Table';
// Material UI
import {
    Paper,
    makeStyles,
    Theme,
    createStyles,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Popper,
    Typography,
    PopperPlacementType,
    FormControlLabel,
    Radio,
    Grid,
    RadioGroup,
    ClickAwayListener,
    Tooltip,
} from '@material-ui/core';

import CustomDatePicker from 'Components/CustomDatePicker/CustomDatePicker';
// Icons
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DeleteBinIcon from 'Assets/icons/icons8-delete-bin-500.svg';
import ClearOptionIcon from 'Assets/icons/icons8-clear-option-500.svg';
import LeftArrowIcon from 'Assets/icons/left-arrow.svg';
import RightArrowIcon from 'Assets/icons/right-arrow.svg';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

/* STYLE */
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            alignItems: 'center',
        },
        popup: {
            padding: theme.spacing(2),
            color: 'black',
            background: '#FCFCFC',
            boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
        },
        closeIcon: {
            color: theme.palette.grey[300],
            '&:hover': {
                color: 'black',
                cursor: 'pointer',
            },
        },
        successColor: {
            color: theme.palette.success.main
        },
        errorColor: {
            color: theme.palette.error.main
        }
    })
);

/* INTERFACE */
interface ReportsTableProps {
    reportParents: Array<ReportParent> | null;
    removeReportParent: (report: ReportParent) => void;
    removeReportParentsOlderThan: (date: Date | null) => void;
    clearReportParents: () => void;
}

/* COMPONENT */
const ReportsTable = (props: ReportsTableProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const popperClasses = usePopperStyles();
    const tableClasses = useTableStyles();
    const history = useHistory();

    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [nbPages, setNbPages] = React.useState<number>(0);
    let nbElementsPerPage = 20;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();
    const [action, setAction] = React.useState('clearAll');
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

    const handleClick = (newPlacement: PopperPlacementType) => (
        event: React.MouseEvent<HTMLButtonElement>
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
            props.clearReportParents();
        } else if (action == 'olderThan') {
            props.removeReportParentsOlderThan(selectedDate);
        }

        setOpen(false);
    };

    const previousPage = () => {
        if (currentPage - 1 >= 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage + 1 <= nbPages) setCurrentPage(currentPage + 1);
    };

    const initPagination = () => {
        if (nbPages == 0 && props.reportParents !== null && props.reportParents.length > nbElementsPerPage) {
            setPagination();
            setCurrentPage(1);
        }
    };

    const setPagination = () => {
        if (props.reportParents !== null) {
            let nbPages = Math.ceil(props.reportParents.length / nbElementsPerPage);
            setNbPages(nbPages);
            if (currentPage > nbPages)
                setCurrentPage(nbPages);
        }
    }

    initPagination();

    useEffect(() => {
        setPagination();
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                setOpen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
    }, [props.reportParents]);

    let minIndex = (currentPage - 1) * nbElementsPerPage;
    let maxIndex = (currentPage * nbElementsPerPage) - 1;

    return <>
        <Paper className={mainClasses.paper}>
            {props.reportParents! !== null && props.reportParents.length > 0 ?
                <>
                    <TableContainer style={{ height: '60vh', overflow: "auto" }} >
                        <Table aria-label="span" size="small" stickyHeader>
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Date</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Files</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Input</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Result</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Errors</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Passed</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Score</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.reportParents !== null ?
                                    props.reportParents.map((reportParent, index) => {
                                        if (props.reportParents!.length <= nbElementsPerPage || (index >= minIndex && index <= maxIndex)) {
                                            const directory = reportParent.reports[0].filePath.replace(reportParent.reports[0].fileName, '');
                                            const files = reportParent.reports.length;
                                            let result = true; let errors = 0; let passed = 0; let warnings = 0; let score = 0;
                                            reportParent.reports.forEach(report => {
                                                if (!report.result)
                                                    result = false;
                                                if (report.errors !== undefined && report.errors > 0)
                                                    errors++;
                                                if (report.passed !== undefined && report.passed > 0)
                                                    passed++;
                                                if (report.warnings !== undefined && report.warnings > 0)
                                                    warnings++;
                                            });
                                            score = passed / (errors + passed + warnings) * 100

                                            return (
                                                <StyledTableRow2 key={index} onClick={() => history.push('/reportDetails', {reportParent: reportParent, backButton: true, removeButton: true})}>
                                                    <TableCell>
                                                        {format(reportParent.reports[0].date, 'dd/MM/yyyy')}
                                                    </TableCell>
                                                    <TableCell>
                                                        {files}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title={directory} aria-label={directory} placement="bottom">
                                                            <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{directory}</div>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        {result ? <CheckIcon className={classes.successColor} /> : <ClearIcon className={classes.errorColor} />}
                                                    </TableCell>
                                                    <TableCell>
                                                        {errors}
                                                    </TableCell>
                                                    <TableCell>
                                                        {passed}
                                                    </TableCell>
                                                    <TableCell>
                                                        {score.toFixed(0)}%
                                                </TableCell>
                                                    <TableCell>
                                                        <Button onClick={(event) => { event.stopPropagation(); props.removeReportParent(reportParent) }}><img src={DeleteBinIcon} style={{ width: '24px' }} /></Button>
                                                    </TableCell>
                                                </StyledTableRow2>
                                            );
                                        }
                                    }) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container style={{ marginTop: '20px' }}>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {nbPages > 1 ?
                                <>
                                    <img src={LeftArrowIcon} className={currentPage > 1 ? tableClasses.paginationArrow : tableClasses.paginationArrowDisabled} onClick={() => previousPage()} />
                                    <Typography className={tableClasses.pagination}>Page {currentPage} / {nbPages}</Typography>
                                    <img src={RightArrowIcon} className={currentPage < nbPages ? tableClasses.paginationArrow : tableClasses.paginationArrowDisabled} onClick={() => nextPage()} />
                                </>
                                : null
                            }
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                            <Button style={{ fontSize: '16px', textTransform: 'none', marginLeft: 'auto' }} onClick={handleClick("left-end")}><img src={ClearOptionIcon} style={{ width: '20px', marginRight: '8px' }} /> Clear options</Button>
                        </Grid>
                    </Grid>
                    <Popper open={open} anchorEl={anchorEl} placement={placement} style={{ marginRight: '5px' }}>
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Paper className={popperClasses.popper}>
                                <Grid container>
                                    <Grid item xs={12} style={{ textAlign: 'right' }}>
                                        <CloseIcon className={popperClasses.closeIcon} style={{ width: '22px' }} onClick={() => setOpen(false)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RadioGroup aria-label="action" name="action" value={action} onChange={handleActionChange}>
                                            <FormControlLabel value="clearAll" control={
                                                <Radio color="primary" />
                                            } label={
                                                <Typography style={{ fontSize: '16px' }}>Clear all</Typography>
                                            } />
                                            <FormControlLabel value="olderThan" control={
                                                <Radio color="primary" />
                                            } label={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography style={{ fontSize: '16px', marginRight: '10px' }}>Older than</Typography>
                                                    <div style={{ width: '160px' }}><CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} /></div>
                                                </div>
                                            } />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{ textAlign: 'right', marginTop: '10px' }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                textTransform: 'none',
                                                borderRadius: '5px',
                                            }}
                                            onClick={handleClear}
                                        >
                                            Clear
                                            </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </>
                : <Typography>No data found.</Typography>
            }
        </Paper>
    </>
};

export default ReportsTable;
