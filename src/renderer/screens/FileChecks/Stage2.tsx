import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiTableCell from '@material-ui/core/TableCell';
import { Box, TableContainer, TableHead, TableBody, TableRow, Table, withStyles, Typography } from '@material-ui/core';


interface Stage2Props {
    goBackOneStep: () => void;
}

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
        container: {
            background: "#eee"
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
        },
        typography: {
            fontSize: 14
        }
    })
);


// Styled Material UI Table Cell component
const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

interface Config {
    name: string;
    implementation: string;
    policy: Array<string>;
    report: Array<string>
}

const tempConfigs: Array<Config> = [
    { name: "Default", implementation: "Baseline TIFF 6.0", policy: ["IccProfileClass = Input", "ImageWidth > 500", "ImageHeight > 300"], report: ["Json, PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },
    { name: "Extended", implementation: "Baseline TIFF 6.0", policy: [], report: ["Json", "PDF"] },

]

export const Stage2 = (props: Stage2Props) => {
    const classes = useStyles();

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
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Step 2 - TIFF Configuration settings
                </Box>
            </Typography>
            <button onClick={() => props.goBackOneStep()}>Go back</button>
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
                                <StyledTableRow key={index}>
                                    <TableCell className={classes.tableContentCell}>
                                        <Typography className={classes.typography}>{config.name}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.tableContentCell}>
                                        <Typography className={classes.typography}>{config.implementation}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.tableContentCell} >
                                        {config.policy.map((policy, index) => {
                                            return (<Typography key={index} className={classes.typography}>{policy}</Typography>);
                                        })}
                                    </TableCell>
                                    <TableCell className={classes.tableContentCell} >
                                        {getReports(config.report)}
                                    </TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}