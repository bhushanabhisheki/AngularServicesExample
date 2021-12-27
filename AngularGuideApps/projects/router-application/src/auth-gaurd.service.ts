import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Observable<boolean | UrlTree> //for async
    | Promise<boolean | UrlTree> {
    //for sync
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) return true;
      else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}
