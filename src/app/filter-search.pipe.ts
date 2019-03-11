import { Pipe, PipeTransform } from '@angular/core';
import { isRegExp } from 'util';

@Pipe({
  name: 'FilterSearch'
})

export class FilterSearchPipe implements PipeTransform {

  transform(value: any[], searchText?: string): any[] {
    if(!value) return [];
    if(!searchText) return value;
    
    searchText  = searchText.toLocaleLowerCase();

    console.log('Testing');
  return value.filter(it => {
    return it.toLowerCase().includes(searchText)
  });
  }

}
