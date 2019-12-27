import { Injectable } from '@angular/core';

export interface User {
  login: string,
  password: string
}

export interface categoryInterface {
  id?: number,
  value: string,
  name: string,
  checked: number | boolean
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
  icon: string;
  route: string;
  visible?: any
  role: string;
  authF: string;
  submenu: Array<MenuItem>;
}

export interface newUser {
  name: string, 
  pass: string, 
  terminal_pass: string, 
  access: number, 
  filial: number
}

export interface menuIntarface {
  categories?: number;
  categories_id?: number;
  categories_name: string;
  cost: number;
  count?: number,
  filial?: number;
  filial_id: number;
  nalog?: number;
  id: number;
  margin: number;
  name: string;
  nodiscount: number;
  nodiscountText: string;
  nodiscountFlag: boolean;
  output: number;
  price: number;
  process?: any;
  structure?: any;
  profit?: any;
  sold?: any;
  size?: string;
  combo?: string;
  weight_flag: string;
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
@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  constructor(
    id: number, 
    name: string, 
    sold: number
  ) { }
}
