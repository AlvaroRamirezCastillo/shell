import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/components/layout/layout.module';
import { MicroFrontendSetupModule } from './core/micro-frontend-setup/micro-frontend-setup.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MicroFrontendSetupModule,
    LayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
