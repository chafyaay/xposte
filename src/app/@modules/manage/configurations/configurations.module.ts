import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import { DomaineComponent } from './domaine/domaine.component';
import { RolesComponent } from './roles/roles.component';
import { WhiteListComponent } from './white-list/white-list.component';
import { WhiteListTableComponent } from './white-list/white-list-table/white-list-table.component';
import { WhiteListItemComponent } from './white-list/white-list-item/white-list-item.component';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { LetterBoxModule } from '@modules/manage/letter-box/letter-box.module';
import { WhitelistSuppresionComponent } from '@modules/manage/configurations/white-list/whitelist-suppresion/whitelist-suppresion.component';
import { WhitelistHostFormComponent } from '@modules/manage/configurations/white-list/whitelist-host-form/whitelist-host-form.component';

@NgModule({
  declarations: [
    ConfigurationsComponent,
    DomaineComponent,
    RolesComponent,
    WhiteListComponent,
    WhiteListTableComponent,
    WhiteListItemComponent,
    WhitelistSuppresionComponent,
    WhitelistHostFormComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    LetterBoxModule,
    ReactiveFormsModule,
  ],
})
export class ConfigurationsModule {}
