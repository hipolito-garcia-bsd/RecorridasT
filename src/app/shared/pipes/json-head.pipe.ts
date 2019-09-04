import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'jsonHead'
})
export class JsonHeadPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  transform(value: any, args?: any): any {
    if (value !== undefined) {
      const res = JSON.stringify(value).toString();
      const arrString = res.split(',');

      let head = '';
      arrString.forEach(element => {
        const stringProp = element.replace('"', '')
        .replace('"', '').replace('{', '')
        .replace('}', '').split(':')[0];
        if (stringProp === 'descripcion') {
          head += `<th></th>`;
        }
        if (stringProp !== 'descripcion') {
          head += `<th style='font-weight: bold; text-align: center; text-transform: capitalize;'>
                        ${stringProp}
                  </th>`;
        }
      });

      return  this.sanitizer.bypassSecurityTrustHtml(head);
    }
  }



}
