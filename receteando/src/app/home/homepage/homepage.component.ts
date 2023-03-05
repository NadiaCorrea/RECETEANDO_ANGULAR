import { Component, OnInit } from '@angular/core';
import { ShowingElementsService } from '../../services/showing-elements.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor(private showingElements:ShowingElementsService, private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.showingElements.hide();
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }
}
