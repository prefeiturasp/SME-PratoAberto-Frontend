import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { NguiMapComponent } from '../components/ngui-map.component';
var INPUTS = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'paths',
    'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex', 'options',
];
var OUTPUTS = [
    'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown',
    'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick',
];
var Polygon = (function (_super) {
    tslib_1.__extends(Polygon, _super);
    function Polygon(nguiMapComp) {
        return _super.call(this, nguiMapComp, 'Polygon', INPUTS, OUTPUTS) || this;
    }
    return Polygon;
}(BaseMapDirective));
Polygon = tslib_1.__decorate([
    Directive({
        selector: 'ngui-map>polygon, ngui-map>map-polygon',
        inputs: INPUTS,
        outputs: OUTPUTS,
    }),
    tslib_1.__metadata("design:paramtypes", [NguiMapComponent])
], Polygon);
export { Polygon };
//# sourceMappingURL=polygon.js.map