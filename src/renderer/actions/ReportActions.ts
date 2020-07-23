import { Action, ActionCreator } from 'redux';
import { Configuration } from 'Interfaces/Configuration';
// import { ReportParent } from 'Interfaces/ReportParent';


/* Action types */

export const ADD_REPORTS = 'ADD_REPORTS';
export const REMOVE_REPORTS = 'REMOVE_REPORTS';
export const LOAD_REPORTS = 'LOAD_REPORTS';


/* Typescript interfaces */

// Stepper
export interface AddReportAction extends Action {
    type: 'ADD_REPORTS';
    reports: ReportParent;
}

export interface RemoveReportAction extends Action {
    type: 'REMOVE_REPORTS';
    reports: ReportParent;
}

export interface LoadReportsAction extends Action {
    type: 'LOAD_REPORTS'; 
}

/* Action functions */

export const addReports: ActionCreator<AddReportAction> =  (reports: ReportParent) => ({
    type: ADD_REPORTS,
    reports
});

export const removeReports: ActionCreator<RemoveReportAction> =  (reports: ReportParent) => ({
    type: REMOVE_REPORTS,
    reports
});

export const loadConfigs: ActionCreator<LoadReportsAction> =  () => ({
    type: LOAD_REPORTS,
});

export type ReportsAction = AddReportAction | RemoveReportAction | LoadReportsAction;