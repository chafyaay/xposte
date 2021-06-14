import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
account_details:any=[
  {id:0,label:'Identification',value:'dpeterson'},
  {id:1,label:'Prénom',value:'Dale'},
  {id:2,label:'Nom',value:'peterson'},
  {id:3,label:'Téléphone',value:'06 09 3412 45'},
  {id:4,label:'Adresse mail',value:'amaibru@wo.edu'},
  {id:5,label:'Mot de passe',value:'XF123@@EEçà)'},
  {id:6,label:'Rôle',value:'Gestionnaire'},
  {id:7,label:'Frontaux',values:[
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
    '122.222.222.333',
  ]},
]
  constructor() { }

  ngOnInit() {
  }

}
