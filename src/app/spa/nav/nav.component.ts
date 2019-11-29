import { Component, OnInit, Input} from '@angular/core';
import { MenuItem } from '../../shared/services/interface.service';
import { MenuService } from '../../shared/services/menu.service';
import { AuthService } from '../../shared/services/auth.service';
import { SettingsService } from '../../shared/services/settings.service';


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
    private settingsService: SettingsService
  ) { }

  ngOnInit() {

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
