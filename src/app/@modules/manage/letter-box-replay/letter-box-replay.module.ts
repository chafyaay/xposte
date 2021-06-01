import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterBoxReplayRoutingModule } from './letter-box-replay-routing.module';
import { LetterBoxReplayComponent } from './letter-box-replay.component';
import { LetterBoxReplayItemComponent } from './letter-box-replay-item/letter-box-replay-item.component';
import { LetterBoxReplayListComponent } from './letter-box-replay-list/letter-box-replay-list.component';
import { SharedModule } from 'src/app/@shared';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LetterBoxReplayComponent,
    LetterBoxReplayItemComponent,
    LetterBoxReplayListComponent,
  ],
  imports: [
    CommonModule,
    LetterBoxReplayRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class LetterBoxReplayModule {}
