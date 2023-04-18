import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private url:string = environment.url;

  constructor(private http:HttpClient) { }

  /**
   * Method to get all the existing units
   * @returns 
   */
  getUnits():Observable<Unit[]>{
    return this.http.get <Unit[]>(`${this.url}/unit`);
  }

  /**
   * Method to get a unit
   * @param id - Id of the unit to be found
   * @returns - a unit
   */
  getUnit(id:number):Observable<Unit>{
    return this.http.get<Unit>(`${this.url}/unit/${id}`);
  }

  /**
   * Method to add a unit
   * @param unit - the unit to be created
   * @returns the created unit
   */
  addUnit(unit:Unit):Observable<Unit>{
    return this.http.post<Unit>(`${this.url}/unit`, unit)
  }

  /**
   * Method to update a unit
   * @param unit - The unit to be updated
   * @returns - the upadated unit
   */
  updateUnit(unit:Unit):Observable<Unit>{
    let id = unit.unitId;
    return this.http.put<Unit>(`${this.url}/unit/${id}`, unit);
  }

  /**
   * Method to delete a unit
   * @param id - Id of the unit to be deleted
   * @returns no content if deleted
   */
  deleteUnit(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/unit/${id}`);
  }

}
