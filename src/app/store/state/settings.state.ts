import { settingsIntarface } from '../../shared/interface/interface.service';

export interface ISettingsState {
    settings: settingsIntarface[];
}

export const initialSettingsState: ISettingsState = {
    settings: []
}