import * as tslib_1 from "tslib";
import { Input, Output, Directive, EventEmitter, ElementRef, } from '@angular/core';
import { NgMapApiLoader } from '../services/api-loader';
import { OptionBuilder } from '../services/option-builder';
var PlacesAutoComplete = (function () {
    function PlacesAutoComplete(optionBuilder, elementRef, apiLoader) {
        var _this = this;
        this.optionBuilder = optionBuilder;
        this.elementRef = elementRef;
        this.apiLoader = apiLoader;
        this.place_changed = new EventEmitter();
        this.initialized$ = new EventEmitter();
        // only called when map is ready
        this.initialize = function () {
            _this.objectOptions =
                _this.optionBuilder.googlizeAllInputs(['bounds', 'componentRestrictions', 'types'], _this);
            _this.autocomplete = new google.maps.places.Autocomplete(_this.elementRef.nativeElement, _this.objectOptions);
            _this.autocomplete.addListener('place_changed', function (place) {
                _this.place_changed.emit(_this.autocomplete.getPlace());
            });
            _this.initialized$.emit(_this.autocomplete);
        };
        apiLoader.load();
        apiLoader.api$.subscribe(function () { return _this.initialize(); });
    }
    return PlacesAutoComplete;
}());
tslib_1.__decorate([
    Input('bounds'),
    tslib_1.__metadata("design:type", Object)
], PlacesAutoComplete.prototype, "bounds", void 0);
tslib_1.__decorate([
    Input('componentRestrictions'),
    tslib_1.__metadata("design:type", Object)
], PlacesAutoComplete.prototype, "componentRestrictions", void 0);
tslib_1.__decorate([
    Input('types'),
    tslib_1.__metadata("design:type", Array)
], PlacesAutoComplete.prototype, "types", void 0);
tslib_1.__decorate([
    Output('place_changed'),
    tslib_1.__metadata("design:type", EventEmitter)
], PlacesAutoComplete.prototype, "place_changed", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], PlacesAutoComplete.prototype, "initialized$", void 0);
PlacesAutoComplete = tslib_1.__decorate([
    Directive({
        selector: '[places-auto-complete]'
    }),
    tslib_1.__metadata("design:paramtypes", [OptionBuilder,
        ElementRef,
        NgMapApiLoader])
], PlacesAutoComplete);
export { PlacesAutoComplete };
//# sourceMappingURL=places-auto-complete.js.map