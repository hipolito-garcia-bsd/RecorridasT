import { Injectable } from '@angular/core';

declare var $: any;
// Increment for index array

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  convertirDataTable(selector: string) {
    $(selector).dataTable().fnDestroy();
    setTimeout(() => {
      $(selector).dataTable( {
        lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, 'All'] ],
        language: {
            sProcessing:     'Procesando...',
            sLengthMenu:     'Mostrar _MENU_ registros',
            sZeroRecords:    'No se encontraron resultados',
            sEmptyTable:     'Ningún dato disponible en esta tabla',
            sInfo:           '_START_ a _END_ de _TOTAL_ registro(s)',
            sInfoEmpty:      '0 a 0 de 0 registros',
            sInfoFiltered:   '(filtrado de un total de _MAX_ registros)',
            sInfoPostFix:    '',
            sSearch:         'Buscar:',
            sUrl:            '',
            sInfoThousands:  ',',
            sLoadingRecords: 'Cargando...',
            oPaginate: {
                sFirst:    'Primero',
                sLast:     'Último',
                sNext:     'Siguiente',
                sPrevious: 'Anterior'
            },
            oAria: {
                sSortAscending:  ': Activar para ordenar la columna de manera ascendente',
                sSortDescending: ': Activar para ordenar la columna de manera descendente'
            }
        }
      });
    }, 1000);
  }

  // Recupero el valor de los meses
  convertirArrSpark(result: any, valor: string) {
    const arr: any = [];
    // tslint:disable-next-line: forin
    for (const k in result) {
      if ([k].toString().includes(valor)) {
        arr.push(result[k]);
      }
    }
    return arr;
  }

  // Recupero el nombre de los meses
  convertirArrSparkName(result: any, nombre: string) {
    const ar2: any = [];
    for (const k in result) {
      if ([k].toString().includes(nombre)) {
        ar2.push(result[k]);
      }
    }
    return ar2;
  }

  // Pinta los valores y el formato para el tooltip
  sparkline(elemento: string, arreglo: any, arregloMes: any) {
    // Array Mes - Valor
    const MesVal: any = [];

    for (let i = 0; i < arregloMes.length; i++) {
      MesVal.push(arregloMes[i] + '-' + arreglo[i]);
    }

    $(elemento).sparkline(arreglo, {
      type: 'line',
      width: '95%',
      height: '25',
      fillColor: false,
      lineColor: 'red',
      tooltipFormat: '{{offset:slice}}',
      tooltipValueLookups: {
        slice: MesVal
      }
    });
  }

  openWin(url, title, wi, he) {

    const w = ((screen.availWidth - 100));
    const h = screen.availHeight - 200;
    const iLeft = (screen.availWidth - w) / 2;
    const iTop = (screen.availHeight - h) / 2;
    // tslint:disable-next-line: max-line-length
    const oWin = window.open(url, '' , 'left=' + iLeft + ',top=' + iTop + ',height=' + h + ',width=' + w + ',menubar=0,toolbar=0,location=0,status=0,scrollbars=0,resizable=1', true);
    oWin.focus();

  }
}
