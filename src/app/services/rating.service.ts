import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Recipe } from '../interfaces/recipe.interface';
import { Rating } from '../interfaces/rating.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private url:string = environment.url;
  constructor(private http:HttpClient) { }

  getRating(recipeId:any):Observable<Rating>{
    return this.http.get<Rating>(`${this.url}/rating/recipe/${recipeId}`)
  }

  addRating(rating:Rating):Observable<Rating>{
    return this.http.post<Rating>(`${this.url}/rating`, rating)

  }
}
