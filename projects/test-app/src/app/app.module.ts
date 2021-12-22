import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBodyClassModule } from 'ngx-body-class';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxBodyClassModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
