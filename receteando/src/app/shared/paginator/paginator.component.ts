import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  totalPages: number = 0;

  @Output()
  selectPage:EventEmitter<number> = new EventEmitter();

  pages:number [] = [];
  selected: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.pages = new Array(this.totalPages);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = new Array(this.totalPages);
  }

  onSelect(selection:number){

    this.selected = selection;
    this.selectPage.emit(this.selected);

  }

}
