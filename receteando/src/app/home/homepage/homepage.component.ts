import { Component, OnInit } from '@angular/core';
import { ShowingElementsService } from '../../services/showing-elements.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor(private showingElements:ShowingElementsService) { }

  ngOnInit(): void {
    this.showingElements.hide();
  }

}
