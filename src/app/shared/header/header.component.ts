import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  
  constructor(public authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
  
}
