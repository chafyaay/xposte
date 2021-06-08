import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from 'src/app/@core/guards/role-guard.service';
import { Role } from 'src/app/@shared';
import { LetterBoxComponent } from 'src/app/@modules/manage/letter-box/letter-box.component';
import { ManageComponent } from 'src/app/@modules/manage/manage.component';
import { UsersComponent } from 'src/app/@modules/manage/users/users.component';
import { ConfigurationsComponent } from 'src/app/@modules/manage/configurations/configurations.component';
const routes: Routes = [
  { path: '', redirectTo: 'mailBox' },
  {
    path: 'mailBox',
    component: ManageComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Role.SuperAdmin] },
    loadChildren: () =>
      import('src/app/@modules/manage/letter-box/letter-box.module').then(
        (m) => m.LetterBoxModule
      ),
  },
  {
    path: 'mailBox-reply',
    component: ManageComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Role.SuperAdmin] },
    loadChildren: () =>
      import(
        'src/app/@modules/manage/letter-box-replay/letter-box-replay.module'
      ).then((m) => m.LetterBoxReplayModule),
  },
  {
    path: 'config',
    component: ManageComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Role.SuperAdmin] },
    loadChildren: () =>
      import(
        'src/app/@modules/manage/configurations/configurations.module'
      ).then((m) => m.ConfigurationsModule),
  },
  {
    path: 'users',
    component: ManageComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Role.SuperAdmin] },
    loadChildren: () =>
      import('src/app/@modules/manage/users/users.module').then(
        (m) => m.UsersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
