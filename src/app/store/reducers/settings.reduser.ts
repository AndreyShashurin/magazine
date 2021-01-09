import { ESettingsActions, SettingsActions } from '../actions/settings.action';
import { initialSettingsState } from '../state/settings.state';

export function settingsReducer(state = initialSettingsState, action: SettingsActions){
 switch(action.type){
   case ESettingsActions.GetSettingsSucces:
     return {
       ...state,
       settings: action.payload
     };
   default:
     return state;
 }
}