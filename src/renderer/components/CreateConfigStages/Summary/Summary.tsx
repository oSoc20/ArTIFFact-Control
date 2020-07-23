import *  as React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { Configuration, Policy, ReportTypes } from 'Interfaces/Configuration';
import { RootState } from 'Reducers';
import { ConfigurationAction, addConfiguration } from 'Actions/ConfigurationActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';


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

    /**
     * Convert configuration policies to a string format
     * @returns string that contains the policies
     */
    const getPoliciesAsString = () => {
        let result: string = "";
        props.config.policies?.forEach((policy: Policy) => {
            result += `${policy.name} ${policy.operator} ${policy.value} \n`
        });
        return result;
    }

    /**
     * Convert report types to string
     * @returns string that contains all report types
     */
    const getReportsAsString = () => {
        let result: string = "";
        props.config.reports?.forEach((report: ReportTypes | string) => {
            result += `${report}\n`;
        })
        return result;
    }

    const saveConfig = () => {
        props.addConfiguration(props.config);
        props.resetStep();
    }

    return (
        <>
            <Button onClick={() => props.goBack()}>Back</Button>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Step 5 - Summary
                </Box>
            </Typography>
            <Typography>Name: {props.config.name}</Typography>
            <Typography>Implementation: {props.config.implementation}</Typography>
            <Typography>Policy: {getPoliciesAsString()}</Typography>
            <Typography>Report: {getReportsAsString()}</Typography>
            <Button onClick={() => saveConfig()}>Save configuration</Button>
        </>
    );
}

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
    addConfiguration: (config: Configuration) => dispatch(addConfiguration(config)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Summary);