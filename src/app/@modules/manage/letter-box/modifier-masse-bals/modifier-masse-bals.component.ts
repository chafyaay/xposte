import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  AfterContentInit,
  OnChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ModifEnMassService } from 'src/app/@core/services/modif-en-mass.service';
import { BAL } from 'src/app/@shared/models/BAL';
import { InputFilterData } from 'src/app/@shared/models/InputFilterData';
import { ModifEnMassI } from 'src/app/@shared/models/modif-mass-bals.model';
import { selectBALStateState, selectFrontalState } from 'src/app/@store';

@Component({
  selector: 'app-modifier-masse-bals',
  templateUrl: './modifier-masse-bals.component.html',
  styleUrls: ['./modifier-masse-bals.component.scss'],
})
export class ModifierMasseBalsComponent implements OnInit, OnChanges {
  @ViewChild(NgSelectComponent, { static: false })
  ngSelectComponent: NgSelectComponent;
  @Input()
  selectedBal: any;
  @Input()
  balNumber: any;
  @Input()
  balDataList: any[]=[];
  @Input()
  etatBal: any;
  @Input()
  filtreAdresse: any;
  @Input()
  identifiantFrontal: any;
  @Output() MODIF_EN_MASS_EVENT_EMITTER: EventEmitter<any> = new EventEmitter();
  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modMassBalsForm: FormGroup;
  isFormValid: boolean;
  itemSelected = 0;
  ngSelectOpened = false;
  _CRITERIA_LIST = [];
  isFrontalFielled = false;
  istypeBALListFielled = false;
  typeBALList: any[] = ['Production', 'Qualification', 'Service', 'Test'];
  selectListDataNew: InputFilterData = new InputFilterData();
  selectListData: InputFilterData = new InputFilterData();
  selected_field_Id: number;
  isAddItem = false;
  selectedFCN = '';
  CRITERIA_LIST = [];
  TEMP_CRITERIA_LIST: any[] = [];
  selectedCriteria: any[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private modifEnMassService: ModifEnMassService,
    public translate: TranslateService
  ) {
    const FIELD: any = this.translate.translations[this.translate.currentLang];
    this.CRITERIA_LIST = [
      {
        id: 1,
        label: FIELD.FRONTAL,
        fcn: 'frontal',
        type: 'list',
        disabled: false,
      },
      // { id: 2, label: FIELD.TYPE_BOITE_LETTRE, fcn: 'typeBALList', type: 'list', disabled: false },
      {
        id: 2,
        label: FIELD.MOD_MASS_SEUIL,
        fcn: 'seuil',
        type: 'number',
        disabled: false,
      },
      {
        id: 3,
        label: FIELD.IPs,
        fcn: 'listeAdressesIPAutorises',
        type: 'text',
        disabled: false,
      },
      {
        id: 4,
        label: FIELD.EMAIL_ALERT,
        fcn: 'adresseMailAlerte',
        type: 'email',
        disabled: false,
      },
      {
        id: 5,
        label: FIELD.RELAIS_MESSAGERIE,
        fcn: 'balRelais',
        type: 'text',
        disabled: false,
      },
    ];

    this.modMassBalsForm = new FormGroup(
      {
        frontal: new FormControl(),
        typeBALList: new FormControl(),
        seuil: new FormControl(),
        listeAdressesIPAutorises: new FormControl(),
        adresseMailAlerte: new FormControl(),
        balRelais: new FormControl(),
      },
      { updateOn: 'change' }
    );
  }

  ngOnInit() {
    this.TEMP_CRITERIA_LIST = this.CRITERIA_LIST;
    this.loadFromStoredRef();
    this.typeBALList = this.formatToSelectOptions(this.typeBALList);
    this.isFormValid = !this.TEMP_CRITERIA_LIST.every(
      (item) => item.disabled === false
    );
  }

  ngOnChanges() {
    console.log('selectedBal');
    console.log(this.selectedBal);
  }

  loadFromStoredRef() {
    this.store.select(selectFrontalState).subscribe((stat) => {
      this.selectListData.frontal = stat.frontal;
      this.selectListDataNew.frontal = this.formatFrontalSelectOption(
        this.selectListData.frontal.slice(0, 10)
      ); // extract the first 10 elements
    });
  }

  get form() {
    return this.modMassBalsForm;
  }

  SELECT_FIELD(field: any) {
    this.selected_field_Id = field.id;
    this.selectedFCN = field.fcn;
    this.isAddItem = true;
  }
  is_form_valid() {
    const slected = this.TEMP_CRITERIA_LIST.every(
      (item) => item.disabled === false
    );
    this.isFormValid = !slected && this.form.valid;
    return this.isFormValid;
  }

