import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
import { Injectable } from '@angular/core';
import { Page } from '../interfaces/page.interface';
import { environment } from 'src/environments/environment.prod';


@Injectable({
    providedIn: 'root'
  })

export class RecipeService{
    private url:string = environment.url;

    constructor(private http: HttpClient){}

    getRecipes(pageNumber:number =1, sizeNumber:number=6, sortField:string = "name", keyword: string =""): Observable<Page<Recipe>>{
        return this.http.get<Page<Recipe>>(`${this.url}/recipe?pageNumber=${pageNumber}&sizeNumber=${sizeNumber}&sortField=${sortField}&keyword=${keyword}`)
    }

    getRecipe(id:number):Observable<Recipe>{
        return this.http.get<Recipe>(`${this.url}/recipe/${id}`)
    }

    updateRecipe(formData:FormData, id:number):Observable<Recipe>{
        return this.http.put<Recipe>(`${this.url}/recipe/${id}`, formData)
    }

}