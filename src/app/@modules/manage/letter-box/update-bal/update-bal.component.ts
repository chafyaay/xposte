import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppState, selectBALStateState, selectFrontalState } from 'src/app/@store';
import { InputFilterData } from 'src/app/@shared/models/InputFilterData';
import { Store } from '@ngrx/store';
import { BAL } from 'src/app/@shared/models/BAL';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BALFilter } from 'src/app/@shared/models/BALFilter';
import { RechercheBalService } from 'src/app/@core/services/recherche-bal.service';
import { Frontal } from 'src/app/@shared/models/Frontal';
import { BALData } from 'src/app/@shared/models/BALData';

@Component({
  selector: 'app-update-bal',
  templateUrl: './update-bal.component.html',
  styleUrls: ['./update-bal.component.scss'],
})
export class UpdateBalComponent implements OnInit {
  @Output()
  valideUpdateBal: EventEmitter<BAL> = new EventEmitter<BAL>();
  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  selectListDataOriginal: InputFilterData = new InputFilterData();
  selectListData: InputFilterData = new InputFilterData();

  @Input()
  bal: BAL = new BAL();
  updateBALForm: FormGroup;

  isFrontalFielled;
  isEtatBALFielled;
  typeBALList: any[] = ['Production', 'Qualification', 'Service', 'Test'];

  showMdpProd: boolean = true;
  showMdpRejeu: boolean = true;
  selectedFrontalId: number;

  constructor(
    private formBuilder: FormBuilder,
    private rechercheBalService: RechercheBalService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadFromStoredRef();
    this.updateBALForm = this.createFormGroup();
    this.typeBALList = this.formatToSelectOptions(this.typeBALList);
    this.patchUpdateBALForm(this.bal);
  }

  createFormGroup() {
    return this.formBuilder.group({
      adresseBal: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(320)],
      ],
      frontal: [new Frontal(), [Validators.required]],
      typeBal: ['', [Validators.required]],
      seuil: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('^\\d+$')],
      ], // POUR IPS Réél 255 ^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$ // hadi khdama ip valid ^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9][0-9]?)$
      listeAdressesIPAutorises: [
        '',
        [Validators.required, this.customIPListValidator()],
      ],
      adresseMailAlerte: ['', [Validators.required, Validators.email]],
      mdpProd: ['', [Validators.required, Validators.minLength(6)]],
      balRejeu: [false, []],
      mdpRejeu: ['', []],
      relaisMessagerie: ['', [Validators.email, Validators.maxLength(320)]],
    });
  }

  patchUpdateBALForm(bal: BAL) {
    let listeAdressesIPAutorisesString;
    let selectedFrontal = this.selectListData.frontal.find(
      (elt) => elt.identifiant == bal.frontal.identifiant
    );

    if (selectedFrontal) {
      this.selectedFrontalId = selectedFrontal.identifiant;
    }
    if (bal.listeAdressesIPAutorises) {
      listeAdressesIPAutorisesString = bal.listeAdressesIPAutorises.join(', ');
    } else {
      listeAdressesIPAutorisesString = '';
    }

    this.updateBALForm.patchValue({
      adresseBal: bal.adresseBal,
      frontal: this.selectedFrontalId,
      typeBal: bal.typeBal,
      seuil: bal.seuil,
      listeAdressesIPAutorises: listeAdressesIPAutorisesString,
      adresseMailAlerte: bal.adresseMailAlerte,
      mdpProd: bal.mdpProd,
      balRejeu: bal.balRejeu,
      mdpRejeu: bal.mdpRejeu,
      relaisMessagerie: bal.relaisMessagerie,
    });
  }

  checkBALRejeu() {
    if (this.updateBALForm.value.balRejeu) {
      // add validator  to mdpRejeu because it linked to this checked box
      this.updateBALForm.get('mdpRejeu').validator = <any>(
        Validators.compose([Validators.required, Validators.minLength(6)])
      );
    } else {
      this.updateBALForm.get('mdpRejeu').reset();
      this.updateBALForm.get('mdpRejeu').clearValidators();
    }
    //update and run the validator with the new validation rules
    this.updateBALForm.get('mdpRejeu').updateValueAndValidity();
  }

  closeFormulaire() {
    this.closeEvent.emit(false);
    window.scrollTo(0, 0); //  to scroll to the top of the page
  }

  customIPListValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const regex = new RegExp(
        '^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])[.]){3}(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])$'
      );

      const ips: string[] = control.value.split(',');
      let isIpValid = true;
      ips.forEach((ip) => {
        if (!regex.test(ip)) {
          isIpValid = false;
        }
      });
      return isIpValid ? null : { ipError: true };
    };
  }

  loadFromStoredRef() {
    // this.selectListData will contain all the  record will never be changed
    this.store.select(selectFrontalState).subscribe((stat) => {
      this.selectListData.frontal = stat.frontal;
      this.selectListDataOriginal.frontal = this.selectListData.frontal;
    });
  }

  checkFontralIsSet() {
    if (this.updateBALForm.value.frontal) {
      this.isFrontalFielled = true;
    } else {
      //this.getFrontalData(); // to load the initial data back
      this.isFrontalFielled = false; // for animation
    }
  }

  checkEtatBALIsSet() {
    if (this.updateBALForm.value.typeBal) {
      this.isEtatBALFielled = true;
    } else {
      this.isEtatBALFielled = false; // for animation
    }
  }

  selectFrontal() {
    this.updateBALForm.value.frontal = this.selectListData.frontal.find(
      (elt) => elt.identifiant == this.selectedFrontalId
    );
  }

  //format data of a simple string array to ngSelect dataSource Format
  formatToSelectOptions(tagList) {
    let arr = [];
    tagList.forEach(function (tag) {
      arr.push({ id: tag.toUpperCase(), value: tag });
    });
    return arr;
  }

  updateBAL() {
    let updatedBal: BALData;
    // due to the binding and the nature  of data entered  we change it into the accepted dataType by the backend
    updatedBal = this.updateBALForm.value;
    updatedBal.listeAdressesIPAutorises = this.updateBALForm
      .get('listeAdressesIPAutorises')
      .value.split(', ');
    updatedBal.frontal = this.selectListData.frontal.find(
      (elt) => elt.identifiant === this.selectedFrontalId
    );

    this.valideUpdateBal.emit(updatedBal);
    window.scrollTo(0, 0); //  to scroll to the top of the page
  }
}
