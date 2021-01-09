import { settingsIntarface } from '../../shared/services/interface.service';

export interface ISettingsState {
    settings: settingsIntarface[];
}

export const initialSettingsState: ISettingsState = {
    settings: []
}