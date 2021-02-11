import { Injectable } from '@angular/core';

export interface User {
  login: string,
  password: string
}
export interface filialIntarface {
  id: string,
  name: string,
  adress: string,
  avg_price: string,
  count: string,
  price: string,
  profit: string,
  sale_price: string
}
export interface accountIntarface {
  id: string,
  balance: string,
  name: string
}
export interface categoryInterface {
  id: number,
  name: string,
  operation:string,
  rent: string,
  smena: string,
  sum: string
}

export interface personsInterface {
  access: number, 
  email: string, 
  filial: number,
  level?: any,
  filial_name: string,
  id: number,  
  login: string,  
  name: string, 
}

export interface SkladModel {
  access: string, 
  email: string, 
  filial: string,
  id: string,  
  login: string,  
  name: string, 
  pass: string, 
  remember_token: string, 
  terminal_pass: string
}
export interface tovarInterface {
  id: number, 
  name: string, 
  sold: number
}

export interface skladIntarface {
  id: number,
  tovar: string,
  categories_id: number, 
  categories_name: string, 
  ed: number, 
  filial: number, 
  price: number, 
  price_itog: number, 
  sale_price: number, 
  size: number, 
  value: number, 
  weight_flag: number
}

export interface MenuItem {
  text: string;
  icon?: string;
  route: string;
  visible?: any
  name?: string;
  role?: string;
  authF?: string;
  submenu?: Array<MenuItem>;
}

export interface newUser {
  name: string, 
  pass: string, 
  terminal_pass: string, 
  access: number, 
  filial: number
}

export interface responseIntarface {
  data: any,
  total: string,
}

export interface menuIntarface {
  categories?: number;
  categories_id?: number;
  categories_name: string;
  cost: number;
  count?: number;
  filial?: number;
  filial_id?: number;
  nalog?: number;
  id: number;
  margin: number;
  name: string;
  nodiscount: number;
  nodiscountText: string;
  nodiscountFlag: boolean;
  output: number;
  price: number;
  structure?: any;
  profit?: any;
  sold?: any;
  size?: string;
  combo?: string;
  weight_flag: string;
  totalCounter?: number;
  volume?: string,
  ingredient: ingredientsInterface[],
  process?: processIntarface[]
}

export interface processIntarface {
  id: number,
  value: string
}
export interface settingsIntarface {
  Tax: string, 
  access: number, 
  bank_emmit: string,
  check_print: number,  
  company: string,  
  company_id: number, 
  counting_orders: number, 
  currency: string, 
  data_payment: string, 
  date_end_free: string,
  date_registr: string,
  domain_id: string,
  email: string,
  ftp_pass: string,
  id: number,
  inn: string,
  kpp: string,
  month: number,
  pay_beznal_sale: string,
  report_number: string,
  report_for_email: number,
  sitemonth: string,
  site_id: string,
  tarif: string,
  time: string,
  type: number
}

export interface suppliersIntarface {
  name: string, 
  adress: string, 
  phone: string,
  comments?: string,  
  price?: string,
  count?: number,
  lat?: string,  
  lng?: string
}

export interface deliveryInterface {
  name: string, 
  adress: string, 
  phone: string,
  comments?: string,  
  price?: string,
  count?: number,
  lat?: string,  
  lng?: string
}

export interface discardIntarface {
  tovar: string, 
  reason: string, 
  date: string,
  price?: string
}

export interface categoriesInterface {
  id?: number,
  name: string, 
  checked?: boolean,
  value?: string,
  childe?: string, 
  parent?: string,
  images?: string
}

export interface promoInterface {
  id?: number, 
  name: string, 
  active:  number | boolean, 
  day_week: string, 
  categories: string, 
  combo: string, 
  price: string, 
  sale: number, 
  group_id: number,
  max: number,
  time_start: string,
  time_end: string
}

export interface ingredientsInterface  {
  costPrice?:  string | number,
  maxValue: string | number,
  output?: string,
  price?: number,
  title: string, 
  type: string | number,
  weight?: string | number,
}

export interface filialInterface  {
  id: number, 
  name: string,
  adress: string,
  price?: string,
  profit?: string,
  email?: string,
  sale_price?: string,
  count?: string,
  avg_price?: string,
  phone?: string
}

export enum IngredietnsTypeName {
  'litre' = 'л.',
  'milliliters' = 'мл.',
  'gram' = 'гр.',
  'piece' = 'шт.',
  'kilogram' = 'кг.'
}

export enum DiscardTypeName {
  'Просрочка' = 'Просрочка',
  'Порча товара' = 'Порча товара'
}

export enum TypeName {
  'primary',
  'success'
}

export enum TypePay {
  'Безналичными' = 'Расход',
  'Наличными' = 'Доход'
}

export enum CategoryType {
  'Расход',
  'Доход',
  'Инкасация',
  'Перевод',
  'Открытие смены',
  'Закрытие смены',
}

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  constructor() { }
}
export namespace CategoryType {
  export function values() {
    return Object.keys(CategoryType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
