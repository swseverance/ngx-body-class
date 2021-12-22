import { DOCUMENT } from '@angular/common';
import { Directive, Inject, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[ngxBodyClass]',
})
export class NgxBodyClassDirective implements OnDestroy {
  private classes: string[] = [];

  @Input('ngxBodyClass')
  set class(value: string | string[]) {
    this.removeClasses();
    this.setClasses(value);
    this.addClasses();
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private removeClasses(): void {
    this.document.body.classList.remove(...this.classes);
  }

  private addClasses(): void {
    this.document.body.classList.add(...this.classes);
  }

  private setClasses(value: string | string[]): void {
    let classes: string[] = [];

    if (typeof value === 'string') {
      classes = value.split(' ');
    } else if (Array.isArray(value)) {
      classes = value;
    }

    this.classes = classes.filter((s) => !!s);
  }

  ngOnDestroy(): void {
    this.removeClasses();
  }
}
