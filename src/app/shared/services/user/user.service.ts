import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../errors/errors.service';
import { NotificationService } from '../notification/notification.service';
import { ResponseGeneric } from '../../models/generic.model';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../models/pages/user/user.model';

@Injectable()
export class UserService {
  private readonly uri = `${environment.url}/api/verificaciones/recorrida`;
  private readonly getUserInfoUrl = `${this.uri}/UserInfo`;
  private userInfo: UserInfo;

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

  getUserInfo(): Observable<ResponseGeneric> {
    const url = `${this.getUserInfoUrl}`;
    return this.http.get<ResponseGeneric>(url, this.httpOptions);
  }

  load() {
    return new Promise((resolve, reject) => {
      const url = `${this.getUserInfoUrl}`;
      return this.http.get<ResponseGeneric>(url, this.httpOptions).subscribe(sb => {
        const data = sb.data[0];
        const model = new UserInfo(data.nombre, data.sigla, data.tumbnail);
        this.userInfo = model;
        resolve(true);
      });
    });
  }

  public getUserInfoData(): UserInfo {
    return this.userInfo;
  }
}
