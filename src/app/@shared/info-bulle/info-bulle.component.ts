import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-bulle',
  templateUrl: './info-bulle.component.html',
  styleUrls: ['./info-bulle.component.scss'],
})
export class InfoBulleComponent implements OnInit {
  showInfoBulle: boolean;
  @Input()
  selectedBal: any[] = [];

  @Input()
  balDataList: any[];

  ballist: any[] = [];
  constructor() {
    this.showInfoBulle = false;
  }

  ngOnInit() {
    console.log('selectedBal');
    console.log(this.selectedBal);
    if (this.selectedBal.length > 0) this.ballist = this.balDataList;
    else
      this.balDataList.map((item) => {
        this.ballist.push(item.adresseBal);
      });

    console.log('selectedBal');
    console.log(this.ballist);
  }
}
