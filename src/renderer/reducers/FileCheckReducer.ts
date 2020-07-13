import { Reducer } from 'redux';
import { STEP_PROGRESS, FilecheckAction, STEP_RESET, CLEAR_FILES, SET_FILES } from 'Actions/FileCheckActions';


/* Typescript interfaces */

export interface FilecheckState {
    readonly step: number;
    readonly files: Array<Object>;
}

/* Reducer */

// Default state for the Filecheck reducer
const defaultState: FilecheckState = {
    step: 0,
    files: []
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
        case CLEAR_FILES:
            return {
                ...state,
                files: []
            }
        case SET_FILES:
            return {
                ...state,
                files: action.files
            }
        default:
            return state;
    }
}