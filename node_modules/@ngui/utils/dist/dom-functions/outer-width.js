"use strict";
function outerWidth(element) {
    var el;
    (typeof element === 'string') ? (el = document.querySelector(element)) : element;
    var style = getComputedStyle(el);
    return el.offsetWidth +
        parseInt(style.getPropertyValue('margin-left')) +
        parseInt(style.getPropertyValue('margin-right'));
}
exports.outerWidth = outerWidth;
//# sourceMappingURL=outer-width.js.map