export function outerHeight(element: any) {
  let el: HTMLElement;
  (typeof element === 'string') ? (el = <HTMLElement>document.querySelector(<string>element)) : element;

  let style = getComputedStyle(el);

  return el.offsetHeight +
    parseInt(style.getPropertyValue('margin-top')) +
    parseInt(style.getPropertyValue('margin-bottom'));
}
