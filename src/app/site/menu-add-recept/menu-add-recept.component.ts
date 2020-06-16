import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subject, SubscriptionLike } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { HomeComponent } from '../home.component';
import { SettingsService } from '../../shared/services/settings.service';
import { DbService } from '../../shared/services/db.service';
import { skladIntarface } from '../../shared/services/interface.service';

@Component({
  selector: 'app-menu-add-recept',
  templateUrl: './menu-add-recept.component.html',
  styleUrls: ['./menu-add-recept.component.scss'],
})
export class MenuAddReceptComponent extends HomeComponent implements OnInit {

  form: FormGroup;
  subscription: SubscriptionLike;
  private ngUnsubscribe = new Subject();
  sklad: skladIntarface[] =[];
  filial: any = [];
  public contactTypes: {title: string, price?: number }[] = [];
  
  constructor(
    private fb: FormBuilder,
    public db: DbService,
    public settingsService: SettingsService,
    public store: Store
  ) { 
    super(
      db,
      settingsService,
      store
    )
  }
  
  ngOnInit() {  
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      output: new FormControl(''),
      categories:  new FormControl('', Validators.required),
      weight: false,
      sale: true,   
      nalog:  new FormControl(''),
      filial: new FormControl(null, Validators.required),
      process: this.fb.array([]),
      ingredient: this.fb.array([])
    });

    this.addFormProcess();
    this.addIngredient();
    this.subscription = this.db.getSklad().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (response) => {
        this.sklad = response;
        for (let record of this.sklad) {
          this.contactTypes.push({title: record['tovar'], price: +record['price']});
        }
      } ,
      (error) => {
        console.log(error);
      }
    )   
    
    this.settingsService.filialSubscriber.subscribe(value =>
      {
        this.filial = value;
      })
  }
  
  checkbox_change() {

  }

  addFormProcess() {
    return (<FormArray>this.form.get('process')).push(
      this.fb.group({
        id: [''],
        value: [''],
      })
    )
  }

  addIngredient() {
    (<FormArray>this.form.get('ingredient')).push(
      this.fb.group({
        title: [''],
        output: [''],
        price: ['']
      })
    );
  }

  public get ingredient(): FormArray {
    return <FormArray>this.form.get('ingredient');
  }
  
  public removeIngredient(i: number): void {
    (<FormArray>this.form.get('ingredient')).removeAt(i);
  }

  save() {
    console.log(this.form.value)
  }
}
