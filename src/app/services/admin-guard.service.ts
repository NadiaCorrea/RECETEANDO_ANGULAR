import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

// This guard verifies if the user is admin
export class AdminGuardService implements CanActivate {

  constructor(private router: Router, private authServ:AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |boolean {
    if (this.authServ.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
