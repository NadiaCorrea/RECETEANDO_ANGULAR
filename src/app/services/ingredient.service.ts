import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../interfaces/ingredient.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private url:string = environment.url;

  constructor(private http: HttpClient) { }

  /**
   * Method that gets a list of all ingredients
   * @returns array of ingredient
   */
  getListIngredients():Observable<Ingredient[]>{
   return this.http.get<Ingredient[]>(`${this.url}/ingredient`);
  }

  /**
   * Method that gets an ingredient
   * @param id - ID of the ingredeint to be found
   * @returns an ingredient
   */
  getIngredient(id:number):Observable<Ingredient>{
    return this.http.get<Ingredient>(`${this.url}/ingredient/${id}`);
  }

  /**
   * Method to add ingredient
   * @param ingredient - ingredient to be added
   * @returns the created ingredient
   */
  addIngredient(ingredient:Ingredient):Observable<Ingredient>{
    return this.http.post<Ingredient>(`${this.url}/ingredient`, ingredient);
  }

  /**
   * Method to delete an ingredient
   * @param id - Id of the ingredient to be deleted
   * @returns 
   */
  deleteIngredient(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/ingredient/${id}`);
  }

  /**
   *  Method to update an ingredient
   * @param ingredient to be updated
   * @returns the updated ingredient
   */
  updateIngredient(ingredient:Ingredient):Observable<Ingredient>{
    let id= ingredient.ingredientId;
    return this.http.put<Ingredient>(`${this.url}/ingredient/${id}`, ingredient)
  }

}
