import { NgModule } from '@angular/core';

import { scrollTo } from './dom-functions/scroll-to';
import { elementVisible } from './dom-functions/element-visible';
import { computedStyle } from './dom-functions/computed-style';
import { outerWidth } from './dom-functions/outer-width';
import { outerHeight } from './dom-functions/outer-height';

import { HtmlCodePipe } from './pipes/html-code.pipe';
import { JavascriptCodePipe } from './pipes/javascript-code.pipe';
import { NguiUtilsDirective } from "./directives/utils.directive";

@NgModule({
  declarations: [
    HtmlCodePipe,
    JavascriptCodePipe,
    NguiUtilsDirective
  ],
  exports: [
    HtmlCodePipe,
    JavascriptCodePipe,
    NguiUtilsDirective
  ]
})
export class NguiUtilsModule {}