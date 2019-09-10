import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../errors/errors.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnuladasService {
  private readonly uri = 'http://localhost:3500/recorrida';
  private readonly getBuscarAnuladasUrl = `${this.uri}/Anuladas`;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getBuscarAnuladas(model: any): Observable<any> {
    const url = `${this.getBuscarAnuladasUrl}`;
    return this.http.get<any>(url, this.httpOptions);
  }
}
