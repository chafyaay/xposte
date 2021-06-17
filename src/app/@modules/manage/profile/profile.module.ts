import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { LetterBoxRoutingModule } from '../letter-box/letter-box-routing.module';
import { UsersRoutingModule } from '../users/users-routing.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { CoreModule } from '@core';
import { PipeModule } from '@core/pipe/pipe.module';

@NgModule({
  declarations: [MyProfileComponent, EditProfileComponent],
  exports: [MyProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    PipeModule,
  ],
})
export class ProfileModule {}
