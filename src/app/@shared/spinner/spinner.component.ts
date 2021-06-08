import { ChangeDetectorRef, Component, OnInit, ViewRef } from '@angular/core';
import { SpinnerService } from '@core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  spinner = false;

  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.spinner = status === 'start';
      if (this.cdRef && !(this.cdRef as ViewRef).destroyed) {
        this.cdRef.detectChanges();
      }
    });
  }
}
