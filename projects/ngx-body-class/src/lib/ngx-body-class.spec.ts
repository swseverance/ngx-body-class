import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { NgxBodyClass } from './ngx-body-class';

describe('NgxBodyClass', () => {
  @Component({
    template: `<div [ngxBodyClass]="bodyClass()">Hello</div>`,
    imports: [NgxBodyClass],
  })
  class TestHost {
    bodyClass = signal<string | string[] | null | undefined>(undefined);
  }

  let fixture: ComponentFixture<TestHost>;
  let component: TestHost;

  const expectBodyClasses = (expected: string[]) =>
    expect(Array.from(document.body.classList).sort()).toEqual(expected);

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestHost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  beforeEach(() => {
    document.body.classList = 'test';
  });

  it('not apply any classes', () => {
    expectBodyClasses(['test']);
  });

  describe('when input is a string', () => {
    it('should apply one class', async () => {
      component.bodyClass.set('hello');
      await fixture.whenStable();
      expectBodyClasses(['hello', 'test']);
    });

    it('should apply more than one class', async () => {
      component.bodyClass.set('a b');
      await fixture.whenStable();
      expectBodyClasses(['a', 'b', 'test']);
    });

    it('should ignore extra whitespace', async () => {
      component.bodyClass.set('  a  b  ');
      await fixture.whenStable();
      expectBodyClasses(['a', 'b', 'test']);
    });

    it('should not apply an empty string', async () => {
      component.bodyClass.set('');
      await fixture.whenStable();
      expectBodyClasses(['test']);
    });

    it('should remove classes once destroyed', async () => {
      component.bodyClass.set('a');
      await fixture.whenStable();
      expectBodyClasses(['a', 'test']);
      fixture.destroy();
      expectBodyClasses(['test']);
    });
  });

  describe('when input is an array', () => {
    it('should apply one class', async () => {
      component.bodyClass.set(['hello']);
      await fixture.whenStable();
      expectBodyClasses(['hello', 'test']);
    });

    it('should apply more than one class', async () => {
      component.bodyClass.set(['a', 'b']);
      await fixture.whenStable();
      expectBodyClasses(['a', 'b', 'test']);
    });

    it('should ignore empty strings', async () => {
      component.bodyClass.set(['a', '', 'b']);
      await fixture.whenStable();
      expectBodyClasses(['a', 'b', 'test']);
    });

    it('should remove classes once destroyed', async () => {
      component.bodyClass.set(['a']);
      await fixture.whenStable();
      expectBodyClasses(['a', 'test']);
      fixture.destroy();
      expectBodyClasses(['test']);
    });
  });

  describe('when input changes', () => {
    it('should remove old classes and add new ones', async () => {
      component.bodyClass.set('a b');
      await fixture.whenStable();
      expectBodyClasses(['a', 'b', 'test']);
      component.bodyClass.set('c d');
      await fixture.whenStable();
      expectBodyClasses(['c', 'd', 'test']);
    });

    it('should remove classes when input changes to null', async () => {
      component.bodyClass.set('a b');
      await fixture.whenStable();
      expectBodyClasses(['a', 'b', 'test']);
      component.bodyClass.set(null);
      await fixture.whenStable();
      expectBodyClasses(['test']);
    });

    it('should remove classes when input changes to undefined', async () => {
      component.bodyClass.set('a b');
      await fixture.whenStable();
      expectBodyClasses(['a', 'b', 'test']);
      component.bodyClass.set(undefined);
      await fixture.whenStable();
      expectBodyClasses(['test']);
    });
  });

  it('should not add `null` as a class', async () => {
    component.bodyClass.set(null);
    await fixture.whenStable();
    expectBodyClasses(['test']);
  });

  it('should not add `undefined` as a class', async () => {
    component.bodyClass.set(undefined);
    await fixture.whenStable();
    expectBodyClasses(['test']);
  });
});
