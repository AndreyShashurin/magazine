import {Action} from '@ngrx/store';
import { settingsIntarface } from 'src/app/shared/services/interface.service';

export enum ESettingsActions {
    GetSettings = '[Settings] Get Settings',
    GetSettingsSucces = '[Settings Succes] Get Settings Succes',
}

export class GetSettings implements Action {
    public readonly type = ESettingsActions.GetSettings;
}

export class GetSettingsSucces implements Action {
    public readonly type = ESettingsActions.GetSettingsSucces;
    constructor(public payload: settingsIntarface[]) {}
}

export type SettingsActions = GetSettings | GetSettingsSucces;