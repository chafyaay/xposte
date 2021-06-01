//https://medium.com/@beeman/tutorial-enable-hmr-in-angular-cli-apps-1b0d13b80130

import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export function hmrBootstrap(
  module: any,
  bootstrap: () => Promise<NgModuleRef<any>>
) {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();

  bootstrap()
    .then((mod) => (ngModule = mod))
    .catch((err) => console.error(err));

  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map((c) => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
}
