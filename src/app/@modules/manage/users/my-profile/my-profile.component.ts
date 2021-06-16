import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@core/services/profile.service';
import { ProfileI } from '@shared/models/profile';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  profileInfo: any[] = []
  notifMessages: any;
  notificationStatus = false;
  openOfcanvas = false;
  showFronatals = false;
  notifMsg = [];

  constructor(
    private profileservice: ProfileService
  ) { }

  ngOnInit() {
    this.getProfileInfo();
  }
  items = []
  id = 0;
  activeEdit = false;
  getProfileInfo() {
    this.profileservice.getProfileDetails().subscribe(
      data => {
        for (let key in data) {
          this.id++;
          this.profileInfo.push(
            {
              id: this.id,
              'label': key,
              value: data[key],
            })
        }
        if (data) {
          this.activeEdit = true;
          this.openOfcanvas = false;
        }

      },
      err => err
    )
  }
  openEditProfileOffcanvas() {
    this.openOfcanvas = true;
  }
  closeNotification() {
    this.notificationStatus = false;
  }

  profileEventhandler($event) {

    this.notificationStatus = $event.isvalid;
    if (this.notificationStatus) {
      for (let key in $event) {
        this.notifMsg.push({ label: key, value: $event[key] })
      }
    }
    this.openOfcanvas = false;
  }


}
