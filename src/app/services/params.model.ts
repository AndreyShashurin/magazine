import { Injectable, OnDestroy } from '@angular/core';
import { DbService } from '../db.service';
import { settingsIntarface } from './interface.service';
import { Subscription } from 'rxjs';

@Injectable()
export class ParamsModel implements OnDestroy {
    private params: settingsIntarface[] = [];
    settingsOf: Subscription;

    constructor(private db: DbService) {
    }
    
    public setParams() {
        this.settingsOf = this.db.getSettings().subscribe(
        (settings) => { 
          this.params = settings;
        } ,
        (error) => {console.log(error);}
       ) 
    }

    public getParams() {
        return this.params;
    }

    ngOnDestroy() {
        if (this.settingsOf) {
          this.settingsOf.unsubscribe()
        }
    }    
}