import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BALData } from '@shared/models/BALData';
import { BALFilter } from '@shared/models/BALFilter';
import { Pagination } from '@shared/models/pagination';
import { WhiteListHost } from '@shared/models/WhiteListHost';
import { WhiteListFilter } from '@shared/models/WhiteListFilter';

@Component({
  selector: 'app-white-list-table',
  templateUrl: './white-list-table.component.html',
  styleUrls: ['./white-list-table.component.scss'],
})
export class WhiteListTableComponent implements OnInit {
  @Input()
  whiteListHosts: WhiteListHost[];

  @Output()
  selectedHostEvent: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  orderingFilter: EventEmitter<WhiteListFilter> = new EventEmitter<WhiteListFilter>();

  @Output()
  deleteHostEvent: EventEmitter<WhiteListHost> = new EventEmitter<WhiteListHost>();

  @Input()
  highlighRowEnable: boolean = false;
  @Input()
  selectedHosts: string[] = [];
  @Input()
  whiteListFilter: WhiteListFilter = new WhiteListFilter();

  @Input()
  selectAll: boolean = false;
  totalResult: number = 0;
  pagination: Pagination = new Pagination();

  sortBy: string = 'nom';
  sortDirection: string = 'asc';

  bal: BALData;

  constructor() {}

  ngOnInit() {}

  emitToParent(selectedHosts: any) {
    if (selectedHosts.selected === false) {
      this.selectAll = false;
    }
    this.selectedHosts = selectedHosts.selectedHosts;
    this.selectedHostEvent.emit(this.selectedHosts);
  }

  selectAllHost(event) {
    if (event.target.checked) {
      this.whiteListHosts.forEach((host) => (host.isChecked = true));
      this.selectedHosts = this.whiteListHosts.map((host) => host.domainIp);
      this.selectedHostEvent.emit(this.selectedHosts);
    } else {
      this.whiteListHosts.forEach((host) => (host.isChecked = false));
      this.selectedHosts = [];
      this.selectedHostEvent.emit(this.selectedHosts);
    }
  }
  toggleTrie(columnName: string) {
    if (!this.sortBy || (this.sortBy && this.sortBy === '')) {
      this.sortDirection = 'asc';
      this.sortBy = columnName;
    } else if (
      this.sortBy &&
      this.sortBy === columnName &&
      this.sortDirection &&
      this.sortDirection === 'asc'
    ) {
      this.sortDirection = 'desc';
      this.sortBy = columnName;
    } else if (
      this.sortBy &&
      this.sortBy === columnName &&
      this.sortDirection &&
      this.sortDirection === 'desc'
    ) {
      this.sortDirection = '';
      this.sortBy = '';
    } else if (this.sortBy && this.sortBy !== columnName) {
      this.sortDirection = 'asc';
      this.sortBy = columnName;
    }
    this.whiteListFilter.champTri = this.sortBy;
    this.whiteListFilter.sensTri = this.sortDirection;
    this.orderingFilter.emit(this.whiteListFilter);
  }

  toggelSelectAllcheckbox(event) {
    this.selectAll = event;
  }
  deleteHost(whiteListHost) {
    this.deleteHostEvent.emit(whiteListHost);
  }
}
