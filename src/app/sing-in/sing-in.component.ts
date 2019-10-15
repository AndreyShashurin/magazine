import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})

export class SingInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  remindForm: FormGroup;
  login: Subscription;
  submitted = false;
  error: string;
  message: string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['token']) {
        this.message = 'Пожалуйста, введите логин и пароль'
      }
    })
    this.loginForm = new FormGroup({
      'login': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  singIn() {
    this.submitted = true
    this.login = this.authService.login(this.loginForm.value).subscribe((event) => {
      if (event) {
        this.loginForm.reset()
        this.router.navigate(['/dashboard', 'index'])
        this.submitted = false
      } else {
        this.error = 'Нет такого пользователя'
        this.submitted = false
      }
    });
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
