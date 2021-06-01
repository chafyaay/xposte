import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Pagination } from 'src/app/@shared/models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() titlePagination: string;
  @Output()
  paginationChangeEvent: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  totalPageNumber = 0;
  pagination: Pagination = new Pagination();
  PageNumbers: any[] = [];
  @Input() pageNumber;
  @Input() pageSiz;
  @Input()
  totalResult: number;
  pageSize = [];

  constructor() {}

  ngOnInit() {
    this.initPagination();
  }
  initPagination() {
    this.pagination.pageSize = 10;
    this.pageSize = [
      { id: 10, name: '10 par page' },
      { id: 20, name: '20 par page' },
      { id: 50, name: '50 par page' },
      { id: this.totalResult, name: 'Tout' },
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pageSize = [
      { id: 10, name: '10 par page' },
      { id: 20, name: '20 par page' },
      { id: 50, name: '50 par page' },
      { id: this.totalResult, name: 'Tout' },
    ];

    this.pagination.pageSize = parseInt(this.pageSiz);
    this.buildPageNumbers();
    if (this.totalPageNumber === 0) {
      this.pagination.pageNumber = 0;
    } else if (this.totalPageNumber === 1) {
      this.pagination.pageNumber = 1 + '/' + 1;
    } else {
      this.pagination.pageNumber = this.pageNumber + '/' + this.totalPageNumber;
    }
  }
  changePageNumber() {
    this.paginationChangeEvent.emit(this.pagination);
  }
  changePageSize() {
    this.buildPageNumbers();
    this.paginationChangeEvent.emit(this.pagination);
  }
  buildPageNumbers() {
    if (this.totalResult) {
      this.PageNumbers = []; // rest the list
      let totalPageNumber = 1;
      if (this.pagination.pageSize !== 0) {
        totalPageNumber = this.specialRoundNumber(
          this.totalResult,
          this.pagination.pageSize
        );
        this.totalPageNumber = totalPageNumber;
      }

      for (let i = 1; i <= totalPageNumber; i++) {
        this.PageNumbers.push({ id: i, name: i + '/' + totalPageNumber });
      }
    }
  }

  /**
   * this function return the result of the division (integer part + 1 if we have a decimal number )
   *
   * if a/b = 1.1 it will trun it to 2
   *
   * */
  specialRoundNumber(a, b) {
    if (a % b === 0) {
      return a / b;
    } else {
      return this.DecimalAddOne(a / b);
    }
  }

  DecimalAddOne(number) {
    if (!!(number % 1) == true) {
      return parseInt(number) + 1;
    } else {
      return number;
    }
  }
}
