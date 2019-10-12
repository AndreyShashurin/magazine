import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/db.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finanсe.component.html',
  styleUrls: ['./finanсe.component.sass']
})
export class FinanсeComponent implements OnInit {

  constructor(
    private db: DbService
  ) { }

  ngOnInit() {
    
  }

}
