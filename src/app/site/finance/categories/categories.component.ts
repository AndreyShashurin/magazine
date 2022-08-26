import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from 'src/app/shared/services/db.service';
import { CategoryType, } from 'src/app/shared/interface/interface.service';
import { ModalComponent } from './modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalContentComponent } from '../../shared/modal-content/modal-content.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  finance: any;
  type = CategoryType;
  form: FormGroup;
  bsModalRef: BsModalRef;
  constructor(
    private dialog: MatDialog,
    private bd: DbService,
    private modalService: BsModalService,
    ) { }
  ngOnInit() {
    this.bd.getFinance().subscribe(el => {
      this.finance = el;
    })
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  openModal(type?: string) {
    let dialogRef = this.dialog.open(ModalComponent, {
      data: {
        formGroup: this.form,
        type
      }
    });
    dialogRef.afterClosed().subscribe(el => {
      if(el) {
        if(el.type === 'update') {
          this.bd.putFinance('category', el.formGroup.value).subscribe(res => {
            this.form.reset()
          })
        } else {
          this.bd.postFinance('category', el.formGroup.value).subscribe(res => {
            this.form.reset()
          })
        }
      }
    })
  }

  update(data) {
    this.form.get('id').setValue(data.id)
    this.form.get('name').setValue(data.name)
    this.form.get('type').setValue(data.operation)
    this.openModal('update')
  }

  deleteItem(id: number, tovar: string, link: string): void {
    const initialState = {
      confirmDeleteParam: id,
      confirmDeleteGet: link,
      title: 'Удалить категорию'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить ${tovar}?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = id;
    this.bsModalRef.content.confirmDeleteGet = link;
  }

}
