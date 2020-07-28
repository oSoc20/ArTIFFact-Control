import { Reducer } from 'redux';
import { ADD_CONFIG, REMOVE_CONFIG, LOAD_CONFIGS, ConfigurationAction } from 'Actions/ConfigurationActions';
import { Configuration, ReportTypes, Policy, ValidOperator } from 'Interfaces/Configuration';
import * as fs from 'fs';
import * as path from 'path';
import { remote } from 'electron';

/* Typescript interfaces and types */

export interface ConfigurationState {
    configs: Array<Configuration>;
}


/* Functions and objects */

const defaultState: ConfigurationState = {
    configs: []
};

// Object used to translate the operators to html operators
// This is necessary in order to save '<' or '>' to XML files
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

/**
 * Converts an XML file to a Configuration object
 * @param data XML string
 * @param name name of the configuration
 */
const convertXmlToConfiguration = (data: string, name: string) => {
    let parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    const configName = name.split('.')[0] as string;

    const isoElements = Array.from(xmlDoc.getElementsByTagName('iso'));
    const profiles: Array<string> = [];
    isoElements.forEach((iso) => {
        let value = iso.childNodes[0].nodeValue?.trim() as string;

        // TODO: this is necessary in order to translate old DPF config files to our Configuration objects
        // I don't know the exact values of the DPF iso profiles. This probably also needs to become
        // a translation object as I did with the operators.
        if (value === 'TIFF_Baseline_Core_6_0') {
            value = 'Baseline TIFF 6.0';
        }

        profiles.push(value);
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
        const policyName = ruleElement.children[0].textContent?.trim();
        let policyOperator = ruleElement.children[1].textContent?.trim() as ValidOperator;

        const policyValue = ruleElement.children[2].textContent?.trim();
        if (policyName && policyOperator && policyValue) {
            const policy: Policy = {
                name: policyName,
                type: policyOperator,
                value: policyValue
            }
            policies.push(policy);
        }
    });

    const configuration: Configuration = {
        profiles: profiles,
        name: configName,
        policies: policies,
        reports: formats
    }

    return configuration;
}

/**
 * Read the configurations from disk (the files in config/ folder)
 * Only reads .xml or .dpf files
 */
const readConfigsFromDisk: () => Array<Configuration> = () => {
    const { app } = remote;
    const delimiter = process.platform == 'win32'? '\\' : '/';
    const dirPath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() :
        app.getPath('exe').substring(0, app.getPath('exe').lastIndexOf(delimiter) + 1)}${delimiter}config${delimiter}`;
    const filesPaths = fs.readdirSync(dirPath);
    const configs: Array<Configuration> = [];
    filesPaths.forEach((file: string) => {
        if (file.endsWith('.xml') || file.endsWith('.dpf')) {
            let data = fs.readFileSync(path.join(dirPath, file)).toString();
            let config: Configuration = convertXmlToConfiguration(data, file);
            configs.push(config);
        }
    })
    return configs;
}

/**
 * Long function to convert a configuration object to an XML string.
 * Also applies formatting to the XML string.
 * @param config configuration to convert
 * @returns formatted XML string
 */
const configurationToXml = (config?: Configuration) => {
    let xmlHead = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
    let xmlDoc = document.implementation.createDocument("", "", null);
    let configElement = xmlDoc.createElement("configuration");
    let versionElement = xmlDoc.createElement("version");
    versionElement.innerHTML = "3";
    let isosElement = xmlDoc.createElement("isos");

    config?.profiles.forEach((impl: string) => {
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
        ruleOp.innerHTML = OPERATOR_TRANSLATION[policy.type]
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

    let xml = new XMLSerializer()
        .serializeToString(xmlDoc)
        .replace(' xmlns="http://www.w3.org/1999/xhtml"', '');

    let format = require('xml-formatter');
    return format(xmlHead + xml);
}

/**
 * Save a configuration to disk under the config/ folder
 * @param config configuration to save
 * @param content contents of the file to save
 */
const saveConfigToDisk = (config: Configuration, content: string) => {
    const { app } = remote;
    const delimiter = process.platform == 'win32'? '\\' : '/';
    let filePath = `${process.env.NODE_ENV === 'development' ?
        app.getAppPath() :
        app.getPath('exe').substring(0, app.getPath('exe').lastIndexOf(delimiter) + 1)}${delimiter}config${delimiter}${config.name}.xml`;
    fs.writeFileSync(filePath.replace('//', '/'), content);
}

/**
 * Removes a configuration from disk
 * @param config configuration to remove
 */
const eraseConfigFromDisk = (config: Configuration) => {
    const { app } = remote;
    const delimiter = process.platform == 'win32'? '\\' : '/';
    let filePath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() :
        app.getPath('exe').substring(0, app.getPath('exe').lastIndexOf(delimiter) + 1)}${delimiter}config${delimiter}${config.name}.xml`;
    if (fs.existsSync(filePath.replace('//', '/'))) {
        fs.unlinkSync(filePath.replace('//', '/'));
    }
}


/**
 * The actual configuration reducer:
 *  - ADD_CONFIG: add config to the current state and save it to disk
 *  - REMOVE_CONFIG: remove config from current state and remove it from disk
 *  - LOAD_CONFIGS: load the configurations from disk if they are not loaded yet
 * @param state current configuration state
 * @param action action to perform on the state
 */
export const configurationReducer: Reducer<ConfigurationState, ConfigurationAction> = (
    state = defaultState,
    action: ConfigurationAction
) => {
    switch (action.type) {
        case ADD_CONFIG:
            const { config } = action;
            const content = configurationToXml(config);
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
            let configs = readConfigsFromDisk();
            return { ...state, configs }
        default:
            return state;
    }
};