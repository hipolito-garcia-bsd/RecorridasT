import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorsService } from '../errors/errors.service';
import { NotificationService } from '../notification/notification.service';
import { CargarGeneric } from '../../models/pages/cargar/cargar.model';

@Injectable({
  providedIn: 'root'
})
export class CargarService {
  private readonly uri = 'http://localhost:3500/recorrida';
  private readonly getHorasUrl = `${this.uri}/Horas`;
  private readonly getTurnoUrl = `${this.uri}/Turno`;
  private readonly getMarcoAreaUrl = `${this.uri}/MacroArea`;
  private readonly getAreaUrl = `${this.uri}/Area`;
  private readonly getClienteUrl = `${this.uri}/Clientes`;
  private readonly getListasUrl = `${this.uri}/Listado`;
  private readonly getVerificadorUrl = `${this.uri}/Verificadores`;
  private readonly getRecorridaOperacionesUrl = `${this.uri}/RecorridaOpciones`;
  private readonly getTiposRecorridaUrl = `${this.uri}/TipoRecorrida`;
  private readonly posSaveUrl = `${this.uri}/Recorrida/200`;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService,
    private notify: NotificationService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getHoras(): Observable<any> {
    return this.http.get<any>(this.getHorasUrl, this.httpOptions);
  }

  getTurno(): Observable<any> {
    return this.http.get<any>(this.getTurnoUrl, this.httpOptions);
  }

  getMarcoArea(): Observable<any> {
    return this.http.get<any>(this.getMarcoAreaUrl, this.httpOptions);
  }

  getArea(marcoAreaKey: string): Observable<any> {
    const url = `${this.getAreaUrl}/${marcoAreaKey}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  getCliente(): Observable<any> {
    return this.http.get<any>(this.getClienteUrl, this.httpOptions);
  }

  getListas(area: string): Observable<any> {
    const url = `${this.getListasUrl}/${area}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  getVerificador(marcoArea: string): Observable<any> {
    const url = `${this.getVerificadorUrl}/${marcoArea}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  getRecorridaOperaciones(listaId: number) {
    const url = `${this.getRecorridaOperacionesUrl}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  getTiposRecorrida() {
    return this.http.get<any>(this.getTiposRecorridaUrl, this.httpOptions);
  }

  postSave(model: any): Observable<CargarGeneric> {
    return this.http.post<CargarGeneric>(this.posSaveUrl, this.httpOptions);
  }
}
