import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
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
import { TranslateService } from '@ngx-translate/core';
import { SUBFIELDSI } from '@shared/models/sub_fields';
import { RemiseDispoI } from 'src/app/@shared/models/remise-dispo';
import * as moment from "moment";

@Component({
  selector: 'app-remise-disposition',
  templateUrl: './remise-disposition.component.html',
  styleUrls: ['./remise-disposition.component.scss'],
})
export class RemiseDispositionComponent implements OnInit {
  @ViewChild('messageLuField', { static: false }) messageLuField: ElementRef;
  @ViewChild('sujetInputField', { static: false }) sujetInputField: ElementRef;

  ngSelectComponent: NgSelectComponent;

  @Input()
  balNumber: number;

  @Input()
  selectedBal: any[] = [];

  @Input()
  balSelected: number;

  @Input()
  balDataList: any[] = [];

  @Output() REMISE_DISPO_EVENT: EventEmitter<any> = new EventEmitter();

  miseDispoForm: FormGroup;
  remiseDispoObj: RemiseDispoI = {};
  isMessageLusListSelected = false;
  isSujetLusListSelected = false;
  dateHeureSujet: Date = new Date();
  selectedFieldId: any;
  fichierCompresseeSelected = false;
  fichierChifreeSelected = false;
  isformValid = false;
  errMsg = '';
  isPeriodValid = false;
  isMessageListEmpty = true;
  isSujetListEmpty = true;
  REMISE_DISPO_OBJ: RemiseDispoI = {};
  MESSAGE_LUS_LIST = [];
  SUJET_LIST = [];
  FIELD_LIST: SUBFIELDSI

  public FIELD_LISTS = { message_lus_list: [], sujet_list: [] };
  public TEMP_FIELD_LISTS = { message_lus_list: [], sujet_list: [] };

  // select filter field
  selectedListType = "";
  selected_message_lu_field_Id: any;
  selected_message_lu_fcn: any;
  isMessageLuAddItem = false
  selected_sujet_field_Id: any;
  selected_sujet_fcn: any;
  isSujetAddItem = false
  isFormValid: boolean;

  constructor(
    public translate: TranslateService
  ) {
    const FIELD: SUBFIELDSI = this.translate.translations[
      this.translate.currentLang
    ].SUBFIELDS;

    this.FIELD_LISTS = {
      message_lus_list: [
        {
          id: 1,
          label: FIELD.EMMETTEUR,
          fcn: 'emetteur',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 2,
          label: FIELD.DESITINATAIRE,
          fcn: 'destinataire',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 3,
          label: FIELD.CONTENT_DESC,
          fcn: 'contentDescription',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 4,
          label: FIELD.FICHIER_COMPRESSEE,
          fcn: 'fichiersCompresses',
          visible: false,
          disabled: false,
          type: 'list',
          data: [
            { id: 0, label: FIELD.INDIFFERENT },
            { id: 1, label: FIELD.OUI },
            { id: 2, label: FIELD.NON },
          ],
        },
        {
          id: 5,
          label: FIELD.FICHIER_COMPRESSEE,
          fcn: 'fichiersChiffres',
          visible: false,
          disabled: false,
          type: 'list',
          data: [
            { id: 0, label: FIELD.INDIFFERENT },
            { id: 1, label: FIELD.OUI },
            { id: 2, label: FIELD.NON },
          ],
        },
      ],
      sujet_list: [
        {
          id: 1,
          label: FIELD.TYPE,
          fcn: 'type',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 2,
          label: FIELD.VERSION,
          fcn: 'version',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 3,
          label: FIELD.CODE_EMETTEUR,
          fcn: 'codeEmetteur',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 4,
          label: FIELD.CODE_COMPOSTAGE,
          fcn: 'codeCompostage',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 5,
          label: FIELD.DATE_HEURE_SUJET,
          fcn: 'dateHeureSujet',
          visible: false,
          disabled: false,
          type: 'date',
        },
        {
          id: 6,
          label: FIELD.NBFSE,
          fcn: 'nbFSE',
          visible: false,
          disabled: false,
          type: 'text',
        },
        {
          id: 7,
          label: FIELD.SUJET_OUT_REPLY_INFO,
          fcn: 'sujetOuReplyInTo',
          visible: false,
          disabled: false,
          type: 'text',
        },
      ],
    };
  }

  ngOnInit() {
    this.createRemiseDispoForm();
    this.TEMP_FIELD_LISTS.message_lus_list = [...this.FIELD_LISTS.message_lus_list];
    this.TEMP_FIELD_LISTS.sujet_list = [...this.FIELD_LISTS.sujet_list];
  }

