import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  
  keyword :string = '';

  @ViewChild('myForm') myForm !: NgForm;

  constructor(public searchService: SearchService, public authService:AuthenticationService, private router:Router) { }


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

  search(){
    this.searchService.search(this.keyword);
  }

  
}
