import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/db.service';
import { personsInterface } from 'src/app/services/interface.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.sass']
})
export class PersonalComponent implements OnInit {

  subscription: Subscription;
  persons: personsInterface[] = [];
  constructor(
    private db: DbService
  ) { }

  ngOnInit() {
      this.subscription = this.db.getUsers().subscribe(
        (response) => { 
          console.log(response)
            this.persons = response;
        },
        (error) => {console.log(error);}
    )
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
