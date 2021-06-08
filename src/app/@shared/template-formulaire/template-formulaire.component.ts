import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToggleBodyScroll } from '@shared/utils';

@Component({
  selector: 'app-template-formulaire',
  templateUrl: './template-formulaire.component.html',
  styleUrls: ['./template-formulaire.component.scss'],
})
export class TemplateFormulaireComponent implements OnInit, OnDestroy {
  @Input() titleFormulaire: string;

  @Input() isFormulaireopen = false;
  @Output()
  closeFormulaire: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  valideCreateBal: EventEmitter<boolean> = new EventEmitter<boolean>();
  spinner = false;

  constructor() {}

  ngOnInit() {
    ToggleBodyScroll.disableBodyScroll();
  }

  ngOnDestroy(): void {
    ToggleBodyScroll.enableBodyScroll();
  }

  closeForm() {
    this.closeFormulaire.emit(false);
  }
  CreateBal() {
    this.valideCreateBal.emit(true);
  }
}
