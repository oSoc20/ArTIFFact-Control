import { Action, ActionCreator } from 'redux';

export const STEP_PROGRESS = 'STEP_PROGRESS';

export interface StepProgressAction extends Action {
    type: 'STEP_PROGRESS';
    step: number;
}

export const setStep: ActionCreator<StepProgressAction> =  (newStep: number) => ({
    type: STEP_PROGRESS,
    step: newStep
})

export type StepAction = StepProgressAction; // | SomeOtherAction