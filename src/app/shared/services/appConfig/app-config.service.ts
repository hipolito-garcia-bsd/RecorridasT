import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig; any;

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
    })
  };

  async loadAppConfig() {
    // const url = `${environment.virtualDirectory}/assets/json/app.config.json`;
    const url = `assets/json/app.config.json`;
    return await this.http.get<any>(url, this.httpOptions)
      .toPromise()
      .then(sb => {
        this.appConfig = sb;
        return sb;
      });
  }

  get apiBaseUrl() {
    if (!this.appConfig) {
      // return '';
      throw console.error('config file not loaded!');
    }
    return this.appConfig.apiBaseUrl;
  }
}
