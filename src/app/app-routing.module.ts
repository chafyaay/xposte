import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './pages/help/help.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { AuthGuard } from '@core';
import { ManageResolverService } from '@core/services/manageResolver.service';
import { ReferenceDataResolverService } from '@core/resolver/reference-data-resolver.service';
import { RoleGuardService } from '@core/guards/role-guard.service';
import { Role } from '@shared';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    resolve: {
      reference: ReferenceDataResolverService,
      manage: ManageResolverService,
    },
    loadChildren: () =>
      import('src/app/@modules/manage/manage.module').then(
        (m) => m.ManageModule
      ),
  },
  {
    path: 'config',
    canActivate: [RoleGuardService],
    data: { roles: [Role.SuperAdmin] },
    loadChildren: () =>
      import('@modules/manage/configurations/configurations.module').then(
        (m) => m.ConfigurationsModule
      ),
  },
  { path: 'help', component: HelpComponent },
  { path: 'notroute', component: NotfoundpageComponent },
  { path: '**', redirectTo: 'notroute' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
