import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LetterBoxReplayComponent } from 'src/app/@modules/manage/letter-box-replay/letter-box-replay.component';

const routes: Routes = [{ path: '', component: LetterBoxReplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetterBoxReplayRoutingModule {}
