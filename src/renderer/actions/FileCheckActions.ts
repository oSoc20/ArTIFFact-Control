import { Action, ActionCreator } from 'redux';

/* Action types */

// Stepper
export const STEP_PROGRESS = 'STEP_PROGRESS';
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

// Files
export interface SetFilesAction extends Action {
    type: 'SET_FILES';
    files: Array<Object>;
}

export interface ClearFilesAction extends Action {
    type: 'CLEAR_FILES';
}


/* Action functions*/

// Stepper

/**
 * Progress one step. Increases the counter by 1
 */
export const progressStep: ActionCreator<StepProgressAction> =  () => ({
    type: STEP_PROGRESS,
});

/**
 * Reset the step. Sets the counter back to 0
 */
export const resetStep: ActionCreator<StepResetAction> =  () => ({
    type: STEP_RESET,
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
export const setFiles: ActionCreator<SetFilesAction> = (files: Array<Object>) => ({
    type: SET_FILES,
    files: files
});


// Type that references each possible action type
export type FilecheckAction = StepProgressAction | StepResetAction | ClearFilesAction | SetFilesAction;