  createRemiseDispoForm() {
    this.miseDispoForm = new FormGroup(
      {
        periode: new FormControl('', { validators: [PeriodValidator] }),
        dateHeureDebut: new FormControl(null, {
          validators: [Validators.required, DateValidator()],
        }),
        dateHeureFin: new FormControl(null, {
          validators: [Validators.required, DateValidator()],
        }),
        emetteur: new FormControl(),
        destinataire: new FormControl(),
        contentDescription: new FormControl(),
        fichiersCompresses: new FormControl(''),
        fichiersChiffres: new FormControl(''),
        type: new FormControl(),
        version: new FormControl(),
        codeEmetteur: new FormControl(),
        codeCompostage: new FormControl(),
        dateHeureSujet: new FormControl(new Date()),
        nbFSE: new FormControl(''),
        sujetOuReplyInTo: new FormControl(),
      },
      { updateOn: 'change' }
    );
  }

  get form() {
    return this.miseDispoForm;
  }

  periodeKeyUphandler(ev: any, td: string) {
    if (td === 'dd') {
      this.setValidator('dateHeureDebut', ev);
      const v = this.form.get('dateHeureDebut').valid
      this.fillObj('dateHeureDebut');
    }
    else {
      this.setValidator('dateHeureFin', ev);
      const v = this.form.get('dateHeureFin').valid
      this.fillObj('dateHeureFin');
    }

  }

  /* periode date time picker  */
  onPeriodeSelect(ev?: any, datetype?: any) {
    let now = new Date();
    let n = now.getTime();
    let py = now.setFullYear(now.getFullYear() - 1);
    let dd = new Date(this.form.get('dateHeureDebut').value).getTime();
    let df = new Date(this.form.get('dateHeureFin').value).getTime();
    this.isPeriodValid = dd < df && dd < n && df <= n && dd >= py && df > py;

    this.setValidator('periode', this.isPeriodValid);

    this.is_form_valid();
    if (this.isPeriodValid) {
      this.fillObj('dateHeureDebut');
      this.fillObj('dateHeureFin');
    }
  }

  /* ng select change */
  onSelectChange(event: any, field: any) {
    let value: any;
    if (event.id === 1) value = true;
    else if (event.id === 2) value = false;
    else value = null;

    this.form.get(field.fcn).patchValue(value);
    this.fillObj(field.fcn);
  }


  selectFieldHandler(event: any, listType: string) {
    this.selectedListType = listType;
    if (this.selectedListType === 'message_lus') {
      this.selected_message_lu_field_Id = event.id;
      this.selected_message_lu_fcn = event.fcn;
      this.isMessageLuAddItem = true;
    } else {
      this.selected_sujet_field_Id = event.id;
      this.selected_sujet_fcn = event.fcn;
      this.isSujetAddItem = true;
    }

  }

  INSERT_FIELD() {
    if (this.selectedListType === 'message_lus') {
      this.updateListOfFields(this.selected_message_lu_field_Id);
      if (
        this.selected_message_lu_fcn === 'emetteur' ||
        this.selected_message_lu_fcn === 'destinataire') {
        this.form.setControl(
          this.selected_message_lu_fcn,
          new FormControl('', { validators: [Validators.required, customEmailValidator()] })
        );
      } else if (
        this.selected_message_lu_fcn === 'contentDescription' ||
        this.selected_message_lu_fcn === 'fichiersCompresses' ||
        this.selected_message_lu_fcn === 'fichiersChiffres'
      ) {
        this.form.setControl(
          this.selected_message_lu_fcn,
          new FormControl('', { validators: Validators.required })
        );
      }
      this.isMessageLuAddItem = false;

    }
    else {
      this.updateListOfFields(this.selected_sujet_field_Id);
      if (
        this.selected_sujet_fcn === 'type' ||
        this.selected_sujet_fcn === 'version' ||
        this.selected_sujet_fcn === 'codeEmetteur' ||
        this.selected_sujet_fcn === 'codeCompostage' ||
        this.selected_sujet_fcn === 'dateHeureSujet' ||
        this.selected_sujet_fcn === 'nbFSE' ||
        this.selected_sujet_fcn === 'sujetOuReplyInTo'
      ) {
        this.form.setControl(
          this.selected_sujet_fcn,
          new FormControl('', { validators: [Validators.required] })
        );
      }
      this.isSujetAddItem = false;
    }

    this.is_form_valid();
    this.form.updateValueAndValidity();
    this.fillObj();
  }

  REMOVE_FIELD(field: any) {
    if (this.selectedListType === 'message_lus') {
      this.updateListOfFields(field.id);
      this.form.setControl(field.fcn, new FormControl('', { validators: [] }));
      this.is_form_valid();

      if (this.TEMP_FIELD_LISTS.message_lus_list.every((item) => item.disabled === false)) {
        this.isFormValid = false;
        this.isMessageLuAddItem = false;
      }

      if (!this.TEMP_FIELD_LISTS.message_lus_list.every((item) => item.disabled === true)) {
        this.isMessageLuAddItem = true;
      } else this.isMessageLuAddItem = false;
    } else {

      this.updateListOfFields(field.id);
      this.form.setControl(field.fcn, new FormControl('', { validators: [] }));
      this.is_form_valid();

      if (
        this.TEMP_FIELD_LISTS.sujet_list.every((item) => item.disabled === false)
      ) {
        this.isFormValid = false;
        this.isSujetAddItem = false;
      }

      if (!this.TEMP_FIELD_LISTS.sujet_list.every((item) => item.disabled === true)) {
        this.isSujetAddItem = true;
      } else this.isSujetAddItem = false;

    }
    this.form.updateValueAndValidity();
    this.fillObj();

  }

