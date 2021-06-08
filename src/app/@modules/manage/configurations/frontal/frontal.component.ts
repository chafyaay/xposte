import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FrontalService } from '@core/services/frontal.service';
import { FrontalFilter } from '@shared';
import { Frontal } from '@shared/models/Frontal';
import { Pagination } from '@shared/models/pagination';
import { FrontalListComponent } from './frontal-list/frontal-list.component';
import { FiltreType } from '@shared/models/FiltreType';
import { ReferentielService } from '@core/services/referentiel.service';
import { SetFrontal } from '@app/@store/actions/frontal.action';
import { AppState } from '@app/@store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-frontal',
  templateUrl: './frontal.component.html',
  styleUrls: ['./frontal.component.scss'],
})
export class FrontalComponent implements OnInit {
  titlePagination = 'Frontal';
  isShowPagiantion = true;
  selectedFrontal: string[] = [];
  totalResult: number;
  pagination: Pagination = new Pagination();
  frontalFilter: FrontalFilter;
  selectAllFrontal: boolean = false;
  champTri: string;
  sensTri: string;
  RechecheFiltre: FrontalFilter;
  frontalDataList: Frontal[] = [];
  inputFilterData: { id: string; name: string }[];
  isFormulaireopen = false;
  openNotifFrontalCreationFail = false;
  openNotifFrontalCreationSucces = false;
  openNotifFrontalUpdateFail = false;
  openNotifFrontalUpdateSucces = false;
  notificationErrorMessage = '';

  savedFrontal = new Frontal();
  frontalToUpdate = new Frontal();

  @ViewChild('frontalList', { static: false })
  frontalListComponent: FrontalListComponent;

  constructor(
    private frontalService: FrontalService,
    private ReferentielService: ReferentielService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.initFrontalFilter();
    this.loadFrontalTable();
  }

  loadFrontalTable() {
    this.frontalService.searchFrontals(this.frontalFilter).subscribe(
      (frontal) => {
        this.frontalDataList = frontal.body;
        this.totalResult = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  initFrontalFilter() {
    this.frontalFilter = {
      champTri: 'nom',
      sensTri: 'asc',
      identifiantFrontal: '',
      numeroPage: 1,
      nbResultatsParPage: 10,
    };

    this.selectedFrontal = [];
  }

  getPagination(pagination) {
    this.pagination.pageNumber = +pagination.pageNumber.split('/')[0];
    this.pagination.pageSize = pagination.pageSize;
    this.frontalFilter.nbResultatsParPage = pagination.pageSize;
    this.frontalFilter.numeroPage = this.pagination.pageNumber;
    this.frontalService.searchFrontals(this.frontalFilter).subscribe(
      (frontal: HttpResponse<any>) => {
        this.frontalDataList = frontal.body;
        const NB_RESULTATS_TOTAL = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
        this.totalResult = NB_RESULTATS_TOTAL;
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  public get FiltreType(): typeof FiltreType {
    return FiltreType;
  }

  getFiltredData(appliedFilter: FrontalFilter) {
    // this.initFrontalFilter();
    this.frontalFilter.identifiantFrontal = appliedFilter.identifiantFrontal;

    this.frontalService.searchFrontals(this.frontalFilter).subscribe(
      (frontal) => {
        this.frontalDataList = frontal.body;
        this.totalResult = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  getFiltredDataDefault() {
    this.frontalListComponent.toggelSelectAllcheckbox(false);
    this.selectAllFrontal = false;
    this.initFrontalFilter();

    this.frontalService.searchFrontals(this.frontalFilter).subscribe(
      (frontal) => {
        this.frontalDataList = frontal.body;

        this.totalResult = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  saveSelectedFrontal(selectedFrontal: string[]) {
    this.selectedFrontal = selectedFrontal;
  }

  updateOrder(event: FrontalFilter) {
    this.frontalFilter.sensTri = event.sensTri;
    this.frontalFilter.champTri = event.champTri;

    this.frontalService.searchFrontals(this.frontalFilter).subscribe(
      (frontal) => {
        this.frontalDataList = frontal.body;
      },
      (error) => console.error(error)
    );
  }

  openFormulaire(): void {
    // this.hideNotificationMessage();
    this.isFormulaireopen = true;
  }
  closeFormulaire(): void {
    this.isFormulaireopen = false;
  }

  saveFrontal(newFrontal: Frontal): void {
    this.savedFrontal = { ...newFrontal };
    // If update
    if (this.frontalToUpdate.identifiant) {
      this.frontalService.updatefrontal(newFrontal).subscribe(
        (resp) => {
          this.openNotifFrontalUpdateSucces = true;
          this.openNotifFrontalUpdateFail = false;
          this.CloseCreateFrontalForm();
        },
        (error) => {
          this.openNotifFrontalUpdateSucces = false;
          this.openNotifFrontalUpdateFail = true;
          console.error(error);
          this.notificationErrorMessage = error.message;
        }
      );
      this.frontalToUpdate = new Frontal();
    } else {
      this.frontalService.createfrontal(newFrontal).subscribe(
        (resp) => {
          this.openNotifFrontalCreationSucces = true;
          this.openNotifFrontalCreationFail = false;
          this.CloseCreateFrontalForm();
        },
        (error) => {
          this.openNotifFrontalCreationSucces = false;
          this.openNotifFrontalCreationFail = true;
          console.error(error);
          this.notificationErrorMessage = error.message;
        }
      );
    }
    // this.hideNotificationMessage();

    this.getFiltredDataDefault();
    this.updateFrontalStore();
    this.CloseCreateFrontalForm();
  }

  private updateFrontalStore(): void {
    this.ReferentielService.getFrontal().subscribe(
      (resp) => {
        this.store.dispatch(new SetFrontal(resp));
      },
      (error) => {
        this.store.dispatch(new SetFrontal([]));
      }
    );
  }

  CloseCreateFrontalForm(): void {
    this.isFormulaireopen = false;
    this.frontalToUpdate = new Frontal();
  }

  resetNotificationDataAndClose() {
    this.openNotifFrontalCreationFail = false;
    this.openNotifFrontalCreationSucces = false;
    this.openNotifFrontalUpdateFail = false;
    this.openNotifFrontalUpdateSucces = false;

    this.notificationErrorMessage = '';
    this.frontalListComponent.toggelSelectAllcheckbox(false);
  }

  updateFrontal(frontalToUpdate: Frontal) {
    this.frontalToUpdate = frontalToUpdate;
    this.isFormulaireopen = true;
  }
}
