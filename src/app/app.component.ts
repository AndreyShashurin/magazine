import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './shared/services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {    

  constructor(
    private router: Router, 
    private authService: AuthGuard 
  ) {}

  ngOnInit() {

  }
}
 