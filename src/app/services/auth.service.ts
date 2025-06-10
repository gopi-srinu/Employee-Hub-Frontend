import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, SignUp } from '../Model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  login(loginData: Login): Observable<Login> {
    const apiURL = `${this.apiURL}/login`;
    return this.http.post<Login>(apiURL, loginData);
  }

  signUp(signUp: SignUp): Observable<SignUp> {
    const apiURL = `${this.apiURL}/signup`;
    return this.http.post<SignUp>(apiURL, signUp);
  }
}
