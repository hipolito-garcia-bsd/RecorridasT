import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatHorizontalStepper, MatStepper } from '@angular/material';
import { Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
// SweetAlert 2
import Swal from 'sweetalert2';
// MOMENT
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
// SERVICES
import { ErrorsService } from '../../shared/services/errors/errors.service';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { CargarService } from '../../shared/services/cargar/cargar.service';
import { ToolsService } from 'src/app/shared/services/tools/tools.service';
// MODELS
import { Error, errorsType, errorConfig } from '../../shared/models/errors.model';
import {
  CargarTurno, CargarMacroArea, CargarArea, CargarCliente,
  CargarTipoRecorridas, CargarListado, CargarVerificador, CargarDT, CargarDTSelected, CargarHoras, CargarHallazgos, CargarSaveModel
} from '../../shared/models/pages/cargar/cargar.model';
import { typeNotification } from 'src/app/shared/models/notification.model';

@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss']
})
export class CargarComponent implements OnInit, OnDestroy {
  //#region DECLARAR VARIABLES
  // FLAGS
  submitted = false;
  // FORM GROUPS
  public cargarFormGroup: FormGroup;
  public cargarDTFormGroup: FormGroup;
  // FORM ARRAYS
  public itemsDTFG: FormArray;
  // FORM CONTROLS
  public filterTiposRecorridaCtrl: FormControl = new FormControl();
  // INPUTS DATA
  public horaItems: Array<CargarHoras>;
  public tunoItems: Array<CargarTurno>;
  public macroAreaItems: Array<CargarMacroArea>;
  public clienteItems: Array<CargarCliente>;
  public areaItems: Array<CargarArea>;
  public listItems: Array<CargarListado>;
  public checkerItems: Array<CargarVerificador>;
  public tiposRecorridaItems: Array<CargarTipoRecorridas>;
  public hallazgosItems: Array<CargarHallazgos> = CargarHallazgos.getHallazgos(10);
  // SUBSCRIPTIONS
  public htmac: Subscription;
  public recorridaSave: Subscription;
  public ObsMacroAreaGroup: Subscription;
  public ObsListado: Subscription;
  public ObsRecOpTipR: Subscription;
  // DATA TABLE
  public cargarDTA: Array<CargarDT> = [];
  public dataSourceDG: MatTableDataSource<CargarDT> = null;
  public dtSelected: Array<[number, CargarDTSelected]> = []; // Index row | model
  // VIEW CHILDS
  @ViewChild('inputArea', { static: true }) childArea: ElementRef;
  @ViewChild('inputList', { static: true }) childListado: ElementRef;
  @ViewChild('inputChecker', { static: true }) childVerificador: ElementRef;
  @ViewChild('inputClient', { static: true }) childClient: ElementRef;
  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  //#endregion

  constructor(
    private formBuilder: FormBuilder,
    private errors: ErrorsService,
    private notify: NotificationService,
    private cargarService: CargarService,
    private tools: ToolsService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.initInputsFill();
  }

  ngOnDestroy() {
    this.unsubscribe(null, true);
  }

  initInputsFill(): void {
    this.htmac = forkJoin(
      this.cargarService.getHoras(),
      this.cargarService.getTurno(),
      this.cargarService.getMarcoArea(),
      this.cargarService.getCliente()
    ).pipe(
      map(([horas, turno, macroArea, cliente]) => {
        const turnoData: Array<CargarTurno> = [];

        for (const item of turno.data) {
          const key = Object.keys(item)[0];
          turnoData.push({ turno: item[key] });
        }

        turno.data = turnoData;
        return { horas, turno, macroArea, cliente };
      })
    ).subscribe(sb => {
      this.horaItems = sb.horas.data;
      this.tunoItems = sb.turno.data;
      this.macroAreaItems = sb.macroArea.data;
      this.clienteItems = sb.cliente.data;
    }, (err) => {
      this.notify.showToastr('Hubo un problema al cargar datos', 'Error', {
        type: typeNotification.error
      });
    });
  }

