/**
 * Pasos para el uso del filtro en mat-select.
 * En el componente:
 * 1. Importe el servicio y la interface:
 * import { SelectFilterModel, SelectFilterService } from 'src/app/services/filters/selectFilter/select-filter.service';
 * 2. Agregue el servicio en el contructor:
 * constructor(
 * ...
 * private selectFilterService: SelectFilterService
 * ...
 * ) { }
 * 3. Cree una interface que vendria siendo el modelo final de los datos a usar:
 * export interface MiInterface {}
 * 4. Obtenga y guarde los datos en una variable publica donde el tipo de dato sea la interface anteriormente creada:
 * public datos: Array<MyInterface>;
 * 5. Cree una variable publica de tipo ReplaySubject el cual tendra un arreglo del mismo tipo de la interface creada:
 * public filterSelect: ReplaySubject<Array<MyInterface>> = new ReplaySubject<Array<MyInterface>>(1);
 * 6. Cree una variable publica de tipo Subject por cada selct que se utilizara el filtro:
 * protected onDestroy = new Subject<void>();
 * 7. ya sea dentro de un formBuilder.group o un formControl para cada input, agregue los inputs que se utilizarán
 * public myFormGroup: FormGroup;
 * this.cargarFormGroup = this.formBuilder.group({
 * Input1Control: ['', [Validators.required, etc]] NOTA: Este sera en si el input del select el cual tendra validaciones etc.
 * filterInput1: [''], Nota: Este sera unicamente del control del filtrado
 * filterInput2: [''], Nota: Este sera unicamente del control del filtrado
 * etc.
 * });
 * public filterInput1: FormControl = new FormControl();
 * public filterInput2: FormControl = new FormControl();
 * 8. Se crea un ViewChild de cada select que tendra el filtro:
 * @ViewChild('Input1', { static: true }) childInput1: MatSelect;
 * @ViewChild('Input2', { static: true }) childInput2: MatSelect;
 * 9. Creamos una funcion privada la cual sera la que haga el proceso de filtrado:
 * private selectFilterClient(): void {
 * Se crea la logica de busqueda, esta se puede cambiar si asi lo desea:
 * const compareWith = (a: MiInterface, b: MiInterface) => a && b && a.d_cliente === b.d_cliente;
 * Se crea el modelo de tipo SelectFilterModel el cual se importo anteriormente junto con el servicio.
 * En esta parte es donde se utilizará todo lo creado anteriormente.
 * const model = new SelectFilterModel({
 * ctrl: this.myFormGroup.get('filterInput1'), Este dato se crea en el punto 7
 * NOTA: Como se dijo se puede usar un FormControl o un AbstractControl (El cual viene siendo la obtencion del control del Group)
 * data: this.datos, Este dato se crea en el punto 4, estos son los datos que se obtienen y los cuales se veran en el select
 * filter: this.filterSelect, Este dato se crea en el punto 5 este es el que tendra los datos finales a mostrar en el select
 * filterColumn: 'd_cliente', es solamente la columna la cual se filtrará,esta columna se encuentra en la interface creada.
 * obj: this.childInput1, Este dato se crea en el punto 8
 * compareWith, Este dato es el que creamos aqui mismo
 * onDestroy: this.onDestroy Este dato se crea en el punto 6,
 * NOTA: Este es importante ya que sera el que se use para completar (Terminar) el control de filtro cada que se vuelva a cargar el select
 * )}
 * Con todo esto simplemente llamamos a esta funcion que se encuentra en el servicio:
 * this.selectFilterService.initFilter(model);
 * }
 * 10. Dentro de ngOnDestroy tenemos que llamar a una funcion del servicio para terminar el filtrado:
 * this.selectFilterService.onDestroy();
 * NOTA: Cada que se vuelva a crear un select o cada que se vuelva a cargar datos,
 *       se tiene que llamar a la misma funcion anterior con la diferencia de que se le enviará un parametro:
 * this.selectFilterService.onDestroy('filterInput1'); se manda el identificador que se utilizo en el FormGroup o FormControl
 * En la Vista:
 * 1. Nuestro html quedaría de esta forma:
 * <form [formGroup]="myFormGroup">
 *  <mat-select #Input1 name="Input1Control"
 *   formControlName="Input1Control" [id]="'Input1Control'"
 *   [disableOptionCentering]="false"> NOTA: POR CUESTIONES DE STYLO ESTA OPCION DE PONE COMO FALSE
 *   <mat-option>
 *       <ngx-mat-select-search formControlName="filterInput1"
 * NOTA: Si hubieramos usado FormControl todo seria lo mismo con la diferencia de que no llevaría formControlName si no [formControl]=""
 *           [placeholderLabel]="'Buscar'"
 *           [noEntriesFoundLabel]="'No existen resultados'">
 *       </ngx-mat-select-search>
 *   </mat-option>
 *   <mat-option>Seleccione</mat-option>
 *   <mat-option *ngFor="let item of filterSelect | async" [value]="item">
 *       {{item.d_cliente}}
 *   </mat-option>
 *  </mat-select>
 * </form>
 */

