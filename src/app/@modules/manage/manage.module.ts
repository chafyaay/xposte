import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { SharedModule } from 'src/app/@shared';
import { AddFieldComponent } from '../../@shared/add-field/add-field.component';

@NgModule({
  declarations: [ManageComponent],
  imports: [CommonModule, SharedModule, ManageRoutingModule],
})
export class ManageModule {}
