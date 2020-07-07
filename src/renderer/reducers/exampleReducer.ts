import { Reducer } from 'redux';

import { DECREMENT, INCREMENT, ExampleAction } from '../actions/exampleActions';

export interface CounterState {
    readonly value: number;
}

const defaultState: CounterState = {
    value: 0
};

export const exampleReducer: Reducer<CounterState> = (
    state = defaultState,
    action: ExampleAction
) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1
            };
        case DECREMENT:
            return {
                ...state,
                value: state.value - 1
            };
        default:
            return state;
    }
};
