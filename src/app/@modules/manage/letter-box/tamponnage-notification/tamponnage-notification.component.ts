import { Component, Input, OnInit } from '@angular/core';
import { BalTampoCriteria } from 'src/app/@shared/models/BalTampoCriteria';

@Component({
  selector: 'app-tamponnage-notification',
  templateUrl: './tamponnage-notification.component.html',
  styleUrls: ['./tamponnage-notification.component.scss'],
})
export class TamponnageNotificationComponent implements OnInit {
  @Input()
  nbBalTamponner;
  @Input() BalTamponner: BalTampoCriteria = new BalTampoCriteria();

  constructor() {}

  ngOnInit() {}
}
