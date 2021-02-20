import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryType } from 'src/app/shared/services/interface.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  type = CategoryType;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.data.formGroup.get('type').valueChanges.subscribe(id => {
      console.log(id)
      if(+id === 1) {
        this.data.formGroup.get('category').enable();
        this.data.formGroup.get('accountOut').enable();
        this.data.formGroup.get('accountIn').disable();
      } else if(+id === 2) {
        this.data.formGroup.get('category').enable();
        this.data.formGroup.get('accountOut').disable();
        this.data.formGroup.get('accountIn').enable();
      } else {
        this.data.formGroup.get('category').disable();
        this.data.formGroup.get('accountOut').enable();
        this.data.formGroup.get('accountIn').enable();
      }
    })
  }

  setDisabled(data: string): boolean {
    console.log(this.data.formGroup.get('type').value, data)
    if(this.data.formGroup.get('type').value === 1 && +data === 0
    || this.data.formGroup.get('type').value === 2 && +data === 1) {
      return true
    }
    return false
  }
  save() {
    this.dialogRef.close(this.data);
  }
}
