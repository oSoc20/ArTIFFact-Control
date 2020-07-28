import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import {
    Typography,
    Box,
    Divider,
    Button,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';

const STANDARDS = [
    'TI/A Draft',
    'TIFF/IT-P1',
    'TIFF/IT-P2',
    'TIFF/IT',
    'Baseline TIFF 6.0',
    'Extended TIFF 6.0',
    'TIFF/EP',
];

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            color: theme.palette.primary.dark,
            alignItems: 'center',
            fontWeight: 700,
            textAlign: 'center',
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
    })
);

interface StandardPickProps {
    addStandard: (standard: string) => void;
    removeStandard: (standard: string) => void;
    continue: () => void;
    back: () => void;
    standardCount: number;
    currentStandards: Array<string>;
}

const StandardPick = (props: StandardPickProps) => {
    const [checked, setChecked] = React.useState<Array<string>>([]);
    const classes = useStyles();

    // Runs on mount, set the selected standards to checked
    React.useEffect(() => {
        setChecked(props.currentStandards);
    });

    /**
     * Function thats called upon checking something in the list.
     * Adds or removes selected standards from the list of selected standards.
     * @param value current standard value
     */
    const handleToggle = (value: string) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
            props.addStandard(value);
        } else {
            newChecked.splice(currentIndex, 1);
            props.removeStandard(value);
        }

        setChecked(newChecked);
    };

    return (
        <>
            <Button
                style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }}
                onClick={() => props.back()}
            >
                <img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back
            </Button>
            <Typography component="span" gutterBottom>
                <Box fontSize="h6.fontSize" style={{ marginBottom: '40px', textAlign: 'center' }}>
                    Step 2 - Implementations
                </Box>
            </Typography>
            <Typography className={classes.label}>Standards</Typography>
            <Divider className={classes.divider} />
            <List className={classes.flex}>
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
            <Button
                disabled={props.standardCount === 0}
                onClick={() => props.continue()}
                className={classes.button}
            >
                Continue
            </Button>
        </>
    );
};

export default StandardPick;
