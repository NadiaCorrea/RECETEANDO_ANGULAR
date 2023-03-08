import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../interfaces/ingredient.interface';
import { Page } from '../interfaces/page.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private url:string = environment.url;

  constructor(private http: HttpClient) { }

  getListIngredients():Observable<Ingredient[]>{
   return this.http.get<Ingredient[]>(`${this.url}/ingredient`);
  }

  getPageIngredients(pageNumber:number =1, sizeNumber:number=4, sortField:string = "name", keyword: string =""): Observable<Page<Ingredient>>{
    return this.http.get<Page<Ingredient>>(`${this.url}/recipe/page`);
  }


}
