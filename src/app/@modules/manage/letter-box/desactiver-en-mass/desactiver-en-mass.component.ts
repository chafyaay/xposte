import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-desactiver-en-mass',
  templateUrl: './desactiver-en-mass.component.html',
  styleUrls: ['./desactiver-en-mass.component.scss'],
})
export class DesactiverEnMassComponent implements OnInit {
  @Input()
  selectedBal: any[];
  @Input()
  balNumber: number;
  @Input()
  balFilter: any;

  @Output()
  DESACTIVER_EN_MASS_EVENT: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.clear();
    console.clear();
  }
}
