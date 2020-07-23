import { Reducer } from 'redux';
import { ADD_CONFIG, REMOVE_CONFIG, LOAD_CONFIGS, ConfigurationAction } from 'Actions/ConfigurationActions';
import { Configuration, ReportTypes, Policy, ValidOperator } from 'Interfaces/Configuration';
import * as fs from 'fs';
import * as path from 'path';
import { remote } from 'electron';


export interface ConfigurationState {
    hasLoaded: boolean;
    configs: Array<Configuration>;
}

const defaultState: ConfigurationState = {
    hasLoaded: false,
    configs: []
};

type HtmlOp = '&lt;' | '&lte;' | '&gt;' | '&gte;';

const OPERATOR_TRANSLATION = {
    '<': "&lt;",
    '=': "=",
    '>': '&gt;',
    '<=': '&lte;',
    '>=': '&gte;',
    '&lt;': '<',
    '&gt;': '>',
    '&lte;': '<=',
    '&gte;': '>='
}

const convertXmlToConfiguration = (data: string, name: string) => {
    let parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    console.log("convertXmlToConfiguration", xmlDoc);
    const configName = name.split('.')[0] as string;

    const isoElements = Array.from(xmlDoc.getElementsByTagName('iso'));
    console.log("iso elems", isoElements)
    const implementation: Array<string> = [];
    isoElements.forEach((iso) => {
        let value = iso.childNodes[0].nodeValue?.trim() as string;
        if (value === 'TIFF_Baseline_Core_6_0') {
            value = 'Baseline TIFF 6.0';
        }
        implementation.push(value);
    });

    const formatElements = Array.from(xmlDoc.getElementsByTagName('format'));
    const formats: Array<ReportTypes | string> = [];
    formatElements.forEach((format) => {
        const value = format.childNodes[0].nodeValue?.trim() as ReportTypes;
        if (value) {
            formats.push(value);
        }
    });

    const ruleElements = Array.from(xmlDoc.getElementsByTagName('rule'));
    const policies: Array<Policy> = [];
    ruleElements.forEach((ruleElement) => {
        const policyName = ruleElement.childNodes[0].nodeValue;
        let policyOperator = ruleElement.children[1].nodeValue as HtmlOp | ValidOperator;
        if(policyOperator) {
            policyOperator = OPERATOR_TRANSLATION[policyOperator] as ValidOperator;
        }
        const policyValue = ruleElement.children[2].nodeValue;
        if (policyName && policyOperator && policyValue) {
            const policy: Policy = {
                name: policyName,
                operator: policyOperator,
                value: policyValue
            }
            policies.push(policy);
        }
    });

    const configuration: Configuration = {
        implementation: implementation.toString(),
        name: configName,
        policies,
        reports: formats
    }

    return configuration;
}


const readConfigsFromDisk: () => Array<Configuration> = () => {
    const { app } = remote;
    const dirPath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() : app.getPath('exe')}/config/`;
    console.log("Reading", dirPath);
    const filesPaths = fs.readdirSync(dirPath);
    const configs: Array<Configuration> = [];
    console.log("All files in disk", filesPaths)
    filesPaths.forEach((file: string) => {
        let data = fs.readFileSync(path.join(dirPath, file)).toString();
        let config: Configuration = convertXmlToConfiguration(data, file);
        configs.push(config);
    })
    return configs;
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

    config?.reports?.forEach((report: ReportTypes | string) => {
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

const saveConfigToDisk = (config: Configuration, content: string) => {
    const { app } = remote;
    let filePath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() : app.getPath('exe')}/config/${config.name}.xml`;
    fs.writeFileSync(filePath, content);
}

const eraseConfigFromDisk = (config: Configuration) => {
    const { app } = remote;
    let filePath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() : app.getPath('exe')}/config/${config.name}.xml`;
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}


export const configurationReducer: Reducer<ConfigurationState, ConfigurationAction> = (
    state = defaultState,
    action: ConfigurationAction
) => {
    switch (action.type) {
        case ADD_CONFIG:
            const { config } = action;
            const content = configurationToXml(config);
            console.log("SAVING TO DISK?", content);
            saveConfigToDisk(config, content);
            return {
                ...state,
                configs: [...state.configs, config]
            };
        case REMOVE_CONFIG:
            let newConfigs = [...state.configs];
            const index = newConfigs.indexOf(action.config);
            if (index !== -1) {
                newConfigs.splice(index, 1);
                eraseConfigFromDisk(action.config);
            }
            return { ...state, configs: newConfigs }
        case LOAD_CONFIGS:
            let configs = [...state.configs];
            if (!state.hasLoaded)
                configs = readConfigsFromDisk();
            return { ...state, configs, hasLoaded: true }
        default:
            return state;
    }
};