import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LetterBoxComponent } from 'src/app/@modules/manage/letter-box/letter-box.component';

const routes: Routes = [{ path: 'main', component: LetterBoxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetterBoxRoutingModule {}
