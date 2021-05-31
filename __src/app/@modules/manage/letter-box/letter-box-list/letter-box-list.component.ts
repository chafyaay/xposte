import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BALData } from '__src/app/@shared/models/BALData';
import { BALFilter } from '__src/app/@shared/models/BALFilter';
import { Pagination } from '__src/app/@shared/models/pagination';
import { Filter } from '__src/app/@shared/models/Filter';
import { RechercheBalService } from '__src/app/@core/services/recherche-bal.service';

@Component({
  selector: 'app-letter-box-list',
  templateUrl: './letter-box-list.component.html',
  styleUrls: ['./letter-box-list.component.scss'],
})
export class LetterBoxListComponent implements OnInit {
  @Input()
  listBAL: BALData[];

  @Input()
  adresseHighlight;

  @Input()
  highlight;

  @Input()
  frontalRefs: any[] = [];

  @Output()
  selectedBALEvent: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  orderingFilter: EventEmitter<BALFilter> = new EventEmitter<BALFilter>();

  @Output()
  updateBALEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  highlighRowEnable;

  @Input()
  selectedBALList: string[] = [];
  @Input()
  balFilter: BALFilter = new BALFilter();
  @Input()
  selectAllb: boolean;
  @Input()
  selectAll: boolean = false;
  totalResult: number = 0;
  pagination: Pagination = new Pagination();

  sortBy: string = 'adresseBal';
  sortDirection: string = 'asc';

  champTri: string;
  sensTri: string;
  bal: BALData;

  constructor(private rechercheBalService: RechercheBalService) {}

  ngOnInit() {}

  emitToParent(selectedBAL: any) {
    if (selectedBAL.selected === false) {
      this.selectAll = false;
    } else if (selectedBAL.selected === true) {
      this.selectedBALList = selectedBAL.selectedBAL;
      this.selectedBALEvent.emit(this.selectedBALList);
    }
    if (this.selectAll === true) {
      this.selectedBALEvent.emit(this.selectedBALList);
    } else {
      this.selectedBALList = selectedBAL.selectedBAL;
      this.selectedBALEvent.emit(this.selectedBALList);
    }
  }

  updateBal(bal) {
    this.updateBALEvent.emit(bal);
  }

  selectAllBal(event) {
    if (event.target.checked) {
      this.listBAL.forEach((bal) => (bal.isChecked = true));
      this.selectedBALList = this.listBAL.map((elt) => elt.adresseBal);
      this.selectedBALEvent.emit(this.selectedBALList);
    } else {
      this.listBAL.forEach((bal) => (bal.isChecked = false));
      this.selectedBALList = [];
      this.selectedBALEvent.emit(this.selectedBALList);
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
    this.balFilter.champTri = this.sortBy;
    this.balFilter.sensTri = this.sortDirection;
    this.orderingFilter.emit(this.balFilter);
  }

  toggelSelectAllcheckbox(event) {
    this.selectAll = event;
  }
}
