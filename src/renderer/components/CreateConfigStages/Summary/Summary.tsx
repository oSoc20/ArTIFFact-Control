import * as React from 'react';
import {
    Typography,
    Box,
    Button,
    makeStyles,
    Theme,
    createStyles,
    Divider,
} from '@material-ui/core';
import { Configuration, Policy, ReportTypes } from 'Interfaces/Configuration';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import { useMainStyles } from 'Theme/Main';
import { useTableStyles } from 'Theme/Table';
import { RootState } from 'Reducers';
import { ConfigurationAction, addConfiguration } from 'Actions/ConfigurationActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headText: {
            fontWeight: 700,
            fontSize: '18px',
            color: theme.palette.primary.main,
            padding: '15px 50px',
        },
        divider: {
            marginBottom: '1rem',
            marginLeft: '22px',
            marginRight: '22px',
            height: '1px',
            backgroundColor: '#E9E9E9',
        },
        button: {
            display: 'flex',
            marginLeft: 'auto',
            marginTop: '50px',
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
        result: {
            color: '#000000',
            fontWeight: 500,
        },
    })
);
interface SummaryProps {
    goBack: () => void;
    config: Configuration;
    resetStep: () => void;
    addConfiguration: (config: Configuration) => void;
}


const OPERATOR_TRANSLATION = {
    '<': "&lt;",
    '=': "=",
    '>': '&gt;',
    '<=': '&lte;',
    '>=': '&gte;'
}

const Summary = (props: SummaryProps) => {
    const classes = useStyles();
    /**
     * Convert configuration policies to a string format
     * @returns string that contains the policies
     */
    const getPoliciesAsString = () => {
        let result: string = '';
        props.config.policies?.forEach((policy: Policy) => {
            result += `${policy.name} ${policy.operator} ${policy.value} \n`;
        });
        return result;
    };

    /**
     * Convert report types to string
     * @returns string that contains all report types
     */
    const getReportsAsString = () => {
        let result: string = "";
        props.config.reports?.forEach((report: ReportTypes | string) => {
            result += `${report}\n`;
        });
        return result;
    }

    const saveConfig = () => {
        props.addConfiguration(props.config);
        props.resetStep();
    }

    return (
        <>
            <Button
                style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }}
                onClick={() => props.goBack()}
            >
                <img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back
            </Button>
            <Typography component="span" gutterBottom>
                <Box fontSize="h6.fontSize" style={{ marginBottom: '40px', textAlign: 'center' }}>
                    Step 5 - Summary
                </Box>
            </Typography>
            <Typography className={classes.headText}>
                Name: <span className={classes.result}>{props.config.name}</span>
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.headText}>
                Implementation:{' '}
                <span className={classes.result}>{props.config.implementation}</span>
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.headText}>
                Policy: <span className={classes.result}>{getPoliciesAsString()}</span>
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.headText}>
                Report: <span className={classes.result}>{getReportsAsString()}</span>
            </Typography>
            <Divider className={classes.divider} />
            <Button onClick={() => saveConfig()} className={classes.button}>Save configuration</Button>
        </>
    );
};
/* Redux functions */

/**
 * Function that maps all required state variables to props.
 * @param state Rootstate that has all reducers combined
 */
const mapStateToProps = (state: RootState) => ({
    configs: state.configuration.configs
});

/**
 * Function that maps dispatch functions to props
 * @param dispatch the dispatch function used by Redux
 */
const mapDispatchToProps = (dispatch: Dispatch<ConfigurationAction>) => ({
    addConfiguration: (config: Configuration) => dispatch(addConfiguration(config))
});


export default connect(mapStateToProps, mapDispatchToProps)(Summary);
