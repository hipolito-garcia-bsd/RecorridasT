import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = ''; // environment.URL_SER_GENERAL + '/imagen';

    if (!img) {
      return url + '/usuarios/xxx';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
         url += '/usuarios/' + img;
         break;
      case 'medico':
         url += '/medicos/' + img;
         break;
      case 'hospital':
         url += '/hospitales/' + img;
         break;
      default:
        url += '/usuarios/xxx';
        break;
    }

    return url;
  }

}
