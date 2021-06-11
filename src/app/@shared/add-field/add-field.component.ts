import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customEmailValidator } from '@shared/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class AddFieldComponent implements OnInit {
  @Input() tempItems: any[] = [];
  addFieldForm: FormGroup;
  FIELDS: any[] = [];
  selectedValue = "";
  isMessageLuAddItem = false;
  isMessageLusListSelected:any;
  selectedField = "";
  isAddFieldBtnValid=false

  constructor() { 
  }

  ngOnInit() {
    this.FIELDS = this.tempItems;
    this.createRemiseDispoForm();
   this.checkIfListIsNotEmpty();
  }

  get form() {
    return this.addFieldForm
  }

  createRemiseDispoForm() {
    const obj = {};
    this.tempItems.map(item => {
      if (item.fcn) {
        obj[item.fcn] = new FormControl('', { validators: [] })
      }
    })
    this.addFieldForm = new FormGroup(
      {
        ...obj,
        listEmpty: new FormControl('', { validators: [ListIsNotEmpty] })
      },
      { updateOn: 'change' }
    );
  }

  setvalidator(item: any) {
    let validators: any;

    if (item.type === 'text') validators = [Validators.required]
    else if (item.type === 'date') validators = [Validators.required, DateValidator()]
    else if (item.type === 'email') validators = [Validators.required, customEmailValidator()]

    this.form.setControl(
      item.fcn,
      new FormControl('', { validators: validators })
    );
  }

  updateList(selectedField: any) {
    let output: any[] = [];
    this.tempItems.map((item) => {
      if (item.fcn === selectedField) {
        item.disabled = item.disabled ? false : true;
        this.setvalidator(item);
      }
      output.push(item);
    });
    this.FIELDS = output;
  }

  checkIfListIsNotEmpty() {
    const listEmpty = this.FIELDS.every(item => item.disabled === false);
    this.form.get('listEmpty').patchValue(!listEmpty);
  }

  insertField() {
    this.updateList(this.selectedField);
    this.isAddFieldBtnValid=false;
  }

  removeField(fcn: string) {
    this.updateList(fcn);
    this.form.setControl(fcn, new FormControl('', { validators: [] }));
    this.checkIfListIsNotEmpty();
  }

  onSelectField(field: any) {
    this.selectedField = field.fcn;
    this.isAddFieldBtnValid=true;
  }

  onchange(event: any, field?: any) {
    this.checkIfListIsNotEmpty();
    if (field.fcn)
      this.inputControl(field.fcn);
  }

  getInputElemt(id: string): HTMLInputElement {
    return document.getElementById(id) as any;
  }

  inputControl(fcn: string) {
    switch (fcn) {
      case 'version':
        this.getInputElemt(fcn).maxLength = 5;
        break;
      case 'type': this.getInputElemt(fcn).maxLength = 6;
    }
  }
}

export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid
    ? null
    : {
      isValid: {
        valid: false,
      },
    };
};

export function DateValidator(format = "DD/MM/YYYY"): any {
  return (control: FormControl): { [key: string]: any } => {
    const val = moment(control.value, format, true);

    if (!val.isValid()) {
      return { invalidDate: true };
    }

    return null;
  };
}

export const PeriodValidator = (fc: FormControl) => {
  const isValid = fc.value;
  return isValid
    ? null
    : {
      isValid: {
        valid: false,
      },
    };
};


export const ListIsNotEmpty = (fc: FormControl) => {
  const isValid = fc.value;
  return isValid
    ? null
    : {
      isValid: {
        valid: false,
      },
    };
};
