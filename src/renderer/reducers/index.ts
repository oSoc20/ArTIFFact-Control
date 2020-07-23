import { combineReducers } from 'redux';

import { SidebarState, sidebarReducer } from './sidebarReducer';
import { FilecheckState, fileCheckReducer} from './FileCheckReducer';
import { ConfigurationState, configurationReducer } from './ConfigurationReducer'

export interface RootState {
    sidebar: SidebarState;
    filecheck: FilecheckState;
    configuration: ConfigurationState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    sidebar: sidebarReducer,
    filecheck: fileCheckReducer,
    configuration: configurationReducer
});
