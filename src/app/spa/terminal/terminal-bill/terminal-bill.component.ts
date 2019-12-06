import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerminalComponent } from '../terminal.component';
import { DbService } from '../../../shared/services/db.service';
import { categoriesInterface } from '../../../shared/services/interface.service';

@Component({
  selector: 'app-terminal-bill',
  templateUrl: './terminal-bill.component.html',
  styleUrls: ['./terminal-bill.component.scss']
})
export class TerminalBillComponent extends TerminalComponent implements OnInit {
  @Input() blll: categoriesInterface[] = [];

  constructor(
    public db: DbService
  ) { 
    super(
      db
    )
  }

  ngOnInit() {
    
  }
}
