import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { BALData } from '@shared/models/BALData';
import { WhiteListHost } from '@shared/models/WhiteListHost';

@Component({
  selector: 'app-white-list-item',
  templateUrl: './white-list-item.component.html',
  styleUrls: ['./white-list-item.component.scss'],
})
export class WhiteListItemComponent implements OnInit, OnChanges {
  @Input()
  RowNumber: number;

  @Input()
  whiteListHost: WhiteListHost;

  @Input()
  highlighRowEnable;

  @Input()
  selectedHosts: string[] = [];

  @Output()
  selectedHostEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteHostEvent: EventEmitter<WhiteListHost> = new EventEmitter<WhiteListHost>();

  highlighBalClass: string = '';

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.highlighRowEnable === false) {
      this.highlighBalClass = '';
    }
  }

  selectRow(whiteListHost, event) {
    if (event.target.checked) {
      this.whiteListHost.isChecked = true;
      if (!this.selectedHosts.find((elt) => elt === whiteListHost)) {
        this.selectedHosts.push(whiteListHost);
      }
    } else {
      this.selectedHosts = this.selectedHosts.filter(
        (item) => item !== whiteListHost
      );
    }
    const isSelected = event.target.checked;

    this.selectedHostEvent.emit({
      selected: isSelected,
      selectedHosts: this.selectedHosts,
    });
  }

  deleteHost(whiteListHost) {
    this.highlighBalClass = 'highlight-table-row';
    this.deleteHostEvent.emit(whiteListHost);
  }
}
