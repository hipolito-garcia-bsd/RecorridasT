import { Component, AfterViewInit } from '@angular/core';
import { fullScreenElemet } from './app-base-helpers';

import * as $ from 'jquery';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'BASE';
  constructor(private ngxService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxService.start();

    // Create an setTimeout function interval
    setTimeout(() => {
       this.ngxService.stop();
     }, 1000);

  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: only-arrow-functions deprecation
    $(window).bind('load resize', function() {
      fullScreenElemet();
    });
  }

}
