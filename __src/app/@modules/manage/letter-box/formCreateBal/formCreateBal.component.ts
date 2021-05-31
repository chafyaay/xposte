import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppState, selectBALStateState, selectFrontalState } from '__src/app/@store';
import { InputFilterData } from '__src/app/@shared/models/InputFilterData';
import { Store } from '@ngrx/store';
import { BAL } from '__src/app/@shared/models/BAL';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BALFilter } from '__src/app/@shared/models/BALFilter';
import { RechercheBalService } from '__src/app/@core/services/recherche-bal.service';
import { UtilisateurService } from '__src/app/@core/services/utilisateur.service';

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
  selectListDataNew: InputFilterData = new InputFilterData();

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
    this.typeBALList = this.formatToSelectOptions(this.typeBALList);
    this.generatePasswords();
  }

  createFormGroup() {
    return this.formBuilder.group({
      adresseBal: [
        '',
        [
          Validators.required,
          this.customEmailValidator(),
          Validators.maxLength(320),
        ],
      ],
      frontal: ['', [Validators.required]],
      typeBal: ['', [Validators.required]],
      seuil: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('^\\d+$')],
      ], // POUR IPS Réél 255 ^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$ // hadi khdama ip valid ^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9][0-9]?)$
      listeAdressesIPAutorises: [
        '',
        [Validators.required, this.customIPListValidator()],
      ],
      adresseMailAlerte: [
        '',
        [Validators.required, this.customEmailValidator()],
      ],
      mdpProd: ['', [Validators.required, Validators.minLength(6)]],
      balRejeu: [false, []],
      mdpRejeu: ['', []],
      balRelais: ['', [Validators.email, Validators.maxLength(320)]],
    });
    /*balForm.patchValue({
      balRejeu:false
    }
    );*/
  }
  balRejeuPwd: string;

  generatePasswords() {
    this.utilisateurService.getGeneratedPWD().subscribe(
      (resp) => {
        this.createBALForm.get('mdpProd').setValue(resp);
      },
      (error) => {}
    );
    this.utilisateurService.getGeneratedPWD().subscribe(
      (resp) => {
        this.balRejeuPwd = resp;
      },
      (error) => {}
    );
  }

  checkBALRejeu() {
    if (this.createBALForm.value.balRejeu) {
      this.createBALForm.get('mdpRejeu').setValue(this.balRejeuPwd);
      // add validator  to mdpRejeu because it linked to this checked box
      this.createBALForm.get('mdpRejeu').validator = <any>(
        Validators.compose([Validators.required, Validators.minLength(6)])
      );
    } else {
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
    newBAL.frontal = this.selectListDataNew.frontal.find(
      (elt) => elt.identifiant === this.createBALForm.value.frontal
    );

    if (this.createBALForm.valid) {
      window.scrollTo(0, 0); //  to scroll to the top of the page
      this.valideCreateBal.emit(newBAL);
    }
  }

  closeFormulaire() {
    window.scrollTo(0, 0); //  to scroll to the top of the page
    this.closeEvent.emit(false);
  }

  customIPListValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const regex = new RegExp(
        '^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])[.]){3}(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])$'
      );
      const inputValue = control.value ? control.value : ''; //  to not have this error  Cannot read property 'split' of null
      const ips: string[] = inputValue.split(',');
      let isIpValid = true;
      ips.forEach((ip) => {
        if (!regex.test(ip)) {
          isIpValid = false;
        }
      });
      return isIpValid ? null : { ipError: true };
    };
  }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const regex = new RegExp(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
      );
      let isEmailValid = true;
      if (!regex.test(control.value)) {
        isEmailValid = false;
      }

      return isEmailValid ? null : { emailError: true };
    };
  }

  loadFromStoredRef() {
    this.store.select(selectFrontalState).subscribe((stat) => {
      this.selectListData.frontal = stat.frontal;
      this.selectListDataNew.frontal = this.selectListData.frontal.slice(0, 10); // extract the first 10 elements
    });

    this.store.select(selectBALStateState).subscribe((stat) => {
      this.selectListData.etat = stat.balState.map((ele) => ({
        id: ele.identifiant,
        name: ele.libelle,
      }));

      this.selectListDataNew.etat = this.selectListData.etat;
    });
  }

  getFrontalData(event?) {
    let FrontalInputText: string = '';
    if (event) {
      FrontalInputText = event.target.value;
    }
    this.selectListDataNew.frontal = [];

    this.selectListDataNew.frontal = this.selectListData.frontal
      .filter(
        (ele) =>
          ele.nom.toLowerCase().startsWith(FrontalInputText.toLowerCase()) ||
          FrontalInputText === ''
      )
      .slice(0, 10); // extract only the  first 10 elements
  }

  checkBALUnicity() {
    let balFilter: BALFilter = new BALFilter();
    if (this.createBALForm.get('adresseBal').valid) {
      balFilter.adresseBal = this.createBALForm.get('adresseBal').value;
      this.checkBALUnicityState = 'validate';
      this.rechercheBalService.getBal(balFilter).subscribe(
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
      this.getFrontalData(); // to load the initial data back
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
    this.createBALForm.value.frontal = this.selectListDataNew.frontal.find(
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
}
