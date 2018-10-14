import { Pipe, PipeTransform } from '@angular/core';
import * as js_beautify from 'js-beautify/js';

@Pipe({name: 'jsCode'})
export class JavascriptCodePipe implements PipeTransform {
  transform(value: string): string {
    value = value.toString();
    let ret: string = value;
    return js_beautify(value);
  }
}