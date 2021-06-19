import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FiltreType } from 'src/app/@shared/models/FiltreType';
import { InputFilterData } from 'src/app/@shared/models/InputFilterData';
import { selectFrontalState } from 'src/app/@store/selectors/frontal.selector';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectAccountState,
  selectBALStateState,
} from 'src/app/@store';
import { BalDataExpoted } from '@shared/models/BalDataExpoted';
import { Filter } from 'src/app/@shared/models/Filter';
import { BALFilter } from 'src/app/@shared/models/BALFilter';
import { Pagination } from 'src/app/@shared/models/pagination';
import { RechercheBalService } from 'src/app/@core/services/recherche-bal.service';
import { BAL } from 'src/app/@shared/models/BAL';
import { HttpResponse } from '@angular/common/http';
import { Recherche } from 'src/app/@shared/models/recherche';
import { BALData } from 'src/app/@shared/models/BALData';
import { Role } from 'src/app/@shared';
import { FilterComponent } from 'src/app/@shared/filter/filter.component';
import { BalTampoCriteria } from 'src/app/@shared/models/BalTampoCriteria';
import { Observable } from 'rxjs';
import { LetterBoxListComponent } from 'src/app/@modules/manage/letter-box/letter-box-list/letter-box-list.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModifEnMassI } from 'src/app/@shared/models/modif-mass-bals.model';
import { RemiseDispoI } from 'src/app/@shared/models/remise-dispo';
import { RemiseDispoService } from 'src/app/@core/services/remise-dispo.service';
import { DesactiverEnMassService } from '@core/services/desactiver-en-mass.service';

const ExportJsonExcel = require('js-export-excel');

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.scss'],
})
export class LetterBoxComponent implements OnInit, OnChanges {
  @ViewChild(NgSelectComponent, { static: false })
  ngSelectComponent: NgSelectComponent;

  // recieve highlight Information and informe the table list
  highlight: boolean;
  adresseHighlight: string;

  inputFilterData: InputFilterData = new InputFilterData();
  inputFilterDataNew: InputFilterData = new InputFilterData();
  openNotification = false;
  openNotifTemponnage = false;
  notificationColor = 'message';
  TitleFormulaire: string = 'Créer une boite aux lettres';
  isFormulaireopen = false;
  isUpdateBalFormOpen = false;
  titlePagination = 'BAL';
  isDesactiverEnMassFormvalid = false;
  TitleModal: string = 'Confirmation de tamponnage';
  balFilterState: BALFilter = new BALFilter();
  openNotifTemponnageError = false;
  isModalOpen = false;
  isShowPagiantion = true;
  isCloseTamponnage = false;
  selectedBal: string[] = [];
  messageErrorTamponnage: string = '%SL.S%ùsù;sl;ùl%.S%.%';
  totalResult: number = 0;
  pagination: Pagination = new Pagination();
  balFilter: BALFilter = new BALFilter();
  BalInit: BALFilter = new BALFilter();
  criterFiltre: Filter = new Filter();
  selectAllBAL: boolean = false;
  champTri: string;
  sensTri: string;
  bal: BAL;
  balData: BAL[] = [];
  BalTamponner: BalTampoCriteria = new BalTampoCriteria();
  RechecheFiltre: Recherche = new Recherche();
  balDataList: BALData[] = [];
  NbtamponageAndDetampo = 0;
  // Detamponnage Variable
  showDetamponnage = false;
  isModalDetampoOpen = false;
  PaginationCall = false;
  //balFilterNotificationData : BALFilter;
  balTamponNbr = 0;
  isShowTemponnage = false;
  openNotifDetemponnageSucces = false;
  openNotifDetemponnageFail = false;
  balTampoCriteria: BalTampoCriteria = new BalTampoCriteria();
  getState: Observable<any>;
  // message Error
  notificationErrorMessage = '';
  isRoleAdmin: boolean;
  data: BalDataExpoted[] = [];
  showPaginationTamonnage = false;
  // to store the  the BALaddresses that will be shown to the  user in the tooltip
  tooltipBALs: string[] = [];

