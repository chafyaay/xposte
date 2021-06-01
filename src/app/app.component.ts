import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { I18nService } from 'src/app/@i18n/i18n.service';
import { Logger } from 'src/app/@core';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private swUpdate: SwUpdate,
    private modalService: NgbModal,
    private i18nService: I18nService
  ) {
    this.i18nService.init('fr', ['en', 'en-US', 'fr']);
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
  }
}
