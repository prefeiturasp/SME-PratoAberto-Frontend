import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = [];
var OUTPUTS = [];
var BicyclingLayer = (function (_super) {
    tslib_1.__extends(BicyclingLayer, _super);
    // declare INPUTS for AOT compiler
    // declare OUTPUTS for AOT compiler
    function BicyclingLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'BicyclingLayer', INPUTS, OUTPUTS) || this;
    }
    return BicyclingLayer;
}(BaseMapDirective));
BicyclingLayer = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map > bicycling-layer',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], BicyclingLayer);
export { BicyclingLayer };
//# sourceMappingURL=bicycling-layer.js.map