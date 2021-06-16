import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { SharedModule } from '@shared';
import { TranslateModule } from '@ngx-translate/core';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [ManageComponent],
  imports: [CommonModule, SharedModule, ManageRoutingModule, TranslateModule],
})
export class ManageModule {}
