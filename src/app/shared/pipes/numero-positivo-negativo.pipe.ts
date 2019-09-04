import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'numeroPositivoNegativo'
})
export class NumeroPositivoNegativoPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  transform(value: any, args?: any): any {
    let valorCon: any;
    let row2 = '';
    if (value !== undefined) {
      if (value !== null) {
        try {
          valorCon = parseInt(value, 0);
        } catch (error) {
          valorCon = value;
        }
        if (isNaN(valorCon) === true) {
          row2 += ` <span style='text-align: left;'>
          ${valorCon}
          </span>`;
        } else {
          if (typeof valorCon === 'number') {
            if (valorCon >= 0) {
              row2 += ` <span style='text-align: center; font-weight: bold;'>
                        ${valorCon}
                      </span>`;
            } else {
              row2 += ` <span style='text-align: center; color:#ff0000 !important; font-weight: bold;'>
                         (${valorCon.toString().replace('-', '')})
                        </span>`;
            }
          }
        }
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(row2);
  }

}
