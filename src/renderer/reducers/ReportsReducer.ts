import { Reducer } from 'redux';
import * as fs from 'fs';
import * as path from 'path';
import { remote } from 'electron';
// import { ReportParent } from 'Interfaces/ReportParent';
import { ReportsAction, ADD_REPORTS, REMOVE_REPORTS, LOAD_REPORTS } from 'Actions/ReportActions';
import { format } from 'date-fns';

/* Typescript interfaces and types */

export interface ReportsState {
    hasLoaded: boolean;
    reports: Array<ReportParent>;
}


/* Functions and objects */

const defaultState: ReportsState = {
    hasLoaded: false,
    reports: []
};


const saveReportsToDisk = (reports: ReportParent) => {
    const content = JSON.stringify(reports, null, 4);
    const { app } = remote;
    let filePath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() : app.getPath('exe')}/reports`;
    const name = `report-${format(new Date(), 'dd-MM-yyyy-hh-mm-ss')}`;
    fs.writeFileSync(`${filePath}/${name}.json`, content);
}


const loadReportsFromDisk = () => {
    const { app } = remote;
    const dirPath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() : app.getPath('exe')}/reports/`;
    const filePaths = fs.readdirSync(dirPath);
    const reportParents: Array<ReportParent> = [];
    filePaths.forEach((file: string) => {
        if (file.endsWith('.json')) {
            let data = fs.readFileSync(path.join(dirPath, file)).toString();
            let report: ReportParent = JSON.parse(data) as ReportParent;
            console.log("well well, how the turntables", report, file);
            reportParents.push(report);
        }
    });
    return reportParents;
}


/**
 * The actual configuration reducer:
 *  - ADD_CONFIG: add reports to the current state and save it to disk
 *  - REMOVE_CONFIG: remove reports from current state and remove it from disk
 *  - LOAD_CONFIGS: load the reports from disk if they are not loaded yet
 * @param state current configuration state
 * @param action action to perform on the state
 */
export const reportsReducer: Reducer<ReportsState, ReportsAction> = (
    state = defaultState,
    action: ReportsAction
) => {
    switch (action.type) {
        case ADD_REPORTS: {
            const { reports } = action;
            saveReportsToDisk(reports);
            return {
                ...state,
                configs: [...state.reports, reports]
            };
        }
        case REMOVE_REPORTS: {
            let newReports = [...state.reports];
            const index = newReports.indexOf(action.reports);
            if (index !== -1) {
                newReports.splice(index, 1);
            }
            return { ...state, configs: newReports }
        }
        case LOAD_REPORTS: {
            let reports = [...state.reports];
            if (!state.hasLoaded)
                reports = loadReportsFromDisk();
            return { ...state, reports, hasLoaded: true }
        }
        default:
            return state;
    }
};