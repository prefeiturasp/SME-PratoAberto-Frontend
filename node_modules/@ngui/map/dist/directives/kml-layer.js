import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex', 'options'];
var OUTPUTS = ['click', 'defaultviewport_changed', 'status_changed'];
var KmlLayer = (function (_super) {
    tslib_1.__extends(KmlLayer, _super);
    function KmlLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'KmlLayer', INPUTS, OUTPUTS) || this;
    }
    return KmlLayer;
}(BaseMapDirective));
KmlLayer = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map > kml-layer',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], KmlLayer);
export { KmlLayer };
//# sourceMappingURL=kml-layer.js.map