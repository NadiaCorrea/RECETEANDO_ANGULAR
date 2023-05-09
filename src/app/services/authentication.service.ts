import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Credential } from '../interfaces/credential.interface';
import { environment } from 'src/environments/environment.prod';
import { User } from '../interfaces/user.interface';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url:string = environment.url;
  
  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<string> {

    const credential:Credential = {email, password};
    
    return this.http.post<string>(`${this.url}/login`, credential);

  }

  isAuthenticated(){
    return localStorage.getItem('authenticated')==='true';
  }

  logOut(){
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
  }

  isAdmin() {
    const user:string | null = localStorage.getItem('loggedUser');

    if(user){
      const parsedUser: User = JSON.parse(user);
      return parsedUser.role ==='ADMIN'    
    }else{
      return false;
    }
  }

  isSameUser(id:number | undefined){

    const user:string | null = localStorage.getItem('loggedUser');

    if(user){
      const parsedUser: User = JSON.parse(user);
      return  parsedUser.userId === id
    }else{
      return false;
    }
  }

}
