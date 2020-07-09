import { Reducer } from 'redux';
import { STEP_PROGRESS, StepProgressAction, StepAction } from '../actions/FileCheckActions';

export interface FilecheckState {
    readonly step: number;
}

const defaultState: FilecheckState = {
    step: 0
};

export const fileCheckReducer: Reducer<FilecheckState, StepProgressAction> = (
    state = defaultState,
    action: StepAction
) => {
    switch(action.type) {
        case STEP_PROGRESS:
            return {
                ...state,
                step: state.step + 1
            }
        default:
            return state;
    }
}