import {Action} from '@ngrx/store';

export enum PersonsActions {
    LoadPersons = '[Persons Page] LoadPersonss',
    DeletePersons = '[Persons Page] DeletePersons'
}
    
export interface Persons{
    access: number, 
    email: string, 
    filial: number,
    level?: any,
    filial_name: string,
    id: number,  
    login: string,  
    name: string, 
}

export class LoadPersons implements Action{
    readonly type = PersonsActions.LoadPersons;
    
    constructor(public payload: {persons: Persons}){}
}
    
export class DeletePersons implements Action{
    readonly type = PersonsActions.DeletePersons;
}
    
export type PersonsUnion = LoadPersons | DeletePersons;