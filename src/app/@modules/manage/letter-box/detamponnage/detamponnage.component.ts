import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BALFilter } from 'src/app/@shared/models/BALFilter';

@Component({
  selector: 'app-detamponnage',
  templateUrl: './detamponnage.component.html',
  styleUrls: ['./detamponnage.component.scss'],
})
export class DetamponnageComponent implements OnInit {
  @Input()
  balFilter: BALFilter = null;
  balFilterNotificationData: BALFilter = new BALFilter();
  @Input() balDataList;
  @Input()
  balNumber;
  @Input()
  tooltipBALs: string[] = [];
  @Input()
  balTemponne: string[] = [];

  constructor() {}

  ngOnInit() {
    this.balFilterNotificationData = this.balFilter;
  }
}
