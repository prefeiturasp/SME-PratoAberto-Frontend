/**
 * @param {?} type
 * @param {?=} detail
 * @param {?=} params
 * @return {?}
 */
export function CustomEvent(type, detail, params) {
    if (detail === void 0) { detail = undefined; }
    if (params === void 0) { params = { bubbles: false, cancelable: false }; }
    var /** @type {?} */ event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, params.bubbles, params.cancelable, detail);
    return event;
}
if ("Event" in window) {
    CustomEvent.prototype = ((window)).Event.prototype;
}
