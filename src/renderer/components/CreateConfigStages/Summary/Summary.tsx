import *  as React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { Configuration, Policy, ReportTypes } from 'Interfaces/Configuration';


interface SummaryProps {
    goBack: () => void;
    config: Configuration;
}


const Summary = (props: SummaryProps) => {

    const getPoliciesAsString = () => {
        let result: string = "";
        props.config.policies?.forEach((policy: Policy) => {
            result += `${policy.name} ${policy.operator} ${policy.value} \n`
        });
        return result;
    }

    const getReportsAsString = () => {
        let result: string = "";
        props.config.reports?.forEach((report: ReportTypes) => {
            result += `${report}\n`;
        })
        return result;
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
            <Button>Save configuration</Button>
        </>
    );
}

export default Summary;