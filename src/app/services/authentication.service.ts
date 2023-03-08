import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from '../interfaces/credential.interface';
import { environment } from 'src/environments/environment';

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
    localStorage.clear();
  }
}
