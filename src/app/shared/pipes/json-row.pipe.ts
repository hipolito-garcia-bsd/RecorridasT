import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'jsonRow'
})
export class JsonRowPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  transform(value: any, args?: any): any {
    if (value !== undefined) {
      if (value !== null) {
        const res = JSON.stringify(value).toString();
        const arrString = res.replace('"', '')
        .replace('"', '').replace('"', '').replace('"', '')
        .replace('{', '').replace('}', '').split(',');

        let row2 = '';

        arrString.forEach(element => {
          const stringProp2 = element.split(':')[1];
          let valorCon: any;
          try {
            valorCon = parseInt(stringProp2, 0);
          } catch (error) {
            valorCon = stringProp2;
          }
          if (isNaN(valorCon) === true) {
            row2 += ` <td style='text-align: left;'>
            ${stringProp2}
          </td>`;
          } else {
            if (typeof valorCon === 'number') {
              if (valorCon >= 0) {
                row2 += ` <td style='text-align: center; font-weight: bold;'>
                          ${stringProp2}
                        </td>`;
              } else {
                row2 += ` <td style='text-align: center; color:#ff0000 !important; font-weight: bold;'>
                           (${stringProp2.replace('-', '')})
                          </td>`;
              }
            }
          }

        });

        return this.sanitizer.bypassSecurityTrustHtml(row2);
      }
    }
  }

}
