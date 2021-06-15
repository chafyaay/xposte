import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { MyProfileComponent } from '@modules/manage/users/my-profile/my-profile.component';
import { PasswordPipePipe } from '@core/pipe/password-pipe.pipe';

@NgModule({
  declarations: [LoginComponent, MyProfileComponent, PasswordPipePipe],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
  ],
})
export class AuthModule {}
