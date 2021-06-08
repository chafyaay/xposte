import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontalComponent } from '@modules/manage/configurations/frontal/frontal.component';

const routes: Routes = [
  {
    path: '',
    component: FrontalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontalRoutingModule {}
