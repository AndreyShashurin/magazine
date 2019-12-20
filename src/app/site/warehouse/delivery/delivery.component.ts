import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { deliveryInterface } from 'src/app/shared/services/interface.service';
import { HomeComponent } from '../../home.component';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent extends HomeComponent implements OnInit {
  delivery: deliveryInterface[] = [];

  constructor(
    public db: DbService,
    public settingsService: SettingsService
  ) {
    super(
      db,
      settingsService
    );
    db.getDelivery().subscribe(
      (response) => { 
        this.delivery = response;
      },
      (error) => {console.log(error);}
     )  
  }

  ngOnInit() {
    
  }

}
