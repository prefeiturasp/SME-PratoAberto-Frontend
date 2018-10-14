import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = ['data', 'dissipating', 'gradient', 'maxIntensity', 'opacity', 'radius', 'options'];
var OUTPUTS = [];
var HeatmapLayer = (function (_super) {
    tslib_1.__extends(HeatmapLayer, _super);
    function HeatmapLayer(nguiMapComp) {
        var _this = _super.call(this, nguiMapComp, 'HeatmapLayer', INPUTS, OUTPUTS) || this;
        // declare OUTPUTS for AOT compiler
        _this.libraryName = 'visualization';
        return _this;
    }
    return HeatmapLayer;
}(BaseMapDirective));
HeatmapLayer = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map > heatmap-layer',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], HeatmapLayer);
export { HeatmapLayer };
//# sourceMappingURL=heatmap-layer.js.map