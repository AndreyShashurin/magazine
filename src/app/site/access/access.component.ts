import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { AccessInterface } from './interface/access.interface';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessComponent implements OnInit {
  accesses: AccessInterface[];
  
  constructor(
    private _db: DbService
  ) { }

  ngOnInit() {
    this._db.getAccess().subscribe(
      (responce) => {
          this.accesses = responce;
          console.log(this.accesses)
      },
      (error) => {
          console.log(error)
      }
  )        
  }

}