import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

export class SelectFilterModel {
  ctrl: FormControl | AbstractControl;
  data: Array<any>;
  filter: ReplaySubject<Array<any>>;
  filterColumn: string;
  obj: MatSelect;
  compareWith: any;
  onDestroy: Subject<void>;
  id: string;
  identifier: string;

  constructor(selectFilterModel: SelectFilterModel) {
    this.ctrl = selectFilterModel.ctrl;
    this.data = selectFilterModel.data;
    this.filter = selectFilterModel.filter;
    this.filterColumn = selectFilterModel.filterColumn;
    this.obj = selectFilterModel.obj;
    this.compareWith = selectFilterModel.compareWith;
    this.onDestroy = selectFilterModel.onDestroy;
    this.id = selectFilterModel.id;
    this.identifier = selectFilterModel.identifier;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SelectFilterService {
  private controlArray: Array<[string, string, SelectFilterModel]> = [];

  constructor() { }

  /**
   * Iniciar el control de filtrado
   * @param model - Modelo de la interface SelectFilterModel
   * @returns -
   */
  public initFilter(model: SelectFilterModel): void {
    const id = model.id;
    const identifier = model.identifier;
    const find = this.controlArray.find(f => f[0] === id && f[1] === identifier);
    if (this.controlArray.length !== 0 && find !== undefined && find.length > 0) {
      const findIndex = this.controlArray.findIndex(fi => fi[0] === id && fi[1] === identifier);
      find[2].onDestroy.next();
      find[2].onDestroy.complete();
      this.controlArray.splice(findIndex, 1);
    }
    this.controlArray.push([id, identifier, model]);
    console.log(this.controlArray);
    model.filter.next(model.data.slice());
    this.filterChange(model);
  }

  /**
   * Termina el o los controles de filtrado
   * @param controlId - string: Nombre del control, el cual es el del formBuilder.group o FormControl
   * @param all - boolean: finaliza todos los controles
   * @returns -
   */
  public onDestroy(controlId: string = null, identifier: string = null, all: boolean = false) {
    if ((controlId === null || controlId === undefined) && (identifier === null || identifier === undefined) && (all || !all)) {
      for (const item of this.controlArray) {
        item[2].onDestroy.next();
        item[2].onDestroy.complete();
      }
      this.controlArray = [];
      console.log(this.controlArray);
    }
    if (controlId !== null && controlId !== undefined && (identifier === null || identifier === undefined) && !all) {
      const find = this.controlArray.find(f => f[0] === controlId);
      if (this.controlArray.length !== 0 && find !== undefined && find.length > 0) {
        const findIndex = this.controlArray.findIndex(fi => fi[0] === controlId);
        find[2].onDestroy.next();
        find[2].onDestroy.complete();
        this.controlArray.splice(findIndex, 1);
        console.log(this.controlArray);
      }
    }
    if (controlId !== null && controlId !== undefined && identifier !== null && identifier !== undefined && !all) {
      const find = this.controlArray.find(f => f[0] === controlId && f[1] === identifier);
      if (this.controlArray.length !== 0 && find !== undefined && find.length > 0) {
        const findIndex = this.controlArray.findIndex(fi => fi[0] === controlId && fi[1] === identifier);
        find[2].onDestroy.next();
        find[2].onDestroy.complete();
        this.controlArray.splice(findIndex, 1);
        console.log(this.controlArray);
      }
    }
  }

  protected filterChange(model: SelectFilterModel) {
    model.ctrl.valueChanges
      .pipe(takeUntil(model.onDestroy))
      .subscribe(() => {
        this.filterSelect(model); // 'd_cliente'
      });
    this.setSelectInitialValue(model);
  }

  protected setSelectInitialValue(model: SelectFilterModel) {
    model.filter.pipe(take(1), takeUntil(model.onDestroy))
      .subscribe(() => {
        model.obj.compareWith = model.compareWith;
      });
  }

  protected filterSelect(model: SelectFilterModel) {
    if (!model.data) {
      return;
    }
    // get the search keyword
    let search = model.ctrl.value;
    if (!search) {
      model.filter.next(model.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    model.filter.next(model.data.filter(f => f[model.filterColumn].toLowerCase().indexOf(search) > -1));
  }
}
