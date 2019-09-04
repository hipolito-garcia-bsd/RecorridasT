import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, retryWhen, delay, scan, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GeneralInterceptorService implements HttpInterceptor {


  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
    const headers = new HttpHeaders({
      'x-token': 'ASDASD"#$#$SA&$%%$%$&SDFSD%$&&/SDF%$&"#$#DSF"#$%&$%&DS'
    });
    const reqClon = req.clone({
      headers
    });
    */
   const reqClon = req.clone();

   return next.handle(reqClon)
   .pipe(this.handleRetry)
   .pipe(
     catchError(this.errorHandle)
    );
  }

  errorHandle(err: HttpErrorResponse) {
    // Swal.fire('Atencion', `Ha ocurrido un error al procesar la solicitud:<br> ${err.message}`, 'info');
    return throwError(`Ha ocurrido un error al procesar la solicitud: ${err.message}`);
  }

  private handleRetry<T>(source: Observable<T>): Observable<T> {
    return source.pipe(
      retryWhen(e => e.pipe(
        scan((errorCount, error) => {
          if (errorCount >= 5) {
              throw error;
          }
          return errorCount + 1;
        }, 0),
        delay(1000)
    )));
  }

}
