import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor(private showingElements:SearchService, private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.showingElements.hide();
   
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }
}
