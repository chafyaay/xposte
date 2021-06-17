import { Component, Input, OnInit } from '@angular/core';
import { Frontal } from '@shared/models/Frontal';

@Component({
  selector: 'app-frontal-delete',
  templateUrl: './frontal-delete.component.html',
  styleUrls: ['./frontal-delete.component.scss'],
})
export class FrontalDeleteComponent implements OnInit {
  @Input()
  fontalData: Frontal = new Frontal();
  constructor() {}

  ngOnInit() {}
}
