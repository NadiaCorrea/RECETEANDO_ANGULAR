import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';
import { ChangePassword } from '../interfaces/changePassword.interface';



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

  updatePassword(changePass:ChangePassword):Observable<User>{
    return this.http.put<User>(`${this.url}/user/password`,changePass);
  }

  updateProfile(name:string):Observable<User>{
    return this.http.put<User>(`${this.url}/user/name`, {name:name});
  }

  getLoggedUser():Observable<User>{
    return this.http.get<User>(`${this.url}/me`);
  }
}