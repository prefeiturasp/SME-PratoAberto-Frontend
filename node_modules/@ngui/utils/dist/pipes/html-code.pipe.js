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
var core_1 = require("@angular/core");
var HtmlCodePipe = (function () {
    function HtmlCodePipe() {
    }
    HtmlCodePipe.prototype.transform = function (html, tagsIncludeExclude) {
        var ret;
        var tagsInclude = [];
        var tagsExclude = [];
        (tagsIncludeExclude || '').split(',').forEach(function (tag) {
            if (tag.match(/^-/)) {
                tag = tag.replace(/^-/, '');
                tagsExclude.push(tag);
            }
            else if (tag !== '') {
                tagsInclude.push(tag);
            }
        });
        ret = tagsInclude.length > 0 ? '' : html;
        if (tagsInclude.length > 0) {
            tagsInclude.forEach(function (tag) {
                var regEx = new RegExp("<" + tag + ">([\\s\\S]*?)</" + tag + ">");
                var matches = html.match(regEx);
                var output = matches[0].replace(/<\/?ngui-utils-[0-9]+>\s*/g, ''); //remove <ngui-utils-xxx> and </ngui-utils-xxx>
                ret = ret + output;
            });
        }
        if (tagsExclude.length > 0) {
            tagsExclude.forEach(function (tag) {
                var regEx = new RegExp("<" + tag + ">([\\s\\S]*?)</" + tag + ">");
                ret = ret.replace(regEx, '');
            });
        }
        return ret;
    };
    return HtmlCodePipe;
}());
HtmlCodePipe = __decorate([
    core_1.Pipe({ name: 'htmlCode' }),
    __metadata("design:paramtypes", [])
], HtmlCodePipe);
exports.HtmlCodePipe = HtmlCodePipe;
//# sourceMappingURL=html-code.pipe.js.map