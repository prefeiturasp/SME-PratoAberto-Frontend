import {Directive, Input, EventEmitter, ElementRef, Renderer, Inject} from '@angular/core';

@Directive({
 selector: '[focus]'
})
export class FocusDirective {
  @Input('focus') focusEvent: EventEmitter<boolean>;

  constructor(
    @Inject(ElementRef) private element: ElementRef,
    private renderer: Renderer
  ){}

  ngOnInit() {
    // this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
    this.focusEvent.subscribe(event => {
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
    });
  }


}
