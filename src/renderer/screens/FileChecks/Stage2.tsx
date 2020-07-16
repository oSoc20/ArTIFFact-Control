import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiTableCell from '@material-ui/core/TableCell';
import { Box, TableContainer, TableHead, TableBody, TableRow, Table, withStyles, Typography } from '@material-ui/core';
import EditIcon from 'Assets/icons/icons8-edit-property-500.svg';
import TrashIcon from 'Assets/icons/icons8-delete-bin-500.svg';
import ImportIcon from 'Assets/icons/icons8-import-500.svg';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import BackArrow from 'Assets/icons/icons8-arrow-500.svg';


/* Typescript interfaces */

interface Stage2Props {
    goBackOneStep: () => void;
    progressStep: () => void;
}

interface Config {
    name: string;
    implementation: string;
    policy: Array<string>;
    report: Array<string>
}


/* Styling */

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            '&$selected': {
                backgroundColor: "#2A4B5B",
            },
            '&:hover': {
                '&$selected': {
                    backgroundColor: "#2A4B5B"
                },
            },
        },
        selected: {},
        hover: {}
    }),
)(TableRow);


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selected: {
            color: " #FCFCFC"
        },
        tableContainer: {
            maxHeight: 200
        },
        tableHeadRow: {
            borderBottom: '1px solid black'
        },
        tableHeadCell: {
            color: '#39657B',
            fontWeight: 600
        },
        tableContentCell: {
            fontSize: "18px",
            lineHeight: "25px",
            fontFamily: "Open Sans",
            verticalAlign: "top",
        },
        typography: {
            fontSize: 14,
        },
        confirmButton: {
            backgroundColor: "#2A4B5B",
            borderRadius: "12px",
            width: "127px",
            height: "40px",
            marginLeft: "auto",
            border: "none",
            fontFamily: "'DIN 2014'",
            fontSize: "18px",
            color: "#FCFCFC",
            marginTop: "20px",
            cursor: "pointer",
            "&:disabled": {
                width: "250px",
                backgroundColor: "#CACACA",
                cursor: "no-drop"
            },
        },
        backButton: {
            background: "none",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: 600,
            border: "none",
            margin: 0,
            padding: 0
        },
        arrowBack: {
            width: "16px",
            border: "1px solid black",
            boxSizing: "border-box",
            transform: "matrix(-1, 0, 0, 1, 0, 0)"
        },
        configControlButton: {
            marginRight: "2rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: "20px"
        }
    })
);


// Styled Material UI Table Cell component
const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);



/* Functions and components */

// Temporary array of configs. In a later version, the configs will be stored somewhere on disk
const tempConfigs: Array<Config> = [
    { name: "Default", implementation: "Baseline TIFF 6.0", policy: ["IccProfileClass = Input", "ImageWidth > 500", "ImageHeight > 300"], report: ["Json, PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },

]

/**
 * The component that handles the rendering of stage 2 of file checks.
 * This involves selecting a set of policy rules.
 * @param props Props passed in by the parent (FileChecks component)
 */
export const Stage2 = (props: Stage2Props) => {
    const classes = useStyles();

    // React state object that holds the currently selected configuration
    // Maybe put this in Redux store in order to use at next stage
    let [currentSelected, setCurrent] = React.useState<null | number>(null);

    /**
     * Handles the selection procedure of table entries.
     * @param selectedIndex the index of the clicked row
     */
    const handleSelect = (selectedIndex: number) => {
        setCurrent(selectedIndex);
    }

    /**
     * Create a string representation that displays the possible types of created reports.
     * @param reports array of strings that contains the allowed report types.
     * @returns string of the following format: 'TYPE 1, TYPE 2, ... TYPE N'
     */
    const getReports = (reports: Array<string>) => {
        let result: string = "";
        reports.forEach((report) => {
            result += report;
            result += ', '
        });
        return <Typography className={classes.typography}>{result.slice(0, -2)}</Typography>
    }

    return (
        <>
            <button className={classes.backButton} onClick={() => props.goBackOneStep()}><img src={BackArrow} style={{ paddingBottom: "2px", marginRight: "3px" }} />Back</button>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Step 2 - TIFF Configuration settings
                </Box>
            </Typography>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader size="small" aria-label="span">
                    <TableHead>
                        <TableRow className={classes.tableHeadRow}>
                            <TableCell className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell className={classes.tableHeadCell}>Implementation</TableCell>
                            <TableCell className={classes.tableHeadCell}>Policy checker</TableCell>
                            <TableCell className={classes.tableHeadCell}>Report</TableCell>
                            <TableCell className={classes.tableHeadCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tempConfigs.map((config, index) => {
                            return (
                                <StyledTableRow
                                    key={index}
                                    onClick={() => handleSelect(index)}
                                    selected={index === currentSelected}
                                >
                                    <TableCell className={`${classes.tableContentCell} ${index === currentSelected ? classes.selected : ""}`}>
                                        <Typography className={classes.typography}>{config.name}</Typography>
                                    </TableCell>
                                    <TableCell className={`${classes.tableContentCell} ${index === currentSelected ? classes.selected : ""}`}>
                                        <Typography className={classes.typography}>{config.implementation}</Typography>
                                    </TableCell>
                                    <TableCell className={`${classes.tableContentCell} ${index === currentSelected ? classes.selected : ""}`}>
                                        {config.policy.map((policy, index) => {
                                            return (<Typography key={index} className={classes.typography}>{policy}</Typography>);
                                        })}
                                    </TableCell>
                                    <TableCell className={`${classes.tableContentCell} ${index === currentSelected ? classes.selected : ""}`} >
                                        {getReports(config.report)}
                                    </TableCell>
                                    <TableCell className={`${classes.tableContentCell} ${index === currentSelected ? classes.selected : ""}`} >
                                        <button
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                cursor: "pointer"
                                            }}
                                        ><img src={EditIcon} style={{ height: "25px", width: "25px" }} /></button>
                                        <button
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                cursor: "pointer"
                                            }}> <img src={TrashIcon} style={{ height: "25px", width: "25px", paddingBottom: "4px" }} /></button>
                                    </TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display={"flex"} width={"100%"}>
                <button className={classes.configControlButton}>
                    <Typography style={{ fontSize: 15 }}>
                        <img src={ImportIcon} style={{ width: "17px" }} />
                        import
                    </Typography>
                </button>
                <button className={classes.configControlButton}>
                    <Typography style={{ fontSize: 15 }}>
                        <img src={PlusIcon} style={{ width: "22px" }} />
                         new
                    </Typography>
                </button>
                <button disabled={currentSelected == null ? true : false} className={classes.confirmButton} onClick={() => props.progressStep()}>
                    {currentSelected == null ? <>No configuration selected</> : <>Check files</>}
                </button>
            </Box>
        </>
    );
}