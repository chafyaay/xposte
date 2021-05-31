import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-template-modal',
  templateUrl: './template-modal.component.html',
  styleUrls: ['./template-modal.component.scss'],
})
export class TemplateModalComponent implements OnInit {
  @Input() TitleModal: string;

  @Input() isModalOpen = false;
  @Input() isValid = false;

  @Output() validEventT: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() annule: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() valide: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}

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
