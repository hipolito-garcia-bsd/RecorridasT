import { finalize, tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export class LoaderInterceptor implements HttpInterceptor {
    count = 0;

    constructor(
        private ngxService: NgxUiLoaderService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.loaderService.show();
        // return next.handle(req).pipe(
        //     finalize(() => this.loaderService.hide())
        // );

        this.ngxService.start();
        this.count++;

        return next.handle(req).pipe(
            tap(
                event => console.log(event),
                error => console.log(error)
            ),
            finalize(() => {
                this.count--;
                if (this.count === 0) {
                    this.ngxService.stop();
                }
            })
        );
    }
}
