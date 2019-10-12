import { Component, OnInit } from '@angular/core';
import { SpaConfigService } from 'src/app/services/config.service';
import { DbService } from 'src/app/db.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  appPageHeaderDivStyle: {};
  errorMessage: string;
  loggedInEmail: string = "";
  isLoggedIn: boolean;
  persons: any[] = [];

  constructor( 
    private spaConfigService: SpaConfigService, 
    private db: DbService,
    private http: HttpClient
    ) {
      
  }

  ngOnInit() {
  }
}
