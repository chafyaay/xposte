import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-modifier-masse-bals',
  templateUrl: './modifier-masse-bals.component.html',
  styleUrls: ['./modifier-masse-bals.component.scss']
})
export class ModifierMasseBalsComponent implements OnInit {
  @ViewChild(NgSelectComponent,{static:false}) ngSelectComponent: NgSelectComponent;

  itemSelected=0;
  ngSelectOpened=false;
  LIST_OF_CRITERIA=[];
  constructor() { }

  ngOnInit() {
    this.LIST_OF_CRITERIA=[
      {id:1,label:'input1',disabled:false},
      {id:2,label:'input2',disabled:false},
      {id:3,label:'input3',disabled:false},
      {id:4,label:'input4',disabled:false},
    ]
  }

  SELECT_FIELD(event:any){
this.itemSelected=event.id;

  }
  INSERT_FIELD(){
    this.ngSelectComponent.handleClearClick();

  }

}