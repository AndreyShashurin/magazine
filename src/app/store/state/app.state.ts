import { RouterReducerState } from '@ngrx/router-store';
import { initialPersonsState, IPersonsState } from './persons.state';
import { initialSettingsState, ISettingsState } from './settings.state';

export interface IAppState {
    router?: RouterReducerState;
    persons: IPersonsState;
    settings: ISettingsState;
}

export const initialAppState: IAppState = {
    persons: initialPersonsState,
    settings: initialSettingsState
};

export function getInitialState(): IAppState {
    return initialAppState;
}