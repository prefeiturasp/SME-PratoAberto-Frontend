"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var collapsable_component_1 = require("./collapsable.component");
var NguiCollapsableModule = (function () {
    function NguiCollapsableModule() {
    }
    return NguiCollapsableModule;
}());
NguiCollapsableModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [collapsable_component_1.NguiCollapsableComponent],
                exports: [collapsable_component_1.NguiCollapsableComponent]
            },] },
];
/** @nocollapse */
NguiCollapsableModule.ctorParameters = function () { return []; };
exports.NguiCollapsableModule = NguiCollapsableModule;
//# sourceMappingURL=collapsable.module.js.map