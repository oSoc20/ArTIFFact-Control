import { Action, ActionCreator } from 'redux';

export const STEP_PROGRESS = 'STEP_PROGRESS';

export interface StepProgressAction extends Action {
    type: 'STEP_PROGRESS';
}

export const progressStep: ActionCreator<StepProgressAction> =  () => ({
    type: STEP_PROGRESS,
})

export type FilecheckAction = StepProgressAction; // | SomeOtherAction