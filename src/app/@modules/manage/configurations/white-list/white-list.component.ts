import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltreType } from '@shared/models/FiltreType';
import { InputFilterData } from '@shared/models/InputFilterData';
import { FilterComponent } from '@shared/filter/filter.component';
import { WhiteListTableComponent } from '@modules/manage/configurations/white-list/white-list-table/white-list-table.component';
import { WhiteListHost } from '@shared/models/WhiteListHost';
import { ConfigurationService } from '@core/services/configuration.service';
import { Pagination } from '@shared/models/pagination';
import { WhiteListFilter } from '@shared/models/WhiteListFilter';
import { Filter } from '@shared/models/Filter';
import { AppState, selectAccountState } from '@app/@store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
const ExportJsonExcel = require('js-export-excel');

@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.scss'],
})
export class WhiteListComponent implements OnInit {
  @ViewChild('whitelistFilterComp', { static: false })
  filterComponent: FilterComponent;
  @ViewChild('whiteListTable', { static: false })
  whiteListTableComponent: WhiteListTableComponent;
  inputFilterData: InputFilterData = new InputFilterData();
  whiteListHosts: WhiteListHost[] = [];
  whiteListFilter: WhiteListFilter = new WhiteListFilter();
  whiteListFilterState: WhiteListFilter = new WhiteListFilter();
  totalResult = 99;
  pagination: Pagination = new Pagination();
  isShowPagiantion: boolean = true;
  highlighRowEnable: boolean = false; // tells the table that no  row need to be highlighted

  selectedHosts: string[] = [];

  getState: Observable<any>;
  isPermited: boolean = false;

  whiteListHostsAll: WhiteListHost[] = [];

  //add host  Form
  isFormAddHostOpen: boolean = false;
  openNotifHostCreationSucces: boolean = false;
  openNotifHostCreationFail: boolean = false;
  notificationErrorMessage: string = '';
  newHost: WhiteListHost = new WhiteListHost();

  //delete whitelist host

  modalSupTitle: string = '';
  isModalOpen: boolean = false;
  openNotifHostDeleteSucces: boolean = false;
  openNotifHostDeleteFail: boolean = false;
  whitelistHostToDelete: WhiteListHost = new WhiteListHost();

