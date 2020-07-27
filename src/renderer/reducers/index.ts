import { combineReducers } from 'redux';

import { SidebarState, sidebarReducer } from './SidebarReducer';
import { FilecheckState, fileCheckReducer} from './FileCheckReducer';
import { ConfigurationState, configurationReducer } from './ConfigurationReducer'
import { ReportsState, reportsReducer } from './ReportsReducer';

export interface RootState {
    sidebar: SidebarState;
    filecheck: FilecheckState;
    configuration: ConfigurationState;
    reports: ReportsState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    sidebar: sidebarReducer,
    filecheck: fileCheckReducer,
    configuration: configurationReducer,
    reports: reportsReducer
});
