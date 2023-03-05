import { Component, OnInit } from '@angular/core';
import { ShowingElementsService } from '../../services/showing-elements.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  
  constructor(public showingService: ShowingElementsService, private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }
}