  openNotifBalCreationFail = false;
  openNotifBalCreationSucces = false;
  newBal: BAL = new BAL();

  //update BAL
  updatedBal: BALData;
  openNotifBalUpdateSucces = false;
  openNotifBalUpdateFail = false;
  highlighRowEnable = false;
  tempSelectedItems: any[] = [];
  messageSelected: any;
  showModifEnMassDispositionBtn = false;
  // Remise à disposition
  showRemiseDispositionBtn = false;
  showRemiseDispositionModal = false;
  itemsSelected: any[];
  // remise à disposition
  remiseDispoObj: RemiseDispoI = {};
  isFormValid = false;
  openNotifRemiseDispoSuccess = false;
  openNotifRemiseDispoError = false;
  //--------------------------------//
  //---- desactiver en mass ------ //
  openNotifDescativerMassSuccess = false;
  openDescativerEnMassModal = false;
  openNotifDescativerMassFail = false;
  @ViewChild('balFilterComp', { static: false })
  filterComponent: FilterComponent;
  @ViewChild('balList', { static: false })
  letterBoxListComponent: LetterBoxListComponent;
  constructor(
    private store: Store<AppState>,
    private remise_dispo_service: RemiseDispoService,
    private rechercheBalService: RechercheBalService,
    private desactiver_en_mass_service: DesactiverEnMassService
  ) {
    this.getState = this.store.select(selectAccountState);
    this.BalTamponner.adresseBal = this.balFilter.adresseBal;
    this.BalTamponner.etatBal = this.balFilter.etatBal;
    this.BalTamponner.identifiantFrontal = this.balFilter.identifiantFrontal;
  }

  ngOnChanges() {}

  ngOnInit() {
    this.ShowDetamponnage();
    this.loadFromStoredRef();
    this.initBALFilter();
    this.loadBALTable();
    this.testRoleUser();
  }
  InitSelectBox() {
    this.itemsSelected = [
      {
        id: 0,
        label: this.isModalOpen
          ? ''
          : 'Exporter au forma Excel ' +
            (this.selectedBal.length === 0
              ? this.totalResult
              : this.selectedBal.length) +
            ' BALs',
      },
      {
        id: 1,
        label:
          'Modifier en masse ' +
          (this.selectedBal.length === 0
            ? this.totalResult
            : this.selectedBal.length) +
          ' BALs',
      },
      {
        id: 2,
        label:
          'Désactiver en masse ' +
          (this.selectedBal.length === 0
            ? this.totalResult
            : this.selectedBal.length) +
          ' BALs',
      },
    ];
    this.tempSelectedItems = [];
    if (this.balFilter.etatBal === 'Active') {
      this.tempSelectedItems = this.itemsSelected;
    } else if (this.balFilter.etatBal === 'En Transfert') {
      this.tempSelectedItems.push(this.itemsSelected[0], this.itemsSelected[2]);
    } else {
      this.tempSelectedItems.push(this.itemsSelected[0]);
    }
  }
  REMISE_DISPO_EVENT_HANDLER(event: any) {
    console.log(event)
  /*   this.isFormValid = event.isFormValid;
    this.remiseDispoObj = {
      etatBal: this.balFilter.etatBal,
      adresseBal: this.balFilter.adresseBal,
      identifiantFrontal: this.balFilter.identifiantFrontal,
      listeIdentifiantsBALs: this.selectedBal,
      ...event.DATA,
    }; */
  }

  openRemiseDispositionModal() {
    this.resetNotificationDataAndClose();
    this.showRemiseDispositionModal = true;
  }

  closeRemiseDispositionModal(event) {
    this.resetNotificationDataAndClose();
    this.showRemiseDispositionModal = false;
  }