  constructor(
    private configurationService: ConfigurationService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAccountState);
  }

  ngOnInit() {
    this.getUserRole();
    this.initWhitelistTypeData();
    this.initWhiteListFilter();
    this.loadWhiteListAll();
    this.loadWhiteListTable();
  }

  loadWhiteListAll() {
    let whiteListFilterCopy = { ...this.whiteListFilter };
    whiteListFilterCopy.nbResultatsParPage = 0;
    whiteListFilterCopy.numeroPage = 0;

    // API NOT yet Operational
    this.configurationService.getWhiteListHosts(whiteListFilterCopy).subscribe(
      (bal) => {
        this.whiteListHostsAll = bal.body;
        this.totalResult = parseInt(bal.headers.get('X-NB-RESULTATS-TOTAL'));
        this.pagination.pageNumber = bal.headers.get('X-NUMERO-PAGE');
        this.pagination.pageSize = bal.headers.get('X-NB-RESULTATS-PAR-PAGE');
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  loadWhiteListTable() {
    this.configurationService.getWhiteListHosts(this.whiteListFilter).subscribe(
      (bal) => {
        this.whiteListHosts = bal.body;
        this.totalResult = parseInt(bal.headers.get('X-NB-RESULTATS-TOTAL'));
        this.pagination.pageNumber = bal.headers.get('X-NUMERO-PAGE');
        this.pagination.pageSize = bal.headers.get('X-NB-RESULTATS-PAR-PAGE');
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  initWhitelistTypeData() {
    this.inputFilterData.whiteListType = [
      { id: 'liste_avant', name: 'Liste avant' },
      { id: 'liste_apres', name: 'Liste après' },
    ];
  }
  initWhiteListFilter() {
    this.whiteListFilter.champTri = '';
    this.whiteListFilter.sensTri = 'asc';
    this.whiteListFilter.typeListe = 'liste_avant';
    this.whiteListFilter.domainIp = '';
    this.whiteListFilter.nbResultatsParPage = 10;
    this.whiteListFilter.numeroPage = 1;

    this.whiteListFilterState = this.whiteListFilter;

    this.selectedHosts = [];
  }
  public get FiltreType(): typeof FiltreType {
    return FiltreType;
  }

  getWhiteListHosts() {
    this.configurationService.getWhiteListHosts(this.whiteListFilter).subscribe(
      (bal) => {
        this.whiteListHosts = bal.body;
        this.totalResult = parseInt(bal.headers.get('X-NB-RESULTATS-TOTAL'));
        this.whiteListFilter.numeroPage = parseInt(
          bal.headers.get('X-NUMERO-PAGE')
        );
        this.whiteListFilter.nbResultatsParPage = parseInt(
          bal.headers.get('X-NB-RESULTATS-PAR-PAGE')
        );
      },
      (error) => (this.isShowPagiantion = false)
    );
  }
  getFiltredData(filterEvent: Filter) {
    this.resetNotificationDataAndClose();
    this.initWhiteListFilter();
    this.whiteListFilter.domainIp = filterEvent.filterData.domainIp;
    this.whiteListFilter.typeListe = filterEvent.filterData.typeListe;

    // better put the  call GETWhite in one place  as long as they all call it  with  whitelistfilter object
    this.getWhiteListHosts();
    this.loadWhiteListAll();
  }

  getFiltredDataDefault() {
    //this.resetNotificationDataAndClose();
    this.whiteListTableComponent.toggelSelectAllcheckbox(false);
    this.filterComponent.initFilterData();

    this.initWhiteListFilter();

    this.getWhiteListHosts();
  }
  updateOrder(event: WhiteListFilter) {
    this.resetNotificationDataAndClose();
    this.whiteListFilter.sensTri = event.sensTri;
    this.whiteListFilter.champTri = event.champTri;
    this.whiteListFilter.domainIp = this.whiteListFilterState.domainIp;
    this.whiteListFilter.typeListe = this.whiteListFilterState.typeListe;
    this.whiteListFilter.numeroPage = this.whiteListFilterState.numeroPage;
    this.whiteListFilter.nbResultatsParPage = this.whiteListFilterState.nbResultatsParPage;

    this.getWhiteListHosts();
  }

  getPagination(pagination) {
    this.resetNotificationDataAndClose();
    this.selectedHosts = [];
    this.pagination.pageNumber = pagination.pageNumber.split('/')[0];
    this.pagination.pageSize = pagination.pageSize;
    this.whiteListFilter.numeroPage = parseInt(pagination.pageNumber);
    this.whiteListFilter.nbResultatsParPage = pagination.pageSize;
    this.whiteListFilterState.nbResultatsParPage = this.whiteListFilter.nbResultatsParPage;
    this.whiteListFilterState.numeroPage = this.whiteListFilter.numeroPage;
    this.getWhiteListHosts();
  }

  saveSelectedHost(selectedHosts: string[]) {
    this.selectedHosts = selectedHosts;
  }

  resetNotificationDataAndClose() {
    this.openNotifHostCreationFail = false;
    this.openNotifHostCreationSucces = false;

    this.openNotifHostDeleteFail = false;
    this.openNotifHostDeleteSucces = false;
    this.notificationErrorMessage = '';
    this.whiteListTableComponent.toggelSelectAllcheckbox(false);
  }

  getUserRole(): void {
    this.getState.subscribe((state) => {
      if (state.roles.indexOf('SuperAdmin') !== -1) {
        this.isPermited = true;
      } else if (state.roles.indexOf('Admin') !== -1) {
        this.isPermited = true;
      } else {
        this.isPermited = true;
      }
    });
  }

  // add whitelist host

  openAddHostForm(): void {
    this.resetNotificationDataAndClose();
    this.isFormAddHostOpen = true;
  }
  closeWhitelistHostForm() {
    this.isFormAddHostOpen = false;
  }

  addHost(whiteListhost): void {
    this.configurationService.createWhitelistHost(whiteListhost).subscribe(
      (resp) => {
        this.openNotifHostCreationSucces = true;
        this.openNotifHostCreationFail = false;
        this.newHost = whiteListhost;
        this.getFiltredDataDefault();
      },
      (error) => {
        this.openNotifHostCreationSucces = false;
        this.openNotifHostCreationFail = true;
        this.notificationErrorMessage = error.message;
        console.error(error);
      }
    );
    this.closeWhitelistHostForm();
  }

  // whitelist host suppresion

  openModalSup(whitelistHost: WhiteListHost): void {
    this.resetNotificationDataAndClose();
    this.whitelistHostToDelete = whitelistHost;
    this.isModalOpen = true;
    this.highlighRowEnable = true;
  }

  closeModalSup(event?) {
    this.highlighRowEnable = false;
    this.isModalOpen = false;
  }
  valideSupp(whitelistHost) {
    this.highlighRowEnable = false;
    delete this.whitelistHostToDelete.isChecked; // this is internal property for the  frontEnd
    this.configurationService
      .deleteWhitelistHost(this.whitelistHostToDelete)
      .subscribe(
        (resp) => {
          this.openNotifHostDeleteSucces = true;
          this.openNotifHostDeleteFail = false;
          this.newHost = this.whitelistHostToDelete;
          this.getWhiteListHosts();
        },
        (error) => {
          this.openNotifHostDeleteSucces = false;
          this.openNotifHostDeleteFail = true;
          this.notificationErrorMessage = error.message;
          console.error(error);
        }
      );
    this.closeModalSup();
  }

  // export XSL

  exportToExcel() {
    let whiteListHostsToExport;
    this.whiteListHosts;
    var option: any = {};
    if (this.whiteListHosts[0].typeListe === 'liste_avant') {
      option.fileName = 'ExportCsvListeAvant';
    } else {
      option.fileName = 'ExportCsvListeAprés';
    }
    let dataRow: any = {};
    let listDataRow = [];
    if (this.selectedHosts.length == 0) {
      this.whiteListHostsAll.forEach((data) => {
        dataRow[1] = data.domainIp;

        listDataRow.push(dataRow);
        dataRow = {};
      });
    } else {
      this.selectedHosts.forEach((data) => {
        dataRow[1] = data;

        listDataRow.push(dataRow);
        dataRow = {};
      });
    }
    option.datas = [
      {
        sheetData: listDataRow,
        sheetName: 'sheet',
        sheetHeader: ['Domaine,IP'],
        columnWidths: [10],
      },
    ];
    const toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel();
  }
}
