import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'htmlCode'})
export class HtmlCodePipe implements PipeTransform {
  transform(html: string, tagsIncludeExclude?: string): string {
    let ret: string;
    let tagsInclude: string[] = [];
    let tagsExclude: string[] = [];

    (tagsIncludeExclude||'').split(',').forEach(function(tag) {
      if (tag.match(/^-/)) {
        tag = tag.replace(/^-/,'');
        tagsExclude.push(tag);
      } else if (tag !== '') {
        tagsInclude.push(tag);
      }
    });

    ret = tagsInclude.length > 0 ? '' : html;

    if (tagsInclude.length > 0) {
      tagsInclude.forEach(tag => {
        let regEx = new RegExp(`<${tag}>([\\s\\S]*?)<\/${tag}>`);
        let matches = html.match(regEx);
        let output = matches[0].replace(/<\/?ngui-utils-[0-9]+>\s*/g, ''); //remove <ngui-utils-xxx> and </ngui-utils-xxx>
        ret = ret + output;
      });
    }

    if (tagsExclude.length > 0) {
      tagsExclude.forEach(tag => {
        let regEx = new RegExp(`<${tag}>([\\s\\S]*?)<\/${tag}>`);
        ret = ret.replace(regEx, '');
      });
    }

    return ret;
  }
}