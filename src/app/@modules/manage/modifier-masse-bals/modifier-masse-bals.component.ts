import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { BAL } from 'src/app/@shared/models/BAL';
import { InputFilterData } from 'src/app/@shared/models/InputFilterData';
import { selectBALStateState, selectFrontalState } from 'src/app/@store';

@Component({
  selector: 'app-modifier-masse-bals',
  templateUrl: './modifier-masse-bals.component.html',
  styleUrls: ['./modifier-masse-bals.component.scss']
})
export class ModifierMasseBalsComponent implements OnInit {
  @ViewChild(NgSelectComponent, { static: false }) ngSelectComponent: NgSelectComponent;
  @Input()
  selectedBal: any;
  @Input()
  balNumber: any;

  modMassBalsForm: FormGroup;
  idFormValide=false;
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
  TEMP_CRITERIA_LIST: any[] = [];
  CRITERIA_LIST = [
    { id: 1, label: 'Frontal', fcn: 'frontal', type: 'list', disabled: false },
    { id: 2, label: 'Type de boites aux lettres', fcn: 'typeBALList', type: 'list', disabled: false },
    { id: 3, label: 'Seuil', fcn: 'seuil', type: 'number', disabled: false },
    { id: 4, label: 'IPs', fcn: 'listeAdressesIPAutorises', type: 'text', disabled: false },
    { id: 5, label: 'Email d\'alerte', fcn: 'adresseMailAlerte', type: 'email', disabled: false },
    { id: 6, label: 'Relais de messagerie', fcn: 'balRelais', type: 'text', disabled: false },
  ];

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.modMassBalsForm = new FormGroup({
      frontal: new FormControl('', { validators: [] }),
      typeBALList: new FormControl('', { validators: [] }),
      seuil: new FormControl('', { validators: [] }),
      listeAdressesIPAutorises: new FormControl(''),
      adresseMailAlerte: new FormControl(''),
      balRelais: new FormControl('', { validators: [] }),
    })
  }

  ngOnInit() {
    this.TEMP_CRITERIA_LIST = this.CRITERIA_LIST;
    this.loadFromStoredRef();
    this.typeBALList = this.formatToSelectOptions(this.typeBALList);
    this.idFormValide=!this.TEMP_CRITERIA_LIST.every(item=>item.disabled===false);
  }

  loadFromStoredRef() {
    this.store.select(selectFrontalState).subscribe((stat) => {
      this.selectListData.frontal = stat.frontal;
      this.selectListDataNew.frontal = this.formatFrontalSelectOption(this.selectListData.frontal.slice(0, 10)); // extract the first 10 elements

      console.log('yassine 0')
      console.log(stat)
    });

    /*   this.store.select(selectBALStateState).subscribe((stat) => {
        this.selectListData.etat = stat.balState.map((ele) => ({
          id: ele.identifiant,
          name: ele.libelle,
        }));
  
        this.selectListDataNew.etat = this.selectListData.etat;
        console.log('yassine1')
        console.log(this.selectListDataNew)
      }); */
  }

  get form() {
    return this.modMassBalsForm;
  }

  onSubmit() {
    let newBAL: BAL;
    // due to the binding and the nature  of data entered  we change it into the accepted dataType by the backend
    newBAL = this.modMassBalsForm.value;
    newBAL.listeAdressesIPAutorises = this.modMassBalsForm
      .get('listeAdressesIPAutorises')
      .value.split(',');
    newBAL.frontal = this.selectListDataNew.frontal.find(
      (elt) => elt.identifiant === this.modMassBalsForm.value.frontal
    );

    if (this.modMassBalsForm.valid) {
      window.scrollTo(0, 0); //  to scroll to the top of the page
      // this.valideCreateBal.emit(newBAL);
    }
  }

  SELECT_FIELD(id: any) {
    this.selected_field_Id = id;
    this.isAddItem = true;
  }

  REMOVE_FIELD(id: any) {
    this.updateListOfFields(id);
    if (this.TEMP_CRITERIA_LIST.every(item => item.disabled === false))
      {
        this.isAddItem = false;
        this.idFormValide = this.form.invalid;
      }
  }

  INSERT_FIELD = () => {
    this.updateListOfFields(this.selected_field_Id);
    // set validators
    let fcn:any;
    let validators:any[];
    if(this.selected_field_Id===4)
    {
      fcn='listeAdressesIPAutorises';
      validators=[Validators.required, customIPListValidator()];
    }
    else if(this.selected_field_Id===5)
    {
      fcn='adresseMailAlerte';
      validators=[Validators.required, customIPListValidator()];
    }
    if(fcn)
    {
      this.form.get(fcn).setValidators(validators);
      this.idFormValide=this.form.invalid;
    }
  };

  private updateListOfFields(id?: any) {
    let output: any[] = [];
    this.CRITERIA_LIST.map(item => {
      if (item.id == id) {
        item.disabled = item.disabled ? false : true;
      }
      output.push(item);
    });
    this.TEMP_CRITERIA_LIST = output;
  }

  onKeyUp(event: any, field: any) {
    if (event.target.value)
      this.form.get(field.fcn).patchValue(event.target.value);
      if(this.form.get(field.fcn).valid){
        this.idFormValide = this.form.valid;
      }
      console.log('key up ',field.fcn)
      console.log(this.form.get(field.fcn).valid)
  }
  onBlur(event: any, field: any) {
    console.log(field)
    this.form.get(field.fcn).patchValue(event.target.value)
  }

  selectFrontal(fcn:any){
    this.idFormValide = this.form.valid;
  }

  getFrontalData($event) { }
  checkFontralIsSet() { }
  closeFormulaire() { }
  onSelectFocus(id:any) {
    if (!this.isFrontalFielled && !this.istypeBALListFielled) {
      if (id === 1) { this.isFrontalFielled = true; this.istypeBALListFielled = false; }
      else if (id === 2) { this.isFrontalFielled = false; this.istypeBALListFielled = true; }
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
