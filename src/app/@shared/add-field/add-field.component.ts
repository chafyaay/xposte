import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '@shared/models/validators';
import { customEmailValidator } from '@shared/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class AddFieldComponent implements OnInit {
  @Input() tempItems: any[] = [];
  @Input() filterTitle: string;
  @Output() emitDataEvent: EventEmitter<any> = new EventEmitter();
  @Output() isEmptyListEvent: EventEmitter<boolean> = new EventEmitter();

  addFieldForm: FormGroup;
  FIELDS: any[] = [];
  selectedValue = "";
  isMessageLuAddItem = false;
  isMessageLusListSelected: any;
  selectedField = "";
  isAddFieldBtnValid = false
  isOpened = false;
  selectFocused = false;
  selectedLabel = "";

  constructor() {
  }

  ngOnInit() {
    this.FIELDS = this.tempItems;
    this.createRemiseDispoForm();
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
    this.addFieldForm = new FormGroup(obj, { updateOn: 'change' });
  }

  setvalidator(item: any) {
    let validators: any;

    if (item.type === 'text' && item.fcn !== 'sujetOuReplyInTo') validators = Validators.required
    else if (item.type === 'date') validators = [Validators.required, DateValidator()]
    else if (item.type === 'email') validators = [Validators.required, customEmailValidator()]
    else validators = Validators.required

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

  dispatchEvent() {
    console.log(this.form.valid)
    const isEmpty = this.FIELDS.every(item => item.disabled === false);
    this.emitDataEvent.emit({ isEmpty: isEmpty, isValid: isEmpty ? false : this.form.valid, ...this.form.value });
  }

  insertField() {
    this.updateList(this.selectedField);
    this.isAddFieldBtnValid = false;
    this.dispatchEvent();

  }

  removeField(fcn: string) {
    this.updateList(fcn);
    this.form.setControl(fcn, new FormControl('', { validators: [] }));
    this.dispatchEvent();
  }

  onSelectField(field: any) {
    this.selectedField = field.fcn;
    this.isAddFieldBtnValid = true;
  }

  onchange(event: any, field?: any) {
    console.log('hhhh')
    if (field.fcn) {
      this.inputControl(event, field.fcn);
      if (field.fcn === 'nbFSE') {
        var key = event.which || event.keyCode || 0;
        return key >= 48 && key <= 57 && event.target.value.length < 5;
      }
    }
    this.dispatchEvent();
  }

  emitData(isEmpty: boolean) {
    const form = this.form.value;
    let obj = {}
    if (this.form.value) {
      for (let key in form) {
        if (form[key]) obj[key] = form[key]
      }
    }
    this.emitDataEvent.emit({ isEmpty: isEmpty, isValid: isEmpty ? false : this.form.valid, ...this.form.value });
  }

  getInputElemt(id: string): HTMLInputElement {
    return document.getElementById('field-' + id) as any;
  }

  inputControl(event?: any, fcn?: string) {
    switch (fcn) {
      case 'version':
        this.getInputElemt(fcn).maxLength = 6;
        break;
      case 'codeCompostage': this.getInputElemt(fcn).maxLength = 5;
    }
  }

  onBlur(event?: any, field?: any) {
    if (field.fcn === 'nbFSE') {
      const text = event.target.value;
      const str = '00000';
      let output = '';
      output = [str.slice(0, str.length - text.length), text].join('');
      this.form.get(field.fcn).patchValue(output);
    }
    this.dispatchEvent();
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

