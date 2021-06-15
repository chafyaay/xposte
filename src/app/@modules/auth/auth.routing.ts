import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from '@modules/manage/users/my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'profile', component: MyProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
