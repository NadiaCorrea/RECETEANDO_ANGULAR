import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url:string = environment.url;

  constructor(private http:HttpClient) { }
  /**
   * Method to get all the existing categories
   * @returns an array of categories
   */
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.url}/category`);
  }

  /**
   * Method to get a category
   * @param id - Id of the category to be found
   * @returns a category
   */
  getCategory(id:number): Observable<Category>{
    return  this.http.get<Category>(`${this.url}/category/${id}`);
  }

  /**
   * Method to add a category
   * @param category -Category to be added
   * @returns a category
   */
  addCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(`${this.url}/category`,category);
  }

  /**
   * Method to update a category
   * @param category - category to be updated
   * @returns a category
   */
  updateCategory(category:Category):Observable<Category>{
    let id = category.categoryId;
    return this.http.put<Category>(`${this.url}/category/${id}`, category);
  }

  /**
   * Method to delete a category
   * @param id - Id of the category to be deleted
   * @returns no content if deleted
   */
  deleteCategory(id:number):Observable<Category>{
    return this.http.delete<Category>(`${this.url}/category/${id}`);
  }

}
