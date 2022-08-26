import {Action} from '@ngrx/store';
import { personsInterface } from '../../shared/interface/interface.service';

export enum EPersonsActions {
    GetPersons = '[Persons Page] GetPersons',
    DeletePersons = '[Persons Page] DeletePersons'
}

export class GetPersons implements Action{
    readonly type = EPersonsActions.GetPersons;
    constructor(public payload: personsInterface[]){}
}
    
export class DeletePersons implements Action{
    readonly type = EPersonsActions.DeletePersons;
}
    
export type PersonsActions = GetPersons | DeletePersons;