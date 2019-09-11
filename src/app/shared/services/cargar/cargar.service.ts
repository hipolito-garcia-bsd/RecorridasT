import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorsService } from '../errors/errors.service';
import { NotificationService } from '../notification/notification.service';
import { ResponseGeneric } from '../../models/generic.model';
import { CargarSaveModel } from '../../models/pages/cargar/cargar.model';

@Injectable({
  providedIn: 'root'
})
export class CargarService {
  private readonly uri = 'http://localhost:54079/api/verificaciones/recorrida';
  private readonly getHorasUrl = `${this.uri}/Horas`;
  private readonly getTurnoUrl = `${this.uri}/Turno`;
  private readonly getMarcoAreaUrl = `${this.uri}/MacroArea`;
  private readonly getAreaUrl = `${this.uri}/Area`;
  private readonly getClienteUrl = `${this.uri}/Clientes`;
  private readonly getListasUrl = `${this.uri}/Listado`;
  private readonly getVerificadorUrl = `${this.uri}/Verificadores`;
  private readonly getRecorridaOperacionesUrl = `${this.uri}/RecorridaOpciones`;
  private readonly getTiposRecorridaUrl = `${this.uri}/TipoRecorrida`;
  private readonly posSaveUrl = `${this.uri}/Recorrida`;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService,
    private notify: NotificationService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.uri,
      // 'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE',
      // 'Access-Control-Allow-Headers': 'x-requested-with',
      // 'Access-Control-Max-Age': '3600',
      // 'Access-Control-Allow-Credentials': 'true'
      'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
    })
  };

  getHoras(): Observable<ResponseGeneric> {
    return this.http.get<ResponseGeneric>(this.getHorasUrl, this.httpOptions);
  }

  getTurno(): Observable<ResponseGeneric> {
    return this.http.get<ResponseGeneric>(this.getTurnoUrl, this.httpOptions);
  }

  getMarcoArea(): Observable<ResponseGeneric> {
    return this.http.get<ResponseGeneric>(this.getMarcoAreaUrl, this.httpOptions);
  }

  getArea(marcoAreaKey: string): Observable<ResponseGeneric> {
    const url = `${this.getAreaUrl}/${marcoAreaKey}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }

  getCliente(): Observable<ResponseGeneric> {
    return this.http.get<ResponseGeneric>(this.getClienteUrl, this.httpOptions);
  }

  getListas(area: string): Observable<ResponseGeneric> {
    const url = `${this.getListasUrl}/${area}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }

  getVerificador(marcoArea: string): Observable<ResponseGeneric> {
    const url = `${this.getVerificadorUrl}/${marcoArea}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }

  getRecorridaOperaciones(listaKey: number) {
    const url = `${this.getRecorridaOperacionesUrl}/${listaKey}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }

  getTiposRecorrida() {
    return this.http.get<ResponseGeneric>(this.getTiposRecorridaUrl, this.httpOptions);
  }

  postSave(model: CargarSaveModel): Observable<ResponseGeneric> {
    return this.http.post<ResponseGeneric>(this.posSaveUrl, model, this.httpOptions);
  }
}
