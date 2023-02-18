import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from '../interfaces/credential.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginURL:string = 'http://localhost:8080/login';


  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<string> {

    const credential:Credential = {email, password};
    
    return this.http.post<string>(this.loginURL, credential);

  }


}
