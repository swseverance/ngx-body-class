import { Component } from '@angular/core';
import { NgxBodyClass } from 'ngx-body-class';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [NgxBodyClass]
})
export class App {
  singleClass = false;
  doubleClass = false;
  arrayOfClasses = false;
}