  private buildForm(): void {
    this.cargarFormGroup = this.formBuilder.group({
      inputDate: ['', [Validators.required]],
      inputStartTime: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(2)]],
      inputEndTime: ['', [Validators.required]],
      inputTurn: ['', [Validators.required]],
      inputFrameArea: ['', [Validators.required]],
      inputArea: ['', [Validators.required]],
      inputClient: ['', [Validators.required]],
      inputList: ['', [Validators.required]],
      inputChecker: ['', [Validators.required]]
    });
    this.cargarDTFormGroup = this.formBuilder.group({
      c: this.formBuilder.array([])
    });
  }

  public getControl(path: string): AbstractControl {
    return this.cargarFormGroup.get(path);
  }

  public stepperSubmmit(path: string | string[]) {
    if (Array.isArray(path)) {
      path.forEach(fe => {
        this.cargarFormGroup.get(fe).markAsTouched();
        this.cargarFormGroup.get(fe).updateValueAndValidity();
      });
    } else {
      this.cargarFormGroup.get(path).markAsTouched();
      this.cargarFormGroup.get(path).updateValueAndValidity();
    }
  }

  //#region DATOS GENERALES (DETECCIÓN)

  public macroAreaChange(item: Event, value: any) {
    this.cargarFormGroup.get('inputArea').reset();
    this.cargarFormGroup.get('inputList').reset();
    this.cargarFormGroup.get('inputChecker').reset();
    this.unsubscribe(this.ObsListado);
    this.unsubscribe(this.ObsMacroAreaGroup);
    this.childClient.nativeElement.disabled = true;
    this.childListado.nativeElement.disabled = true;

    if (value) {
      this.ObsMacroAreaGroup = forkJoin(
        this.cargarService.getArea(value),
        this.cargarService.getVerificador(value)
      ).pipe(
        map(([area, verificador]) => {
          return { area, verificador };
        })
      ).subscribe(sb => {
        this.areaItems = sb.area.data;
        this.checkerItems = sb.verificador.data;
        this.childArea.nativeElement.value = 0;
      }, (err) => {
        this.notify.showToastr('Hubo un problema al cargar datos', 'Error', {
          type: typeNotification.error
        });
      });
      this.childArea.nativeElement.disabled = false;
      this.childVerificador.nativeElement.disabled = false;
    } else {
      this.childArea.nativeElement.disabled = true;
      this.childVerificador.nativeElement.disabled = true;
    }
  }

  public areaChange(item: Event, value: any) {
    this.cargarFormGroup.get('inputList').reset();
    this.childListado.nativeElement.disabled = true;
    this.unsubscribe(this.ObsListado);

    if (value) {
      this.ObsListado = this.cargarService.getListas(value).subscribe((sb) => {
        this.listItems = sb.data;
      }, (err) => {
        this.notify.showToastr('Hubo un problema al cargar datos', 'Error', {
          type: typeNotification.error
        });
      });
      this.childListado.nativeElement.disabled = false;
      this.childClient.nativeElement.disabled = false;
    } else {
      this.childListado.nativeElement.disabled = true;
    }
  }
  //#endregion

  //#region  DATOS GENERALES
  public stepperChange(item: MatHorizontalStepper) {
    this.dtSelected = [];
    this.unsubscribe(this.ObsRecOpTipR);
    if (item.selectedIndex === 1) {
      const listValue = this.cargarFormGroup.get('inputList').value;

      this.ObsRecOpTipR = forkJoin([
        this.cargarService.getRecorridaOperaciones(listValue),
        this.cargarService.getTiposRecorrida()
      ]).pipe(
        map(([recorridaOp, tiposRecorrida]) => {
          return { recorridaOp, tiposRecorrida };
        })
      ).subscribe(sb => {
        this.tiposRecorridaItems = sb.tiposRecorrida.data;
        this.cargarDTA = [];

        for (const obj of sb.recorridaOp.data) {
          const key = Object.keys(obj)[0];
          this.cargarDTA.push(new CargarDT(obj[key], obj.linea_key, obj.tiporecorrida_key, null));
        }

        this.tools.convertirDataTable('#tblAlertas');
      }, (err) => {
        this.notify.showToastr('Hubo un problema al cargar datos', 'Error', {
          type: typeNotification.error
        });
      });
    }
  }

  public dGCheck(item: CargarDT, index: number, event: Event, value: boolean) {
    // const identifier = event.source._elementRef.nativeElement.dataset.identifier;
    // const rowIndex = this.dataSourceDG.filteredData.indexOf(item);

    const findIndexRow = this.dtSelected.findIndex(fi => fi[0] === index);

    if (findIndexRow === -1 && value) {
      const model = new CargarDTSelected(item.lineakey);
      this.dtSelected.push([index, model]);
    }
    if (findIndexRow !== -1 && value) {
      const model = this.dtSelected[findIndexRow][1];
      model.lineakey = item.lineakey;
    }
    if (findIndexRow !== -1 && !value) {
      const obj = this.dtSelected[findIndexRow][1];
      const valid = !obj.tiporecorridakey && !obj.cantidadHllazgos && obj.lineakey;
      if (valid) {
        this.dtSelected.splice(findIndexRow, 1);
      } else {
        const model = this.dtSelected[findIndexRow][1];
        model.lineakey = undefined;
      }
    }
    // console.log(this.dtSelected);
  }

  public dgChange(item: CargarDT, index: number, event: Event, value: any) {
    const findIndexRow = this.dtSelected.findIndex(fi => fi[0] === index);
    if (findIndexRow === -1 && value && value !== '') {
      const model = new CargarDTSelected(undefined, value);
      this.dtSelected.push([index, model]);
    }
    if (findIndexRow !== -1 && value && value !== '') {
      const model = this.dtSelected[findIndexRow][1];
      model.tiporecorridakey = value;
    }
    if (findIndexRow !== -1 && (value === undefined || value === null || value === '')) {
      const obj = this.dtSelected[findIndexRow][1];
      const valid = !obj.cantidadHllazgos && !obj.lineakey && obj.tiporecorridakey;
      if (valid) {
        this.dtSelected.splice(findIndexRow, 1);
      } else {
        const model = this.dtSelected[findIndexRow][1];
        model.tiporecorridakey = undefined;
      }
    }
    // console.log(this.dtSelected);
  }

  public dgKeyChange(item: CargarDT, index: number, event: Event, value: string) {
    const findIndexRow = this.dtSelected.findIndex(fi => fi[0] === index);
    if (findIndexRow === -1 && value) {
      const model = new CargarDTSelected(undefined, undefined, +value);
      this.dtSelected.push([index, model]);
    }
    if (findIndexRow !== -1 && value) {
      const model = this.dtSelected[findIndexRow][1];
      model.cantidadHllazgos = +value;
    }
    if (findIndexRow !== -1 && (value === undefined || value === null || value === '')) {
      const obj = this.dtSelected[findIndexRow][1];
      const valid = !obj.lineakey && !obj.tiporecorridakey && obj.cantidadHllazgos;
      if (valid) {
        this.dtSelected.splice(findIndexRow, 1);
      } else {
        const model = this.dtSelected[findIndexRow][1];
        model.cantidadHllazgos = undefined;
      }
    }
    // console.log(this.dtSelected);
  }

  public save() {
    const dataDT: Array<CargarDTSelected> = this.tools.deepCopy(this.dtSelected);
    for (let i = 0; i < dataDT.length; i++) {
      const valid = dataDT[i][1].cantidadHllazgos && dataDT[i][1].lineakey && dataDT[i][1].tiporecorridakey;
      if (!valid) {
        dataDT.splice(i, 1);
        i--;
      }
    }

    this.submitted = true;

    if (dataDT.length === 0) {
      Swal.fire({
        type: 'error',
        title: 'Campos no completados',
        text: 'Llene al menos una fila de la tabla',
        focusConfirm: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#34495e'
      });
      return;
    }
    const formData = this.cargarFormGroup.value;
    // const finalModel = Object({ ...formData, ...dataDT });
    const fechaMx = moment.utc(moment(formData.inputDate, 'DD/MM/YYYY'));
    const finalModel = new CargarSaveModel({
      username: '',
      fecha: fechaMx.format(),
      month: fechaMx.format('M'),
      year: fechaMx.format('YYYY'),
      horaIni: formData.inputStartTime,
      horaFin: formData.inputEndTime,
      turno: formData.inputTurn,
      area: formData.inputArea,
      cliente: formData.inputArea,
      listado: formData.inputList,
      verificador: formData.inputChecker,
      list: []
    });

    for (const item of dataDT) {
      finalModel.list.push(
        {
          filters: [
            { param: '@Linea', value: item[1].lineakey.toString() },
            { param: '@TipoRecorrido', value: item[1].tiporecorridakey.toString() }
          ]
        },
      );
    }

    this.recorridaSave = this.cargarService.postSave(finalModel).subscribe((sb) => {
      // console.log(sb);
      if (sb.success) {
        Swal.fire({
          type: 'success',
          title: 'Se guardo correctamente',
          focusConfirm: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#34495e'
        });
        this.tools.resetDataTable('#tblAlertas');
        this.stepper.reset();
        this.cargarFormGroup.reset();
      } else {
        this.notify.showToastr('Hubo un problema al guardar', 'Error', {
          type: typeNotification.error
        });
      }
    }, (err) => {
      this.notify.showToastr('Hubo un problema al guardar', 'Error', {
        type: typeNotification.error
      });
    });
  }
  //#endregion

  private unsubscribe(obj?: Subscription, all: boolean = false) {
    if (obj) {
      if (obj) {
        obj.unsubscribe();
      }
    }
    if (all) {
      this.unsubscribe(this.ObsMacroAreaGroup);
      this.unsubscribe(this.ObsListado);
      this.unsubscribe(this.ObsRecOpTipR);
      this.unsubscribe(this.htmac);
      this.unsubscribe(this.recorridaSave);
    }
  }

  public getError(controlName: string, formGroup: FormGroup): string {
    const control = formGroup.get(controlName);
    let actualLength = 0;
    let requiredLength = 0;

    for (const item in control.errors) {
      actualLength = control.errors[item].actualLength;
      requiredLength = control.errors[item].requiredLength;
    }

    return this.errors.getError(controlName, formGroup, [
      new Error(errorsType.required, errorConfig.required),
      new Error(errorsType.maxlength, `${errorConfig.maxlength} ${requiredLength}`),
      new Error(errorsType.minlength, `${errorConfig.minlength} ${requiredLength}`),
      new Error(errorsType.email, errorConfig.email)
    ], true);
  }
}
