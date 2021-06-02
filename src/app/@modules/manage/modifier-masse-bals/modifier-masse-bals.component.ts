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

  itemSelected = 0;
  ngSelectOpened = false;
  LIST_OF_CRITERIA = [];
  _LIST_OF_CRITERIA = [];
  createBALForm: FormGroup;
  isFrontalFielled = false;
  istypeBALListFielled = false;
  typeBALList: any[] = ['Production', 'Qualification', 'Service', 'Test'];
  selectListDataNew: InputFilterData = new InputFilterData();
  selectListData: InputFilterData = new InputFilterData();



  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.createBALForm = new FormGroup({
      frontal: new FormControl('', { validators: [] }),
      typeBALList: new FormControl('', { validators: [] }),
      seuil: new FormControl('', { validators: [] }),
      listeAdressesIPAutorises: new FormControl('', { validators: [Validators.required, customIPListValidator()] }),
      adresseMailAlerte: new FormControl('', { validators: [customEmailValidator()] }),
      balRelais: new FormControl('', { validators: [] }),
    })
  }

  ngOnInit() {

    this.LIST_OF_CRITERIA = [
      { id: 1, label: 'Frontal', fcn: 'frontal', type: 'list', disabled: false },
      { id: 2, label: 'Type de boites aux lettres', fcn: 'typeBALList', type: 'list', disabled: false },
      { id: 3, label: 'Seuil', fcn: 'seuil', type: 'number', disabled: false },
      { id: 4, label: 'IPs', fcn: 'listeAdressesIPAutorises', type: 'text', disabled: false },
      { id: 5, label: 'Email d\'alerte', fcn: 'adresseMailAlerte', type: 'email', disabled: false },
      { id: 6, label: 'Relais de messagerie', fcn: 'balRelais', type: 'text', disabled: false },
    ];
    this.loadFromStoredRef();
    this.typeBALList = this.formatToSelectOptions(this.typeBALList);
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

  get f() {
    return this.createBALForm;
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
      // this.valideCreateBal.emit(newBAL);
    }
  }

  SELECT_FIELD(event: any) {
    this.itemSelected = event.id;
      

  }
list1=[]
  INSERT_FIELD() {
    const item=this.LIST_OF_CRITERIA[this.itemSelected-1]
    item.disabled=true;
    console.log(item)
    this.list1.push(item)
   /*  this._LIST_OF_CRITERIA=[];
    this._LIST_OF_CRITERIA=[...this.LIST_OF_CRITERIA];
    this._LIST_OF_CRITERIA[this.itemSelected-1 ].disabled=true;

    this.ngSelectComponent.handleClearClick(); */
  }

  onKeyUp(event: any, field: any) {
    if (event.target.value)
      this.f.get(field.fcn).patchValue(event.target.value);
  }

  getFrontalData($event) { }
  checkFontralIsSet() { }
  selectFrontal() { }
  closeFormulaire() { }
  onSelectFocus(event) {
    if (!this.isFrontalFielled && !this.istypeBALListFielled) {
      if (event === 1) { this.isFrontalFielled = true; this.istypeBALListFielled = false; }
      else if (event === 2) { this.isFrontalFielled = false; this.istypeBALListFielled = true; }
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
