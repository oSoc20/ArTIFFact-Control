import { combineReducers } from 'redux';

import { CounterState, exampleReducer } from './exampleReducer';

export interface RootState {
    counter: CounterState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    counter: exampleReducer
});
