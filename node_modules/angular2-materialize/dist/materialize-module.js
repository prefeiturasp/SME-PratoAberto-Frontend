import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeDirective } from './materialize-directive';
var MaterializeModule = (function () {
    function MaterializeModule() {
    }
    /**
     * @return {?}
     */
    MaterializeModule.forRoot = function () {
        return {
            ngModule: MaterializeModule
        };
    };
    return MaterializeModule;
}());
export { MaterializeModule };
MaterializeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MaterializeDirective
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    MaterializeDirective
                ]
            },] },
];
/**
 * @nocollapse
 */
MaterializeModule.ctorParameters = function () { return []; };
function MaterializeModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterializeModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterializeModule.ctorParameters;
}
