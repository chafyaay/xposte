import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AppState,
  selectBALStateState,
  selectFrontalState,
} from 'src/app/@store';
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
import { BALFilter } from '@shared/models/BALFilter';
import { RechercheBalService } from '@core/services/recherche-bal.service';
import { UtilisateurService } from '@core/services/utilisateur.service';
import { customEmailValidator, customIPListValidator } from '@shared/utils';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formCreateBal.component.html',
  styleUrls: ['./formCreateBal.component.scss'],
})
export class FormCreateBalComponent implements OnInit {
  @Output()
  valideCreateBal: EventEmitter<BAL> = new EventEmitter<BAL>();
  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  selectListData: InputFilterData = new InputFilterData();
  //selectListDataNew: InputFilterData = new InputFilterData();

  bal: BAL = new BAL();
  createBALForm: FormGroup;
  frontalId;
  etatBALId;
  isFrontalFielled;
  isEtatBALFielled;
  typeBALList: any[] = ['Production', 'Qualification', 'Service', 'Test'];
  checkBALUnicityState: string = '';

  showMdpProd: boolean = true;
  showMdpRejeu: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private rechercheBalService: RechercheBalService,
    private utilisateurService: UtilisateurService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadFromStoredRef();
    this.createBALForm = this.createFormGroup();
    this.disableMdpRejeu();
    this.typeBALList = this.formatToSelectOptions(this.typeBALList);
    this.generatePasswords();
  }

  createFormGroup() {
    return this.formBuilder.group({
      adresseBal: [
        '',
        [
          Validators.required,
          customEmailValidator(),
          Validators.maxLength(320),
        ],
      ],
      frontal: ['', [Validators.required]],
      typeBal: ['', [Validators.required]],
      seuil: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('^\\d+$')],
      ],
      listeAdressesIPAutorises: [
        '',
        [Validators.required, customIPListValidator()],
      ],
      adresseMailAlerte: ['', [Validators.required, customEmailValidator()]],
      mdpProd: [
        '',
        [Validators.required, Validators.minLength(8), this.strongPwd()],
      ],
      balRejeu: [false, []],
      mdpRejeu: ['', []],
      relaisMessagerie: [
        '',
        [this.customEmailValidator(), Validators.maxLength(320)],
      ],
    });
  }
  balRejeuPwd: string;
  disableMdpRejeu() {
    this.createBALForm.get('mdpRejeu').disable();
    this.createBALForm.get('mdpRejeu').setValue('');
    this.createBALForm.get('mdpRejeu').setValidators([]);
  }

  generatePasswords() {
    this.utilisateurService.getGeneratedPWD(true).subscribe(
      (resp) => {
        this.createBALForm.get('mdpProd').setValue(resp);
      },
      (error) => {}
    );
    this.utilisateurService.getGeneratedPWD(true).subscribe(
      (resp) => {
        this.balRejeuPwd = resp;
      },
      (error) => {}
    );
  }

  checkBALRejeu() {
    if (this.createBALForm.value.balRejeu) {
      this.createBALForm.get('mdpRejeu').enable();
      this.createBALForm.get('mdpRejeu').setValue(this.balRejeuPwd);
      // add validator  to mdpRejeu because it linked to this checked box
      this.createBALForm.get('mdpRejeu').validator = <any>(
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          this.strongPwd(),
        ])
      );
    } else {
      this.createBALForm.get('mdpRejeu').disable();
      this.createBALForm.get('mdpRejeu').reset();
      this.createBALForm.get('mdpRejeu').clearValidators();
    }
    //update and run the validator with the new validation rules
    this.createBALForm.get('mdpRejeu').updateValueAndValidity();
  }

  /*
  update the default pwd, purpose: when we check Bal rejeu we don't lose the password entred by the user
   */
  updateMdpRejeu() {
    this.balRejeuPwd = this.createBALForm.get('mdpRejeu').value;
  }
  additionalFormValidation(): boolean {
    return false;
  }

  CreateBal() {
    let newBAL: BAL;
    // due to the binding and the nature  of data entered  we change it into the accepted dataType by the backend
    newBAL = this.createBALForm.value;
    newBAL.listeAdressesIPAutorises = this.createBALForm
      .get('listeAdressesIPAutorises')
      .value.split(',');
    newBAL.frontal = this.selectListData.frontal.find(
      (elt) => elt.identifiant === this.createBALForm.value.frontal
    );

    if (this.createBALForm.valid) {
      window.scrollTo(0, 0); //  to scroll to the top of the page
      this.valideCreateBal.emit(newBAL);
    }
  }
  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const regex = new RegExp(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
      );
      let isEmailValid = true;
      if (control.value && !regex.test(control.value)) {
        isEmailValid = false;
      }

      return isEmailValid ? null : { emailError: true };
    };
  }

  closeFormulaire() {
    window.scrollTo(0, 0); //  to scroll to the top of the page
    this.closeEvent.emit(false);
  }

  loadFromStoredRef() {
    this.store.select(selectFrontalState).subscribe((stat) => {
      this.selectListData.frontal = stat.frontal;
    });
  }

  checkBALUnicity() {
    let balFilter: BALFilter = new BALFilter();
    if (this.createBALForm.get('adresseBal').valid) {
      balFilter.adresseBal = this.createBALForm.get('adresseBal').value;
      this.checkBALUnicityState = 'validate';
      this.rechercheBalService.getBal(balFilter, true).subscribe(
        (bal) => {
          if (Array.isArray(bal.body) && bal.body.length > 0) {
            this.checkBALUnicityState = 'error';
          } else {
            this.checkBALUnicityState = 'ok';
          }
        },
        (error) => {
          this.checkBALUnicityState = 'error';
          console.error(error);
        }
      );
    } else {
      this.checkBALUnicityState = '';
    }
  }

  checkFontralIsSet() {
    if (this.createBALForm.value.frontal) {
      this.isFrontalFielled = true;
    } else {
      this.isFrontalFielled = false; // for animation
    }
  }

  checkEtatBALIsSet() {
    if (this.createBALForm.value.typeBal) {
      this.isEtatBALFielled = true;
    } else {
      this.isEtatBALFielled = false; // for animation
    }
  }

  selectFrontal() {
    this.createBALForm.value.frontal = this.selectListData.frontal.find(
      (elt) => elt.identifiant === this.createBALForm.value.frontal
    );

    this.etatBALId = this.createBALForm.value.frontal.identifiant;
    if (this.createBALForm.value.frontal) {
      this.createBALForm.patchValue({
        seuil: this.createBALForm.value.frontal.seuil,
        listeAdressesIPAutorises: this.createBALForm.value.frontal
          .listeAdressesIPs
          ? this.createBALForm.value.frontal.listeAdressesIPs.join(',')
          : '',
        adresseMailAlerte: this.createBALForm.value.frontal.adresseMailAlerte,
      });
    }
  }

  //format data of a simple string array to ngSelect dataSource Format
  formatToSelectOptions(tagList) {
    let arr = [];
    tagList.forEach(function (tag) {
      arr.push({ id: tag, value: tag });
    });
    return arr;
  }

  disablePwd: boolean = true;

  strongPwd(): ValidatorFn {
    return (control: AbstractControl) => {
      let hasNumber = /\d/.test(control.value);
      let hasUpper = /[A-Z]/.test(control.value);
      let hasLower = /[a-z]/.test(control.value);
      const valid = hasNumber && hasUpper && hasLower;
      if (!valid) {
        // return what´s not valid
        return { strong: true };
      }
      return null;
    };
  }
}
