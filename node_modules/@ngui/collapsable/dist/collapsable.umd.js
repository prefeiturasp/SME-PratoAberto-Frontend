(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms"], factory);
	else if(typeof exports === 'object')
		exports["collapsable"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"));
	else
		root["collapsable"] = factory(root["@angular/core"], root["@angular/common"], root["@angular/forms"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
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
__decorate([
    core_1.Input('selected'),
    __metadata("design:type", String)
], NguiCollapsableComponent.prototype, "selectedIndex", void 0);
__decorate([
    core_1.Input('selected-index-class'),
    __metadata("design:type", String)
], NguiCollapsableComponent.prototype, "selectedIndexClass", void 0);
__decorate([
    core_1.Input('selected-contents-class'),
    __metadata("design:type", String)
], NguiCollapsableComponent.prototype, "selectedContentsClass", void 0);
NguiCollapsableComponent = __decorate([
    core_1.Component({
        selector: 'ngui-collapsable, [ngui-collapsable]',
        encapsulation: core_1.ViewEncapsulation.None,
        template: "<ng-content></ng-content>",
        styles: ["\n    [ngui-collapsable] [index] {\n      display: block;\n      cursor: pointer;\n      position: relative;\n      margin: 2px 0 0 0;\n      padding: .5em .5em .5em .7em;\n      border: 1px solid #cccccc;\n      background: #ededed;\n      font-weight: normal;\n      border-radius: 2px; \n      color: #2b2b2b;\n    }\n    [ngui-collapsable] [index].selected {\n      border: 1px solid #003eff;\n      background: #007fff;\n      color: #ffffff;\n      border-radius: 2px 2px 0 0;\n    }\n    [ngui-collapsable] [contents] {\n      border-top: 0;\n      background: #ffffff;\n      color: #333333;\n      padding: 0px;\n      border-radius: 0 0 2px 2px;\n      height: 0;\n      border: 0;\n      font-size: 0;\n    }\n    [ngui-collapsable] [contents].selected {\n      height: 50px;\n      padding: 10px;\n      border: 1px solid #dddddd;\n      transition: font-size 0.3s ease-in, height 0.3s ease-in;\n      font-size: inherit;\n    }\n  "],
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], NguiCollapsableComponent);
exports.NguiCollapsableComponent = NguiCollapsableComponent;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(4);
var forms_1 = __webpack_require__(5);
var collapsable_component_1 = __webpack_require__(0);
var NguiCollapsableModule = (function () {
    function NguiCollapsableModule() {
    }
    return NguiCollapsableModule;
}());
NguiCollapsableModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        declarations: [collapsable_component_1.NguiCollapsableComponent],
        exports: [collapsable_component_1.NguiCollapsableComponent]
    })
], NguiCollapsableModule);
exports.NguiCollapsableModule = NguiCollapsableModule;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var collapsable_component_1 = __webpack_require__(0);
exports.NguiCollapsableComponent = collapsable_component_1.NguiCollapsableComponent;
var collapsable_module_1 = __webpack_require__(2);
exports.NguiCollapsableModule = collapsable_module_1.NguiCollapsableModule;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=collapsable.umd.js.map