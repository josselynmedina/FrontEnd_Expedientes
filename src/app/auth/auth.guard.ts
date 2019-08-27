import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // tslint:disable-next-line:one-line
  constructor(private router: Router, private userService: UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null)
      // tslint:disable-next-line:one-line
      {
        const roles = next.data['roles'] as Array<string>;
        if (roles) {
          const match = this.userService.roleMatch(roles);
          // tslint:disable-next-line:curly
          if (match) return true;
          else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }else {
          return true;
        }
      }
      this.router.navigate(['/login']);
      return false;
  }
}
