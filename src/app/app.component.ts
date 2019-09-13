import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { fullScreenElemet } from './app-base-helpers';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from './shared/services/user/user.service';
import { ResponseGeneric } from './shared/models/generic.model';
import { Subscription } from 'rxjs';
import { UserInfo } from './shared/models/pages/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  title = 'BASE';
  themes = [
    {
      themeClass: 'ternium-theme',
      themeColor: '#ffa500'
    }
  ];

  constructor(
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit(): void {
    this.ngxService.start();

    // Create an setTimeout function interval
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);

    document.body.className = this.themes[0].themeClass;
  }

  ngOnDestroy() {
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: only-arrow-functions deprecation
    $(window).bind('load resize', () => {
      fullScreenElemet();
    });
  }
}
