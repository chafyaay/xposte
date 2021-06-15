import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiltreType } from '@shared/models/FiltreType';
import { Store } from '@ngrx/store';
import { AppState, selectFrontalState } from '@app/@store';
import { FrontalFilter } from '@shared/models';

@Component({
  selector: 'app-filter-frontal',
  templateUrl: './filter-frontal.component.html',
  styleUrls: ['./filter-frontal.component.scss'],
})
export class FilterFrontalComponent implements OnInit {
  @Output()
  filterEvent = new EventEmitter<FrontalFilter>();
  @Output()
  filterDefaultEvent = new EventEmitter<any>();
  @Output()
  frontalAutocompletEvent = new EventEmitter<string>();

  @Input()
  filter: FrontalFilter;

  inputFilterData: { identifiant: string; name: string }[] = [];
  changedFilter: boolean;
  lastFilter: string;
  readonly TOUS_ID = 'TOUS';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loadFromStoredRef();
    this.initFilterData();
  }

  loadFromStoredRef() {
    this.store.select(selectFrontalState).subscribe((state) => {
      this.inputFilterData = state.frontal.map((ele) => ({
        identifiant: ele.identifiant,
        name: ele.nom,
      }));
      this.inputFilterData.unshift({ identifiant: 'TOUS', name: 'Tous' });
    });
  }

  initFilterData() {
    this.filter = new FrontalFilter();
    this.filter.identifiantFrontal = this.TOUS_ID;
    this.lastFilter = this.TOUS_ID;
  }

  clickFilter() {
    const appliedFiler = { ...this.filter };
    if (this.filter.identifiantFrontal === this.TOUS_ID) {
      appliedFiler.identifiantFrontal = '';
    }
    this.filterEvent.emit(appliedFiler);
    this.lastFilter = this.filter.identifiantFrontal;
    this.changedFilter = false;
  }

  resetData() {
    this.initFilterData();
    this.filterDefaultEvent.emit();
    this.changedFilter = false;
  }

  changeSelectedFrontal(selected) {
    this.changedFilter = this.lastFilter !== selected.identifiant;
  }
}
