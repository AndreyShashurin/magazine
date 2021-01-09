import { Component, OnInit, Input} from '@angular/core';
import { MenuItem } from '../../shared/services/interface.service';
import { MenuService } from '../../shared/services/menu.service';
import { AuthService } from '../../shared/services/auth.service';
import { SettingsService } from '../../shared/services/settings.service';
import { DbService } from '../../shared/services/db.service';


@Component({
  selector: 'spa-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() menu: MenuItem
  stat: any = []
  
  constructor(
    public menuService: MenuService,
    private authService: AuthService,
    public db: DbService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.db.getUser(localStorage.getItem('SJid')).subscribe(
      (val) => {
        this.stat = val[1];
      },
      (error) => {
        console.log(error);
      }
    )  
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
