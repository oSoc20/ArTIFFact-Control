import * as React from 'react';
import {
    Typography,
    Box,
    Divider,
    FormControl,
    Input,
    Button,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';

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
        input: {
            border: '2px solid #2A4B5B',
            boxSizing: 'border-box',
            borderRadius: '12px',
            padding: '8px 20px',
        },
        flex: {
            display: 'flex',
            alignItems: 'center',
        },
        button: {
            display: 'flex',
            marginLeft: 'auto',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '12px',
            color: '#FCFCFC',
            padding: '6px 30px',
            position: 'absolute',
            bottom: '400px',
            right: '200px',
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

interface NameSetterProps {
    setName: (name: string) => void;
    readonly name: string;
    continue: () => void;
    back: () => void;
}

const NameSetter = (props: NameSetterProps) => {
    const classes = useStyles();
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
                    Step 1 - Name
                </Box>
            </Typography>
            <Typography className={classes.label}>Name for the configuration</Typography>
            <Divider className={classes.divider} />
            <FormControl className={classes.flex}>
                <Input
                    onChange={(event) => props.setName(event.target.value)}
                    value={props.name}
                    type="text"
                    placeholder="Name for configuration"
                    className={classes.input}
                    disableUnderline={true}
                />
            </FormControl>
            <Button
                disabled={props.name === ''}
                onClick={() => props.continue()}
                className={classes.button}
            >
                Continue
            </Button>
        </>
    );
};

export default NameSetter;
