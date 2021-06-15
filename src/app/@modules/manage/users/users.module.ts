import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
