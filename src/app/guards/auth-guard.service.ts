import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private api: ApiService) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  isLogged(): boolean {
    if (!this.auth.isAuthenticated() || localStorage.getItem("admin") == "null" || localStorage.getItem("admin") == "Bearer undefined") {
      return false;
    } else {
      return true;
    }
  }
}
