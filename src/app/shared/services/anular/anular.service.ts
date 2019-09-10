import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../errors/errors.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AnularService {
  private readonly uri = 'http://localhost:3500/recorrida';
  private readonly getListasUrl = `${this.uri}/Listado`;
  private readonly postBuscarAnularUrl = `${this.uri}/Anular`;
  private readonly postGuardarAnularUrl = `${this.uri}/Anular2`;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getListas(area: string): Observable<any> {
    const url = `${this.getListasUrl}/${area}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  postBuscarAnular(model: any): Observable<any> {
    const url = `${this.postBuscarAnularUrl}`;
    return this.http.post<any>(url, this.httpOptions);
  }

  postGuardarAnular(model: any): Observable<any> {
    const url = `${this.postGuardarAnularUrl}`;
    return this.http.post<any>(url, this.httpOptions);
  }
}
