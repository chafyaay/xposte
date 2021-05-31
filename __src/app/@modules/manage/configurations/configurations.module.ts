import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import { DomaineComponent } from './domaine/domaine.component';
import { RolesComponent } from './roles/roles.component';
import { WhiteListComponent } from './white-list/white-list.component';
import { FrontalComponent } from './frontal/frontal.component';

@NgModule({
  declarations: [
    ConfigurationsComponent,
    DomaineComponent,
    RolesComponent,
    WhiteListComponent,
    FrontalComponent,
  ],
  imports: [CommonModule, ConfigurationsRoutingModule],
})
export class ConfigurationsModule {}
