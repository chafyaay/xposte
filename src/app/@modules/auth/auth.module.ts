import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [LoginComponent],
  exports: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    NgSelectModule,
  ],
})
export class AuthModule {}
