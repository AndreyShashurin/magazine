import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DbService } from 'src/app/db.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormArray, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionLike, Subject } from 'rxjs';
import { ModalDetailComponent } from 'src/app/modal-detail/modal-detail.component';
import { ModalContentComponent } from 'src/app/modal-content/modal-content.component';
import { menuIntarface, skladIntarface } from 'src/app/services/interface.service';

import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

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
        this.menu = response;
      } ,
      (error) => {console.log(error);}
     )

     this.subscription = this.db.getSklad().pipe(
          takeUntil(this.ngUnsubscribe)
      ).subscribe(
      (response) => {
        this.sklad = response;
        console.log(response)
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

  openDetail(tovar,structure,price,output){
    let structureArray = [];
    let sum = 0;
    structure.forEach(function(value, key) {
      sum = sum +	parseFloat(value[3].split('=')[1]);
      console.log(sum);
      structureArray.push({"name": value[0].split('=')[1],"size": value[2].split('=')[1], "price": value[3].split('=')[1]});
    });
    const initialState = {
      structureArray,
      sum:sum,
      output:output
    };
    this.bsModalRef = this.modalService.show(ModalDetailComponent, {initialState});
    this.bsModalRef.content.ModalBody = {initialState};
    this.bsModalRef.content.ModalTitle = tovar;
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
   /* var element = document.getElementsByClassName('item-process');
    var element2 = document.getElementsByClassName('item-process-number');
    var attribute = parseInt(element[element.length - 1].getAttribute("id"));
    let newElement = document.createElement('input');
    let newElement2 = document.createElement('input');
    newElement.type = "text";
    newElement2.type = "text";
    newElement.className  = "form-control item-process-number";
    newElement2.className  = "form-control item-process";
    attribute = attribute + 1;
    newElement2.setAttribute("id", `${attribute}`);
    newElement.setAttribute("value", `${attribute}`);
    element[element.length - 1].parentNode.insertBefore(newElement, element[element.length - 1].nextSibling);
    element2[element2.length - 1].parentNode.insertBefore(newElement2, element2[element2.length - 1].nextSibling);
*/
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
