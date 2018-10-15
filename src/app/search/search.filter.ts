import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?) {
    const result = args ? value.filter((school) => {
      return school.nome.toLowerCase().indexOf(args.toLowerCase()) > - 1;
    }) : value;
    return  result;
  }
}
