import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../../categories/modal/modal.component';

@Component({
  selector: 'app-modal-change',
  templateUrl: './modal-change.component.html',
  styleUrls: ['./modal-change.component.scss']
})
export class ModalChangeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data)
    this.data.formGroup.validator
    this.data.formGroup.get('filial').disable();
    if(this.data.type === 4) {
      this.data.formGroup.get('filial').enable();
      this.data.formGroup.get('date').enable();
    } else if(this.data.type === 3) {
      this.data.formGroup.get('filial').enable();
      this.data.formGroup.get('accountIn').enable();
    } else {
      this.data.formGroup.get('category').enable();
    }
  }

  setDisabled(data: any) {
    if(this.data.formGroup.get('type').value === 1 && +data.operation === 0
    || this.data.formGroup.get('type').value === 2 && +data.operation === 1) {
      return true
    }
    return false
  }

  save() {
    this.dialogRef.close(this.data);
  }
}
