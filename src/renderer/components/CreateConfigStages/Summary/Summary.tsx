import *  as React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { Configuration, Policy, ReportTypes } from 'Interfaces/Configuration';
import * as fs from 'fs';
import { remote } from 'electron';


interface SummaryProps {
    goBack: () => void;
    config: Configuration;
    resetStep: () => void;
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
        props.config.reports?.forEach((report: ReportTypes) => {
            result += `${report}\n`;
        })
        return result;
    }

    const configurationToXml = (config?: Configuration) => {
        let xmlHead = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
        let xmlDoc = document.implementation.createDocument("", "", null);
        let configElement = xmlDoc.createElement("configuration");
        let versionElement = xmlDoc.createElement("version");
        versionElement.innerHTML = "3";
        let isosElement = xmlDoc.createElement("isos");

        config?.implementation.split(',').forEach((impl: string) => {
            let implElement = xmlDoc.createElement("iso");
            implElement.innerHTML = impl;
            isosElement.appendChild(implElement);
        })

        let formatsElement = xmlDoc.createElement("formats");

        config?.reports?.forEach((report: ReportTypes) => {
            let reportElement = xmlDoc.createElement("format");
            reportElement.innerHTML = report;
            formatsElement.appendChild(reportElement);
        })

        let modifiedElement = xmlDoc.createElement("modified-isos");

        let rulesElement = xmlDoc.createElement("rules");

        config?.policies?.forEach((policy: Policy) => {
            let ruleElement = xmlDoc.createElement('rule');
            let ruleName = xmlDoc.createElement('name');
            let ruleOp = xmlDoc.createElement('operator');
            let ruleValue = xmlDoc.createElement('value');

            ruleName.innerHTML = policy.name;
            ruleOp.innerHTML = OPERATOR_TRANSLATION[policy.operator]
            ruleValue.innerHTML = policy.value;

            ruleElement.appendChild(ruleName);
            ruleElement.appendChild(ruleOp);
            ruleElement.appendChild(ruleValue);

            rulesElement.appendChild(ruleElement);
        });

        let fixesElement = xmlDoc.createElement("fixes");

        configElement.appendChild(versionElement);
        configElement.appendChild(isosElement);
        configElement.appendChild(formatsElement);
        configElement.appendChild(modifiedElement);
        configElement.appendChild(rulesElement);
        configElement.appendChild(fixesElement);

        xmlDoc.appendChild(configElement);
        console.log(xmlDoc);

        let xml = new XMLSerializer()
            .serializeToString(xmlDoc)
            .replace(' xmlns="http://www.w3.org/1999/xhtml"', '');

        let format = require('xml-formatter');
        return format(xmlHead + xml);
    }


    const saveConfigToDisk = () => {
        const { app } = remote;
        let filePath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() : app.getPath('exe')}/config/${props.config.name}.xml`;
        let content = configurationToXml(props.config);
        fs.writeFile(filePath, content, (err) => { });
        props.resetStep()
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
            <Button onClick={() => saveConfigToDisk()}>Save configuration</Button>
        </>
    );
}

export default Summary;