import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = [];
var OUTPUTS = [];
var TransitLayer = (function (_super) {
    tslib_1.__extends(TransitLayer, _super);
    // declare INPUTS for AOT compiler
    // declare OUTPUTS for AOT compiler
    function TransitLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'TransitLayer', INPUTS, OUTPUTS) || this;
    }
    return TransitLayer;
}(BaseMapDirective));
TransitLayer = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map > transit-layer',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], TransitLayer);
export { TransitLayer };
//# sourceMappingURL=transit-layer.js.map