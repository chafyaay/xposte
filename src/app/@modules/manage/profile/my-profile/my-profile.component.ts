import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@core/services/profile.service';
import { ProfileI } from '@shared/models/profile';
import { timeStamp } from 'console';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  profileInfo: any[] = [];
  notifMessages: any;
  notificationStatus = false;
  openOfcanvas = false;
  showFronatals = false;
  notifMsg = [];
  profileInfoMap = [
    { id: 'identifiant' },
    { id: 'prenom' },
    { id: 'nom' },
    { id: 'telephone' },
    { id: 'adresseMail' },
    { id: 'password' },
    { id: 'role' },
    { id: 'listeFrontaux' },
  ];

  constructor(private profileservice: ProfileService) {}

  ngOnInit() {
    this.getProfileInfo();
  }
  items = [];
  id = 0;
  activeEdit = false;
  getProfileInfo() {
    this.profileservice.getProfileDetails().subscribe(
      (data) => {
        this.profileInfo = this.formatData(data);

        if (data) {
          this.activeEdit = true;
          this.openOfcanvas = false;
        }
      },
      (err) => err
    );
  }

  formatData(data) {
    let details = [];
    this.profileInfoMap.map((item) => {
      const key = Object.keys(data).find((key) => key === item.id);
      if (key) details.push({ label: item.id, value: data[item.id] });
      else if (item.id === 'telephone')
        details.push({ label: item.id, value: '06 22 55 33 88' });
      else if (item.id === 'password')
        details.push({ label: item.id, value: 'XCF1254&&^@@' });
    });
    return details;
  }

  openEditProfileOffcanvas() {
    this.openOfcanvas = true;
    this.notificationStatus = false;
  }
  closeNotification() {
    this.notificationStatus = false;
  }

  profileEventhandler($event) {
    this.notificationStatus = $event.isvalid;
    if (this.notificationStatus) {
      this.notifMsg = this.formatData($event);

      this.notifMsg = this.notifMsg.filter(
        (msg) =>
          msg.label !== 'isvalid' &&
          msg.label !== 'password' &&
          msg.label !== 'etat'
      );

      console.log(this.notifMsg);
    }
    this.openOfcanvas = false;
  }

  closeOffcanvas($event) {
    this.openOfcanvas = $event;
  }
}
