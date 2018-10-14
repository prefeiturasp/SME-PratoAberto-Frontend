"use strict";
/**
 * scroll to the selector within the parent selector by scrolling 10 times within 500ms
 * @param selector
 * @param parentSelector
 */
function scrollTo(selector, parentSelector, horizontal, distance) {
    // argument validation
    var parentEl, targetEl;
    parentSelector = parentSelector || 'body';
    targetEl = document.querySelector(selector);
    if (!targetEl) {
        throw "Invalid selector " + selector;
    }
    parentEl = document.querySelector(parentSelector);
    if (!parentEl) {
        throw "Invalid parent selector " + parentSelector;
    }
    // detect the current environment
    var parentElStyle = window.getComputedStyle(parentEl);
    var scrollContainerEl = parentElStyle.overflow === 'auto' ? parentEl : document.body;
    var currentScrollTop = scrollContainerEl.scrollTop;
    var currentScrollLeft = scrollContainerEl.scrollLeft;
    // determine targetOffsetTop(or Left);
    var targetOffsetTop;
    var targetOffsetLeft;
    if (scrollContainerEl === document.body) {
        var bodyRect = document.body.getBoundingClientRect();
        var targetRect = targetEl.getBoundingClientRect();
        targetOffsetTop = targetRect.top - bodyRect.top;
        targetOffsetLeft = targetRect.left - bodyRect.left;
    }
    else {
        targetOffsetTop = targetEl.offsetTop;
        targetOffsetLeft = targetEl.offsetLeft;
    }
    if (distance) {
        currentScrollTop += distance;
        currentScrollLeft += distance;
    }
    // start scrolling
    var step = horizontal ?
        Math.ceil((targetOffsetLeft - currentScrollLeft) / 10) :
        Math.ceil((targetOffsetTop - currentScrollTop) / 10);
    var scrollProp = horizontal ? 'scrollLeft' : 'scrollTop';
    (function loop(i, prop) {
        setTimeout(function main() {
            scrollContainerEl[prop] += step;
            i > 1 && loop(i - 1, prop);
        }, 50);
    }(10, scrollProp));
}
exports.scrollTo = scrollTo;
//# sourceMappingURL=scroll-to.js.map