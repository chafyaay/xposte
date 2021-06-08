import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '@angular/cdk/layout';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { TemplateModalComponent } from './template-modal/template-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { InfoBulleComponent } from './info-bulle/info-bulle.component';
import { TemplateFormulaireComponent } from './template-formulaire/template-formulaire.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    FilterComponent,
    HeaderComponent,
    FooterComponent,
    TemplateModalComponent,
    SpinnerComponent,
    PaginationComponent,
    DateTimePickerComponent,
    InfoBulleComponent,
    TemplateFormulaireComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LayoutModule,
    OverlayModule,
    RouterModule,
    NgSelectModule,
  ],
  exports: [
    FilterComponent,
    HeaderComponent,
    FooterComponent,
    TemplateModalComponent,
    SpinnerComponent,
    PaginationComponent,
    InfoBulleComponent,
    DateTimePickerComponent,
    TemplateFormulaireComponent,
    NotificationComponent,
  ],
  entryComponents: [],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
