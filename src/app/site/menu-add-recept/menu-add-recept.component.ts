import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Subject, SubscriptionLike } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HomeComponent } from '../home.component';
import { SettingsService } from '../../shared/services/settings.service';
import { DbService } from '../../shared/services/db.service';
import { skladIntarface } from '../../shared/services/interface.service';

@Component({
  selector: 'app-menu-add-recept',
  templateUrl: './menu-add-recept.component.html',
  styleUrls: ['./menu-add-recept.component.scss']
})
export class MenuAddReceptComponent extends HomeComponent implements OnInit {

  form: FormGroup;
  ingredientForm: FormGroup;
  subscription: SubscriptionLike;
  private ngUnsubscribe = new Subject();
  sklad: skladIntarface[] =[];
  public contactTypes: { output?: string, title: string, price?: number}[] = [];

  constructor(
    private fb: FormBuilder,
    public db: DbService,
    public settingsService: SettingsService 
  ) { 
    super(
      db,
      settingsService
    )
    this.ingredientForm = this.fb.group({
      ingredient: fb.array([])
    });
  }
  
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(),
      output: new FormControl(),
      categories: this.fb.array([]),
      weight: new FormControl(),
      sale: new FormControl(),
      process: this.fb.array([]),
      nalog: new FormControl(),
      filial: new FormControl(),
      ingredients: this.fb.array([]),
      cost: new FormControl(),
      price: new FormControl(),
      percent: new FormControl(),
      profit: new FormControl()
    });
    this.addBlock()
    this.subscription = this.db.getSklad().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (response) => {
        this.sklad = response;
        for (let record of this.sklad) {
          this.contactTypes.push({title: record['tovar'], price: record['price']});
        }
      } ,
      (error) => {console.log(error);}
    )    
    console.log(this.filial)
  }
  
  addBlock(){
    (<FormArray>this.form.get('process')).push(
      this.fb.group({
        id: [''],
        value: [''],
      })
    );
  }

  public get ingredient(): FormArray {
    return <FormArray>this.ingredientForm.get('ingredient');
  }
  public addIngredient(): void {
    (<FormArray>this.ingredientForm.get('ingredient')).push(
      this.fb.group({
        title: [''],
        output: [''],
        price: ['']
      })
    );
}
  save() {
    console.log(this.form.value)
  }
}
