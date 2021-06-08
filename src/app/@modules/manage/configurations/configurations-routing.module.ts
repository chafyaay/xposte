import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontalComponent } from '@modules/manage/configurations/frontal/frontal.component';
import { DomaineComponent } from '@modules/manage/configurations/domaine/domaine.component';
import { WhiteListComponent } from '@modules/manage/configurations/white-list/white-list.component';
import { RolesComponent } from '@modules/manage/configurations/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'frontal',
      },
      {
        path: 'domaine',
        component: DomaineComponent,
      },
      {
        path: 'frontal',
        loadChildren: () =>
          import('@modules/manage/configurations/frontal/frontal.module').then(
            (m) => m.FrontalModule
          ),
      },
      {
        path: 'WhiteList',
        component: WhiteListComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsRoutingModule {}
