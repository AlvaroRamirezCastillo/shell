import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { microFrontendSetup } from './micro-frontend.setup';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: microFrontendSetup,
      multi: true,
      deps: [HttpClient, Router]
    }
  ]
})
export class MicroFrontendSetupModule { }
