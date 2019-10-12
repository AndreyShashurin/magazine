import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from 'src/app/db.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { settingsIntarface } from 'src/app/services/interface.service';


@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  settingsForm: FormGroup;
  settings: settingsIntarface[] = [];
  settingsOf: Subscription;
  serviceObservable: Subscription;

  constructor(
    private db: DbService,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.serviceObservable = this.db.getSmsService().subscribe(
      (responce) => {
        console.log(responce);
      },
      (error) => {console.log(error);}
    )
    this.settingsOf = this.db.getSettings().subscribe(
      (settings) => {
        this.settings = settings;
        console.log(this.settings);
        this.ngOnInit()
      },
      (error) => {console.log(error);}
    )
  }

  ngOnInit() {
    console.log(this.authService.userId)

    this.settingsForm = new FormGroup({
      company: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      beznalSale: new FormControl('', Validators.required),
      countingOrders: new FormControl('', Validators.required),
      smsService: this.fb.array([])
    })
    this.setData()
  }

  setData() {
      this.settingsForm.patchValue(this.settings);
    /* if(this.settingsForm.value.length) {
      this.form.controls['actions'] = this.fb.array(data.actions.map(i => this.fb.group(i)));
    }*/
  }

  addService() {
    return (<FormArray>this.settingsForm.get('smsService')).push(
      this.fb.group({
        serviceName: [],
        serviceLogin: [],
        servicePassword: [],
      })
    )
  }

  saveSettings(){
    this.db.saveSettings(this.settingsForm.value)
  }

  ngOnDestroy() {
    if (this.settingsOf) {
      this.settingsOf.unsubscribe()
    }
    this.serviceObservable.unsubscribe()
  }

}
