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
import { DateValidator } from '@shared/add-field/add-field.component';

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

  periodeForm:FormGroup;
  public message_lus_fields:any[];
  message_subject_fields:any[];
  isFormvalid=false;

  constructor(public translate: TranslateService) {}

  ngOnInit() {

    const FIELD: SUBFIELDSI = this.translate.translations[
      this.translate.currentLang
    ].SUBFIELDS;
    this.message_lus_fields=[
      {
        id: 1,
        label: FIELD.EMMETTEUR,
        fcn: 'emetteur',
        disabled: false,
        type: 'email',
      },
      {
        id: 2,
        label: FIELD.DESITINATAIRE,
        fcn: 'destinataire',
        disabled: false,
        type: 'email',
      },
      {
        id: 3,
        label: FIELD.CONTENT_DESC,
        fcn: 'contentDescription',
        disabled: false,
        type: 'text',
      },
      {
        id: 4,
        label: FIELD.FICHIER_COMPRESSEE,
        fcn: 'fichiersCompresses',
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
        disabled: false,
        type: 'list',
        data: [
          { id: 0, label: FIELD.INDIFFERENT },
          { id: 1, label: FIELD.OUI },
          { id: 2, label: FIELD.NON },
        ],
      },
    ];
   
    this.message_subject_fields= [
      {
        id: 1,
        label: FIELD.TYPE,
        fcn: 'type',
        disabled: false,
        type: 'text',
      },
      {
        id: 2,
        label: FIELD.VERSION,
        fcn: 'version',
        disabled: false,
        type: 'text',
      },
      {
        id: 3,
        label: FIELD.CODE_EMETTEUR,
        fcn: 'codeEmetteur',
        disabled: false,
        type: 'text',
      },
      {
        id: 4,
        label: FIELD.CODE_COMPOSTAGE,
        fcn: 'codeCompostage',
        disabled: false,
        type: 'text',
      },
      {
        id: 5,
        label: FIELD.DATE_HEURE_SUJET,
        fcn: 'dateHeureSujet',
        disabled: false,
        type: 'date',
      },
      {
        id: 6,
        label: FIELD.NBFSE,
        fcn: 'nbFSE',
        disabled: false,
        type: 'text',
      },
      {
        id: 7,
        label: FIELD.SUJET_OUT_REPLY_INFO,
        fcn: 'sujetOuReplyInTo',
        disabled: false,
        type: 'text',
      },
    ];
    this.initPeriodForm();
  }


  initPeriodForm(){
    this.periodeForm=new FormGroup({
      'periode':new FormControl('',{validators:[Validators.required]}),
      'dateHeureDebut':new FormControl('',{validators:[Validators.required,DateValidator()]}),
      'dateHeureFin':new FormControl('',{validators:[Validators.required,DateValidator()]}),
    })
  }
  get form(){
    return this.periodeForm;
  }

  onPeriodeSelect(event:any) {
    let now = new Date();
    let n = now.getTime();
    let py = now.setFullYear(now.getFullYear() - 1);
    let dd = new Date(this.form.get('dateHeureDebut').value).getTime();
    let df = new Date(this.form.get('dateHeureFin').value).getTime();
    this.isFormvalid = dd < df && dd < n && df <= n && dd >= py && df > py;
  }
}



