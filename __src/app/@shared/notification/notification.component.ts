import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  openNotification = false;
  @Input() notificationColor;
  @Output()
  closeNotfification: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}
  closeNotfi() {
    this.closeNotfification.emit(this.openNotification);
  }
}
