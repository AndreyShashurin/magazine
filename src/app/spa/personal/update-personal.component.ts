import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-updatepersonal',
  template: `<app-newpersonal [format]="'update'"></app-newpersonal>`
})
export class updatePersonalComponent {

    constructor(
        private db: DbService,
        private fb: FormBuilder
    ) {}

}
