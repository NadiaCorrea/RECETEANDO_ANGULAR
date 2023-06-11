import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
import { Page } from '../interfaces/page.interface';
import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { IngredientFilter } from '../interfaces/ingredientFilter';


@Injectable({
    providedIn: 'root'
  })

export class RecipeService{
    private url:string = environment.url;

    constructor(private http: HttpClient){}

    // getRecipes(pageNumber:number =1, sizeNumber:number=6, sortField:string = "name", keyword: string =""): Observable<Page<Recipe>>{
    //     return this.http.get<Page<Recipe>>(`${this.url}/recipe?pageNumber=${pageNumber}&sizeNumber=${sizeNumber}&sortField=${sortField}&keyword=${keyword}`)
    // }

    getRecipesByingredients(pageNumber:number =1, sizeNumber:number=6, sortField:string = "name", listIngredients:IngredientFilter): Observable<Page<Recipe>>{
        return this.http.post<Page<Recipe>>(`${this.url}/recipe/ingredients?pageNumber=${pageNumber}&sizeNumber=${sizeNumber}&sortField=${sortField}`, listIngredients)
    }

    getRecipe(id:number):Observable<Recipe>{
        return this.http.get<Recipe>(`${this.url}/recipe/${id}`)
    }

    updateRecipe(formData:FormData, id:number):Observable<Recipe>{
        return this.http.put<Recipe>(`${this.url}/recipe/${id}`, formData)
    }

    addRecipe(formData:FormData):Observable<Recipe>{
        return this.http.post<Recipe>(`${this.url}/recipe`, formData)
    }

    deleteRecipe(id:number):Observable<any>{
        return this.http.delete<any>(`${this.url}/recipe/${id}`);
    }

}