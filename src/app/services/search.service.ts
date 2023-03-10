import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class SearchService { 

    private showing :boolean = false;

    private searchSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(){}

    showingStatus(){
        return this.showing;
    }

    show(){
        this.showing = true;
    }

    hide(){
        this.showing = false;
    }

    get searchObservable() {
        return this.searchSubject;
    }

    search(text: string) {
        this.searchObservable.next(text);
    }

}