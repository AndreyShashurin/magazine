import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './shared/services/auth-guard.service';
import { Router } from '@angular/router';
import { MenuItem } from './shared/services/interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {    
  menu: MenuItem[] = [
      {
          text: 'Статистика',
          icon: 'signal',
          route: '/index',
          role: '',
          authF: '',
          submenu: [
              {text: 'Статистика', icon: '',route:'/index',role: '',authF:'',submenu:null},
              {text: 'Списания', icon: '',route:'/reports',role: '',authF:'',submenu:null},
              {text: 'Скидки', icon: '',route:'/discount',role: '',authF:'',submenu:null},
              {text: 'Динамика продаж', icon: '',route:'/reports',role: '',authF:'',submenu:null},
              {text: 'Персонал', icon: '',route:'/staff',role: '',authF:'',submenu:null},
              {text: 'Ингредиенты', icon: '',route:'/ingredients',role: '',authF:'',submenu:null},
              {text: 'Лента', icon: '',route:'/newsfeed',role: '',authF:'',submenu:null}
          ]
      },{
          text: 'Финансы',
          icon: 'rub',
          route: '/bill',
          role: '',
          authF: '',
          submenu: [
              {text: 'Оплаты', icon: '',route:'/bill',role: '',authF:'',submenu:null},
              {text: 'Отчет', icon: '',route:'/finanсe',role: '',authF:'',submenu:null},
              {text: 'Транзакции', icon: '',route:'/transactions',role: '',authF:'',submenu:null},
              {text: 'Смены', icon: '',route:'/сhange',role: '',authF:'',submenu:null},
              {text: 'Счета', icon: '',route:'/balance',role: '',authF:'',submenu:null},
              {text: 'Налоги', icon: '',route:'/taxes',role: '',authF:'',submenu:null},
              {text: 'Категории', icon: '',route:'/category',role: '',authF:'',submenu:null}
          ]
      },{
          text: 'Склад',
          icon: 'database',
          route: '/warehouse',
          role: '',
          authF: '',
          submenu: [
              {text: 'Ингредиенты', icon: '',route:'/warehouse',role: '',authF:'',submenu:null},
              {text: 'Поставщики', icon: '',route:'/suppliers',role: '',authF:'',submenu:null},
              {text: 'Поставки', icon: '',route:'/delivery',role: '',authF:'',submenu:null},
              {text: 'Списания', icon: '',route:'/write',role: '',authF:'',submenu:null}
          ]
      },{
          text: 'Меню',
          icon: 'leanpub',
          route: '/menu',
          role: '',
          authF: '',
          submenu: [
              {text: 'Меню', icon: '',route:'/menu',role: '',authF:'',submenu:null},
              {text: 'Категории', icon: '',route:'/categories',role: '',authF:'',submenu:null}
          ]
      },{
          text: 'Заведения',
          icon: 'building',
          route: '/filial',
          role: '',
          authF: '',
          submenu: null
      },{
          text: 'Маркетинг',
          icon: 'pie-chart',
          route: '/home',
          role: '',
          authF: '',
          submenu: [
              {text: 'Клиенты', icon: '',route:'/clients',role: '',authF:'',submenu:null},
              {text: 'Группы', icon: '',route:'/clients_group',role: '',authF:'',submenu:null},
              {text: 'Акции', icon: '',route:'/promo',role: '',authF:'',submenu:null},
              {text: 'Рассылки', icon: '',route:'/inform',role: '',authF:'',submenu:null},
              {text: 'Наборы', icon: '',route:'/combo',role: '',authF:'',submenu:null}
          ]
      },{
          text: 'Настройки',
          icon: 'wrench',
          route: '/settings',
          role: '',
          authF: '',
          submenu: [
              {text: 'Общие', icon: '',route:'/settings',role: '',authF:'',submenu:null},
              {text: 'Сотрудники', icon: '',route:'/personal',role: '',authF:'',submenu:null},
              {text: 'Группы', icon: '',route:'/access',role: '',authF:'',submenu:null},
              {text: 'Налоги', icon: '',route:'/tax',role: '',authF:'',submenu:null}
          ]
      }
  ];
  constructor(
    private router: Router, 
    private authService: AuthGuard 
  ) {}

  ngOnInit() {

  }

    public getClick(item): void {
		
    }
}
 