import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

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
