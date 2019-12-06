import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-write',
  templateUrl: './writeof.component.html',
  styleUrls: ['./writeof.component.sass']
})
export class WriteOfComponent implements OnInit {
  writeOf: FormGroup;

  constructor(
    public db: DbService
  ) { }

  ngOnInit() {
    this.writeOf = new FormGroup({
      'reason': new FormControl(null, Validators.required),
      'date': new FormControl(null),
      'comment': new FormControl(null)
    });
  }

  sendForm() {
    this.db.postWriteOf(this.writeOf.value).subscribe((event) => {

    });
  }
}
