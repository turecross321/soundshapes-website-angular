import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [AppModule, ServerModule, FontAwesomeModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
