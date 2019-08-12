import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkAuthenticated(url);
  }

  checkAuthenticated(url: string): boolean {
    if (this.auth.authenticated) { console.log('User is auth'); return true; }

    console.log('User is not auth');
    // https://angular.io/guide/router#milestone-5-route-guards
    // Store for redirecting
    this.auth.redirectUrl = url;

    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
