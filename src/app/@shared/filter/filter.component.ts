import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FiltreType } from 'src/app/@shared/models/FiltreType';
import { FilterData } from 'src/app/@shared/models/FilterData';
import { Filter } from 'src/app/@shared/models/Filter';
import { NgSelectConfig } from '@ng-select/ng-select';
import { InputFilterData } from 'src/app/@shared/models/InputFilterData';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store';
import {
  FrontalActionTypes,
  SetFrontal,
} from 'src/app/@store/actions/frontal.action';
import { Frontal } from 'src/app/@shared/models/Frontal';
import { getFrontal } from 'src/app/@store/reducers/frontal.reducer';
import { selectFrontalState } from 'src/app/@store/selectors/frontal.selector';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input()
  filtreType: FiltreType;

  // @Output()
  @Output()
  filterEvent = new EventEmitter<Filter>();
  @Output()
  filterDefaultEvent = new EventEmitter<any>();

  @Output()
  frontalAutocompletEvent = new EventEmitter<string>();

  @Input()
  inputFilterData: InputFilterData;

  filter: Filter = new Filter();
  isFielled = false;
  adress = false;
  clickLabel = false;
  selectedEtat = 'ACTIVE';
  isEtatSelected = false;
  @ViewChild('inputAddress', { static: false })
  inputAddress: ElementRef;

  constructor(private config: NgSelectConfig, private store: Store<AppState>) {}

  ngOnInit() {
    this.initFilterData();
  }

  changeSelectedEtat() {
    this.filter.filterData.etat = this.selectedEtat;
    this.isEtatSelected = true;
  }
  clickAdress() {
    this.clickLabel = true;
  }
  initFilterData() {
    this.filter.filterData = new FilterData();
    this.filter.filterData.etat = 'Active';
    this.filter.highlight = false;
    this.isFielled = false;
    this.isEtatSelected = false;
    this.selectedEtat = 'Active';
  }

  public get FiltreType(): typeof FiltreType {
    return FiltreType;
  }

  clickFilter() {
    this.filterEvent.emit(this.filter);
  }

  resetData() {
    this.initFilterData();
    this.filterDefaultEvent.emit();
  }

  canDisableHighlight() {
    if (this.filter.filterData && !this.filter.filterData.adresse) {
      return true;
    } else {
      return false;
    }
  }

  canFilter() {
    if (
      this.filter.filterData &&
      !this.filter.filterData.adresse &&
      !this.isFielled &&
      !this.isEtatSelected
    ) {
      return true;
    } else {
      return false;
    }
  }

  getFrontal(event): void {
    this.frontalAutocompletEvent.emit(event.target.value);
    if (!event.target.value) {
      this.isFielled = false;
    } else {
      this.isFielled = true;
    }
  }
  animateFrontalLabel() {
    if (!this.isFielled) this.isFielled = true;
    else this.isFielled = false;
  }
  adres() {
    this.adress = true;
  }
  changeSelectedFrontal() {
    this.isFielled = true;
  }
}
