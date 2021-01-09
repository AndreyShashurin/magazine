import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './state/app.state';
import { settingsReducer } from './reducers/settings.reduser';
import { personsReducer } from './reducers/persons.reducer';
import { routerReducer } from '@ngrx/router-store';

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    persons: personsReducer,
    settings: settingsReducer
};