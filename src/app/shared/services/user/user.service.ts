import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../errors/errors.service';
import { ResponseGeneric } from '../../models/generic.model';
import { UserInfo } from '../../models/pages/user/user.model';
import { AppConfigService } from '../appConfig/app-config.service';

@Injectable()
export class UserService {
  private uri = '';
  private userInfo: UserInfo;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService,
    private appConfigService: AppConfigService
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

  async load(data: any) {
    const url = `${data.apiBaseUrl}/api/verificaciones/recorrida/UserInfo`;
    return await this.http.get<ResponseGeneric>(url, this.httpOptions)
      .toPromise()
      .then(sb => {
        const dataM = sb.data;
        const model = new UserInfo(dataM.nombre, dataM.sigla, dataM.tumbnail);
        this.userInfo = model;
      });
  }

  get getUserInfoData(): UserInfo {
    return this.userInfo;
  }
}
