import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkNoAuthenticated(url);
  }

  /**
   * Check that we don't currently have an authenticated user.
   */
  checkNoAuthenticated(url: string): boolean {
    if (!this.auth.authenticated) { return true; }

    // Navigate to the home page
    this.router.navigate(['/home']);
    return false;
  }

}
