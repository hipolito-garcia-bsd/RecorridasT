import { Injectable } from '@angular/core';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons-bs4';

import * as $ from 'jquery';
import { DtOptionsDefault } from '../../models/pages/tools/tools.model';
// declare let $: any;
// Increment for index array

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  getOptions(customOptions?: Partial<DataTables.Settings>): any {
    const mergeOptions = Object.assign({}, DtOptionsDefault, customOptions);
    return mergeOptions;
  }

  convertirDataTable(selector: string) {
    $(selector).DataTable().destroy();
    setTimeout(() => {
      $(selector).DataTable({
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        language: {
          processing: 'Procesando...',
          lengthMenu: 'Mostrar _MENU_ registros',
          zeroRecords: 'No se encontraron resultados',
          emptyTable: 'Ningún dato disponible en esta tabla',
          info: '_START_ a _END_ de _TOTAL_ registro(s)',
          infoEmpty: '0 a 0 de 0 registros',
          infoFiltered: '(filtrado de un total de _MAX_ registros)',
          infoPostFix: '',
          search: 'Buscar:',
          url: '',
          thousands: ',',
          loadingRecords: 'Cargando...',
          paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior'
          },
          aria: {
            sortAscending: ': Activar para ordenar la columna de manera ascendente',
            sortDescending: ': Activar para ordenar la columna de manera descendente'
          }
        }
        // buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });
    }, 1000);
  }

  resetDataTable(selector: string) {
    const dt = $(selector).DataTable();
    dt.clear();
    dt.destroy();
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
  // sparkline(elemento: string, arreglo: any, arregloMes: any) {
  //   // Array Mes - Valor
  //   const MesVal: any = [];

  //   for (let i = 0; i < arregloMes.length; i++) {
  //     MesVal.push(arregloMes[i] + '-' + arreglo[i]);
  //   }

  //   $(elemento).sparkline(arreglo, {
  //     type: 'line',
  //     width: '95%',
  //     height: '25',
  //     fillColor: false,
  //     lineColor: 'red',
  //     tooltipFormat: '{{offset:slice}}',
  //     tooltipValueLookups: {
  //       slice: MesVal
  //     }
  //   });
  // }

  openWin(url, title, wi, he) {

    const w = ((screen.availWidth - 100));
    const h = screen.availHeight - 200;
    const iLeft = (screen.availWidth - w) / 2;
    const iTop = (screen.availHeight - h) / 2;
    // tslint:disable-next-line: max-line-length
    const oWin = window.open(url, '', 'left=' + iLeft + ',top=' + iTop + ',height=' + h + ',width=' + w + ',menubar=0,toolbar=0,location=0,status=0,scrollbars=0,resizable=1', true);
    oWin.focus();

  }

  deepCopy(obj: any) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null === obj || 'object' !== typeof obj) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.deepCopy(obj[attr]);
        }
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn t supported.');
  }
}
