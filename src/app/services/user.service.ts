import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url:string = environment.url;
  constructor(private http:HttpClient) { }


  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/user`)
  }

  getUser(userId:number):Observable<User>{
    return this.http.get<User>(`${this.url}/user/${userId}`)
  }

  addUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.url}/register`, user)
  }

  verifyUser(code :string){
    return this.http.get<User>(`${this.url}/verify?code=${code}`)
  }
}
