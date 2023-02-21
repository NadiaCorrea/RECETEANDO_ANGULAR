import { Component, OnInit } from '@angular/core';
import { ShowingElementsService } from '../../services/showing-elements.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  
  constructor(public showingService: ShowingElementsService) { }

  ngOnInit(): void {
  }


}
