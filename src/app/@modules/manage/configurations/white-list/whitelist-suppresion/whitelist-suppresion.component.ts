import { Component, Input, OnInit } from '@angular/core';
import { WhiteListHost } from '@shared/models/WhiteListHost';

@Component({
  selector: 'app-whitelist-suppresion',
  templateUrl: './whitelist-suppresion.component.html',
  styleUrls: ['./whitelist-suppresion.component.scss'],
})
export class WhitelistSuppresionComponent implements OnInit {
  @Input()
  whitelistHost: WhiteListHost = new WhiteListHost();

  constructor() {}

  ngOnInit() {}
}
