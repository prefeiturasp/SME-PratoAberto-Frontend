import { PipeTransform } from '@angular/core';
export declare class HtmlCodePipe implements PipeTransform {
    transform(html: string, tagsIncludeExclude?: string): string;
}
