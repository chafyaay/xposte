import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BALData } from 'src/app/@shared/models/BALData';
import { element } from 'protractor';

@Component({
  selector: 'app-letter-box-item',
  templateUrl: './letter-box-item.component.html',
  styleUrls: ['./letter-box-item.component.scss'],
})
export class LetterBoxItemComponent implements OnInit, OnChanges {
  constructor() {}

  showSubRows: boolean = false;

  @Input()
  highlighRowEnable;

  @Input()
  Highlight;
  @Input()
  adresseHighlight;

  @Input()
  frontalRefs: any[];

  @Input()
  RowNumber: number;

  @Input()
  balData: BALData;

  @Input()
  selectedBAList: string[] = [];

  @Input()
  selectOneBAL;

  @Output()
  selectedBALEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateBALEvent: EventEmitter<any> = new EventEmitter<any>();

  highlighBalClass: string = '';

  ngOnInit() {}

  getFrontalById(idFrontral) {
    let frontal = this.frontalRefs.find((element) => element.id == idFrontral);
    return frontal && frontal.name;
  }

  ngOnChanges() {
    if (this.highlighRowEnable === false) {
      this.highlighBalClass = '';
    }
  }

  selectRow(addressBAL, event) {
    if (event.target.checked) {
      this.balData.isChecked = true;
      if (!this.selectedBAList.find((elt) => elt === addressBAL)) {
        this.selectedBAList.push(addressBAL);
      }
    } else {
      this.selectOneBAL = false;
      this.selectedBAList = this.selectedBAList.filter(
        (item) => item !== addressBAL
      );
    }
    const isSelected = event.target.checked;

    this.selectedBALEvent.emit({
      selected: isSelected,
      selectedBAL: this.selectedBAList,
    });
  }

  updateBal() {
    this.highlighBalClass = 'highlight-table-row';
    this.updateBALEvent.emit(this.balData);
  }
}
