import { Component, Input, OnInit } from '@angular/core';
import { BALFilter } from '__src/app/@shared/models/BALFilter';
import { BalTampoCriteria } from '../../../../@shared/models/BalTampoCriteria';

@Component({
  selector: 'app-temponnage',
  templateUrl: './temponnage.component.html',
  styleUrls: ['./temponnage.component.scss'],
})
export class TemponnageComponent implements OnInit {
  @Input() balFilter: BALFilter = new BALFilter();
  @Input() temponnageSelecte;
  @Input()
  balTemponne: string[] = [];
  @Input() BalTamponner: BalTampoCriteria = new BalTampoCriteria();
  constructor() {}

  ngOnInit() {}
}
