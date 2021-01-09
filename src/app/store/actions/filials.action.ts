import {Action} from '@ngrx/store';

export enum FilialActions {
    LoadFilial = '[Filial Page] LoadFilial',
    DeleteFilial = '[Filial Page] DeleteFilial'
}
    
export interface Filials{
    filial: []
}

export class LoadFilial implements Action{
    readonly type = FilialActions.LoadFilial;
    
    constructor(public payload: {filials: Filials}){}
}
    
export class DeleteFilial implements Action{
    readonly type = FilialActions.DeleteFilial;
}
    
export type FilialsUnion = LoadFilial | DeleteFilial;