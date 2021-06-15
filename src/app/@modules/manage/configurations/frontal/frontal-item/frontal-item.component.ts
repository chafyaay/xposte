import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Frontal } from '@shared/models/Frontal';
import { FrontalService } from '@core/services/frontal.service';
import { Store } from '@ngrx/store';
import { AppState, selectAccountState, selectFrontalState } from '@app/@store';
import { Observable } from 'rxjs';
import { InputFilterData } from '@shared/models/InputFilterData';

@Component({
  selector: 'app-frontal-item',
  templateUrl: './frontal-item.component.html',
  styleUrls: ['./frontal-item.component.scss'],
})
export class FrontalItemComponent implements OnInit {
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
  idFrontal: string;
  frontal: Frontal;
  isRoleAdmin = true;
  showDeleteIcon = true;
  showModalDelet = false;
  showNotifDelete = false;
  getState: Observable<any>;
  inputFilterData: InputFilterData = new InputFilterData();
  inputFilterDataNew: InputFilterData = new InputFilterData();

  constructor(
    private frontalService: FrontalService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAccountState);
  }

  ngOnInit() {
    this.frontal = this.inputFilterData.frontal.find(
      (id) => id === this.idFrontal
    );
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

  DeleteFrontalCoonfirm(identifiant: string) {
    this.resetNotificationDataAndClose();
    this.showModalDelet = true;
    this.idFrontal = identifiant;
    this.valideDelete(this.idFrontal);
  }

  closeModalConfirmation($event) {
    this.showModalDelet = false;
  }

  ReinitialiserFrontalStore() {
    this.store.select(selectFrontalState).subscribe((stat) => {
      this.inputFilterData.frontal = stat.frontal;
      this.inputFilterDataNew.frontal = [...this.inputFilterData.frontal]; // this is for clonning

      this.inputFilterDataNew.frontal.push({
        identifiant: '',
        nom: 'Tous',
      });
    });
  }

  testRoleUser(): void {
    this.getState.subscribe((state) => {
      if (state.roles.indexOf('SuperAdmin') !== -1) {
        this.isRoleAdmin = true;
      } else if (state.roles.indexOf('Admin') !== -1) {
        this.isRoleAdmin = false;
      } else {
        this.isRoleAdmin = false;
      }
    });
  }

  resetNotificationDataAndClose() {
    this.showNotifDelete = false;
  }

  valideDelete(rr) {
    this.showNotifDelete = true;
    this.showModalDelet = false;
  }

  DeleteFrontal(id) {
    console.log('frontal ' + this.idFrontal + 'is deleted');
    this.frontalService.deleteFrontal(this.idFrontal).subscribe(
      (frontal) => {
        console.log('frontal ' + this.idFrontal + 'is deleted');
      },
      (error) => console.log(error)
    );
    this.ReinitialiserFrontalStore();
    this.showNotifDelete = true;
  }

  goToUpdate() {
    this.frontalToUpdateEvent.emit(this.frontalData);
  }
}
