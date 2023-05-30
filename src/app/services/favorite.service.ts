import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Favorite, NewFavorite } from '../interfaces/favorite.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private url:string = environment.url;
  
  constructor(private http:HttpClient) { }

  getFavorites(): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${this.url}/favorite`);
  }

  getFavoritesByUser(): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${this.url}/favorite/user`);
  }

  addFavorite(newFav:NewFavorite):Observable<Favorite>{
    return this.http.post<Favorite>(`${this.url}/favorite`, newFav);
  }

  deleteFavorite(id:number):Observable<Favorite>{
    return this.http.delete<Favorite>(`${this.url}/favorite/${id}`);
  }

  deleteFavoriteRecipeId(id:number):Observable<Favorite>{
    return this.http.delete<Favorite>(`${this.url}/favorite/recipe/${id}`);
  }

}
