export function outerWidth(element: any) {
  let el: HTMLElement;
  (typeof element === 'string') ? (el = <HTMLElement>document.querySelector(<string>element)) : element;

  let style = getComputedStyle(el);

  return el.offsetWidth  +
    parseInt(style.getPropertyValue('margin-left')) +
    parseInt(style.getPropertyValue('margin-right'));
}
  
