import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FrontalFilter } from '@shared';
import { Frontal } from '@shared/models/Frontal';
import { Pagination } from '@shared/models/pagination';

@Component({
  selector: 'app-frontal-list',
  templateUrl: './frontal-list.component.html',
  styleUrls: ['./frontal-list.component.scss'],
})
export class FrontalListComponent implements OnInit {
  @Input()
  listFrontal: Frontal[];
  @Input()
  selectedFrontalList: string[] = [];
  @Input()
  frontalFilter: FrontalFilter;
  @Input()
  selectAll: boolean = false;

  @Output()
  selectedFrontalEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()
  orderingFilter: EventEmitter<FrontalFilter> = new EventEmitter<FrontalFilter>();
  @Output()
  frontalToUpdateEvent: EventEmitter<Frontal> = new EventEmitter<Frontal>();

  pagination: Pagination = new Pagination();
  sortBy: string = 'nom';
  sortDirection: string = 'asc';
  champTri: string;
  sensTri: string;

  constructor() {}

  ngOnInit() {}

  emitToParent(selectedFrontal: any) {
    if (selectedFrontal.selected === false) {
      this.selectAll = false;
    } else if (selectedFrontal.selected === true) {
      this.selectedFrontalList = selectedFrontal.selectedFrontal;
      this.selectedFrontalEvent.emit(this.selectedFrontalList);
    }
    if (this.selectAll === true) {
      this.selectedFrontalEvent.emit(this.selectedFrontalList);
    } else {
      this.selectedFrontalList = selectedFrontal.selectedFrontal;
      this.selectedFrontalEvent.emit(this.selectedFrontalList);
    }
  }

  frontalToUpdate(frontal: Frontal) {
    this.frontalToUpdateEvent.emit(frontal);
  }

  selectAllFrontal(event) {
    if (event.target.checked) {
      this.listFrontal.forEach((frontal) => (frontal.isChecked = true));
      this.selectedFrontalList = this.listFrontal.map((elt) => elt.identifiant);
      this.selectedFrontalEvent.emit(this.selectedFrontalList);
    } else {
      this.listFrontal.forEach((frontal) => (frontal.isChecked = false));
      this.selectedFrontalList = [];
      this.selectedFrontalEvent.emit(this.selectedFrontalList);
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
    this.frontalFilter.champTri = this.sortBy;
    this.frontalFilter.sensTri = this.sortDirection;
    this.orderingFilter.emit(this.frontalFilter);
  }

  toggelSelectAllcheckbox(event) {
    this.selectAll = event;
  }
}
