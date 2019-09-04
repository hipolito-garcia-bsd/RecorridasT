import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiglaService {

  constructor(private http: HttpClient, private router: Router) { }

  consultarSigla() {
    const url = environment + `Tools/Sigla`;
    const resultado = this.http.get(url);
    return resultado;
  }

  // consultarUsuario(usuarioId: number) {
  //   const url = environment.URL_SER_GENERAL + `User/GetUserById?Id=${usuarioId}`;
  //   const resultado = this.http.get(url);
  //   return resultado;
  // }

}
