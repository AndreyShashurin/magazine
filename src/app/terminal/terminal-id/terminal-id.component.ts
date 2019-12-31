import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface, categoriesInterface, promoInterface } from '../../shared/services/interface.service';
import { CartService } from '../../shared/services/cart.service';
import { ModalTerminalComponent } from '../modal-terminal/modal-terminal/modal-terminal.component';
import { validateConfig } from '@angular/router/src/config';
import { TerminalComponent } from '../terminal.component';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'terminal-id',
  templateUrl: './terminal-id.component.html',
  styleUrls: ['./terminal-id.component.scss']
})
export class TerminalIdComponent extends TerminalComponent implements OnInit {
  @Input() items: categoriesInterface[];
  @Input() promo: promoInterface[];
  menu: menuIntarface[] = [];
  menuAll: menuIntarface[] = [];
  categories: categoriesInterface[] = [];
  categoriesChilde: categoriesInterface[] = [];
  bsModalRef: BsModalRef;
  
  constructor(
    private route: ActivatedRoute,
    public db: DbService,
    public settingsService: SettingsService,
    private cartService: CartService,
    private router: Router,
    private modalService: BsModalService
  ) {
    super(
      db,
      settingsService
    )
  }

  ngOnInit() {
    this.db.getMenu().subscribe(val => {
      this.menuAll = val;
    })
    this.db.getCategories().subscribe(val => {
      this.categories = val;
    })
  }

  getChildren(item: any) {
    this.cartService.onBreadcrumbs(item) // Строим хлебные крошки

    if (item) {
      if (item.childe) {
        this.db.getCategoriesChilde(item.childe).subscribe(val => {
          this.categoriesChilde = val;
          this.categories = [];
        })
      } else {
        this.categories = [];
      }
      this.db.getMenuByID(item.id).subscribe(val => {
        this.promo =[];
        this.menu = val;
      })
    }
  } 

  getZakaz(data: menuIntarface[]) {
    this.cartService.onSelected(data);
    this.cartService.updateCount(data, 1);
    this.cartService.updatePrice(+data['price'])
  }

  openModal(data) {
    let unserializeCombo = this.unserialize(data.categories);
    let chunk = this.array_chunk(unserializeCombo, 3, false);
    let structureArray = [];
    let combo1 = [];
    let combo2 = [];
    
    for (let value in chunk) {
      if (chunk[value][2].split('=')[1]) {
        combo1.push({
          "tovarId": chunk[value][0].split('=')[1],
          "tovarName": data.name,      
          "price": +data.price,         
          "tovarChilde": chunk[value][2].split('=')[1].split(','),
          "tovarArray": [],
          "zakaz": []
        });
      } else {
        combo2.push(this.menuAll.filter(val => val.id == +chunk[value][0].split('=')[1]));
      }
    }

    for (let item in combo1) {
      for (let childeItem of combo1[item]['tovarChilde']) {
        combo1[item]['tovarArray'].push(this.menuAll.filter(val => val.id == +childeItem))
      }
    }

    structureArray = [combo1, combo2]
    const initialState = {
      "type": 2,
      data,
      structureArray,
      combo1,
      combo2
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Выбрать';
   // this.bsModalRef.content.confirmDeleteGet = type;
  }
  
  openModalRecept(data): void {
    console.log(data)

    const initialState = {
      "type": 3,
      data
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }

   unserialize (data) {
    let that = this,
      utf8Overhead = function (chr) {
        var code = chr.charCodeAt(0);
        if (code < 0x0080) {
          return 0;
        }
        if (code < 0x0800) {
          return 1;
        }
        return 2;
      },
      error = function (type, msg, filename, line) {
      },
      read_until = function (data, offset, stopchr) {
        var i = 2, buf = [], chr = data.slice(offset, offset + 1);
  
        while (chr != stopchr) {
          if ((i + offset) > data.length) {
          }
          buf.push(chr);
          chr = data.slice(offset + (i - 1), offset + i);
          i += 1;
        }
        return [buf.length, buf.join('')];
      },
      read_chrs = function (data, offset, length) {
        var i, chr, buf;
  
        buf = [];
        for (i = 0; i < length; i++) {
          chr = data.slice(offset + (i - 1), offset + i);
          buf.push(chr);
          length -= utf8Overhead(chr);
        }
        return [buf.length, buf.join('')];
      },
      _unserialize = function (data, offset) {
        var dtype, dataoffset, keyandchrs, keys,
          readdata, readData, ccount, stringlength,
          i, key, kprops, kchrs, vprops, vchrs, value,
          chrs = 0,
          typeconvert = function (x) {
            return x;
          };
  
        if (!offset) {
          offset = 0;
        }
        dtype = (data.slice(offset, offset + 1)).toLowerCase();
  
        dataoffset = offset + 2;
  
        switch (dtype) {
          case 'i':
            typeconvert = function (x) {
              return parseInt(x, 10);
            };
            readData = read_until(data, dataoffset, ';');
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 1;
            break;
          case 'b':
            typeconvert = function (x) {
              return parseInt(x, 10) !== 0;
            };
            readData = read_until(data, dataoffset, ';');
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 1;
            break;
          case 'd':
            typeconvert = function (x) {
              return parseFloat(x);
            };
            readData = read_until(data, dataoffset, ';');
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 1;
            break;
          case 'n':
            readdata = null;
            break;
          case 's':
            ccount = read_until(data, dataoffset, ':');
            chrs = ccount[0];
            stringlength = ccount[1];
            dataoffset += chrs + 2;
  
            readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 2;
            break;
          case 'a':
            readdata = {};
  
            keyandchrs = read_until(data, dataoffset, ':');
            chrs = keyandchrs[0];
            keys = keyandchrs[1];
            dataoffset += chrs + 2;
  
            for (i = 0; i < parseInt(keys, 10); i++) {
              kprops = _unserialize(data, dataoffset);
              kchrs = kprops[1];
              key = kprops[2];
              dataoffset += kchrs;
  
              vprops = _unserialize(data, dataoffset);
              vchrs = vprops[1];
              value = vprops[2];
              dataoffset += vchrs;
  
              readdata[key] = value;
            }
  
            dataoffset += 1;
            break;
          default:
            break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
      }
    ;
    return _unserialize((data + ''), 0)[2];
  }

  array_chunk(input, size, preserveKeys) {
    var x
    var p = ''
    var i = 0
    var c = -1
    var l = input.length || 0
    var n = []
  
    if (size < 1) {
      return null
    }
  
    if (Object.prototype.toString.call(input) === '[object Array]') {
      if (preserveKeys) {
        while (i < l) {
          (x = i % size)
            ? n[c][i] = input[i]
            : n[++c] = {}; n[c][i] = input[i]
          i++
        }
      } else {
        while (i < l) {
          (x = i % size)
            ? n[c][x] = input[i]
            : n[++c] = [input[i]]
          i++
        }
      }
    } else {
      if (preserveKeys) {
        for (p in input) {
          if (input.hasOwnProperty(p)) {
            (x = i % size)
              ? n[c][p] = input[p]
              : n[++c] = {}; n[c][p] = input[p]
            i++
          }
        }
      } else {
        for (p in input) {
          if (input.hasOwnProperty(p)) {
            (x = i % size)
              ? n[c][x] = input[p]
              : n[++c] = [input[p]]
            i++
          }
        }
      }
    }
  
    return n
  }  
}
