import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../../shared/services/settings.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'sing-terminal',
  templateUrl: './sing-terminal.component.html',
  styleUrls: ['./sing-terminal.component.scss']
})
export class SingTerminalComponent implements OnInit {
  currentNumber: string = '';
  submitted: boolean = false;
  error: string;
  message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['token']) {
        this.message = 'Пожалуйста, введите поле Pin'
      }
    })
  }

  public getNumber(v: string){
    this.currentNumber += v;
  }

  onValueChange(e: any) {
    this.currentNumber += e.data;
  }

  getDeleteOperation() {
    this.currentNumber = '';
  }

  getReplaceOperation() {

  }

  singIn() {
    this.submitted = true;  
    const hash = this.settingsService.md5.appendStr(this.currentNumber).end()
    this.authService.pin(hash).subscribe((event) => {
      if (event) {
        this.currentNumber = '';
        this.router.navigate(['/terminal', 'index'])
        this.submitted = false;
        return true;
      } else {
        this.error = 'Неверный Pin'
        this.submitted = false
      }
    }); 
  }
}