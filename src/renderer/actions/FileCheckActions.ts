import { Action, ActionCreator } from 'redux';

export const STEP_PROGRESS = 'STEP_PROGRESS';
export const STEP_RESET = 'STEP_RESET';

export interface StepProgressAction extends Action {
    type: 'STEP_PROGRESS';
}

export interface StepResetAction extends Action {
    type: 'STEP_RESET';
}

export const progressStep: ActionCreator<StepProgressAction> =  () => ({
    type: STEP_PROGRESS,
});

export const resetStep: ActionCreator<StepResetAction> =  () => ({
    type: STEP_RESET,
});

export type FilecheckAction = StepProgressAction | StepResetAction;