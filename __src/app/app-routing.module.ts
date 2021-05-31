import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './pages/help/help.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { AuthGuard } from '__src/app/@core';
import { ManageResolverService } from '__src/app/@core/services/manageResolver.service';
import { ReferenceDataResolverService } from '__src/app/@core/resolver/reference-data-resolver.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('__src/app/@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    resolve: {
      reference: ReferenceDataResolverService,
      manage: ManageResolverService,
    },
    loadChildren: () =>
      import('__src/app/@modules/manage/manage.module').then((m) => m.ManageModule),
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
