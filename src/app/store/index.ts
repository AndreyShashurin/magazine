import * as Persons from './reducers/persons.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State{
    persons: Persons.State;
}

export const reducers: ActionReducerMap<State> = {
    persons: Persons.personsReducer
};