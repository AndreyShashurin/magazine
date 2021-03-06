import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from './db.service';
import { settingsIntarface } from './interface.service';

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