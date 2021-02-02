import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../../shared/services/settings.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sing-terminal',
  templateUrl: './sing-terminal.component.html',
  styleUrls: ['./sing-terminal.component.scss']
})
export class SingTerminalComponent implements OnInit {
  error: string;
  message: string;
  form: FormGroup;
  get _form() {
    return this.form.get('pin');
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['token']) {
        this.message = 'Пожалуйста, введите поле Pin'
      }
    })

    this.form = this.fb.group({
      pin: ['', [Validators.required, Validators.pattern(/^[0-9]+(?!.)/)]]
    })   
  }

  getNumber(v: string){
    this.form.get('pin').setValue(this.form.get('pin').value + v)
  }

  deletePinField(): void {
    this.form.get('pin').setValue('')
  }

  replacePinField(): void  {
  }

  singIn(): void  {
    if(this.form.get('pin').valid) {
      const hash = this.settingsService.md5.appendStr(this.form.get('pin').value).end();
      this.authService.pin(hash).subscribe((event) => {
        if (event) {
          this.router.navigate(['/terminal', 'index'])
          return true;
        } else {
          this.error = 'Неверный Pin'
        }
      });
    } else {
      this.error = 'Неверный Pin';
    }
  }
}