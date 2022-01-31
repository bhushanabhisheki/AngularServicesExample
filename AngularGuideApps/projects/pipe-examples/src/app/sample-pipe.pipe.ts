import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class SamplePipePipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') return value;

    const resultArray = [];
    for (const item of value) {
      if (item[propName].startsWith(filterString)) resultArray.push(item);
    }

    console.log(resultArray);
    return resultArray;
  }
}
