import * as tslib_1 from "tslib";
import { Injectable, Inject, Optional, NgZone } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { NG_MAP_CONFIG_TOKEN } from './config';
import { isMapsApiLoaded } from './util';
import { first } from 'rxjs/operator/first';
var NgMapApiLoader = (function () {
    function NgMapApiLoader(config) {
        this.config = config;
        this.api$ = first.call(new ReplaySubject(1));
        this.config = this.config || { apiUrl: 'https://maps.google.com/maps/api/js' };
    }
    NgMapApiLoader.prototype.ngOnDestroy = function () {
        this.api$.complete();
    };
    return NgMapApiLoader;
}());
export { NgMapApiLoader };
var NgMapAsyncCallbackApiLoader = (function (_super) {
    tslib_1.__extends(NgMapAsyncCallbackApiLoader, _super);
    function NgMapAsyncCallbackApiLoader(zone, config) {
        var _this = _super.call(this, config) || this;
        _this.zone = zone;
        return _this;
    }
    NgMapAsyncCallbackApiLoader.prototype.load = function () {
        var _this = this;
        if (typeof window === 'undefined') {
            return;
        }
        if (isMapsApiLoaded()) {
            this.api$.next(google.maps);
        }
        else if (!document.querySelector('#ngui-map-api')) {
            window['nguiMapRef'] = window['nguiMapRef'] || [];
            window['nguiMapRef'].push({ zone: this.zone, componentFn: function () { return _this.api$.next(google.maps); } });
            this.addGoogleMapsApi();
        }
    };
    NgMapAsyncCallbackApiLoader.prototype.addGoogleMapsApi = function () {
        window['initNguiMap'] = window['initNguiMap'] || function () {
            window['nguiMapRef'].forEach(function (nguiMapRef) {
                nguiMapRef.zone.run(function () { nguiMapRef.componentFn(); });
            });
            window['nguiMapRef'].splice(0, window['nguiMapRef'].length);
        };
        var script = document.createElement('script');
        script.id = 'ngui-map-api';
        // script.src = "https://maps.google.com/maps/api/js?callback=initNguiMap";
        var apiUrl = this.config.apiUrl;
        apiUrl += apiUrl.indexOf('?') !== -1 ? '&' : '?';
        script.src = apiUrl + 'callback=initNguiMap';
        document.querySelector('body').appendChild(script);
    };
    return NgMapAsyncCallbackApiLoader;
}(NgMapApiLoader));
NgMapAsyncCallbackApiLoader = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, Optional()), tslib_1.__param(1, Inject(NG_MAP_CONFIG_TOKEN)),
    tslib_1.__metadata("design:paramtypes", [NgZone, Object])
], NgMapAsyncCallbackApiLoader);
export { NgMapAsyncCallbackApiLoader };
var NgMapAsyncApiLoader = (function (_super) {
    tslib_1.__extends(NgMapAsyncApiLoader, _super);
    function NgMapAsyncApiLoader(config) {
        return _super.call(this, config) || this;
    }
    NgMapAsyncApiLoader.prototype.load = function () {
        var _this = this;
        if (typeof window === 'undefined') {
            return;
        }
        if (isMapsApiLoaded()) {
            this.api$.next(google.maps);
        }
        else if (!document.querySelector('#ngui-map-api')) {
            var script = document.createElement('script');
            script.id = 'ngui-map-api';
            script.async = true;
            script.onload = function () { return _this.api$.next(google.maps); };
            script.src = this.config.apiUrl;
            document.querySelector('body').appendChild(script);
        }
    };
    return NgMapAsyncApiLoader;
}(NgMapApiLoader));
NgMapAsyncApiLoader = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Inject(NG_MAP_CONFIG_TOKEN)),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgMapAsyncApiLoader);
export { NgMapAsyncApiLoader };
//# sourceMappingURL=api-loader.js.map