import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { MicroFrontendMetadata } from './micro-frontend-metadata';

export const microFrontendSetup = (httpClient: HttpClient, router: Router) => () => new Promise<void>(async (resolve) => {
  const microFrontendsMetadata = await firstValueFrom(httpClient.get<MicroFrontendMetadata[]>('assets/micro-frontend-metadata.json'));
  const { config } = router;
  const layoutConfig = config.find(route => route.path === '')!;
  layoutConfig.children = [];

  microFrontendsMetadata.forEach(microFrontendMetadata => {
    if (microFrontendMetadata.default) {
      layoutConfig.children?.push({
        path: '',
        redirectTo: microFrontendMetadata.path || '',
        pathMatch: 'full'
      });
    }

    layoutConfig.children?.push({
      path: microFrontendMetadata.path || '',
      loadChildren: () => loadRemoteModule({
        type: 'module',
        remoteEntry: microFrontendMetadata.remoteEntry,
        exposedModule: './Module'
      }).then(m => m[microFrontendMetadata.ngModuleName])
    });
  });

  router.resetConfig(config);
  resolve();
});
