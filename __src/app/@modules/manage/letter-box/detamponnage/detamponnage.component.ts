import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BALFilter } from '__src/app/@shared/models/BALFilter';

@Component({
  selector: 'app-detamponnage',
  templateUrl: './detamponnage.component.html',
  styleUrls: ['./detamponnage.component.scss'],
})
export class DetamponnageComponent implements OnInit {
  @Input()
  balFilter: BALFilter = null;
  balFilterNotificationData: BALFilter = new BALFilter();

  @Input()
  balNumber;
  @Input()
  tooltipBALs: string[] = [];
  constructor() {}

  ngOnInit() {
    this.balFilterNotificationData = this.balFilter;
  }
}
