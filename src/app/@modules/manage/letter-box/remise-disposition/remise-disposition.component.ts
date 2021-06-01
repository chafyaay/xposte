import {
  Component,
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
import { remiseDispoI, SUBFIELDSI } from 'src/app/@shared/models/remise-dispo';

@Component({
  selector: 'app-remise-disposition',
  templateUrl: './remise-disposition.component.html',
  styleUrls: ['./remise-disposition.component.scss'],
})
export class RemiseDispositionComponent implements OnInit {
  @ViewChild(NgSelectComponent,{static:false}) ngSelectComponent: NgSelectComponent;

  @Input()
  balNumber :number;
  @Input()
  selectedBal :any[]=[];

  @Input()
  balSelected :number;

  @Output() rmiseDispoValidFormEvent:EventEmitter<any>=new EventEmitter();
  @Output() rmiseDispoDataEvent:EventEmitter<any>=new EventEmitter();

  miseDispoForm: FormGroup;
  remiseDispoObj: remiseDispoI = {};
  isFieldList1Selected = false;
  isFieldList2Selected = false;
  fieldList1: any;
  dateHeureSujet: Date = new Date();
  selectedFieldId: any;
  fichierCompresseeSelected = false;
  fichierChifreeSelected = false;
  isformValid = false;
  errMsg = '';
  isPeriodValid = false;
  list1Empty = true;
  list2Empty = true;
  REMISE_DISPO_OBJ:remiseDispoI={};
  @Output() REMISE_DISPO_EVENT:EventEmitter<any>=new EventEmitter();
  LIST_A=[];
  LIST_B=[];

  public  FIELD_LISTS= {list1:[],list2:[] }

  constructor(private formBuilder: FormBuilder,public translate: TranslateService) {
   // const currentlang=this.translate.currentLang;
   // this.FIELDS=this.translate.translations[currentlang];
   }

  ngOnInit() {
    this.createRemiseDispoForm();
    console.log(this.f.get('dateHeureDebut').value)

    const FIELD:SUBFIELDSI=this.translate.translations[this.translate.currentLang].criters
    this.FIELD_LISTS={
      list1: [
        { id: 1, label: FIELD.EMMETTEUR, fcn: 'emetteur', visible: false,disabled:false, type: 'text' },
        { id: 2, label: FIELD.DESITINATAIRE, fcn: 'destinataire', visible: false,disabled:false, type: 'text' },
        { id: 3, label: FIELD.CONTENT_DESC, fcn: 'contentDescription', visible: false,disabled:false, type: 'text' },
        { id: 4, label: FIELD.FICHIER_COMPRESSEE, fcn: 'fichiersCompresses', visible: false,disabled:false, type: 'list', data: 
        [
          {id:0,label:FIELD.INDIFFERENT},
          {id:1,label:FIELD.OUI},
          {id:2,label:FIELD.NON}
          ] 
      },
        { id: 5, label: FIELD.FICHIER_COMPRESSEE,fcn: 'fichiersChiffres', visible: false,disabled:false, type: 'list', data: [
          {id:0,label:FIELD.INDIFFERENT},
          {id:1,label:FIELD.OUI},
          {id:2,label:FIELD.NON}
        ] },
      ],
      list2:   [
        { id: 1, label: FIELD.TYPE, fcn: 'type', visible: false,disabled:false, type: 'text' },
        { id: 2, label: FIELD.VERSION,fcn: 'version', visible: false,disabled:false, type: 'text' },
        { id: 3, label: FIELD.CODE_EMETTEUR, fcn: 'codeEmetteur', visible: false,disabled:false, type: 'text' },
        { id: 4, label: FIELD.CODE_COMPOSTAGE,fcn: 'codeCompostage', visible: false,disabled:false, type: 'text' },
        { id: 5, label: FIELD.DATE_HEURE_SUJET, fcn: 'dateHeureSujet', visible: false,disabled:false, type: 'date' },
        { id: 6, label: FIELD.NBFSE, fcn: 'nbFSE', visible: false,disabled:false, type: 'text' },
        { id: 7, label: FIELD.SUJET_OUT_REPLY_INFO, fcn: 'sujetOuReplyInTo', visible: false,disabled:false, type: 'text' },
      ]
    }
   
   this.LIST_A=[...this.FIELD_LISTS.list1];
   this.LIST_B=[...this.FIELD_LISTS.list2];

    //this.FIELD_LISTS.list1.map(item=>item.label=this.FIELDS.REMETTRE_DISPO_EMMETTEUR)
    

  }

  createRemiseDispoForm() {
    this.miseDispoForm = new FormGroup({
      periode:new FormControl('',{validators:[PeriodValidator]}),
      dateHeureDebut: new FormControl(null, { validators: [Validators.required, DateTimeValidator] }),
      dateHeureFin: new FormControl(null, { validators: [Validators.required, DateTimeValidator] }),
      emetteur: new FormControl(null),
      destinataire: new FormControl(null),
      contentDescription: new FormControl(null),
      fichiersCompresses: new FormControl(''),
      fichiersChiffres: new FormControl(''),
      type: new FormControl(null),
      version: new FormControl(null),
      codeEmetteur: new FormControl(null),
      codeCompostage: new FormControl(null),
      dateHeureSujet: new FormControl(new Date()),
      nbFSE: new FormControl(''),
      sujetOuReplyInTo: new FormControl(null),
    }, { updateOn: 'change' });
  }

  get f() {
    return this.miseDispoForm;
  }

  /* periode date time picker  */
  onPeriodeSelect(ev?:any,datetype?:any){
    let now = new Date();
    let n = now.getTime();
    let py = now.setFullYear(now.getFullYear() - 1);
    let dd = new Date(this.f.get('dateHeureDebut').value).getTime();
    let df = new Date(this.f.get('dateHeureFin').value).getTime();
     this.isPeriodValid= (dd < df && dd < n && df <= n && dd >= py && df > py);   
  
     console.log(this.f.get('dateHeureDebut').value,'-- DF: ',df, "dif=", dd-df)
   
   this.f.get('periode').patchValue(this.isPeriodValid);
   if(this.isPeriodValid)
   {
     this.fillObj('dateHeureDebut');
     this.fillObj('dateHeureFin');
    }
  }

  /* ng select change */
  onSelectChange(event: any, field: any) {
    let value:any;
    if(event.id===1) value=true;
    else if(event.id===2) value=false;
    else value=null;

    this.f.get(field.fcn).patchValue(value);
    this.fillObj(field.fcn);
  }

  /* input change */
  onKeyUp($event: any, field: any) {
    //set validators
    let validator: any[];
    if (field.fcn === 'emetteur' || field.fcn === 'destinataire') validator = [customEmailValidator()]
    else if (field.fcn === 'contentDescription' || field.fcn === 'type' || field.fcn === 'codeEmetteur') validator = [Validators.maxLength(50)]
    else if (field.fcn === 'version') validator = [Validators.maxLength(6)]
    else if (field.fcn === 'codeCompostage') validator = [Validators.maxLength(5)];
    this.f.get(field.fcn).setValidators(validator);

// set value
    this.f.get(field.fcn).patchValue($event.target.value);
    this.fillObj(field.fcn);

  }

/* input change */
  onDateTimeChange($event: any, field: any){
    let validator:any=[];
    if (field.fcn === 'dateHeureSujet') validator = [DateTimeValidator];
    this.f.get(field.fcn).setValidators(validator);
    
    this.fillObj(field.fcn);
  }

  fillObj(fcn:any){
    if(this.f.get(fcn).valid) this.REMISE_DISPO_OBJ[fcn]=this.f.get(fcn).value;
    console.log(this.REMISE_DISPO_OBJ)

    if(this.f.get(fcn).valid)
    this.REMISE_DISPO_EVENT.emit({isFormValid:this.f.valid,DATA:this.REMISE_DISPO_OBJ})
    else 
    this.REMISE_DISPO_EVENT.emit({isFormValid:this.f.valid})
  }

  onFieldFocus(ev: any, id: number) {
    console.log(ev)
    if (id === 4)
      this.fichierCompresseeSelected = true;
    if (id === 5)
      this.fichierChifreeSelected = true;
  }

  onFocus(event: any, fcn: any) {
    if (fcn === 'nbFSE')
      this.f.get(fcn).patchValue('');
  }

  onBlur(event: any, fcn: any) {
    if (fcn === 'nbFSE') {
      const validator = [Validators.pattern(/^\d+$/)];
      this.f.get(fcn).setValidators(validator);

      const text = event.target.value;
      const str = '000000000';
      const output = [str.slice(0, str.length - text.length), text].join('');
      this.f.get(fcn).patchValue(output);
     
    }
  }

 // select filter field 
  selectFieldHandler(event: any, listType: string) {
    try {
      this.selectedFieldId = event.id;
      if (listType === 'list1' && event.id)
        {
          this.list1Empty = false;
          
        }
      if (listType === 'list2' && event.id)
        {
          this.list2Empty = false;
        }
    } catch (error) {
      
    }
    
  }
  
 // insert filter field 

  insertField(listType: string) {
    if(this.selectedFieldId==='emetteur'){
      this.miseDispoForm.get('emetteur').setValidators([customEmailValidator()])
    }else {
      this.miseDispoForm.get('destinataire').setValidators([Validators.required, DateTimeValidator])
    }
    this.FIELD_LISTS[listType].map((item: any) => {
      if (item.id === this.selectedFieldId) {
        item.visible = true;
      }
    });
  
    
    
    setTimeout(()=>{
      if(listType==='list1')
      {
        this.LIST_A=[]
        this.LIST_A=[...this.FIELD_LISTS.list1];
        this.LIST_A[this.selectedFieldId-1].disabled=true;
      }
      else 
      {
    this.LIST_B=[]

        this.LIST_B=[...this.FIELD_LISTS.list2];
        this.LIST_B[this.selectedFieldId-1].disabled=true;
      }
      
       this.ngSelectComponent.handleClearClick();
     },100)
  }
 // remove filter field 
  removeField(field:any,listType:string) { 
    this.FIELD_LISTS[listType].map((item: any) => {
      if (item.fcn === field.fcn) item.visible = false;
    });

  const noItem=this.FIELD_LISTS[listType].every((item:any)=>item.visible==false);

    if(noItem){
      if (listType === 'list1')
      {
        this.list1Empty = true;
        setTimeout(() => {
          this.LIST_A=[]
          this.LIST_A=[...this.FIELD_LISTS.list1];
          this.LIST_A[field.id-1].disabled=false;
  
          
        }, 200);
      }
    if (listType === 'list2')
      {
        setTimeout(() => {
        this.list2Empty = true;        
        this.LIST_B=[]
        this.LIST_B=[...this.FIELD_LISTS.list2];
        this.LIST_B[field.id-1].disabled=false;
      }, 200);

      }
    }

    this.resetField(field.fcn);

  }
  resetField(fcn:any){
    this.f.get(fcn).patchValue('');
    this.f.get(fcn).clearValidators();
    this.f.get(fcn).reset();
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

export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid ? null : {
    isValid: {
      valid: false
    }
  };
};

export const PeriodValidator = (fc: FormControl) => {
  const isValid = fc.value;
  return isValid ? null : {
    isValid: {
      valid: false
    }
  };
};