/**
 * scroll to the selector within the parent selector by scrolling 10 times within 500ms
 * @param selector
 * @param parentSelector
 */
export function scrollTo(
  selector: string,
  parentSelector?: string,
  horizontal? : boolean,
  distance? : number
): void {
  // argument validation
  let parentEl: HTMLElement, targetEl: HTMLElement;

  parentSelector = parentSelector || 'body';

  targetEl = <HTMLElement>document.querySelector(selector);
  if (!targetEl) { throw `Invalid selector ${selector}`; }

  parentEl = <HTMLElement>document.querySelector(parentSelector);
  if (!parentEl) { throw `Invalid parent selector ${parentSelector}`; }

  // detect the current environment
  let parentElStyle = window.getComputedStyle(parentEl);
  let scrollContainerEl = parentElStyle.overflow === 'auto' ? parentEl : document.body;
  let currentScrollTop = scrollContainerEl.scrollTop;
  let currentScrollLeft = scrollContainerEl.scrollLeft;

  // determine targetOffsetTop(or Left);
  let targetOffsetTop: number;
  let targetOffsetLeft: number;

  if (scrollContainerEl === document.body) {

    let bodyRect = document.body.getBoundingClientRect();
    let targetRect = targetEl.getBoundingClientRect();
    targetOffsetTop = targetRect.top - bodyRect.top;
    targetOffsetLeft = targetRect.left - bodyRect.left;

  } else {

    targetOffsetTop = targetEl.offsetTop;
    targetOffsetLeft = targetEl.offsetLeft;

  }

  if (distance) {
    currentScrollTop += distance;
    currentScrollLeft += distance;
  }


  // start scrolling
  let step = horizontal ?
    Math.ceil((targetOffsetLeft - currentScrollLeft) / 10) :
    Math.ceil((targetOffsetTop - currentScrollTop) / 10);
  let scrollProp = horizontal ? 'scrollLeft' : 'scrollTop';
  (function loop(i: number, prop: any): void {
    setTimeout(function main() {
      scrollContainerEl[prop] += step;
      i > 1 && loop(i - 1, prop);
    }, 50);
  }(10, scrollProp));

}

