import { Component, OnInit, Input} from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'src/app/shared/services/interface.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'spa-menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() menu: MenuItem
  
  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('menu',this.menu)
    console.log('x',this.menuService)
  }

  logout() {
    this.authService.logout()
  }

  toggleState(e) {
    let elem = e.path[1];
    let ulElem = e.path[1].querySelector("ul.submenu");
    ulElem.classList.toggle("visible");
    if (!ulElem.classList.contains('visible')) {
      ulElem.style.height = "0px";
    } else {
      ulElem.style.height = elem.scrollHeight - 30 + 'px';
    }
  }
}
