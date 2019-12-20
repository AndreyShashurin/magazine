import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'terminal-header',
  templateUrl: './terminal-header.component.html',
  styleUrls: ['./terminal-header.component.scss']
})
export class TerminalHeaderComponent implements OnInit {

  constructor(
    private cartService: CartService
    ) { }

  ngOnInit() {
  }

}
