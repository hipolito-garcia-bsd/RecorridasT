import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recursosPipe'
})
export class RecursosPipe implements PipeTransform {

  transform(proyectos: any[], filter: Object): any {
    if (!proyectos || !filter) {
        return proyectos;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    console.log(filter);
    return proyectos.filter(item => item.Recurso.indexOf(filter['Nombre']) !== -1 );
  }

}
