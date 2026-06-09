# ngx-body-class

An Angular directive for adding classes to the `body` element.

## Installation

```bash
npm install ngx-body-class
```

## Usage

Import `NgxBodyClass` directly into any standalone component:

```typescript
import { NgxBodyClass } from 'ngx-body-class';

@Component({
  imports: [NgxBodyClass],
  template: `<div ngxBodyClass="my-class"></div>`,
})
export class MyComponent {}
```

### String input

Pass a space-separated string to apply multiple classes:

```html
<div ngxBodyClass="modal-open dark-theme"></div>
```

### Dynamic binding

```html
<div [ngxBodyClass]="isModalOpen ? 'modal-open' : ''"></div>
```

### Array input

```html
<div [ngxBodyClass]="['modal-open', 'dark-theme']"></div>
```

## Behavior

- Classes are added to `document.body` when the directive is active.
- Classes are removed when the directive is destroyed, so conditional rendering with `@if` is the intended pattern for toggling.

```html
@if (isModalOpen) {
  <div ngxBodyClass="modal-open"></div>
}
```

## License

MIT
