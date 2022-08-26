import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DbService } from 'src/app/shared/services/db.service';
import { TypeName } from 'src/app/shared/interface/interface.service';
import { IMessage, WS_API } from 'src/app/websocket';
import { WebsocketService } from 'src/app/websocket/websocket.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit, OnDestroy {
  private messages$: Observable<IMessage[]>;
  private counter$: Observable<number>;
  private texts$: Observable<string[]>;
  array: any;
  ngUnsubscribe = new Subject();
  form: FormGroup;

  constructor(
    private _db: DbService,   
    private _fb: FormBuilder,
    private _wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    this._db.getBillKitchen().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(el => {
      this.array = el;
    })
    this.form = this._fb.group({
      text: [null, [
          Validators.required
      ]]
    });

    // get messages
    this.messages$ = this._wsService.addEventListener<IMessage[]>(WS_API.EVENTS.MESSAGES);

    // get counter
    this.counter$ = this._wsService.addEventListener<number>(WS_API.EVENTS.COUNTER);

    // get texts
    this.texts$ = this._wsService.addEventListener<string[]>(WS_API.EVENTS.UPDATE_TEXTS);
  }

  public sendText(): void {
    if (this.form.valid) {
        this._wsService.sendMessage(WS_API.COMMANDS.SEND_TEXT, this.form.value.text);
        this.form.reset();
    }
  }

  getTime(e): string {
    return TypeName[e.type]
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
