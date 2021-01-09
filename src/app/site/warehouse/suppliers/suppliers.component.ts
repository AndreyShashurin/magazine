import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../../shared/services/db.service';
import { suppliersIntarface } from '../../../shared/services/interface.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.sass']
})
export class SuppliersComponent implements OnInit {
  suppliers: suppliersIntarface[] = [];

  constructor(
    public db: DbService
    ) {
      db.getSuppliers().subscribe(
        (response) => { 
          this.suppliers = response;
          console.log(response)
        },
        (error) => {console.log(error);}
       ) 
  }

  ngOnInit() {
  }

}
