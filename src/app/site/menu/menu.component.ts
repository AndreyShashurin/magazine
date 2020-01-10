import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionLike, Subject } from 'rxjs';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

import { DbService } from '../../shared/services/db.service';
import { menuIntarface, skladIntarface } from '../../shared/services/interface.service';
import { ModalContentComponent } from '../../shared/component/modal-content/modal-content.component';
import { ModalDetailComponent } from '../../shared/component/modal-detail/modal-detail.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)

  public viewPort: CdkVirtualScrollViewport;
  bsModalRef: BsModalRef;
  menu: menuIntarface[] = [];
  sklad: skladIntarface[] =[];
  public ingredientForm: FormGroup;
  checked = false;
  menuForm = true;
  newRecept = true;
  dataArray = false;
  data: any;
  subscription: SubscriptionLike;
  form: FormGroup;
  private ngUnsubscribe = new Subject();
  public contactTypes: { output?: string, title: string, price?: number}[] = [];

  constructor(
    private db: DbService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.ingredientForm = this.fb.group({
      ingredient: fb.array([])
    });
  }

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
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

  public removeIngredient(i: number): void {
    (<FormArray>this.ingredientForm.get('ingredient')).removeAt(i);
  }

   updateForm(i: any): void {
     console.log(i);
     this.ingredientForm.value.ingredient = {title: i.title, price: i.price};
  }

  onKeyUp(event: any) {
    console.log(event.target.value)
  };

  ngOnInit() {
    this.addIngredient();

    this.subscription = this.db.getMenu().pipe(
          takeUntil(this.ngUnsubscribe)
      ).subscribe(
      (response) => {
        console.log(response)
        this.menu = response;
      } ,
      (error) => {console.log(error);}
     )

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
  }

  openModal(id, tovar, link) {
    this.dataArray = true;
    console.log(this.dataArray);
    const initialState = {
     /* list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],*/
      confirmDeleteParam: id,
      confirmDeleteGet: link,
      title: 'Удалить позицию из меню'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить позицию меню ?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = id;
    this.bsModalRef.content.confirmDeleteGet = link;
  }

  openDetail(data){
    console.log(data)
    let structureArray = [];
    let processArray = [];
    let sum = 0;
    data.structure.forEach(function(value, key) {
      sum = sum + parseFloat(value[3].split('=')[1]);
      structureArray.push({
        "name": value[0].split('=')[1],
        "size": value[2].split('=')[1],
        "price": value[3].split('=')[1]});
    });
    if(data.process) {
      data.process.forEach(function (value) {
        processArray.push({
          "number": value[0].split('=')[1],
          "process": value[1].split('=')[1]});
      });
    }
    const initialState = {
      structureArray,
      processArray,
      sum:sum,
      output:data.output
    };
    this.bsModalRef = this.modalService.show(ModalDetailComponent, {initialState});
    this.bsModalRef.content.ModalBody = {initialState};
    this.bsModalRef.content.ModalTitle = data.name;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }
  
  newForm() {
    this.menuForm = false;
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
  }

  update(data){
    this.menuForm = false;
    this.data = data;
    this.checked = data.nodiscountFlag;
  }

  addBlock(){
    (<FormArray>this.form.get('process')).push(
      this.fb.group({
        id: [''],
        value: [''],
      })
    );
  }

  save() {
    console.log(this.form)
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
