import { Action, ActionCreator } from 'redux';

/* Action types */

export const STEP_PROGRESS = 'STEP_PROGRESS';
export const STEP_RESET = 'STEP_RESET';


/* Typescript interfaces */

export interface StepProgressAction extends Action {
    type: 'STEP_PROGRESS';
}

export interface StepResetAction extends Action {
    type: 'STEP_RESET';
}


/* Action functions*/

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


// Type that references each possible action type
export type FilecheckAction = StepProgressAction | StepResetAction;