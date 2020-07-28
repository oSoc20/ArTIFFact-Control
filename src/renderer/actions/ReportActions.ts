import { Action, ActionCreator } from 'redux';

/* Action types */

export const SET_REPORT = 'SET_REPORT';
export const ADD_REPORTS = 'ADD_REPORTS';
export const REMOVE_REPORTS = 'REMOVE_REPORTS';
export const LOAD_REPORTS = 'LOAD_REPORTS';


/* Typescript interfaces */
export interface SetReportAction extends Action {
    type: 'SET_REPORT';
    report: ReportParent;
}

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

export const setReport: ActionCreator<SetReportAction> =  (report: ReportParent) => ({
    type: SET_REPORT,
    report
});

export const addReports: ActionCreator<AddReportAction> =  (reports: ReportParent) => ({
    type: ADD_REPORTS,
    reports
});

export const removeReports: ActionCreator<RemoveReportAction> =  (reports: ReportParent) => ({
    type: REMOVE_REPORTS,
    reports
});

export const loadReports: ActionCreator<LoadReportsAction> =  () => ({
    type: LOAD_REPORTS,
});

export type ReportsAction = SetReportAction | AddReportAction | RemoveReportAction | LoadReportsAction;