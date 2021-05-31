import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-bulle',
  templateUrl: './info-bulle.component.html',
  styleUrls: ['./info-bulle.component.scss'],
})
export class InfoBulleComponent implements OnInit {
  showInfoBulle: boolean;
  @Input()
  balSelected: any[];
  constructor() {
    this.showInfoBulle = false;
  }

  ngOnInit() {}
}
