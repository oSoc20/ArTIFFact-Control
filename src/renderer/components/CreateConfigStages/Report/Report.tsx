import *  as React from 'react';
import { TableContainer, Table, Button, TableHead, TableRow, TableCell, TableBody, List, ListItem, ListItemIcon, Checkbox, ListItemText, Typography, Box } from '@material-ui/core';
import { ReportTypes } from 'Interfaces/Configuration';

const REPORT_TYPES: Array<ReportTypes> = ['HTML', 'PDF', 'XML and METS', 'JSON']

interface ReportProps {
    goBackOneStep: () => void;
    addReportType: (report: ReportTypes) => void;
    removeReportType: (report: ReportTypes) => void;
    progress: () => void;
    currentReports: Array<ReportTypes>;
}

const Report = (props: ReportProps) => {

    const [checked, setChecked] = React.useState<Array<ReportTypes>>([]);

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
            props.addReportType(value)
        }
        else {
            newChecked.splice(currentIndex, 1);
            props.removeReportType(value)
        }
        setChecked(newChecked);
    }

    return (
        <>
            <Button onClick={() => props.goBackOneStep()}>Back</Button>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Step 4 - Report
                </Box>
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Format</TableCell>
                            <TableCell>Output</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell>
                            <List>
                                {REPORT_TYPES.map((type: ReportTypes, index: number) => {
                                    const labelId = `checkbox-list-label-${index}`;
                                    return (
                                        <ListItem key={index} onClick={() => handleToggle(type)}>
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
                        <TableCell>
                            <Button>Choose destination</Button>
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button disabled={props.currentReports.length === 0} onClick={() => props.progress()}>Continue</Button>
        </>);
}

export default Report;