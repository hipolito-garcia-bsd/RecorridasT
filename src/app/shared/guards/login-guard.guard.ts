import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tryParse } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public router: Router) {

  }
  canActivate() {
      const valorSession = sessionStorage.getItem('login');
      if (valorSession) {
        if (valorSession === '#$%&/!"()') {
          return true;
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
