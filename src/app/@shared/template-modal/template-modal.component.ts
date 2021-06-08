import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToggleBodyScroll } from '@shared/utils';

@Component({
  selector: 'app-template-modal',
  templateUrl: './template-modal.component.html',
  styleUrls: ['./template-modal.component.scss'],
})
export class TemplateModalComponent implements OnInit, OnDestroy {
  @Input() TitleModal: string;

  @Input() isModalOpen = false;
  @Input() isValid = false;

  @Output() validEventT: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() annule: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() valide: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {
    ToggleBodyScroll.disableBodyScroll();
  }

  ngOnDestroy(): void {
    ToggleBodyScroll.enableBodyScroll();
  }

  closePopin() {
    this.isModalClose.emit(false);
  }
  annuler() {
    this.isModalClose.emit(false);
  }
  valider() {
    this.valide.emit(true);
  }
}
