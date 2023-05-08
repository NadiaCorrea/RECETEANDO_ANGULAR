import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';
import { ChangePassword } from '../interfaces/changePassword.interface';
import { Page } from '../interfaces/page.interface';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url:string = environment.url;
  constructor(private http:HttpClient) { }


  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/user/list`)
  }

  getUsersPaged(pageNumber:number =1, sizeNumber:number=6, sortField:string = "name", keyword: string =""):Observable<Page<User>>{
    return this.http.get<Page<User>>(`${this.url}/user?pageNumber=${pageNumber}&sizeNumber=${sizeNumber}&sortField=${sortField}&keyword=${keyword}`)
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

  deleteUser(userId:any):Observable<any>{
    return this.http.delete<any>(`${this.url}/user/${userId}`);

  }
}