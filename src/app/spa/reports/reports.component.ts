import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  constructor(
    private db: DbService
  ) { }

  ngOnInit() {
    this.db.getReports().subscribe(
      (response: Response) => { 
          //this.tovars = response;
          console.log(response)
      } ,
      (error) => {console.log(error);}
    )  
  }

}
