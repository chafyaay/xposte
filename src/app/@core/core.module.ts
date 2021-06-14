import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { AuthNotAuthorizedInterceptor } from './http/auth-not-auhtorized.interceptor';
import { AutofocusDirective } from 'src/app/@core/directive/autofocus.directive';
import { PasswordFormatterPipe } from './pipe/password-formatter.pipe';
import { ReplacePipe } from './pipe/replace.pipe';

@NgModule({
  declarations: [AutofocusDirective, PasswordFormatterPipe],
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthNotAuthorizedInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
