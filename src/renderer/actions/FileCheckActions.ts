import { Action, ActionCreator } from 'redux';

/* Action types */

// Stepper
export const STEP_PROGRESS = 'STEP_PROGRESS';
export const STEP_GO_BACK = 'STEP_GO_BACK';
export const STEP_RESET = 'STEP_RESET';

// Files
export const CLEAR_FILES = 'CLEAR_FILES';
export const SET_FILES = 'SET_FILES';


/* Typescript interfaces */

// Stepper
export interface StepProgressAction extends Action {
    type: 'STEP_PROGRESS';
}

export interface StepResetAction extends Action {
    type: 'STEP_RESET';
}

export interface StepGoBackAction extends Action {
    type: 'STEP_GO_BACK';
}

// Files
export interface FileData {
    path: string;
    size: string;
}

export interface SetFilesAction extends Action {
    type: 'SET_FILES';
    files: Array<FileData>;
}

export interface ClearFilesAction extends Action {
    type: 'CLEAR_FILES';
}


/* Action functions*/

// Stepper

export const incrementStep: ActionCreator<StepProgressAction> =  () => ({
    type: STEP_PROGRESS,
});

export const resetStep: ActionCreator<StepResetAction> =  () => ({
    type: STEP_RESET,
});

export const goBackOneStep: ActionCreator<StepGoBackAction> =  () => ({
    type: STEP_GO_BACK,
});


// Files

/**
 * Clear the list of files
 */
export const clearFiles: ActionCreator<ClearFilesAction> = () => ({
    type: CLEAR_FILES,
});

/**
 * Set the list of files to a new list of files
 */
export const setFiles: ActionCreator<SetFilesAction> = (files: Array<FileData>) => ({
    type: SET_FILES,
    files: files
});


// Type that references each possible action type
export type FilecheckAction = StepProgressAction | StepResetAction | StepGoBackAction | ClearFilesAction | SetFilesAction;