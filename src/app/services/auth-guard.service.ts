import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

// This guard verifies if the user is loggedIn
export class AuthGuardService implements CanActivate,CanActivateChild {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |boolean {
  
    if(this.authenticationService.isAuthenticated()){
      return true;
    } else{
      this.router.navigate(['/']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(this.authenticationService.isAuthenticated()){
      return true;
    } else{
      this.router.navigate(['/']);
      return false;
    }
  }

}
