import {FilialsUnion, FilialActions, Filials} from '../actions/filials.action';
    
export interface State{
    filials: {},
    count: number;
}

const initialState: State = {
    filials: {},
    count: 0
};

export function filialsReducer(state: State = initialState, action: FilialsUnion){
 switch(action.type){
   case FilialActions.LoadFilial:
     return {
       ...state,
       filials: action.payload.filials
     };
   case FilialActions.DeleteFilial:
     return {
       ...state,
       filials: []
     };
   default:
     return state;
 }
}