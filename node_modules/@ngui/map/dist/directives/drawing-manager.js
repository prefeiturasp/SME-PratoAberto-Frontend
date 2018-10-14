import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = [
    'options',
    'circleOptions', 'drawingControl', 'drawingControlOptions', 'drawingMode',
    'map', 'markerOptions', 'polygonOptions', 'polylineOptions', 'rectangleOptions'
];
var OUTPUTS = [
    'circlecomplete', 'markercomplete', 'overlaycomplete',
    'polygoncomplete', 'polylinecomplete', 'rectanglecomplete'
];
var DrawingManager = (function (_super) {
    tslib_1.__extends(DrawingManager, _super);
    function DrawingManager(nguiMapComp) {
        var _this = _super.call(this, nguiMapComp, 'DrawingManager', INPUTS, OUTPUTS) || this;
        _this.libraryName = 'drawing';
        return _this;
    }
    return DrawingManager;
}(BaseMapDirective));
DrawingManager = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map > drawing-manager',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], DrawingManager);
export { DrawingManager };
//# sourceMappingURL=drawing-manager.js.map