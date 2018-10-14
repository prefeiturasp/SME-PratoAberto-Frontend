import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, ViewChild, ViewContainerRef, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NguiMap } from '../services/ngui-map';
import { NguiMapComponent } from './ngui-map.component';
var INPUTS = [
    'content', 'disableAutoPan', 'maxWidth', 'pixelOffset', 'position', 'zIndex', 'options'
];
var OUTPUTS = [
    'closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'
];
var InfoWindow = (function () {
    function InfoWindow(elementRef, nguiMap, nguiMapComponent) {
        var _this = this;
        this.elementRef = elementRef;
        this.nguiMap = nguiMap;
        this.nguiMapComponent = nguiMapComponent;
        this.initialized$ = new EventEmitter();
        this.objectOptions = {};
        this.inputChanges$ = new Subject();
        this.elementRef.nativeElement.style.display = 'none';
        OUTPUTS.forEach(function (output) { return _this[output] = new EventEmitter(); });
    }
    // Initialize this map object when map is ready
    InfoWindow.prototype.ngOnInit = function () {
        var _this = this;
        if (this.nguiMapComponent.mapIdledOnce) {
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(function (map) { return _this.initialize(); });
        }
    };
    InfoWindow.prototype.ngOnChanges = function (changes) {
        this.inputChanges$.next(changes);
    };
    // called when map is ready
    InfoWindow.prototype.initialize = function () {
        var _this = this;
        this.objectOptions = this.nguiMapComponent.optionBuilder.googlizeAllInputs(INPUTS, this);
        this.infoWindow = new google.maps.InfoWindow(this.objectOptions);
        this.infoWindow['mapObjectName'] = 'InfoWindow';
        // register infoWindow ids to NguiMap, so that it can be opened by id
        if (this.elementRef.nativeElement.id) {
            this.nguiMapComponent.infoWindows[this.elementRef.nativeElement.id] = this;
        }
        else {
            console.error('An InfoWindow must have an id. e.g. id="detail"');
        }
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(OUTPUTS, this, 'infoWindow');
        // update object when input changes
        debounceTime.call(this.inputChanges$, 1000)
            .subscribe(function (changes) { return _this.nguiMap.updateGoogleObject(_this.infoWindow, changes); });
        this.nguiMapComponent.addToMapObjectGroup('InfoWindow', this.infoWindow);
        this.initialized$.emit(this.infoWindow);
    };
    InfoWindow.prototype.open = function (anchor) {
        // set content and open it
        this.infoWindow.setContent(this.template.element.nativeElement);
        this.infoWindow.open(this.nguiMapComponent.map, anchor);
    };
    InfoWindow.prototype.close = function () {
        // check if infoWindow exists, and closes it
        if (this.infoWindow)
            this.infoWindow.close();
    };
    InfoWindow.prototype.ngOnDestroy = function () {
        this.inputChanges$.complete();
        if (this.infoWindow) {
            this.nguiMap.clearObjectEvents(OUTPUTS, this, 'infoWindow');
            delete this.infoWindow;
        }
    };
    return InfoWindow;
}());
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], InfoWindow.prototype, "initialized$", void 0);
tslib_1.__decorate([
    ViewChild('template', { read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], InfoWindow.prototype, "template", void 0);
InfoWindow = tslib_1.__decorate([
    Component({
        selector: 'ngui-map > info-window',
        inputs: INPUTS,
        outputs: OUTPUTS,
        template: "<div #template><ng-content></ng-content></div>",
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        NguiMap,
        NguiMapComponent])
], InfoWindow);
export { InfoWindow };
//# sourceMappingURL=info-window.js.map