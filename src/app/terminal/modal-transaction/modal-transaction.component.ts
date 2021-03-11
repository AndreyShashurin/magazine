import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalChangeComponent } from 'src/app/site/finance/change/modal-change/modal-change.component';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.scss']
})
export class ModalTransactionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if(this.data.type === 3) {
      this.data.formGroup.get('user').disable();
      this.data.formGroup.get('price').enable();
    } else if(this.data.type === 6) {
      this.data.formGroup.get('price').disable();
      this.data.formGroup.get('user').enable();
    }
  }

  save() {
    this.dialogRef.close(this.data);
  }
}
