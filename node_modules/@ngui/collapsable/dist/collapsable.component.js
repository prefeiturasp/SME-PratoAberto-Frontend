"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NguiCollapsableComponent = (function () {
    function NguiCollapsableComponent(viewContainer) {
        this.viewContainer = viewContainer;
        this.selectedIndexClass = 'selected';
        this.selectedContentsClass = 'selected';
        this.el = this.viewContainer.element.nativeElement;
    }
    NguiCollapsableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.indexEls = [].slice.call(this.el.querySelectorAll('[index]'));
        this.contentsEls = [].slice.call(this.el.querySelectorAll('[contents]'));
        this.selectTab(this.selectedIndex);
        this.indexEls.forEach(function (el) {
            el.addEventListener('click', function () {
                _this.selectTab(el.getAttribute('index'));
            });
        });
    };
    NguiCollapsableComponent.prototype.selectTab = function (id) {
        var _this = this;
        id = id || this.indexEls[0].getAttribute('index');
        this.indexEls.forEach(function (el) {
            _this.removeClass(el, _this.selectedIndexClass);
            if (el.getAttribute('index') == id) {
                _this.addClass(el, _this.selectedIndexClass);
            }
        });
        this.contentsEls.forEach(function (el) {
            _this.removeClass(el, _this.selectedContentsClass);
            if (el.getAttribute('contents') == id) {
                _this.addClass(el, _this.selectedContentsClass);
            }
        });
    };
    NguiCollapsableComponent.prototype.addClass = function (el, str) {
        var classNames = (el.className || '').split(' ');
        classNames.push(str);
        el.className = classNames.join(' ');
    };
    NguiCollapsableComponent.prototype.removeClass = function (el, str) {
        el.className = (el.className || '').replace(new RegExp('[ ]*' + str), '');
    };
    return NguiCollapsableComponent;
}());
NguiCollapsableComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ngui-collapsable, [ngui-collapsable]',
                encapsulation: core_1.ViewEncapsulation.None,
                template: "<ng-content></ng-content>",
                styles: ["\n    [ngui-collapsable] [index] {\n      display: block;\n      cursor: pointer;\n      position: relative;\n      margin: 2px 0 0 0;\n      padding: .5em .5em .5em .7em;\n      border: 1px solid #cccccc;\n      background: #ededed;\n      font-weight: normal;\n      border-radius: 2px; \n      color: #2b2b2b;\n    }\n    [ngui-collapsable] [index].selected {\n      border: 1px solid #003eff;\n      background: #007fff;\n      color: #ffffff;\n      border-radius: 2px 2px 0 0;\n    }\n    [ngui-collapsable] [contents] {\n      border-top: 0;\n      background: #ffffff;\n      color: #333333;\n      padding: 0px;\n      border-radius: 0 0 2px 2px;\n      height: 0;\n      border: 0;\n      font-size: 0;\n    }\n    [ngui-collapsable] [contents].selected {\n      height: 50px;\n      padding: 10px;\n      border: 1px solid #dddddd;\n      transition: font-size 0.3s ease-in, height 0.3s ease-in;\n      font-size: inherit;\n    }\n  "],
            },] },
];
/** @nocollapse */
NguiCollapsableComponent.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
NguiCollapsableComponent.propDecorators = {
    'selectedIndex': [{ type: core_1.Input, args: ['selected',] },],
    'selectedIndexClass': [{ type: core_1.Input, args: ['selected-index-class',] },],
    'selectedContentsClass': [{ type: core_1.Input, args: ['selected-contents-class',] },],
};
exports.NguiCollapsableComponent = NguiCollapsableComponent;
//# sourceMappingURL=collapsable.component.js.map