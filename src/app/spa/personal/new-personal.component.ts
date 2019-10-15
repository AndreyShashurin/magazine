import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/db.service';
import { personsInterface } from 'src/app/services/interface.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-newpersonal',
  templateUrl: './new.component.html',
  styleUrls: ['./personal.component.sass']
})
export class newPersonalComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    subscription2: Subscription;
    form: FormGroup;
    accesses: any;
    filials: any;
    constructor(
        private db: DbService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.subscription = this.db.getAccess().subscribe(
            (responce) => {
                this.accesses = responce
            },
            (error) => {
                console.log(error)
            }
        )        
        this.subscription2 = this.db.getFilial().subscribe(
            (responce) => {
              this.filials = responce
            },
            (error) => {
                console.log(error)
            }
        )
        this.form = new FormGroup({
            'name': new FormControl(null, Validators.required),
            'access': new FormControl(null, Validators.required),
            'level': this.fb.group([]),
            'filial': new FormControl(null),
            'password': new FormControl(null, Validators.required),
            'pin': new FormControl(null),
        });
    }

    onCheckChange(event) {
        const formArray: FormArray = this.form.get('access') as FormArray;
      
        if (event.target.checked) {
          formArray.push(new FormControl(event.target.value));
        } else {
           /* let i: number = 0;
      
            formArray.controls.forEach((ctrl: FormControl) => {
                if(ctrl.value == event.target.value) {
                // Remove the unselected element from the arrayForm
                formArray.removeAt(i);
                return;
                }
            
            }  */
        } 
    }

    save() {
        console.log(this.form.value);
        //this.db.saveUser(this.form.value);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
            this.subscription2 = null;
        }
    }
}
