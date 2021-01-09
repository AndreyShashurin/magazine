import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DbService } from '../../shared/services/db.service';
import { settingsIntarface } from '../../shared/services/interface.service';
import { ESettingsActions, GetSettings, GetSettingsSucces } from '../actions/settings.action';

@Injectable()
export class SettingsEffects {
    @Effect()
    getSettings$ = this._actions$.pipe(
        ofType<GetSettings>(ESettingsActions.GetSettings),
        switchMap(() => this._dbService.getSettings()),
        switchMap((config) => {
            return of(new GetSettingsSucces(config));
        })
    )

    constructor(
        private _dbService: DbService,
        private _actions$: Actions
    ) {}
}