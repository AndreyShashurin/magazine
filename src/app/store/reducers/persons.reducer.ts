import { PersonsActions, EPersonsActions} from '../actions/persons.actions';
import { initialPersonsState } from '../state/persons.state';

export function personsReducer(state = initialPersonsState, action: PersonsActions){
 switch(action.type){
   case EPersonsActions.GetPersons:
     return {
       ...state,
       persons: []
     };
   case EPersonsActions.DeletePersons:
     return {
       ...state,
       persons: []
     };
   default:
     return state;
 }
}