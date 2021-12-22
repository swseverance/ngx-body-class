# ngx-body-class

>An angular directive for adding classes to the `body` element

## Basic Usage

In your module:
```typescript
import { NgxBodyClassModule } from 'ngx-body-class';

@NgModule({
  ...
  imports: [ NgxBodyClassModule ],
  ...
})
export class MyModule {}
```

In the component's template:
```html
<div ngxBodyClass="my-class">
  Causes my-class to be added as a class to the body element
</div>
```
```html
<div [ngxBodyClass]="['red', isNumberEven ? 'even' : 'odd']">
  ...
</div>
```

## Notes

1. This library can be of use particularly when trying to style modals that are added as children of the body element.
2. Any classes added by the directive are removed when the directive is destroyed

## License

MIT
