import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { DbService } from '../db.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})

export class SingInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  remindForm: FormGroup;
  login: Subscription;
  canActivateMessage = '';

  constructor(
    private db:DbService,
    private authService:AuthService,
    private http: HttpClient,
    private router:Router
  ) { }
  
  ngOnInit() {
    this.loginForm = new FormGroup({
      'login': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  singIn() {
    this.login = this.authService.login(this.loginForm.value).subscribe(
      response =>{
        if(response) {
          console.log('Вход разрешен');
          this.router.navigate(['/dashboard', 'index'])
        } else {
          console.log('Вход запрещен')
          this.canActivateMessage = 'Логин или пароль не верные'
        }      
      }
    );
  }

  checkForm() {
    this.remindForm = new FormGroup({
      'token': new FormControl(null, Validators.required),
      'newPassword': new FormControl(null, Validators.required)
    });
  }

  remindButton() {

  }

  ngOnDestroy() {
    if (this.login) {
      this.login.unsubscribe()
    }
  }
}
