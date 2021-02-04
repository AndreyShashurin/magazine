import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { DbService } from 'src/app/shared/services/db.service';
import { TypeName } from 'src/app/shared/services/interface.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { IMessage, WS_API } from 'src/app/websocket';
import { WebsocketService } from 'src/app/websocket/websocket.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit, OnDestroy {
  array: any;
  ngUnsubscribe = new Subject();
  private messages$: Observable<IMessage[]>;
  private counter$: Observable<number>;
  private texts$: Observable<string[]>;

  public form: FormGroup;
  constructor(
    public db: DbService,   
    private fb: FormBuilder, 
    public settingsService: SettingsService,
    public cartService: CartService,
     private wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.db.getBillKitchen().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(el => {
      this.array = el;
    })
    this.form = this.fb.group({
      text: [null, [
          Validators.required
      ]]
  });

  // get messages
  this.messages$ = this.wsService.addEventListener<IMessage[]>(WS_API.EVENTS.MESSAGES);

  // get counter
  this.counter$ = this.wsService.addEventListener<number>(WS_API.EVENTS.COUNTER);

  // get texts
  this.texts$ = this.wsService.addEventListener<string[]>(WS_API.EVENTS.UPDATE_TEXTS);
  }

  public sendText(): void {
    if (this.form.valid) {
        this.wsService.sendMessage(WS_API.COMMANDS.SEND_TEXT, this.form.value.text);
        this.form.reset();
    }
}
  getTime(e) {
    return TypeName[e.type]
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
