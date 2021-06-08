import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Frontal } from '@shared/models/Frontal';

@Component({
  selector: 'app-frontal-item',
  templateUrl: './frontal-item.component.html',
  styleUrls: ['./frontal-item.component.scss'],
})
export class FrontalItemComponent implements OnInit {
  constructor() {}

  @Input()
  RowNumber: number;

  @Input()
  frontalData: Frontal;

  @Input()
  selectedFrontalist: string[] = [];

  @Input()
  selectOneFrontal;

  @Output()
  selectedFrontalEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  frontalToUpdateEvent: EventEmitter<Frontal> = new EventEmitter<Frontal>();

  usersToShow: string;

  ngOnInit() {
    if (
      this.frontalData.listeIdentifiantsUtilisateurs &&
      this.frontalData.listeIdentifiantsUtilisateurs.length > 0
    ) {
      this.usersToShow = this.frontalData.listeIdentifiantsUtilisateurs
        .slice(0, 3)
        .join(', ');
    }
  }

  selectRow(identifiant, event) {
    if (event.target.checked) {
      this.frontalData.isChecked = true;
      if (!this.selectedFrontalist.find((elt) => elt === identifiant)) {
        this.selectedFrontalist.push(identifiant);
      }
    } else {
      this.selectOneFrontal = false;
      this.selectedFrontalist = this.selectedFrontalist.filter(
        (item) => item !== identifiant
      );
    }
    const isSelected = event.target.checked;

    this.selectedFrontalEvent.emit({
      selected: isSelected,
      selectedFrontal: this.selectedFrontalist,
    });
  }

  goToUpdate() {
    this.frontalToUpdateEvent.emit(this.frontalData);
  }
}
