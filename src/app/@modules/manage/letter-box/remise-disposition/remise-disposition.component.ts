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
import * as moment from 'moment';
import { keyframes } from '@angular/animations';
import { DateValidator } from '@shared/add-field/add-field.component';

interface SUB_FIELDSI_FORM {
  messageLus?: MessageLusI;
  sujet?: SujetI;
  isValid?: boolean;
  dateHeureDebut: any;
  dateHeureFin: any;
}
interface MessageLusI {
  contentDescription?: any;
  destinataire?: any;
  emetteur?: any;
  fichiersChiffres?: any[];
  fichiersCompresses?: any[];
  isEmpty?: boolean;
  isValid?: boolean;
}
interface SujetI {
  codeCompostage?: any;
  codeEmetteur?: any;
  dateHeureSujet?: any;
  nbFSE?: any;
  sujetOuReplyInTo?: any;
  type?: any;
  version?: any;
  isEmpty?: boolean;
  isValid?: boolean;
}
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

  @Output() remiseDispoEvent: EventEmitter<any> = new EventEmitter();

  periodeForm: FormGroup;
  public message_lus_fields: any[];
  message_subject_fields: any[];
  messageLusForm:any={};
  sujetForm:any={};
  dateHeureForm={};
  remiseDispoForm={};
  isMessageLusFormValid=false;
  isSujetFormValid=false;
  
  isMessageLusFormEmpty=true;
  isSujetFormEmpty=true;
  
  isDateHeureFormValid=false;
  isRemiseDispoFormValid=false


  constructor(public translate: TranslateService) { }

  ngOnInit() {

    const FIELD: SUBFIELDSI = this.translate.translations[this.translate.currentLang];
  
    this.message_lus_fields = [
      {
        id: 1,
        fcn: FIELD.emetteur,
        disabled: false,
        type: 'email',
      },
      {
        id: 2,
        fcn: FIELD.destinataire,
        disabled: false,
        type: 'email',
      },
      {
        id: 3,
        fcn: FIELD.contentDescription,
        disabled: false,
        type: 'text',
      },
      {
        id: 4,
        fcn: FIELD.fichiersCompresses,
        disabled: false,
        type: 'list',
        data: [
          { id: 0,
            fcn: FIELD.INDIFFERENT,
             value: 'NULL' },
          { id: 1,
            fcn: FIELD.OUI,
             value: true },
          { id: 2,
            fcn: FIELD.NON,
             value: false },
        ],
      },
      {
        id: 5,
        fcn: FIELD.fichiersChiffres,
        disabled: false,
        type: 'list',
        data: [
          { id: 0, 
            fcn: FIELD.INDIFFERENT,
             value: 'NULL' },
          { id: 1, 
            fcn: FIELD.OUI,
             value: true },
          { id: 2, 
            fcn: FIELD.NON,
             value: false },
        ],
      },
    ];

    this.message_subject_fields = [
      {
        id: 1,
        fcn: FIELD.type,
        disabled: false,
        type: 'text',
      },
      {
        id: 2,
        fcn: FIELD.version,
        disabled: false,
        type: 'text',
      },
      {
        id: 3,
        fcn: FIELD.codeEmetteur,
        disabled: false,
        type: 'text',
      },
      {
        id: 4,
        fcn: FIELD.codeCompostage,
        disabled: false,
        type: 'text',
      },
      {
        id: 5,
        fcn: FIELD.dateHeureSujet,
        disabled: false,
        type: 'date',
      },
      {
        id: 6,
        fcn: FIELD.nbFSE,
        disabled: false,
        type: 'text',
      },
      {
        id: 7,
        fcn: FIELD.sujetOuReplyInTo,
        disabled: false,
        type: 'text',
      },
    ];
    this.initPeriodForm();
  }


  initPeriodForm() {
    this.periodeForm = new FormGroup({
      'periode': new FormControl('', { validators: [Validators.required, PeriodValidator] }),
      'dateHeureDebut': new FormControl('', { validators: [Validators.required, DateValidator()] }),
      'dateHeureFin': new FormControl('', { validators: [Validators.required, DateValidator()] }),
    })
  }

  get form() {
    return this.periodeForm;
  }

  onDateTimeChange(event: any, fcn?: any) {   
    this.validateForm(this.form.value);
  }

  formValidHandler(form:any){
    this.validateForm(form);
  }

  validateForm(form?: any) {
    const keys = Object.keys(form);

    if (keys.includes('emetteur')) {
      console.log('form 1')
      this.messageLusForm = form;
      this.isMessageLusFormValid = form.isValid;
      this.isMessageLusFormEmpty = form.isEmpty;   
    }
    else if (keys.includes('type')) {

      this.sujetForm = form;
      this.isSujetFormValid = form.isValid;
      this.isSujetFormEmpty = form.isEmpty;
    }
    else if (keys.includes('dateHeureDebut')) {
      this.periodeValidator();
      this.dateHeureForm = form;
      this.isDateHeureFormValid=this.form.valid;
    }

    if((!this.isMessageLusFormEmpty && !this.isSujetFormEmpty)){
      this.isRemiseDispoFormValid=this.isDateHeureFormValid && this.messageLusForm.isValid && this.sujetForm.isValid;
    }else if(this.isMessageLusFormEmpty && this.isSujetFormEmpty){
      this.isRemiseDispoFormValid=this.form.valid ;
    }else if(this.isMessageLusFormEmpty && !this.isSujetFormEmpty){
      this.isRemiseDispoFormValid=this.isDateHeureFormValid && this.sujetForm.isValid;
    }else if(!this.isMessageLusFormEmpty && this.isSujetFormEmpty){
      console.log(4)
      console.log(this.messageLusForm)
      this.isRemiseDispoFormValid=this.isDateHeureFormValid && this.messageLusForm.isValid;
    }
    
    this.remiseDispoForm={
      ...this.messageLusForm,
      ...this.sujetForm,
      ...this.dateHeureForm,
      isValid:this.isRemiseDispoFormValid
    }

    this.remiseDispoEvent.emit(this.remiseDispoForm)

  }

  periodeValidator() {
    let now = new Date();
    let n = now.getTime();
    let py = now.setFullYear(now.getFullYear() - 1);
    let dd = new Date(this.form.get('dateHeureDebut').value).getTime();
    let df = new Date(this.form.get('dateHeureFin').value).getTime();
    const isPeriodeValid = dd < df && dd < n && df <= n && dd >= py && df > py;
    this.form.get('periode').patchValue(isPeriodeValid);
  }


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
