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
    const name = `report-${format(reports.reports[0].date, 'dd-MM-yyyy-hh-mm-ss')}`;
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
            for(let i = 0; i < report.reports.length; i++) {
                report.reports[i].date = new Date(Date.parse(report.reports[i].date as unknown as string));
            }
            console.log("well well, how the turntables", report, file);
            reportParents.push(report);
        }
    });
    return reportParents;
}


/**
 * Removes reports from disk
 * @param reports Reports to remove
 */
const eraseConfigFromDisk = (reports: ReportParent) => {
    const { app } = remote;
    const name = `report-${format(reports.reports[0].date, 'dd-MM-yyyy-hh-mm-ss')}`;
    let filePath = `${process.env.NODE_ENV === 'development' ? app.getAppPath() : app.getPath('exe')}/reports/${name}.json`;
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
    else{
        console.log("NOONOOOOO NOOOOOOO NOOOOO", filePath);
    }
}


/**
 * The actual reports reducer:
 *  - ADD_REPORTS: add reports to the current state and save it to disk
 *  - REMOVE_REPORTS: remove reports from current state and remove it from disk
 *  - LOAD_REPORTS: load the reports from disk if they are not loaded yet
 * @param state current reports state
 * @param action action to perform on the state
 */
export const reportsReducer: Reducer<ReportsState, ReportsAction> = (
    state = defaultState,
    action: ReportsAction
) => {
    switch (action.type) {
        case ADD_REPORTS: {
            const { reports } = action;
            if(!state.reports.includes(reports)) {
                saveReportsToDisk(reports);
                return {
                    ...state,
                    reports: [...state.reports, reports]
                };
            }
            return state;
        }
        case REMOVE_REPORTS: {
            let newReports = [...state.reports];
            const index = newReports.indexOf(action.reports);
            if (index !== -1) {
                newReports.splice(index, 1);
                eraseConfigFromDisk(action.reports)
            }
            return { ...state, reports: newReports }
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