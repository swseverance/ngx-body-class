import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBodyClassDirective } from './ngx-body-class.directive';

@Component({
  template: `<div [ngxBodyClass]="bodyClass"></div>`,
})
class TestHostComponent {
  bodyClass: string | string[] | null | undefined;
}

const expectBodyClasses = (expected: string[]) =>
  expect(Array.from(document.body.classList).sort()).toEqual(expected);

describe('NgxBodyClassDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, NgxBodyClassDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    document.body.classList.remove(...Array.from(document.body.classList));
  });

  it('not apply any classes', () => {
    expectBodyClasses([]);
  });

  describe('when input is a string', () => {
    it('should apply one class', () => {
      component.bodyClass = 'hello';
      fixture.detectChanges();
      expectBodyClasses(['hello']);
    });

    it('should apply more than one class', () => {
      component.bodyClass = 'a b';
      fixture.detectChanges();
      expectBodyClasses(['a', 'b']);
    });

    it('should remove classes once destroyed', () => {
      document.body.classList.add('a');
      component.bodyClass = 'b';
      fixture.detectChanges();
      expectBodyClasses(['a', 'b']);
      fixture.destroy();
      expectBodyClasses(['a']);
    });
  });

  describe('when input is an array', () => {
    it('should apply one class', () => {
      component.bodyClass = ['hello'];
      fixture.detectChanges();
      expectBodyClasses(['hello']);
    });

    it('should apply more than one class', () => {
      component.bodyClass = ['a', 'b'];
      fixture.detectChanges();
      expectBodyClasses(['a', 'b']);
    });

    it('should remove classes once destroyed', () => {
      document.body.classList.add('a');
      component.bodyClass = ['b'];
      fixture.detectChanges();
      expectBodyClasses(['a', 'b']);
      fixture.destroy();
      expectBodyClasses(['a']);
    });
  });

  describe('when input changes', () => {
    it('should remove old classes and add new ones', () => {
      component.bodyClass = 'a b';
      fixture.detectChanges();
      expectBodyClasses(['a', 'b']);
      component.bodyClass = 'c d';
      fixture.detectChanges();
      expectBodyClasses(['c', 'd']);
    });
  });

  it('should not add `null` as a class', () => {
    component.bodyClass = null;
    fixture.detectChanges();
    expectBodyClasses([]);
  });

  it('should not add `undefined` as a class', () => {
    component.bodyClass = undefined;
    fixture.detectChanges();
    expectBodyClasses([]);
  });
});
