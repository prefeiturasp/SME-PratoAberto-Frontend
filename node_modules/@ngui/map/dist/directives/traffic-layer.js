import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = ['autoRefresh', 'options'];
var OUTPUTS = [];
var TrafficLayer = (function (_super) {
    tslib_1.__extends(TrafficLayer, _super);
    // declare OUTPUTS for AOT compiler
    function TrafficLayer(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'TrafficLayer', INPUTS, OUTPUTS) || this;
    }
    return TrafficLayer;
}(BaseMapDirective));
TrafficLayer = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map > traffic-layer',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], TrafficLayer);
export { TrafficLayer };
//# sourceMappingURL=traffic-layer.js.map