import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }


  getUsers():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/user')
  }

  getUser(userId:number):Observable<User>{
    return this.http.get<User>(`http://localhost:8080/user/${userId}`)
  }
}
