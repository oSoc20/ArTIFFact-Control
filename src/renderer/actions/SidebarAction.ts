import { Action, ActionCreator } from 'redux';

export const ACTIVE_ITEM = 'ACTIVE_ITEM';

export interface ActiveItemAction extends Action {
    type: 'ACTIVE_ITEM';
    activeItem: string;
}

export const setActiveItem: ActionCreator<ActiveItemAction> = (activeItem: string) => ({
    type: ACTIVE_ITEM,
    activeItem: activeItem
});


export type SidebarAction = ActiveItemAction // | DecrementAction;
