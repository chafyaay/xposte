import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterBoxRoutingModule } from './letter-box-routing.module';
import { LetterBoxListComponent } from './letter-box-list/letter-box-list.component';
import { LetterBoxItemComponent } from './letter-box-item/letter-box-item.component';
import { LetterBoxComponent } from './letter-box.component';
import { SharedModule } from 'src/app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { FormCreateBalComponent } from './formCreateBal/formCreateBal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightSearchPipe } from 'src/app/@core/pipe/highlight-search.pipe';
import { DetamponnageComponent } from './detamponnage/detamponnage.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateBalComponent } from './update-bal/update-bal.component';

import { TemponnageComponent } from './temponnage/temponnage.component';
import { TamponnageNotificationComponent } from './tamponnage-notification/tamponnage-notification.component';
import { ModifierMasseBalsComponent } from './modifier-masse-bals/modifier-masse-bals.component';
import { RemiseDispositionComponent } from './remise-disposition/remise-disposition.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplateFormulaireComponent } from '@shared/template-formulaire/template-formulaire.component';
import { DesactiverEnMassComponent } from './desactiver-en-mass/desactiver-en-mass.component';
@NgModule({
  declarations: [
    LetterBoxListComponent,
    LetterBoxItemComponent,
    LetterBoxComponent,
    FormCreateBalComponent,
    HighlightSearchPipe,
    DetamponnageComponent,
    TemponnageComponent,
    TamponnageNotificationComponent,
    UpdateBalComponent,
    ModifierMasseBalsComponent,
    RemiseDispositionComponent,
    DesactiverEnMassComponent,
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
  exports: [
    ModifierMasseBalsComponent,
    RemiseDispositionComponent,
    TemplateFormulaireComponent,
    LetterBoxListComponent,
    DesactiverEnMassComponent,
  ],
})
export class LetterBoxModule {}
