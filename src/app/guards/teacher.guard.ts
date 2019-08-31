import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkIsTeacher(url);
  }

  /**
   * Check if the logged in user is a teacher. It first checks if the
   * user is authenticated.
   */
  checkIsTeacher(url: string): boolean {
    if (this.auth.authenticated) {

      if (this.auth.getCredentials().type === 4) {
        return true;
      }

      this.router.navigateByUrl('/home');
      return false;
    }

    this.auth.redirectUrl = url;
    this.router.navigate(['/trip-codes']);
    return false;
  }
}
