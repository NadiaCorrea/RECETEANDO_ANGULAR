import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class RecipeService{

    constructor(private http: HttpClient){}

    getRecipes(): Observable<Recipe[]>{
        return this.http.get<Recipe[]>('http://localhost:8080/recipe')
    }

    getRecipe(id:number):Observable<Recipe>{
        return this.http.get<Recipe>(`http://localhost:8080/recipe/${id}`)
    }

}