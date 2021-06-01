import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './pages/help/help.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { AuthGuard } from 'src/app/@core';
import { ManageResolverService } from 'src/app/@core/services/manageResolver.service';
import { ReferenceDataResolverService } from 'src/app/@core/resolver/reference-data-resolver.service';

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
      import('src/app/@modules/manage/manage.module').then((m) => m.ManageModule),
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
