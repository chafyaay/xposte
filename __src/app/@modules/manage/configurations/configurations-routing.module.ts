import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from '__src/app/@modules/manage/manage.component';
import { RoleGuardService } from '__src/app/@core/guards/role-guard.service';
import { Role } from '__src/app/@shared';
import { FrontalComponent } from '__src/app/@modules/manage/configurations/frontal/frontal.component';
import { DomaineComponent } from '__src/app/@modules/manage/configurations/domaine/domaine.component';
import { WhiteListComponent } from '__src/app/@modules/manage/configurations/white-list/white-list.component';
import { RolesComponent } from '__src/app/@modules/manage/configurations/roles/roles.component';

const routes: Routes = [
  {
    path: 'config',
    component: ManageComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Role.SuperAdmin] },
    loadChildren: () =>
      import('__src/app/@modules/manage/configurations/configurations.module').then(
        (m) => m.ConfigurationsModule
      ),
  },
  {
    path: 'domaine',
    component: DomaineComponent,
  },
  {
    path: 'Frontal',
    component: FrontalComponent,
  },
  {
    path: 'WhiteList',
    component: WhiteListComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsRoutingModule {}
