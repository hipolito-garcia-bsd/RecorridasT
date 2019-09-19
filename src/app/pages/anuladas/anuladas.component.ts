import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// MODELS
import { CargarListado } from 'src/app/shared/models/pages/cargar/cargar.model';
import { AnuladasDT, IAnuladasDT } from 'src/app/shared/models/pages/anuladas/anuladas.model';
import { errorsType, errorConfig, Error } from 'src/app/shared/models/errors.model';
// SERVICES
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { ToolsService } from 'src/app/shared/services/tools/tools.service';
import { AnuladasService } from 'src/app/shared/services/anuladas/anuladas.service';
import { AnularService } from 'src/app/shared/services/anular/anular.service';
// MOMENT
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
// SweetAlert 2
import Swal from 'sweetalert2';
// Notifications
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { typeNotification } from 'src/app/shared/models/notification.model';
import { ResponseGeneric } from 'src/app/shared/models/generic.model';
import { ExtendedType } from 'src/app/shared/models/pages/tools/tools.model';


@Component({
  selector: 'app-anuladas',
  templateUrl: './anuladas.component.html',
  styleUrls: ['./anuladas.component.scss']
})
export class AnuladasComponent implements OnInit, OnDestroy {
  // FLAGS
  public submitted = false;
  // FORM GROUPS
  public anuladasFormGroup: FormGroup;
  // IMPUTS DATA
  public lineaItems$: Observable<{ linea: ResponseGeneric }>;
  private selectedLineaText: string;
  // SUBSCRIPTORS
  private cargarDT: Subscription;
  // DATA TABLE
  public cargarDTItems: { anuladasTb: ResponseGeneric };
  public dtOptions: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private error: ErrorsService,
    private tools: ToolsService,
    private toastr: NotificationService,
    private anularService: AnularService,
    private anuladasServuce: AnuladasService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.callEndpointsInit();
  }

  ngOnDestroy() {
    this.unsubscribe(null, true);
  }

  private callEndpointsInit(): void {
    this.lineaItems$ = this.anularService.getLinea().pipe(
      map((linea) => {
        return { linea };
      })
    );
  }

  private buildForm(): void {
    this.anuladasFormGroup = this.formBuilder.group({
      inputLinea: ['', [Validators.required]]
    });
  }

  public getControl(path: string): AbstractControl {
    return this.anuladasFormGroup.get(path);
  }

  private unsubscribe(obj?: Subscription, all: boolean = false): void {
    if (obj) {
      if (obj) {
        obj.unsubscribe();
      }
    }
    if (all) {
      this.unsubscribe(this.cargarDT);
    }
  }

  public getError(controlName: string, formGroup: FormGroup): string {
    const control = formGroup.get(controlName);
    let actualLength = 0;
    let requiredLength = 0;

    if (control.errors) {
      for (const key of Object.keys(control.errors)) {
        actualLength = control.errors[key].actualLength;
        requiredLength = control.errors[key].requiredLength;
      }
    }

    return this.error.getError(controlName, formGroup, [
      new Error(errorsType.required, errorConfig.required),
      new Error(errorsType.maxlength, `${errorConfig.maxlength} ${requiredLength}`),
      new Error(errorsType.minlength, `${errorConfig.minlength} ${requiredLength}`),
      new Error(errorsType.email, errorConfig.email)
    ], true);
  }

  public buscarAnuladas(): void {
    this.submitted = true;

    if (!this.anuladasFormGroup.valid) {
      return;
    }

    this.tools.resetDataTable('#tblAlertas');
    const lineaValue = this.getControl('inputLinea').value;
    const messageTop = `Linea: ${this.selectedLineaText} (${lineaValue}).`;
    this.dtOptions = this.getdtOptions(messageTop);
    this.cargarDT = this.anuladasServuce.getBuscarAnuladas(lineaValue).pipe(
      map((anuladasTb) => {
        // const model: Array<AnuladasDT> = [];
        // for (const item of anuladasTb.data) {
        //   model.push(new AnuladasDT({
        //     fecha: item.fecha,
        //     turno: item.turno,
        //     tipo: item.tipo,
        //     verificador: item.Verificador,
        //     causa: item.causa
        //   }));
        // }
        // anuladasTb.data = [];
        // anuladasTb.data = model;
        return { anuladasTb };
      })
    ).subscribe(sb => {
      this.cargarDTItems = sb;
      this.tools.convertirDataTable('#tblAlertas', this.dtOptions);
    });
  }

  public changeLinea(event: any) {
    const index = event.target.selectedIndex;
    const text = event.target[index].text;
    this.selectedLineaText = text;
  }

  private getdtOptions(messageTop: string): any {
    // return this.tools.getOptions(
    return {
      buttons: [
        {
          extend: this.tools.isIeOrEdge ? ExtendedType.excel : ExtendedType.excelHtml5,
          text: 'Excel',
          messageTop,
          className: 'buttonsDownloadDT'
        },
        {
          extend: this.tools.isIeOrEdge ? ExtendedType.pdf : ExtendedType.pdfHtml5,
          text: 'Pdf',
          messageTop,
          className: 'buttonsDownloadDT pb-11'
        },
      ]
    };
  }
}
