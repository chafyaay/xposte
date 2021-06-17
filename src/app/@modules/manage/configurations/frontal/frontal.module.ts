import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FrontalRoutingModule } from './frontal-routing.module';
import { FrontalComponent } from './frontal.component';
import { FrontalListComponent } from './frontal-list/frontal-list.component';
import { FrontalItemComponent } from './frontal-item/frontal-item.component';
import { FormCreateFrontalComponent } from './formCreateFrontal/formCreateFrontal.component';
import { CommonModule } from '@angular/common';
import { FilterFrontalComponent } from './filter-frontal/filter-frontal.component';
import { FrontalDeleteComponent } from './frontal-delete/frontal-delete.component';

@NgModule({
  declarations: [
    FrontalComponent,
    FrontalListComponent,
    FrontalItemComponent,
    FormCreateFrontalComponent,
    FilterFrontalComponent,
    FrontalDeleteComponent,
  ],
  imports: [
    CommonModule,
    FrontalRoutingModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
})
export class FrontalModule {}
