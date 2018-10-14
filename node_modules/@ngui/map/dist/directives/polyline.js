import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = [
    'clickable', 'draggable', 'editable', 'geodesic', 'icons', 'path', 'strokeColor',
    'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'options'
];
var OUTPUTS = [
    'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown',
    'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'
];
var Polyline = (function (_super) {
    tslib_1.__extends(Polyline, _super);
    function Polyline(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'Polyline', INPUTS, OUTPUTS) || this;
    }
    return Polyline;
}(BaseMapDirective));
Polyline = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map > polyline',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], Polyline);
export { Polyline };
//# sourceMappingURL=polyline.js.map