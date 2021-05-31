import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-template-formulaire',
  templateUrl: './template-formulaire.component.html',
  styleUrls: ['./template-formulaire.component.scss'],
})
export class TemplateFormulaireComponent implements OnInit {
  @Input() titleFormulaire: string;

  @Input() isFormulaireopen = false;
  @Output()
  closeFormulaire: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  valideCreateBal: EventEmitter<boolean> = new EventEmitter<boolean>();
  spinner = false;

  constructor() {}

  ngOnInit() {}

  closeForm() {
    this.closeFormulaire.emit(false);
  }
  CreateBal() {
    this.valideCreateBal.emit(true);
  }
}
