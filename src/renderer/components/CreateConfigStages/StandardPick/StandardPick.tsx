import *  as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'



const STANDARDS = ['TI/A Draft', 'TIFF/IT-P1', 'TIFF/IT-P2', 'TIFF/IT', 'Baseline TIFF 6.0', 'Extended TIFF 6.0', 'TIFF/EP'];

interface StandardPickProps {
    addStandard: (standard: string) => void;
    removeStandard: (standard: string) => void;
    progressStep: () => void;
    goBackOneStep: () => void;
    standardCount: number;
}


const StandardPick = (props: StandardPickProps) => {

    const [checked, setChecked] = React.useState<Array<string>>([]);

    const handleToggle = (value: string) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
            props.addStandard(value);
        }
        else {
            newChecked.splice(currentIndex, 1);
            props.removeStandard(value);
        }

        setChecked(newChecked);

    }

    return (
        <>
            <List>
                {STANDARDS.map((standard: string, index: number) => {
                    const labelId = `checkbox-list-label-${index}`;
                    return (
                        <ListItem key={index} onClick={() => handleToggle(standard)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(standard) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={standard} />
                        </ListItem>
                    );
                })}
            </List>
            <Button disabled={props.standardCount === 0 } onClick={() => props.progressStep}>Continue</Button>
        </>
    );
}

export default StandardPick;