import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { MyProfileComponent } from '@modules/manage/users/my-profile/my-profile.component';
import { PasswordPipePipe } from '@core/pipe/password-pipe.pipe';
import { EditProfileComponent } from '@modules/manage/users/edit-profile/edit-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [LoginComponent, MyProfileComponent, PasswordPipePipe,EditProfileComponent],
  exports: [EditProfileComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    NgSelectModule
  ],
})
export class AuthModule {}
