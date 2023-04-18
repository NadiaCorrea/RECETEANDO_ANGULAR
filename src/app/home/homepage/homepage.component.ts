import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void { 
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }
}
