import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterBoxRoutingModule } from './letter-box-routing.module';
import { LetterBoxListComponent } from './letter-box-list/letter-box-list.component';
import { LetterBoxItemComponent } from './letter-box-item/letter-box-item.component';
import { LetterBoxComponent } from './letter-box.component';
import { SharedModule } from 'src/app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { FormCreateBalComponent } from './formCreateBal/formCreateBal.component';
import { NotificationComponent } from 'src/app/@shared/notification/notification.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateFormulaireComponent } from 'src/app/@shared/template-formulaire/template-formulaire.component';
import { HighlightSearchPipe } from 'src/app/@core/pipe/highlight-search.pipe';
import { DetamponnageComponent } from './detamponnage/detamponnage.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateBalComponent } from './update-bal/update-bal.component';

import { TemponnageComponent } from './temponnage/temponnage.component';
import { TamponnageNotificationComponent } from './tamponnage-notification/tamponnage-notification.component';
import { RemiseDispositionComponent } from './remise-disposition/remise-disposition.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModifierMasseBalsComponent } from '../modifier-masse-bals/modifier-masse-bals.component';
@NgModule({
  declarations: [
    LetterBoxListComponent,
    LetterBoxItemComponent,
    LetterBoxComponent,
    NotificationComponent,
    FormCreateBalComponent,
    TemplateFormulaireComponent,
    HighlightSearchPipe,
    DetamponnageComponent,
    TemponnageComponent,
    TamponnageNotificationComponent,
    UpdateBalComponent,
    RemiseDispositionComponent,
    ModifierMasseBalsComponent
  ],
  imports: [
    LetterBoxRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule,
    TranslateModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [RemiseDispositionComponent,ModifierMasseBalsComponent],
})
export class LetterBoxModule {}
