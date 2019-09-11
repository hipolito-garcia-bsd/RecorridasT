import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CargarListado } from 'src/app/shared/models/pages/cargar/cargar.model';
import { AnularDT, AnularLinea, AnularSave } from 'src/app/shared/models/pages/anular/anular.model';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { ToolsService } from 'src/app/shared/services/tools/tools.service';
import { AnularService } from 'src/app/shared/services/anular/anular.service';
import { Subscription, Observable } from 'rxjs';
import { Error, errorsType, errorConfig } from 'src/app/shared/models/errors.model';
import { map } from 'rxjs/operators';
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

@Component({
  selector: 'app-anular',
  templateUrl: './anular.component.html',
  styleUrls: ['./anular.component.scss']
})
export class AnularComponent implements OnInit, OnDestroy {
  // FLAGS
  public submitted = false;
  // FORM GROUPS
  public anularFormGroup: FormGroup;
  // INPUTS DATA
  public lineaItems$: Observable<{ linea: ResponseGeneric }>;
  // SUBSCRIPTIONS
  private cargarDTA: Subscription; // Observable<{ anularTb: AnularDT }>;
  // DATA TABLE
  public cargarDTAItems: { anularTb: ResponseGeneric };
  // ViewChilds

  constructor(
    private formBuilder: FormBuilder,
    private error: ErrorsService,
    private tools: ToolsService,
    private toastr: NotificationService,
    private anularService: AnularService
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
    this.anularFormGroup = this.formBuilder.group({
      inputLinea: ['', [Validators.required]],
      inputFecha: ['', [Validators.required]]
    });
  }

  public getControl(path: string): AbstractControl {
    return this.anularFormGroup.get(path);
  }

  private unsubscribe(obj?: Subscription, all: boolean = false): void {
    if (obj) {
      if (obj) {
        obj.unsubscribe();
      }
    }
    if (all) {
      this.unsubscribe(this.cargarDTA);
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

  public buscarAnular(): void {
    this.submitted = true;

    if (!this.anularFormGroup.valid) {
      return;
    }

    this.tools.resetDataTable('#tblAlertas');
    const lineaValue = this.getControl('inputLinea').value;
    const fechaValue = moment(this.getControl('inputFecha').value, 'YYYY-MM-DD').format('YYYY-MM-DD');
    // moment.utc(moment(this.getControl('inputFecha').value, 'DD/MM/YYYY')).format();
    this.cargarDTA = this.anularService.getBuscarAnular(lineaValue, fechaValue).pipe(
      map((anularTb) => {
        const model: Array<AnularDT> = [];
        for (const item of anularTb.data) {
          model.push(new AnularDT({
            recorridakey: item.numerorecorrida_key,
            turnokey: item.turno_key,
            tiporecorrida: item.d_tiporecorrida,
            tipoGrupoRecorrida: item.d_tipoGrupoRecorrida,
            descripcionverificador: item.descripcionverificador,
            cantidadRecorridas: item.q_recorridas
          }));
        }
        anularTb.data = [];
        anularTb.data = model;
        return { anularTb };
      })
    ).subscribe(sb => {
      this.cargarDTAItems = sb;
      this.tools.convertirDataTable('#tblAlertas');
    }, (err) => {
      this.toastr.showToastr('Hubo un problema al cargar datos', 'Error', {
        type: typeNotification.error
      });
    });
  }

  public async agregarCausa(selectData: any): Promise<any> {
    const swalGen = Swal.mixin({
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#34495e',
      allowOutsideClick: () => !Swal.isLoading()
    });

    return await swalGen.fire({
      title: 'Causa Anulación',
      input: 'textarea',
      inputPlaceholder: 'Causa Anulación',
      inputAttributes: {
        'aria-label': 'Causa Anulación'
      },
      preConfirm: (pc) => {
        if (!pc) {
          Swal.showValidationMessage('escriba una causa');
        } else {
          return pc;
        }
      }
    }).then(async (rs) => {
      if (rs.value) {
        return await swalGen.fire({
          title: 'Anular',
          text: '¿ Esta seguro que desea Anular la Recorrida ?.',
          type: 'warning',
        }).then((rs2) => {
          if (rs2.value) {
            const model: Array<AnularSave> = [];
            model.push(
              { param: '@Causa', value: rs.value },
              { param: '@RecorridaNum', value: selectData.recorridakey },
              { param: '@SirKey', value: 'USER' }
            );
            this.anularService.putGuardarAnular(model).subscribe(sb => {
              if (sb.success) {
                this.toastr.showToastr('Se anuló correctamente', '', {
                  type: typeNotification.success
                });
                this.buscarAnular();
              }
            }, (err) => {
              this.toastr.showToastr('Hubo un problema al cargar datos', 'Error', {
                type: typeNotification.error
              });
            });
          }
        });
      }
    });
  }
}
