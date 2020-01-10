import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  accesses: any;
  
  constructor(
    public db: DbService
  ) { }

  ngOnInit() {
    this.db.getAccess().subscribe(
      (responce) => {
          this.accesses = responce;
          console.log(this.accesses)
      },
      (error) => {
          console.log(error)
      }
  )        
  }

}
