import *  as React from 'react';
import { TableContainer, Table, Button, TableHead, TableRow, TableCell, TableBody, List, ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core';
import { ReportTypes } from 'Interfaces/Configuration';

const REPORT_TYPES: Array<ReportTypes> = ['HTML', 'PDF', 'XML and METS', 'JSON']

interface ReportProps {
    goBackOneStep: () => void;
    addReportType: (report: ReportTypes) => void;
    removeReportType: (report: ReportTypes) => void;
    progress: () => void;
}

const Report = (props: ReportProps) => {

    const [checked, setChecked] = React.useState<Array<ReportTypes>>([]);

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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Format</TableCell>
                            <TableCell>Output</TableCell>
                        </TableRow>
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
                    </TableHead>
                </Table>
            </TableContainer>
            <Button onClick={() => props.progress()}>Continue</Button>
        </>);
}

export default Report;