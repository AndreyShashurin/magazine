import {Injectable} from '@angular/core';
import { MenuItem } from './interface.service';


export class MenuService {
    item: MenuItem[]= [
        {
            text: 'Статистика',
            icon: 'signal',
            route: 'index',
            visible: [1,2],
            name: 'stat',
            submenu: [
                {text: 'Статистика', route:'index'},
                {text: 'Списания', route:'reports'},
                {text: 'Скидки', route:'discount'},
                {text: 'Динамика продаж', route:'reports'},
                {text: 'Персонал', route:'staff'},
                {text: 'Ингредиенты', route:'ingredients'},
                {text: 'Лента', route:'newsfeed'}
            ]
        },{
            text: 'Финансы',
            icon: 'rub',
            route: 'bill',
            visible: [1,2],
            name: 'finance',
            submenu: [
                {text: 'Оплаты', route:'bill'},
                {text: 'Отчет', route:'finance'},
                {text: 'Транзакции', route:'transactions'},
                {text: 'Смены', route:'сhange'},
                {text: 'Счета', route:'accounts'},
                {text: 'Налоги', route:'taxes'},
                {text: 'Категории', route:'categories'}
            ]
        },{
            text: 'Склад',
            icon: 'database',
            route: 'warehouse',
            visible: [1,2],
            name: 'sklad',
            submenu: [
                {text: 'Ингредиенты', route:'warehouse'},
                {text: 'Поставщики', route:'suppliers'},
                {text: 'Поставки', route:'delivery'},
                {text: 'Списания', route:'discard'}
            ]
        },{
            text: 'Меню',
            icon: 'leanpub',
            route: 'menu',
            visible: [1,2],
            name: 'menu',
            submenu: [
                {text: 'Меню', route:'menu'},
                {text: 'Категории', route:'category'}
            ]
        },{
            text: 'Заведения',
            icon: 'building',
            route: 'filial',
            visible: [1,2],
            name: 'filial',
        },{
            text: 'Маркетинг',
            icon: 'pie-chart',
            route: 'home',
            visible: [1,2],
            name: 'promo',
            submenu: [
                {text: 'Клиенты', route:'clients'},
                {text: 'Группы', route:'clients_group'},
                {text: 'Акции', route:'promo'},
                {text: 'Рассылки', route:'inform'},
                {text: 'Наборы', route:'combo'}
            ]
        },{
            text: 'Терминал',
            icon: 'desktop',
            route: 'terminal',
            visible: [1,2],
            name: 'terminal',
        },{
            text: 'Кухня',
            icon: 'desktop',
            route: 'kitchen',
            visible: [2],
            name: 'kitchen',
        },{
            text: 'Настройки',
            icon: 'wrench',
            route: 'settings',
            visible: [1,2],
            name: 'settings',
            submenu: [
                {text: 'Общие', route:'settings'},
                {text: 'Сотрудники', route:'personal'},
                {text: 'Группы', route:'group'},
                {text: 'Налоги', route:'tax'}
            ]
        }
    ];
}

