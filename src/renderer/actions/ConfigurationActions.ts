import { Action, ActionCreator } from 'redux';
import { Configuration } from 'Interfaces/Configuration';


/* Action types */

export const ADD_CONFIG = 'ADD_CONFIG';
export const REMOVE_CONFIG = 'REMOVE_CONFIG';
export const LOAD_CONFIGS = 'LOAD_CONFIGS';


/* Typescript interfaces */

// Stepper
export interface AddConfigAction extends Action {
    type: 'ADD_CONFIG';
    config: Configuration;
}

export interface RemoveConfigAction extends Action {
    type: 'REMOVE_CONFIG';
    config: Configuration;
}

export interface LoadConfigsAction extends Action {
    type: 'LOAD_CONFIGS'; 
}

/* Action functions */

export const addConfiguration: ActionCreator<AddConfigAction> =  (config: Configuration) => ({
    type: ADD_CONFIG,
    config
});

export const removeConfiguration: ActionCreator<RemoveConfigAction> =  (config: Configuration) => ({
    type: REMOVE_CONFIG,
    config
});

export const setReadState: ActionCreator<LoadConfigsAction> =  () => ({
    type: LOAD_CONFIGS,
});

export type ConfigurationAction = AddConfigAction | RemoveConfigAction | LoadConfigsAction;