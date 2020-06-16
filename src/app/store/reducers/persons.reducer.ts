import {PersonsUnion, PersonsActions, Persons} from '../actions/persons.actions';
    
export interface State{
    persons: {},
    count: number;
}

const initialState: State = {
    persons: {},
    count: 0
};

export function personsReducer(state: State = initialState, action: PersonsUnion){
 switch(action.type){
   case PersonsActions.LoadPersons:
     return {
       ...state,
       persons: action.payload.persons
     };
   case PersonsActions.DeletePersons:
     return {
       ...state,
       persons: []
     };
   default:
     return state;
 }
}