import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/@core';
import { SharedModule } from 'src/app/@shared';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { HelpComponent } from './pages/help/help.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { OverlayModule } from '@angular/cdk/overlay';
import { effects, reducers } from 'src/app/@store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReferenceDataResolverService } from 'src/app/@core/resolver/reference-data-resolver.service';
import { ManageResolverService } from 'src/app/@core/services/manageResolver.service';
import { HighlightSearchPipe } from 'src/app/@core/pipe/highlight-search.pipe';
import { WindowRefService } from 'src/app/@core/services/window.service';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];

export function apiUrl(windowRef: WindowRefService) {
  return (
    environment.api_url || windowRef.nativeWindow['__env']['backend'] + '/api'
  );
}

import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);


export const Providers = [
  { provide: 'api_url', useFactory: apiUrl, deps: [WindowRefService] },
   {provide: LOCALE_ID, useValue: "fr-FR" } 
];

@NgModule({
  declarations: [AppComponent, NotfoundpageComponent, HelpComponent],
  imports: [
    NgSelectModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    CoreModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    StoreModule.forRoot(reducers),
    // StoreDevtoolsModule.instrumentOnlyWithExtension(),
    // Initializing effects
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    OverlayModule,
  ],
  providers: [
    HighlightSearchPipe,
    ReferenceDataResolverService,
    ManageResolverService,
    WindowRefService,
    Providers,
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
