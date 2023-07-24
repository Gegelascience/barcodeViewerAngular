import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarcodeRendererComponent } from './components/barcode-renderer/barcode-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeRendererComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
