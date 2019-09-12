import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../errors/errors.service';
import { NotificationService } from '../notification/notification.service';
import { ResponseGeneric } from '../../models/generic.model';
import { AnularSave } from '../../models/pages/anular/anular.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnularService {
  private readonly uri = `${environment.url}/api/verificaciones/recorrida`;
  private readonly getLineaUrl = `${this.uri}/Linea`;
  private readonly postBuscarAnularUrl = `${this.uri}/Anular`;
  private readonly putGuardarAnularUrl = `${this.uri}/Anular`;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService
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

  getLinea(): Observable<ResponseGeneric> {
    const url = `${this.getLineaUrl}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }

  getBuscarAnular(linea: string, fecha: string): Observable<ResponseGeneric> {
    const url = `${this.postBuscarAnularUrl}/${linea}/${fecha}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }

  putGuardarAnular(model: Array<AnularSave>): Observable<ResponseGeneric> {
    const url = `${this.putGuardarAnularUrl}`;
    return this.http.put<ResponseGeneric>(url, model, this.httpOptions);
  }
}