  INSERT_FIELD() {
    this.updateListOfFields(this.selected_field_Id);
    if (
      this.selectedFCN === 'frontal' ||
      this.selectedFCN === 'typeBALList' ||
      this.selectedFCN === 'seuil' ||
      this.selectedFCN === 'balRelais'
    ) {
      this.form.setControl(
        this.selectedFCN,
        new FormControl('', { validators: Validators.required })
      );
    } else if (this.selectedFCN === 'listeAdressesIPAutorises') {
      this.form.setControl(
        this.selectedFCN,
        new FormControl('', {
          validators: [Validators.required, customIPListValidator()],
        })
      );
    } else if (this.selectedFCN === 'adresseMailAlerte') {
      this.form.setControl(
        this.selectedFCN,
        new FormControl('', {
          validators: [Validators.required, customEmailValidator()],
        })
      );
    }
    this.is_form_valid();
    this.isAddItem = false;
    this.form.updateValueAndValidity();
  }

  REMOVE_FIELD(field: any) {
    this.updateListOfFields(field.id);

    if (
      field.fcn === 'frontal' ||
      field.fcn === 'typeBALList' ||
      field.fcn === 'seuil' ||
      field.fcn === 'balRelais'
    ) {
      this.form.setControl(field.fcn, new FormControl('', { validators: [] }));
    } else if (field.fcn === 'listeAdressesIPAutorises') {
      this.form.setControl(field.fcn, new FormControl('', { validators: [] }));
    } else if (field.fcn === 'adresseMailAlerte') {
      this.form.setControl(field.fcn, new FormControl('', { validators: [] }));
    }
    this.is_form_valid();
    if (this.TEMP_CRITERIA_LIST.every((item) => item.disabled === false)) {
      this.isFormValid = false;
      this.isAddItem = false;
    }

    this.form.updateValueAndValidity();

    if (!this.TEMP_CRITERIA_LIST.every((item) => item.disabled === true)) {
      this.isAddItem = true;
    } else this.isAddItem = false;
  }

  private updateListOfFields(id?: any) {
    let output: any[] = [];
    this.CRITERIA_LIST.map((item) => {
      if (item.id == id) {
        item.disabled = item.disabled ? false : true;
      }
      output.push(item);
    });
    this.TEMP_CRITERIA_LIST = output;
  }

  checkFormValidity() {
    return this.form.valid;
  }

  setValidator(fcn: any, value: any) {
    this.form.get(fcn).patchValue(value);
    this.is_form_valid();
  }

  onKeyUp(event: any, fcn: any) {
    this.setValidator(fcn, event.target.value);
  }

  onChange(event: any, fcn: any) {
    this.setValidator(fcn, event.target.value);
  }

  onsSelectField(event: any, fcn: any) {
    this.setValidator(fcn, event.id);
  }

  closeFormulaire() {
    console.log('closeFormulaire');
    window.scrollTo(0, 0); //  to scroll to the top of the page
    this.closeEvent.emit(false);
  }

  onSelectFocus(id: any) {
    if (!this.isFrontalFielled && !this.istypeBALListFielled) {
      if (id === 1) {
        this.isFrontalFielled = true;
        this.istypeBALListFielled = false;
      } else if (id === 2) {
        this.isFrontalFielled = false;
        this.istypeBALListFielled = true;
      }
    } else {
      this.isFrontalFielled = true;
      this.istypeBALListFielled = true;
    }
  }

  //format data of a simple string array to ngSelect dataSource Format
  formatToSelectOptions(tagList: any) {
    let arr = [];
    tagList.forEach(function (tag: any) {
      arr.push({ id: tag, label: tag });
    });
    return arr;
  }

  formatFrontalSelectOption(tagList: any) {
    let arr = [];
    tagList.map(function (tag: any) {
      arr.push({ id: tag.identifiant, label: tag.nom });
    });
    return arr;
  }

  onSubmit() {
    let obj: ModifEnMassI;
    const listeAdresses = this.form.get('listeAdressesIPAutorises').value
      ? this.form.get('listeAdressesIPAutorises').value.split(',')
      : [];

    obj = {
      listeAdresses: this.selectedBal,
      etatBal: this.etatBal,
      filtreAdresse: this.filtreAdresse,
      identifiantFrontal: this.identifiantFrontal,
      frontal: this.form.get('frontal') ? this.form.get('frontal').value : '',
      seuil: this.form.get('seuil') ? this.form.get('seuil').value : 0,
      adressesIP: listeAdresses,
      mailAlerte: this.form.get('mailAlerte')
        ? this.form.get('mailAlerte').value
        : '',
      relaiMessagerie: this.form.get('relaiMessagerie')
        ? this.form.get('relaiMessagerie').value
        : '',
    };

    if (this.form.valid) {
      try {
        this.modifEnMassService.modifEnMass(this.form.value).subscribe(
          (res) => {
            this.MODIF_EN_MASS_EVENT_EMITTER.emit({
              closeModal: true,
              DATA: obj,
            });
          },
          (err) => {
            this.MODIF_EN_MASS_EVENT_EMITTER.emit({
              closeModal: true,
              DATA: err,
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}

function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const regex = new RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
    );
    let isEmailValid = true;
    console.log(regex.test(control.value));
    if (!regex.test(control.value)) {
      isEmailValid = false;
    }
    return isEmailValid ? null : { emailError: true };
  };
}

function customIPListValidator(): ValidatorFn {
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