  remise_dispo_submit(event: any) {
    this.resetNotificationDataAndClose();
    this.remise_dispo_service.miseDisposition(this.remiseDispoObj).subscribe(
      (res) => {
        this.openNotifRemiseDispoSuccess = true;
        this.showRemiseDispositionModal = false;
      },
      (err) => {
        this.openNotifRemiseDispoSuccess = false;
        this.openNotifBalCreationSucces = false;
        this.openNotifRemiseDispoError = true;
        this.showRemiseDispositionModal = false;
        this.notificationErrorMessage = 'Erreur lors de remise à disposition';
      }
    );
  }

  desactiver_en_mass_submit($event: any) {
    this.openDescativerEnMassModal = false;
    const obj = {};
    this.desactiver_en_mass_service.desactiver(obj).subscribe(
      (data) => {
        this.openNotifDescativerMassSuccess = true;
        this.openDescativerEnMassModal = false;
      },
      (err) => {
        this.openNotifDescativerMassSuccess = false;
        this.openDescativerEnMassModal = false;
        this.openNotifBalCreationSucces = false;
        this.openNotifDescativerMassFail = true;
      }
    );
    this.filterComponent.resetData();
  }
  closeDesactiverEnMassModal(event) {
    this.openDescativerEnMassModal = false;
  }
  DESACTIVER_EN_MASS_EVENT_HANDLER(event) {
    this.isDesactiverEnMassFormvalid = event;
  }
  loadBALTable() {
    if (this.isRoleAdmin) {
      this.isShowTemponnage = true;
      this.showModifEnMassDispositionBtn = true;
      this.showRemiseDispositionBtn = true;
    }
    this.rechercheBalService.getBal(this.balFilter).subscribe(
      (bal) => {
        this.balDataList = bal.body;
        this.totalResult = parseInt(bal.headers.get('X-NB-RESULTATS-TOTAL'));
        this.pagination.pageNumber = bal.headers.get('X-NUMERO-PAGE');
        this.pagination.pageSize = bal.headers.get('X-NB-RESULTATS-PAR-PAGE');
        this.InitSelectBox();
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  initBALFilter() {
    this.highlight = false;
    this.adresseHighlight = '';

    this.balFilter.champTri = '';
    this.balFilter.sensTri = 'asc';
    this.balFilter.adresseBal = '';
    this.balFilter.etatBal = 'Active';
    this.balFilter.identifiantFrontal = '';
    this.balFilter.numeroPage = 1;
    this.balFilter.nbResultatsParPage = 10;

    this.balFilterState = this.balFilter;

    this.selectedBal = [];
  }

  testRoleUser(): void {
    this.getState.subscribe((state) => {
      if (state.roles.indexOf('SuperAdmin') !== -1) {
        this.isShowTemponnage = true;
        this.showModifEnMassDispositionBtn = true;
        this.showRemiseDispositionBtn = true;
        this.isRoleAdmin = true;
      } else if (state.roles.indexOf('Admin') !== -1) {
        this.isShowTemponnage = false;
        this.showModifEnMassDispositionBtn = false;
        this.showRemiseDispositionBtn = false;
        this.isRoleAdmin = false;
      } else {
        this.isShowTemponnage = false;
        this.showRemiseDispositionBtn = false;
        this.showModifEnMassDispositionBtn = false;
      }
    });
  }

  loadFromStoredRef() {
    this.store.select(selectBALStateState).subscribe((stat) => {
      this.inputFilterData.etat = stat.balState.map((ele) => ({
        id: ele.libelle,
        name: ele.libelle,
      }));
      this.inputFilterData.etat.push({
        id: '',
        name: 'Toutes',
      });
      this.inputFilterDataNew.etat = this.inputFilterData.etat;
    });

    this.store.select(selectFrontalState).subscribe((stat) => {
      this.inputFilterData.frontal = stat.frontal;
      this.inputFilterDataNew.frontal = [...this.inputFilterData.frontal]; // this is for clonning

      this.inputFilterDataNew.frontal.push({
        identifiant: '',
        nom: 'Tous',
      });
    });
  }

  getPagination(pagination) {
    if (this.balFilter.etatBal === 'Active') {
      this.isShowTemponnage = true;
      this.showModifEnMassDispositionBtn = true;
      this.showRemiseDispositionBtn = true;
    }
    this.selectedBal = [];
    this.resetNotificationDataAndClose();
    this.pagination.pageNumber = pagination.pageNumber.split('/')[0];
    this.pagination.pageSize = pagination.pageSize;
    this.balFilter.numeroPage = parseInt(pagination.pageNumber);
    this.balFilter.nbResultatsParPage = pagination.pageSize;
    this.balFilterState.nbResultatsParPage = this.balFilter.nbResultatsParPage;
    this.balFilterState.numeroPage = this.balFilter.numeroPage;
    this.rechercheBalService.getBal(this.balFilter).subscribe(
      (bal: HttpResponse<any>) => {
        this.showBal(bal.body);
        this.balDataList = bal.body;
        const NUMERO_PAGE = bal.headers.get('X-NUMERO-PAGE');
        const NB_RESULTATS_PAR_PAGE = bal.headers.get(
          'X-NB-RESULTATS-PAR-PAGE'
        );
        const NB_RESULTATS_TOTAL = parseInt(
          bal.headers.get('X-NB-RESULTATS-TOTAL')
        );
        this.totalResult = NB_RESULTATS_TOTAL;
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  showBal(bal: BAL): void {
    this.balData.push(bal);
  }

  public get FiltreType(): typeof FiltreType {
    return FiltreType;
  }

  // identifiantFrontal: string;

  getFiltredData(filterEvent: Filter) {
    this.hideNotificationMessage();
    this.resetNotificationDataAndClose();
    this.initBALFilter();
    if (this.isRoleAdmin) {
      if (
        filterEvent.filterData.etat === 'Active' ||
        filterEvent.filterData.etat === 'En Transfert'
      ) {
        this.showPaginationTamonnage = true;
        this.isShowTemponnage = true;
        this.showModifEnMassDispositionBtn = true;
        this.showRemiseDispositionBtn = true;
      } else {
        this.showPaginationTamonnage = false;
        this.isShowTemponnage = false;
        this.showModifEnMassDispositionBtn = false;
        this.showRemiseDispositionBtn = false;
      }
    }
    this.balFilter.etatBal = filterEvent.filterData.etat;
    this.balFilter.adresseBal = filterEvent.filterData.adresse;
    this.balFilter.identifiantFrontal = filterEvent.filterData.frontal;
    this.balFilterState.etatBal = this.balFilter.etatBal;
    this.balFilterState.adresseBal = this.balFilter.adresseBal;
    this.balFilterState.identifiantFrontal = this.balFilter.identifiantFrontal;

    this.highlight = filterEvent.highlight;
    this.adresseHighlight = filterEvent.filterData.adresse;
    this.rechercheBalService.getBal(this.balFilter).subscribe(
      (bal) => {
        this.balDataList = bal.body;
        this.totalResult = parseInt(bal.headers.get('X-NB-RESULTATS-TOTAL'));
        this.balFilter.numeroPage = parseInt(bal.headers.get('X-NUMERO-PAGE'));
        this.balFilter.nbResultatsParPage = parseInt(
          bal.headers.get('X-NB-RESULTATS-PAR-PAGE')
        );
      },
      (error) => (this.isShowPagiantion = false)
    );
    // Detampon
    // check if we should show the button Detamponnage
    this.ShowDetamponnage();
    this.InitSelectBox();
  }

  closeNotifTempoError(event): void {
    this.openNotifTemponnageError = event;
  }

  getFiltredDataDefault() {
    this.resetNotificationDataAndClose();
    if (this.balFilter.etatBal === 'Active') {
      this.isShowTemponnage = true;
      this.showModifEnMassDispositionBtn = true;
      this.showRemiseDispositionBtn = true;
    }
    this.ShowDetamponnage();
    this.letterBoxListComponent.toggelSelectAllcheckbox(false);
    this.selectAllBAL = false;
    this.filterComponent.inputAddress.nativeElement.focus();
    this.openNotifTemponnageError = false;
    this.openNotifTemponnage = false;
    this.openNotifDetemponnageFail = false;
    this.openNotifDetemponnageSucces = false;
    this.resetNotificationDataAndClose();
    this.initBALFilter();
    if (this.isRoleAdmin) {
      this.isShowTemponnage = true;
      this.showModifEnMassDispositionBtn = true;
      this.showRemiseDispositionBtn = true;
    }
    this.ShowDetamponnage(); // after the reset of BAL Filter  we should hide the button detamponnage

    this.rechercheBalService.getBal(this.balFilter).subscribe(
      (bal) => {
        this.balDataList = bal.body;
        this.totalResult = parseInt(bal.headers.get('X-NB-RESULTATS-TOTAL'));
        this.balFilter.numeroPage = parseInt(bal.headers.get('X-NUMERO-PAGE'));
        this.balFilter.nbResultatsParPage = parseInt(
          bal.headers.get('X-NB-RESULTATS-PAR-PAGE')
        );
      },
      (error) => (this.isShowPagiantion = false)
    );
  }

  getFrontalData(FrontalInputText: string) {
    this.resetNotificationDataAndClose();
    this.inputFilterDataNew.frontal = [];

    this.inputFilterDataNew.frontal = this.inputFilterData.frontal
      .filter(
        (ele) =>
          ele.name.toLowerCase().startsWith(FrontalInputText.toLowerCase()) ||
          FrontalInputText === ''
      )
      .slice(0, 10); // extract only the  first 10 elements
    this.inputFilterDataNew.frontal.push({
      id: '1',
      name: 'Tous',
    });
  }

  openModalTempo(): void {
    this.isFormulaireopen = false;
    this.resetNotificationDataAndClose();
    this.isModalOpen = true;
    this.balTamponNbr =
      this.selectedBal.length === 0
        ? this.totalResult
        : this.selectedBal.length;
  }

  modalCloseBoolean(test): void {
    this.isModalOpen = test;
  }

  openFormulaire(): void {
    this.resetNotificationDataAndClose();
    this.isFormulaireopen = !this.isFormulaireopen;
  }

  // yassine chafyaay
  // modifier masse bals
  isModMassbalsSuccess = false;
  isModMassbalsFail = false;
  isModMassbalsSidBarCanvasOpen = false;
  modifMassObj: ModifEnMassI;
  modMassErrMessage = '';

  MODIF_EN_MASS_EVENT_HANDLER(data: any) {
    this.isModMassbalsSidBarCanvasOpen = false;

    if (data.DATA) {
      const result = data.DATA;
      if (result.etatBal) {
        this.modifMassObj = result;
        this.isModMassbalsSuccess = true;
        this.isModMassbalsFail = false;
      } else {
        this.isModMassbalsSuccess = false;
        this.isModMassbalsFail = true;
        this.modMassErrMessage = result.message;
      }
    }
  }

  openSidebarCanvas(event: any) {
    this.resetNotificationDataAndClose();
    setTimeout(() => {
      if (event) {
        const id = event.id;
        if (id === 0) {
          this.hideNotificationMessage();
          this.exportBals();
        }
        if (id === 1) {
          this.hideNotificationMessage();
          this.isModMassbalsSidBarCanvasOpen = !this
            .isModMassbalsSidBarCanvasOpen;
        } else if (id === 2) {
          this.hideNotificationMessage();
          this.openDescativerEnMassModal = true;
        }
        this.ngSelectComponent.handleClearClick();
        this.ngSelectComponent.close();
      }
    }, 100);
  }

  /* ----------- */

  CloseCreateBALForm(): void {
    this.isFormulaireopen = false;
    this.ngSelectComponent.handleClearClick();
    this.isModMassbalsSidBarCanvasOpen = false;
  }

  closeEventHandler(event) {
    this.isModMassbalsSidBarCanvasOpen = false;
  }

  hideNotificationMessage() {
    this.openNotifTemponnageError = false;
    this.openNotifTemponnage = false;
    this.openNotifDetemponnageFail = false;
    this.openNotifDetemponnageSucces = false;
    this.openNotifRemiseDispoSuccess = false;
    this.openNotifDescativerMassSuccess = false;
    this.isModMassbalsSuccess = false;
    this.openNotifRemiseDispoError = false;
    this.openNotifDescativerMassFail = false;
    this.isModMassbalsFail = false;
  }

  exportBals() {
    const balToExport: BALData[] = [];
    if (this.selectedBal.length === 0) {
      this.rechercheBalService
        .getBal({
          nbResultatsParPage: this.totalResult,
          numeroPage: 1,
          etatBal: '',
          adresseBal: '',
          identifiantFrontal: '',
          sensTri: 'asc',
          champTri: '',
        })
        .subscribe((bal) => {
          bal.body.forEach((data) => {
            const dataNew: BalDataExpoted = new BalDataExpoted();
            dataNew.Adresse = data.adresseBal;
            dataNew.Etat = data.etatBal;
            if (data.balRejeu) {
              dataNew.Rejouable = 'Oui';
            } else {
              dataNew.Rejouable = 'Non';
            }
            dataNew.Type = data.typeBal;
            dataNew.relaisMessagerie = data.relaisMessagerie;
            dataNew.Frontal = data.frontal.nom;
            dataNew.seuil = data.seuil;
            dataNew.adresseMailAlerte = data.adresseMailAlerte;
            dataNew.IPs = data.listeAdressesIPAutorises;
            dataNew.Messages_Tamponnés = data.dossierTampon.nbMessagesTamponnes;
            dataNew.volumeDossier = data.dossierTampon.volumeDossier;
            dataNew.dateMiseEnTamponI = data.dossierInbox.dateMiseEnTampon;
            dataNew.MessagesNonLus = data.dossierInbox.nbMessagesNonLus;
            dataNew.volumeDossierI = data.dossierInbox.volumeDossier;
            dataNew.dateDernierReleve = data.dossierTampon.dateDernierReleve;
            this.data.push(dataNew);
          });
          this.exportToExel();
        });
    } else {
      this.selectedBal.forEach((balSelected) => {
        balToExport.push(
          this.balDataList.find((bal) => bal.adresseBal === balSelected)
        );
      });
      balToExport.forEach((data) => {
        const dataNew: BalDataExpoted = new BalDataExpoted();
        dataNew.Adresse = data.adresseBal;
        dataNew.Etat = data.etatBal;
        if (data.balRejeu) {
          dataNew.Rejouable = 'Oui';
        } else {
          dataNew.Rejouable = 'Non';
        }
        dataNew.Type = data.typeBal;
        dataNew.relaisMessagerie = data.relaisMessagerie;
        dataNew.Frontal = data.frontal.nom;
        dataNew.seuil = data.seuil;
        dataNew.adresseMailAlerte = data.adresseMailAlerte;
        dataNew.IPs = data.listeAdressesIPAutorises;
        dataNew.Messages_Tamponnés = data.dossierTampon.nbMessagesTamponnes;
        dataNew.volumeDossier = data.dossierTampon.volumeDossier;
        dataNew.dateMiseEnTamponI = data.dossierInbox.dateMiseEnTampon;
        dataNew.MessagesNonLus = data.dossierInbox.nbMessagesNonLus;
        dataNew.volumeDossierI = data.dossierInbox.volumeDossier;
        dataNew.dateDernierReleve = data.dossierTampon.dateDernierReleve;
        this.data.push(dataNew);
      });
      this.exportToExel();
    }
  }

  exportToExel() {
    var option: any = {};
    option.fileName = 'ExportCsvBALs';
    let dataRow: any = {};
    let listDataRow = [];
    this.data.forEach((data) => {
      dataRow[1] = data.Adresse;
      dataRow[2] = data.Etat;
      dataRow[3] = data.Rejouable;
      dataRow[4] = data.Type;
      dataRow[5] = data.relaisMessagerie;
      dataRow[6] = data.Frontal;
      dataRow[7] = data.seuil;
      dataRow[8] = data.adresseMailAlerte;
      dataRow[9] = data.IPs;
      dataRow[10] = data.Messages_Tamponnés;
      dataRow[11] = data.volumeDossier;
      dataRow[12] = data.dateMiseEnTampon;
      dataRow[13] = data.MessagesNonLus;
      dataRow[14] = data.volumeDossierI;
      dataRow[15] = data.dateDernierReleve;
      listDataRow.push(dataRow);
      dataRow = {};
    });
    option.datas = [
      {
        sheetData: listDataRow,
        sheetName: 'sheet',
        sheetHeader: [
          'Adresse',
          'Etat',
          'Rejouable',
          'Type',
          'Relai de Messagerie',
          'Frontal',
          'Seuil (Ko)',
          "Email d'alerte",
          'IPs',
          'Messages tamponnés',
          'Volume du dossier (Ko)',
          'Date de mise en tampon',
          'Messages non lus',
          'Volume du dossier (Ko)',
          'Date du dernier relevé',
        ],
        columnWidths: [10, 5, 5, 7, 7, 10, 5, 10, 10, 8, 8, 8, 8, 8, 8],
      },
    ];
    const toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel();
  }

  createNewBAL(newBAL): void {
    this.resetNotificationDataAndClose();
    this.rechercheBalService.createBal(newBAL).subscribe(
      (resp) => {
        this.openNotifBalCreationSucces = true;
        this.openNotifBalCreationFail = false;
        this.newBal = newBAL;
        this.CloseCreateBALForm();
      },
      (error) => {
        this.openNotifBalCreationSucces = false;
        this.openNotifBalCreationFail = true;
        this.newBal = new BAL();
        console.error(error);
        this.notificationErrorMessage = error.message;
      }
    );
    this.CloseCreateBALForm();
    this.filterComponent.resetData();
  }

  closeNotif(event): void {
    this.openNotification = event;
  }

  closeNotifTempo(event): void {
    this.openNotifTemponnage = event;
  }

  saveSelectedBAL(selectedBal: string[]) {
    this.selectedBal = selectedBal;
  }

  updateOrder(event: BALFilter) {
    this.resetNotificationDataAndClose();
    this.balFilter.sensTri = event.sensTri;
    this.balFilter.champTri = event.champTri;
    this.balFilter.numeroPage = this.balFilterState.numeroPage;
    this.balFilter.nbResultatsParPage = this.balFilterState.nbResultatsParPage;
    this.balFilter.etatBal = this.balFilterState.etatBal;
    this.balFilter.adresseBal = this.balFilterState.adresseBal;
    this.balFilter.identifiantFrontal = this.balFilterState.identifiantFrontal;

    this.rechercheBalService.getBal(this.balFilter).subscribe(
      (bal) => {
        this.balData = bal.body;
      },
    );
  }

  // tamponnage

  ShowDetamponnage() {
    this.store.select(selectAccountState).subscribe((state) => {
      if (
        state.roles.indexOf(Role.SuperAdmin) !== -1 &&
        this.balFilterState.etatBal === 'En tampon'
      ) {
        this.showDetamponnage = true;
      } else {
        this.showDetamponnage = false;
      }
    });
  }

  openModalDetampo(): void {
    this.isFormulaireopen = false;
    this.openNotifTemponnage = false;
    this.openNotifTemponnageError = false;
    this.openNotifDetemponnageFail = false;
    this.openNotifDetemponnageSucces = false;
    this.resetNotificationDataAndClose();
    this.tooltipBALs =
      this.selectedBal.length === 0
        ? this.balDataList.slice(0, 10).map((elt) => elt.adresseBal)
        : this.selectedBal.slice(0, 10);
    this.isModalDetampoOpen = true;
  }

  closeModalDetampo(event): void {
    this.isModalDetampoOpen = false;
    this.filterComponent.inputAddress.nativeElement.focus();
    this.ShowDetamponnage(); // to hide the button after we reset the  filter
  }

  resetNotificationDataAndClose() {
    this.openNotifTemponnage = false;
    this.openNotifTemponnageError = false;
    this.openNotifDetemponnageFail = false;
    this.openNotifDetemponnageSucces = false;
    this.openNotifBalCreationFail = false;
    this.openNotifBalCreationSucces = false;
    this.openNotifBalUpdateFail = false;
    this.openNotifBalUpdateSucces = false;
    this.isModMassbalsSuccess = false;
    this.isModMassbalsFail = false;
    this.openNotifRemiseDispoSuccess = false;
    this.openNotifRemiseDispoError = false;
    this.notificationErrorMessage = '';
    this.balTampoCriteria = new BalTampoCriteria();
    this.letterBoxListComponent.toggelSelectAllcheckbox(false);
  }

  valideTempo(tempo: boolean): void {
    this.isFormulaireopen = false;
    this.letterBoxListComponent.toggelSelectAllcheckbox(false);
    this.balTamponNbr =
      this.selectedBal.length === 0
        ? this.totalResult
        : this.selectedBal.length;
    this.isModalOpen = !this.isModalOpen;
    this.BalTamponner.adresseBal = this.balFilter.adresseBal;
    this.BalTamponner.etatBal = this.balFilter.etatBal;
    this.BalTamponner.identifiantFrontal = this.balFilter.identifiantFrontal;
    this.BalTamponner.listeIdentifiantsBals = this.selectedBal;
    this.rechercheBalService.ToggleTamponner(this.BalTamponner).subscribe(
      (bal) => {
        this.openNotifTemponnage = !this.openNotifTemponnage;
      },
      (error) => {
        this.openNotifTemponnageError = true;
      }
    );
    // informe the filter to reset the data
    this.filterComponent.resetData();
  }

  modalCloseTamponnage(test: boolean): void {
    this.isCloseTamponnage = true;
    this.isModalOpen = false;
  }

  valideDeTempo(tempo) {
    this.isFormulaireopen = false;
    this.letterBoxListComponent.toggelSelectAllcheckbox(false);
    this.selectAllBAL = false;

    this.balTamponNbr =
      this.selectedBal.length === 0
        ? this.totalResult
        : this.selectedBal.length;

    this.openNotifDetemponnageSucces = true;
    this.isModalDetampoOpen = false;
    this.BalTamponner.adresseBal = this.balFilter.adresseBal;

    this.BalTamponner.etatBal = this.inputFilterData.etat.find(
      (elt) => elt.id === this.balFilter.etatBal
    ).name; // this.balFilter.etatBal;

    this.BalTamponner.identifiantFrontal = this.balFilter.identifiantFrontal;

    this.balTampoCriteria.listeIdentifiantsBals = this.selectedBal;

    this.rechercheBalService.detamponner(this.balTampoCriteria).subscribe(
      (bal) => {
        this.openNotifDetemponnageSucces = true;
      },
      (error) => {
        this.openNotifDetemponnageFail = true;
        this.notificationErrorMessage = error.message;
      }
    );

    // hide the button detamponnage
    this.showDetamponnage = false;

    // informe the filter to reset the data
    this.filterComponent.resetData();
  }

  editBal(bal: BALData) {
    this.resetNotificationDataAndClose();
    this.highlighRowEnable = true;
    this.updatedBal = bal;
    this.isUpdateBalFormOpen = true;
  }

  closeUpdateForm() {
    this.highlighRowEnable = false;
    this.isUpdateBalFormOpen = false;
  }

  updateBal(bal) {
    this.resetNotificationDataAndClose();
    this.rechercheBalService.updateBal(bal).subscribe(
      (resp) => {
        this.openNotifBalUpdateSucces = true;
        this.openNotifBalUpdateFail = false;
        this.updatedBal = bal;
      },
      (error) => {
        this.openNotifBalUpdateSucces = false;
        this.openNotifBalUpdateFail = true;
        this.updatedBal = new BALData();
        console.error(error);
        this.notificationErrorMessage = error.message;
      }
    );
    this.closeUpdateForm();
    this.filterComponent.resetData();
    //this.filterComponent.inputAddress.nativeElement.focus();
    this.highlighRowEnable = false;
  }
}
