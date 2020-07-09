import { Reducer } from 'redux';
import { STEP_PROGRESS, StepProgressAction, FilecheckAction, STEP_RESET } from '../actions/FileCheckActions';

export interface FilecheckState {
    readonly step: number;
}

const defaultState: FilecheckState = {
    step: 0
};

export const fileCheckReducer: Reducer<FilecheckState, StepProgressAction> = (
    state = defaultState,
    action: FilecheckAction
) => {
    switch(action.type) {
        case STEP_PROGRESS:
            return {
                ...state,
                step: state.step + 1
            }
        case STEP_RESET:
            return {
                ...state,
                step: 0
            }
        default:
            return state;
    }
}