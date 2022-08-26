import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { settingsIntarface } from '../../shared/interface/interface.service';
import { DbService } from '../../shared/services/db.service';
import { AlertService } from '../../shared/services/alert.service';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  selectType: number;
  settings: settingsIntarface[] = [];
  service: any;
  settingsOf: Subscription;
  serviceObservable: Subscription;

  constructor(
    private db: DbService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {
    this.serviceObservable = this.db.getSmsService().subscribe(
      (responce) => {
        this.service = responce;    
        this.addService(responce);
      },
      (error) => {
        console.log(error);
      }
    )
    this.settingsOf = this.db.getSettings().subscribe(
      (settings) => {
        this.settings = settings;
        this.selectType = +settings['type'];
        this.setData()
      },
      (error) => {
        console.log(error);
      }
    )
  }

  setData() {
    this.settingsForm.patchValue(this.settings);
  }

  addService(data?: any) {
    return (<FormArray>this.settingsForm.get('smsService')).push(
      this.fb.group({
        serviceName: [],
        serviceLogin: [data ? data.company : ''],
        servicePassword: [],
      })
    )
  }

  selectTypeF(data: number) {
    this.selectType = data;
  }

  saveSettings(){
    this.settingsForm.value.type = this.selectType;
    this.db.saveSettings(this.settingsForm.value).subscribe(
      (val) => {
          this.alertService.success('Настройки изменены')
          this.settingsService.visibleMenu(this.selectType)
      },
      (error) => {
        this.alertService.error('Ошибка изменения')
      });
  }

  ngOnInit() {
    this.settingsService.visibleFilterDunc(false)
    this.settingsForm = new FormGroup({
      company: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      type: new FormControl(''),
      beznalSale: new FormControl('', Validators.required),
      countingOrders: new FormControl('', Validators.required),
      smsService: this.fb.array([])
    })
  }

  ngOnDestroy() {
    if (this.settingsOf) {
      this.settingsOf.unsubscribe()
    }
    this.serviceObservable.unsubscribe()
  }
}
