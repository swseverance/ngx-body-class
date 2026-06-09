import { Directive, DOCUMENT, effect, inject, input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[ngxBodyClass]',
})
export class NgxBodyClass implements OnDestroy {
  private document = inject(DOCUMENT);
  private classes: string[] = [];

  ngxBodyClass = input<string | string[] | null | undefined>();

  constructor() {
    effect(() => {
      this.removeClasses();
      this.setClasses(this.ngxBodyClass());
      this.addClasses();
    });
  }

  private removeClasses(): void {
    for (const c of this.classes) {
      this.document.body.classList.remove(c);
    }
  }

  private addClasses(): void {
    for (const c of this.classes) {
      this.document.body.classList.add(c);
    }
  }

  private setClasses(value: string | string[] | null | undefined): void {
    let classes: string[] = [];

    if (typeof value === 'string') {
      classes = value.split(' ');
    } else if (Array.isArray(value)) {
      classes = value;
    }

    this.classes = classes.filter(Boolean);
  }

  ngOnDestroy(): void {
    this.removeClasses();
  }
}
