import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CustomEvent } from './custom-event-polyfill';
var MaterializeDirective = (function () {
    /**
     * @param {?} _el
     */
    function MaterializeDirective(_el) {
        this._el = _el;
        this._params = null;
        this._functionName = null;
        this.previousValue = null;
        this.previousDisabled = false;
        this._waitFunction = {};
        this.changeListenerShouldBeAdded = true;
        this.init = new EventEmitter();
        this.initialized = false;
    }
    Object.defineProperty(MaterializeDirective.prototype, "materializeParams", {
        /**
         * @param {?} params
         * @return {?}
         */
        set: function (params) {
            this._params = params;
            this.performElementUpdates();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materializeActions", {
        /**
         * @param {?} actions
         * @return {?}
         */
        set: function (actions) {
            var _this = this;
            actions.subscribe(function (action) {
                window.setTimeout(function () {
                    if (typeof action === "string") {
                        _this.performLocalElementUpdates(action);
                    }
                    else {
                        _this.performLocalElementUpdates(action.action, action.params);
                    }
                }, 1);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materialize", {
        /**
         * @param {?} functionName
         * @return {?}
         */
        set: function (functionName) {
            this._functionName = functionName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materializeSelectOptions", {
        /**
         * @param {?} options
         * @return {?}
         */
        set: function (options) {
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.ngAfterViewInit = function () {
        this.performElementUpdates();
    };
    /**
     * @param {?=} _unused
     * @return {?}
     */
    MaterializeDirective.prototype.ngOnChanges = function (_unused) {
        var _this = this;
        if (this.isSelect()) {
            setTimeout(function () { return _this.performLocalElementUpdates(); }, 10);
        }
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.ngOnDestroy = function () {
        this.performElementRemotion();
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.ngDoCheck = function () {
        var /** @type {?} */ nativeElement = this._el.nativeElement;
        var /** @type {?} */ jQueryElement = $(nativeElement);
        if (this.isSelect()) {
            var /** @type {?} */ shouldUpdate = false;
            if (nativeElement.disabled != this.previousDisabled) {
                this.previousDisabled = nativeElement.disabled;
                shouldUpdate = true;
            }
            if (!jQueryElement.attr("multiple") && nativeElement.value != this.previousValue) {
                // handle select changes of the model
                this.previousValue = nativeElement.value;
                shouldUpdate = true;
            }
            if (shouldUpdate) {
                this.performLocalElementUpdates();
            }
        }
        else if (this.isTextarea()) {
            if (nativeElement.value != this.previousValue) {
                this.previousValue = nativeElement.value;
                this.performElementUpdates();
            }
        }
        return false;
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.performElementRemotion = function () {
        if (this.isTooltip()) {
            var /** @type {?} */ nativeElement = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement);
            var /** @type {?} */ tooltipId = jQueryElement.attr('data-tooltip-id');
            if (tooltipId) {
                $('#' + tooltipId).remove();
            }
        }
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.performElementUpdates = function () {
        var _this = this;
        // it should have been created by now, but confirm anyway
        if (Materialize && Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
        // handle select changes from the HTML
        if (this.isSelect() && this.changeListenerShouldBeAdded) {
            var /** @type {?} */ nativeElement_1 = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement_1);
            jQueryElement.on("change", function (e) {
                if (!e.originalEvent || !e.originalEvent.internalToMaterialize) {
                    var /** @type {?} */ event_1 = document.createEvent("CustomEvent");
                    //if (jQueryElement.attr("multiple")) {
                    //event.initCustomEvent("input",false,false,undefined);
                    //}
                    //else {
                    event_1.initCustomEvent("change", false, false, undefined);
                    //}
                    event_1.internalToMaterialize = true;
                    nativeElement_1.dispatchEvent(event_1);
                }
            });
            this.changeListenerShouldBeAdded = false;
        }
        if (this.isAutocomplete()) {
            var /** @type {?} */ nativeElement_2 = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement_2);
            jQueryElement.on("change", function (e) { return nativeElement_2.dispatchEvent(((CustomEvent("input")))); });
        }
        if (this.isDatePicker()) {
            var /** @type {?} */ nativeElement_3 = this._el.nativeElement;
            var /** @type {?} */ jqueryPickerElement_1 = $(nativeElement_3);
            var /** @type {?} */ datePicker = jqueryPickerElement_1[this._functionName].apply(jqueryPickerElement_1, this._params);
            var /** @type {?} */ picker_1 = datePicker.pickadate('picker');
            setTimeout(function () {
                if (_this.ngModel) {
                    picker_1.set('select', _this.ngModel);
                }
                else {
                    var /** @type {?} */ value = jqueryPickerElement_1.val();
                    if (value && value.length > 0) {
                        picker_1.set('select', value);
                    }
                }
                jqueryPickerElement_1.on('change', function (e) { return nativeElement_3.dispatchEvent(((CustomEvent("input")))); });
            });
        }
        if (this.isTimePicker()) {
            var /** @type {?} */ nativeElement_4 = this._el.nativeElement;
            var /** @type {?} */ jqueryPickerElement_2 = $(nativeElement_4);
            var /** @type {?} */ timePicker = jqueryPickerElement_2[this._functionName].apply(jqueryPickerElement_2, this._params);
            var /** @type {?} */ picker_2 = timePicker.pickatime('picker');
            setTimeout(function () {
                if (_this.ngModel) {
                    picker_2.val(_this.ngModel);
                }
                else {
                    picker_2.val(jqueryPickerElement_2.val());
                }
                jqueryPickerElement_2.on('change', function (e) { return nativeElement_4.dispatchEvent(((CustomEvent("input")))); });
            });
        }
        if (this.isChips()) {
            var /** @type {?} */ nativeElement_5 = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement_5);
            jQueryElement.on("chip.add", function (e, chip) { return nativeElement_5.dispatchEvent(((CustomEvent("chip.add", chip)))); });
            jQueryElement.on("chip.delete", function (e, chip) { return nativeElement_5.dispatchEvent(((CustomEvent("chip.delete", chip)))); });
            jQueryElement.on("chip.select", function (e, chip) { return nativeElement_5.dispatchEvent(((CustomEvent("chip.select", chip)))); });
        }
        if (this.isTextarea()) {
            this._el.nativeElement.dispatchEvent(((CustomEvent("autoresize", {
                bubbles: true,
                cancelable: false,
                detail: undefined
            }))));
        }
        this.performLocalElementUpdates();
    };
    /**
     * @param {?=} functionName
     * @param {?=} params
     * @return {?}
     */
    MaterializeDirective.prototype.performLocalElementUpdates = function (functionName, params) {
        var _this = this;
        if (functionName === void 0) { functionName = this._functionName; }
        if (params === void 0) { params = this._params; }
        if (this._waitFunction[functionName]) {
            return;
        }
        this._waitFunction[functionName] = true;
        $(document).ready(function () {
            _this._waitFunction[functionName] = false;
            if (functionName) {
                var /** @type {?} */ jQueryElement = $(_this._el.nativeElement);
                if (jQueryElement[functionName]) {
                    if (params) {
                        if (params instanceof Array) {
                            jQueryElement[functionName].apply(jQueryElement, params);
                        }
                        else {
                            throw new Error("Params has to be an array.");
                        }
                    }
                    else {
                        jQueryElement[functionName]();
                    }
                }
                else {
                    // fallback to running this function on the global Materialize object
                    if (Materialize[functionName]) {
                        if (params) {
                            if (params instanceof Array) {
                                Materialize[functionName].apply(Materialize, params);
                            }
                            else {
                                throw new Error("Params has to be an array.");
                            }
                        }
                        else {
                            Materialize[functionName]();
                        }
                    }
                    else {
                        throw new Error("Couldn't find materialize function ''" + functionName + "' on element or the global Materialize object.");
                    }
                }
                if (!_this.initialized) {
                    _this.initialized = true;
                    _this.init.emit();
                }
            }
        });
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isTooltip = function () {
        return (this._functionName && this._functionName === "tooltip");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isSelect = function () {
        return (this._functionName && this._functionName === "material_select");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isDatePicker = function () {
        return (this._functionName && this._functionName === "pickadate");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isTimePicker = function () {
        return (this._functionName && this._functionName === "pickatime");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isChips = function () {
        return (this._functionName && this._functionName === "material_chip");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isAutocomplete = function () {
        return (this._functionName && this._functionName === "autocomplete");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isTextarea = function () {
        return this._el.nativeElement.nodeName == "TEXTAREA";
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.enableDPButtons = function () {
        $('.picker__clear').removeAttr("disabled");
        $('.picker__today').removeAttr("disabled");
        $('.picker__close').removeAttr("disabled");
        $('.picker__select--year').removeAttr("disabled");
        $('.picker__select--month').removeAttr("disabled");
    };
    return MaterializeDirective;
}());
export { MaterializeDirective };
MaterializeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[materialize]'
            },] },
];
/**
 * @nocollapse
 */
MaterializeDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
MaterializeDirective.propDecorators = {
    'init': [{ type: Output },],
    'materializeParams': [{ type: Input },],
    'materializeActions': [{ type: Input },],
    'materialize': [{ type: Input },],
    'materializeSelectOptions': [{ type: Input },],
    'ngModel': [{ type: Input },],
};
function MaterializeDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterializeDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterializeDirective.ctorParameters;
    /** @type {?} */
    MaterializeDirective.propDecorators;
    /** @type {?} */
    MaterializeDirective.prototype._params;
    /** @type {?} */
    MaterializeDirective.prototype._functionName;
    /** @type {?} */
    MaterializeDirective.prototype.previousValue;
    /** @type {?} */
    MaterializeDirective.prototype.previousDisabled;
    /** @type {?} */
    MaterializeDirective.prototype._waitFunction;
    /** @type {?} */
    MaterializeDirective.prototype.changeListenerShouldBeAdded;
    /** @type {?} */
    MaterializeDirective.prototype.init;
    /** @type {?} */
    MaterializeDirective.prototype.initialized;
    /** @type {?} */
    MaterializeDirective.prototype.ngModel;
    /** @type {?} */
    MaterializeDirective.prototype._el;
}
