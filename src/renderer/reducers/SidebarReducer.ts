import { Reducer } from 'redux';
import { ACTIVE_ITEM, SidebarAction } from '../actions/SidebarAction';

export interface SidebarState {
    readonly activeItem: string;
}

const defaultState: SidebarState = {
    activeItem: "dashboard"
};

export const sidebarReducer: Reducer<SidebarState, SidebarAction> = (
    state = defaultState,
    action: SidebarAction
) => {
    switch (action.type) {
        case ACTIVE_ITEM:
            return {
                ...state,
                activeItem: action.activeItem
            };
        default:
            return state;
    }
};