  private updateListOfFields(id?: any) {
    let output: any[] = [];
    if (this.selectedListType === 'message_lus') {
      this.FIELD_LISTS.message_lus_list.map((item) => {
        if (item.id == id) {
          item.disabled = item.disabled ? false : true;
        }
        output.push(item);
      });
      this.TEMP_FIELD_LISTS.message_lus_list = output;
    } else {
      this.FIELD_LISTS.sujet_list.map((item) => {
        if (item.id == id) {
          item.disabled = item.disabled ? false : true;
        }
        output.push(item);

      });
      this.TEMP_FIELD_LISTS.sujet_list = output;
    }
  }

  is_form_valid(fcn?: any) {
    const allDisbled = this.TEMP_FIELD_LISTS.message_lus_list.every((item) => item.disabled === false) &&
      this.TEMP_FIELD_LISTS.sujet_list.every((item) => item.disabled === false);
    if (allDisbled) {
      this.isFormValid = this.form.valid;
    } else {
      this.isFormValid = this.form.valid;
    }
    return this.isFormValid;

  }

  checkFormValidity() {
    return this.form.valid;
  }


getElemById(fcn:any):HTMLInputElement{
  return document.getElementById(fcn) as any;
}
  onKeyUp(event: any, fcn: any) {
    console.log(this.sujetInputField)
    if (fcn === 'codeCompostage') 
      
      this.getElemById(fcn).maxLength=5
     else if (fcn === 'version') 
      this.getElemById(fcn).maxLength=6
    
    this.setValidator(fcn, event.target.value);
  }
  onKeyPress(event: any, fcn: any) {
    if (fcn === 'nbFSE') {
      this.getElemById(fcn).maxLength=5
      var x = event.which || event.keyCode;
      return (x >= 48 && x <= 57)
    }
  }

  setValidator(fcn: any, value?: any) {
    if (value)
      this.form.get(fcn).patchValue(value);
    this.is_form_valid(fcn);
    this.fillObj(fcn)

  }
  onsSelectField(event: any, fcn: any){
    console.log(event)
   this.setValidator(fcn, event.id);
  }
  onChange(event: any, fcn: any) {
    this.setValidator(fcn, event.target.value);
  }

  onsSelectDateTime(event: any, fcn: any) {

    this.setValidator(fcn);
  }

  /* input change */
  onDateTimeChange($event: any, field: any) {
    let validator: any = [];
    if (field.fcn === 'dateHeureSujet') validator = [DateValidator()];
    this.form.get(field.fcn).setValidators(validator);

    this.fillObj(field.fcn);
  }

  fillObj(fcn?: any) {
    if (fcn) {
      if (this.form.get(fcn).valid) {

        if(fcn==="fichiersCompresses" || fcn==="fichiersChiffres") {
          if(this.form.get(fcn).value===1)
          this.REMISE_DISPO_OBJ[fcn]=true
          else if(this.form.get(fcn).value===2)
          this.REMISE_DISPO_OBJ[fcn]=false
          else
          this.REMISE_DISPO_OBJ[fcn]="null"

        }

        this.REMISE_DISPO_OBJ[fcn] = this.form.get(fcn).value;
        this.REMISE_DISPO_EVENT.emit({
          isFormValid: this.is_form_valid(),
          DATA: this.REMISE_DISPO_OBJ,
        });
      } else this.REMISE_DISPO_EVENT.emit({ isFormValid: this.is_form_valid() });
    }

    else this.REMISE_DISPO_EVENT.emit({ isFormValid: this.is_form_valid() });
  }

  onFieldFocus(ev: any, id: number) {
    if (id === 4) this.fichierCompresseeSelected = true;
    if (id === 5) this.fichierChifreeSelected = true;
  }

 

  onFocus(event: any, fcn: any) {
    if (fcn === 'nbFSE') this.form.get(fcn).patchValue('');
  }

  onBlur(event: any, fcn: any) {
    if (fcn === 'nbFSE') {
      const validator = [Validators.pattern(/^\d+$/)];
      this.form.get(fcn).setValidators(validator);

      const text = event.target.value;
      const str = '00000';
      const output = [str.slice(0, str.length - text.length), text].join('');
      this.form.get(fcn).patchValue(output);
    }
  }

}

function customEmailValidator(): ValidatorFn {
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

export function DateValidator(format = "MM/dd/YYYY"): any {
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
