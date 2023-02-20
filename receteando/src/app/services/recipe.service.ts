import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
import { Injectable } from '@angular/core';
import { Page } from '../interfaces/page.interface';

@Injectable({
    providedIn: 'root'
  })

export class RecipeService{

    constructor(private http: HttpClient){}

    getRecipes(pageNumber:number =1, sizeNumber:number=12, sortField:string = "name", keyword: string =""): Observable<Page<Recipe>>{
        return this.http.get<Page<Recipe>>(`http://localhost:8080/recipe?pageNumber=${pageNumber}&sizeNumber=${sizeNumber}&sortField=${sortField}&keyword=${keyword}`)
    }

    getRecipe(id:number):Observable<Recipe>{
        return this.http.get<Recipe>(`http://localhost:8080/recipe/${id}`)
    }

}