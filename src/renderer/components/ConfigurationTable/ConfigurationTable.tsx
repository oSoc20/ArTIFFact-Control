import * as React from 'react';
import { Configuration, ReportTypes } from 'Interfaces/Configuration';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    withStyles,
    Theme,
    createStyles,
    makeStyles,
} from '@material-ui/core';
import EditIcon from 'Assets/icons/icons8-edit-property-500.svg';
import TrashIcon from 'Assets/icons/icons8-delete-bin-500.svg';

interface ConfigTableProps {
    configs: Array<Configuration>;
    removeConfig: (config: Configuration) => void;
    selectable?: false;
    currentSelected?: null;
    setCurrentSelected?: null;
}

interface ConfigTablePropsWithSelection {
    configs: Array<Configuration>;
    removeConfig: (config: Configuration) => void;
    selectable: true;
    currentSelected: number | null;
    setCurrentSelected: (index: number) => void;
}

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            '&$selected': {
                backgroundColor: '#2A4B5B',
            },
            '&:hover': {
                '&$selected': {
                    backgroundColor: '#2A4B5B',
                },
            },
        },
        selected: {},
        hover: {},
    })
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selected: {
            color: ' #FCFCFC',
        },
        tableContainer: {
            maxHeight: '60vh',
            overflow: 'auto',
        },
        tableHeadRow: {
            borderBottom: '3px solid #2A4B5B',
        },
        tableHeadCell: {
            color: theme.palette.primary.dark,
            fontWeight: 700,
            borderBottom: '1px solid #2A4B5B',
        },
        tableContentCell: {
            fontSize: '18px',
            lineHeight: '25px',
            fontFamily: 'Open Sans',
            verticalAlign: 'top',
            borderBottom: 'none',
        },
        typography: {
            fontSize: 16,
        },
    })
);

const ConfigurationTable = (props: ConfigTableProps | ConfigTablePropsWithSelection) => {
    const { configs } = props;
    const classes = useStyles();

    /**
     * Handles the selection procedure of table entries.
     * @param selectedIndex the index of the clicked row
     */
    const handleSelect = (selectedIndex: number) => {
        if (props.selectable) {
            props.setCurrentSelected ? props.setCurrentSelected(selectedIndex) : '';
        }
    };

    /**
     * Create a string representation that displays the possible types of created reports.
     * @param reports array of strings that contains the allowed report types.
     * @returns string of the following format: 'TYPE 1, TYPE 2, ... TYPE N'
     */

    const getReports = (reports: Array<ReportTypes> | Array<string>) => {
        let result: string = "";
        reports.forEach((report) => {
            result += report;
            result += ', ';
        });
        return <Typography className={classes.typography}>{result.slice(0, -2)}</Typography>;
    };

    return (
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
                    {configs.map((config, index) => {
                        return (
                            <StyledTableRow
                                key={index}
                                onClick={() => handleSelect(index)}
                                selected={index === props.currentSelected}
                            >
                                <TableCell
                                    className={`${classes.tableContentCell} ${
                                        index === props.currentSelected ? classes.selected : ''
                                        }`}
                                >
                                    <Typography className={classes.typography}>
                                        {config.name}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    className={`${classes.tableContentCell} ${
                                        index === props.currentSelected ? classes.selected : ''
                                        }`}
                                >
                                    <Typography className={classes.typography}>
                                        {config.implementation}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    className={`${classes.tableContentCell} ${
                                        index === props.currentSelected ? classes.selected : ''
                                        }`}
                                >
                                    {config.policies?.map((policy, index) => {
                                        return (
                                            <Typography
                                                key={index}
                                                className={classes.typography}
                                            >{`${policy.name} ${policy.operator} ${policy.value}`}</Typography>
                                        );
                                    })}
                                </TableCell>
                                <TableCell
                                    className={`${classes.tableContentCell} ${
                                        index === props.currentSelected ? classes.selected : ''
                                        }`}
                                >
                                    {config.reports && getReports(config.reports)}
                                </TableCell>
                                <TableCell
                                    className={`${classes.tableContentCell} ${
                                        index === props.currentSelected ? classes.selected : ''
                                        }`}
                                >
                                    <button
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <img
                                            src={EditIcon}
                                            style={{ height: '25px', width: '25px', filter: index === props.currentSelected ? 'grayscale(1) invert(1) contrast(500%)' : '' }}
                                        />
                                    </button>
                                    <button
                                        onClick={() => props.removeConfig(config)}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {' '}
                                        <img
                                            src={TrashIcon}
                                            style={{
                                                height: '25px',
                                                width: '25px',
                                                paddingBottom: '4px',
                                                filter: index === props.currentSelected ? 'grayscale(1) invert(1) contrast(500%)' : ''
                                            }}
                                        />
                                    </button>
                                </TableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ConfigurationTable;
