import { Reducer } from 'redux';
import { STEP_PROGRESS, FilecheckAction, STEP_RESET } from '../actions/FileCheckActions';


/* Typescript interfaces */

export interface FilecheckState {
    readonly step: number;
}

/* Reducer */

// Default state for the Filecheck reducer
const defaultState: FilecheckState = {
    step: 0
};

/**
 * The actual filecheck reducer.
 *  - STEP_PROGRESS action: increases counter by 1
 *  - STEP_RESET action: resets counter back to 0
 * @param state the current state (default = defaultState)
 * @param action the current action to perform
 */
export const fileCheckReducer: Reducer<FilecheckState, FilecheckAction> = (
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