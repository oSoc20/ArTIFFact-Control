import * as React from 'react';
import {
    TableContainer,
    Table,
    Button,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    Typography,
    Box,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import { ReportTypes } from 'Interfaces/Configuration';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import mapIcon from 'Assets/icons/folder.svg';
import { useMainStyles } from 'Theme/Main';
import { useTableStyles } from 'Theme/Table';

const REPORT_TYPES: Array<ReportTypes> = ['HTML', 'PDF', 'XML and METS', 'JSON'];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            color: theme.palette.primary.dark,
            marginLeft: '25px',
            fontWeight: 700,
        },
        divider: {
            marginBottom: '1rem',
            marginLeft: '22px',
            marginRight: '22px',
            height: '1px',
            backgroundColor: '#2A4B5B',
        },
        flex: {
            maxWidth: '300px',
            display: 'flex',
            flexFlow: 'column',
            margin: '0 auto',
        },
        button: {
            display: 'flex',
            marginLeft: 'auto',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '12px',
            color: '#FCFCFC',
            padding: '6px 30px',
            '&:disabled': {
                backgroundColor: theme.palette.grey[300],
                color: '#FCFCFC',
            },
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: '#FCFCFC',
            },
        },
        leftMargin: {
            margin: '0 25px',
        },
        isoElement: {
            borderBottom: '1px solid #E9E9E9',
            padding: '8px 0',
        },
        tableContainer: {
            maxWidth: '96%',
            minHeight: '30vh',
        },
        tableHeadRow: {
            borderBottom: '2px solid #2A4B5B',
        },
        destination: {
            verticalAlign: 'top',
        },
        destinationFolder: {
            color: theme.palette.grey[300],
            paddingLeft: '20px',
        },
    })
);

interface ReportProps {
    goBackOneStep: () => void;
    addReportType: (report: ReportTypes) => void;
    removeReportType: (report: ReportTypes) => void;
    progress: () => void;
    currentReports: Array<ReportTypes>;
}

const Report = (props: ReportProps) => {
    const [checked, setChecked] = React.useState<Array<ReportTypes>>([]);
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();

    // Called upon mount. Sets the current selected report types to checked.
    React.useEffect(() => {
        setChecked(props.currentReports);
    });

    /**
     * Function thats called upon checking or unchecking an item
     * Adds or removes a report type from the list
     * @param value report type to add or remove
     */
    const handleToggle = (value: ReportTypes) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
            props.addReportType(value);
        } else {
            newChecked.splice(currentIndex, 1);
            props.removeReportType(value);
        }
        setChecked(newChecked);
    };

    return (
        <>
            <Button
                style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }}
                onClick={() => props.goBackOneStep()}
            >
                <img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back
            </Button>
            <Typography component="span" gutterBottom>
                <Box fontSize="h6.fontSize" style={{ marginBottom: '40px', textAlign: 'center' }}>
                    Step 4 - Report
                </Box>
            </Typography>
            <TableContainer style={{ height: '40vh', overflow: 'auto', border: 'none' }}>
                <Table>
                    <TableHead>
                        <TableRow className={tableClasses.tableHeadRow}>
                            <TableCell className={tableClasses.tableHeadCell}>Format</TableCell>
                            <TableCell className={tableClasses.tableHeadCell}>Output</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ border: 'none' }}>
                                <List>
                                    {REPORT_TYPES.map((type: ReportTypes, index: number) => {
                                        const labelId = `checkbox-list-label-${index}`;
                                        return (
                                            <ListItem
                                                key={index}
                                                onClick={() => handleToggle(type)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(type) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={type} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </TableCell>
                            <TableCell style={{ border: 'none' }} className={classes.destination}>
                                <Button>
                                    <img
                                        src={mapIcon}
                                        style={{ marginRight: '7px', fontSize: '20px' }}
                                    />
                                    Choose destination...
                                </Button>
                                <Typography
                                    component="span"
                                    gutterBottom
                                    className={classes.destinationFolder}
                                >
                                    ThisPC/users/Joe/Documents/Images/TIFF/Reports
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                disabled={props.currentReports.length === 0}
                onClick={() => props.progress()}
                className={classes.button}
            >
                Continue
            </Button>
        </>
    );
};

export default Report;
