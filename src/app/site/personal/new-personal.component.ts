import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';
import { categoriesInterface } from 'src/app/shared/interface/interface.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-newpersonal',
  templateUrl: './new.component.html',
  styleUrls: ['./personal.component.scss']
})
export class newPersonalComponent implements OnChanges, OnInit, OnDestroy {
    @Input() format:string;

    subscription: Subscription
    subscription2: Subscription
    form: FormGroup
    paramsId: number
    accesses: any
    filials: any
    categories: categoriesInterface[] = [
        { id: 1, name: 'Статистика', value: 'stat', checked: false },
        { id: 2, name: 'Меню', value: 'menu', checked: false },
        { id: 3, name: 'Финансы', value: 'finance', checked: false },
        { id: 4, name: 'Склад', value: 'sklad', checked: false },
        { id: 5, name: 'Настройки', value: 'settings', checked: false },
        { id: 6, name: 'Маркетинг', value: 'promo', checked: false },
        { id: 7, name: 'Управление персоналом', value: 'personal', checked: false },
        { id: 8, name: 'Предприятия', value: 'filial', checked: false },
        { id: 9, name: 'Терминал', value: 'terminal', checked: false },
        { id: 10, name: 'Кухня', value: 'kitchen', checked: false }
    ];

    constructor(
        private db: DbService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private alert: AlertService,
        private settings: SettingsService
    ) {}

    createForm() {
        this.form = this.form = new FormGroup({
            'id': new FormControl(null),
            'name': new FormControl(null, Validators.required),
            'access': new FormControl(null, Validators.required),
            'level': this.fb.array([]),
            'filial': new FormControl(null),
            'password': new FormControl(null, Validators.required),
            'pin': new FormControl(null),
        });
        this.patch()
    }

    patch(): void {
        this.categories.forEach((category: categoriesInterface) => {
           this.addFormArray(category.id, category.name, category.value, category.checked)
        })
    }

    addFormArray(id: number, name: string, value:string, checked: number | boolean) {
        return (<FormArray>this.form.get('level')).push(
            this.fb.group({
                id: [id],
                name: [name],
                value:[value],
                checked: [checked],
            })
        )
    }
    
    ngOnChanges(obj: SimpleChanges) {
        this.paramsId = +this.route.snapshot.params.id
        this.route.params.pipe(
          switchMap((params) => {
            return this.db.getUser(params['id'])
          })
        ).subscribe((post) => {
            this.form.patchValue(post[0])
            let counter = 0;
            let formArr = <FormArray>this.form.controls.level;
            for (let level in post[1]) {
                formArr.at(counter).patchValue({checked:+post[1][level]})      
                counter++
            }
        })
    }

    canDeactivate() {
        return 'Хотим покинуть страницу'
    }
    
    save() {
        if (this.format) {         
            this.form.value.id = this.paramsId   
            console.log(this.form.value)
            this.subscription = this.db.updateUser(this.form.value).subscribe(
                (responce) => {
                    this.alert.success('Информация о пользователе изменена')
                },
                (error) => {
                    this.alert.error('Ошибка изменения')
                }
            ) 
        }  else {
            this.form.value.level = this.form.value.level.filter(val => val.checked)
            console.log(this.form.value)
            this.subscription = this.db.saveUser(this.form.value).subscribe(
                (responce) => {
                    this.alert.success('Новый пользователь создан')
                },
                (error) => {
                    this.alert.error('Ошибка сохранения')
                }
            )
        }
    }
 
    ngOnInit() {
        this.subscription = this.db.getAccess().subscribe(
            (responce) => {
                this.accesses = responce
            },
            (error) => {
                console.log(error)
            }
        )  
        this.createForm();     
    }

    trackByFn(index, item) {
        return index
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe()
        }
    }
}
