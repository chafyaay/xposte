import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
const ExportJsonExcel = require('js-export-excel');
@Component({
  selector: 'app-frontal',
  templateUrl: './frontal.component.html',
  styleUrls: ['./frontal.component.scss'],
})
export class FrontalComponent implements OnInit {
  titlePagination = 'Frontal';
  selectedFrontal: string[] = [];
  totalResult: number;
  pagination: Pagination = new Pagination();
  frontalFilter: FrontalFilter;
  selectAllFrontal: boolean = false;
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
    this.frontalService
      .searchFrontals(this.frontalFilter)
      .subscribe((frontal) => {
        this.frontalDataList = frontal.body;
        this.totalResult = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
      });
  }

  initFrontalFilter() {
    this.frontalFilter = {
      champTri: 'nom',
      sensTri: 'asc',
      identifiantFrontal: 'TOUS',
      numeroPage: 1,
      nbResultatsParPage: 10,
    };

    this.selectedFrontal = [];
  }

  getPagination(pagination) {
    this.resetNotificationDataAndClose();
    this.pagination.pageNumber = +pagination.pageNumber.split('/')[0];
    this.pagination.pageSize = pagination.pageSize;
    this.frontalFilter.nbResultatsParPage = pagination.pageSize;
    this.frontalFilter.numeroPage = this.pagination.pageNumber;
    this.frontalService
      .searchFrontals(this.frontalFilter)
      .subscribe((frontal: HttpResponse<any>) => {
        this.frontalDataList = frontal.body;
        const NB_RESULTATS_TOTAL = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
        this.totalResult = NB_RESULTATS_TOTAL;
      });
  }

  public get FiltreType(): typeof FiltreType {
    return FiltreType;
  }

  getFiltredData(appliedFilter: FrontalFilter) {
    this.resetNotificationDataAndClose();
    this.frontalFilter.identifiantFrontal = appliedFilter.identifiantFrontal;

    this.frontalService
      .searchFrontals(this.frontalFilter)
      .subscribe((frontal) => {
        this.frontalDataList = frontal.body;
        this.totalResult = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
      });
  }

  getFiltredDataDefault() {
    this.resetNotificationDataAndClose();
    this.frontalListComponent.toggelSelectAllcheckbox(false);
    this.selectAllFrontal = false;
    this.initFrontalFilter();

    this.frontalService
      .searchFrontals(this.frontalFilter)
      .subscribe((frontal) => {
        this.frontalDataList = frontal.body;

        this.totalResult = parseInt(
          frontal.headers.get('X-NB-RESULTATS-TOTAL')
        );
      });
  }

  saveSelectedFrontal(selectedFrontal: string[]) {
    this.selectedFrontal = selectedFrontal;
  }

  updateOrder(event: FrontalFilter) {
    this.resetNotificationDataAndClose();
    this.frontalFilter.sensTri = event.sensTri;
    this.frontalFilter.champTri = event.champTri;

    this.frontalService.searchFrontals(this.frontalFilter).subscribe(
      (frontal) => {
        this.frontalDataList = frontal.body;
      },
      (error) => console.error(error)
    );
  }
  exporteBalToExcel() {
    const balToExport: Frontal[] = [];
    if (this.selectedFrontal.length === 0) {
      this.frontalFilter = {
        champTri: 'nom',
        sensTri: 'asc',
        identifiantFrontal: '',
        numeroPage: 1,
        nbResultatsParPage: 25,
      };
      this.frontalService
        .searchFrontals(this.frontalFilter)
        .subscribe((frontal) => {
          console.log(frontal.body);
          var option: any = {};
          option.fileName = 'ExportCsvFrontaux';
          let dataRow: any = {};
          let listDataRow = [];
          frontal.body.forEach((data) => {
            dataRow[1] = data.nom;
            dataRow[2] = data.seuil;
            dataRow[3] = data.adresseMailAlerte;
            dataRow[4] = data.listeAdressesIPs;
            dataRow[5] = data.listeIdentifiantsUtilisateurs;
            listDataRow.push(dataRow);
            dataRow = {};
          });
          option.datas = [
            {
              sheetData: listDataRow,
              sheetName: 'sheet',
              sheetHeader: [
                'Frontal',
                'Seuil(ko)',
                "Email d'alerte",
                'IPs',
                'Utilisateurs',
              ],
              columnWidths: [10, 10, 5, 15, 15],
            },
          ];
          const toExcel = new ExportJsonExcel(option); //new
          toExcel.saveExcel();
        });
    } else {
      this.selectedFrontal.forEach((frontalSelected) => {
        balToExport.push(
          this.frontalDataList.find(
            (bal) => bal.identifiant === frontalSelected
          )
        );
      });
      var option: any = {};
      option.fileName = 'ExportCsvFrontaux';
      let dataRow: any = {};
      let listDataRow = [];
      balToExport.forEach((data) => {
        dataRow[1] = data.nom;
        dataRow[2] = data.seuil;
        dataRow[3] = data.adresseMailAlerte;
        dataRow[4] = data.listeAdressesIPs;
        dataRow[5] = data.listeIdentifiantsUtilisateurs;
        listDataRow.push(dataRow);
        dataRow = {};
      });
      option.datas = [
        {
          sheetData: listDataRow,
          sheetName: 'sheet',
          sheetHeader: [
            'Frontal',
            'Seuil(ko)',
            "Email d'alerte",
            'IPs',
            'Utilisateurs',
          ],
          columnWidths: [10, 10, 5, 15, 15],
        },
      ];
      const toExcel = new ExportJsonExcel(option); //new
      toExcel.saveExcel();
    }
  }
  openFormulaire(): void {
    this.resetNotificationDataAndClose();
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
    this.resetNotificationDataAndClose();
    this.frontalToUpdate = frontalToUpdate;
    this.isFormulaireopen = true;
  }
}
