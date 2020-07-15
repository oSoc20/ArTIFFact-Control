import { combineReducers } from 'redux';

import { SidebarState, sidebarReducer } from './sidebarReducer';
import { FilecheckState, fileCheckReducer} from './FileCheckReducer'

export interface RootState {
    sidebar: SidebarState;
    filecheck: FilecheckState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    sidebar: sidebarReducer,
    filecheck: fileCheckReducer
});
