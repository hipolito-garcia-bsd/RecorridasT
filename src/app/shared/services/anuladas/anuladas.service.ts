import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../errors/errors.service';
import { Observable } from 'rxjs';
import { ResponseGeneric } from '../../models/generic.model';
import { environment } from 'src/environments/environment';
import { AppConfigService } from '../appConfig/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AnuladasService {
  private uri = '';
  private getBuscarAnuladasUrl = '';

  constructor(
    private http: HttpClient,
    private errors: ErrorsService,
    private appConfigService: AppConfigService
  ) {
    this.uri = `${appConfigService.apiBaseUrl}/api/verificaciones/recorrida`;
    this.getBuscarAnuladasUrl = `${this.uri}/Anuladas`;
  }

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

  getBuscarAnuladas(linea: string): Observable<ResponseGeneric> {
    const url = `${this.getBuscarAnuladasUrl}/${linea}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }
}
