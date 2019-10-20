import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private requestMapping = '/users';
  private loggedIn = new BehaviorSubject<boolean>(this.isUserLoggedInFirstTimeAppLoads());

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.BACKEND_URL}${this.requestMapping}/register`, user);
  }

  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post<LoginRequest>(`${environment.BACKEND_URL}${this.requestMapping}/login`, loginRequest);
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
  }

  login(loginResponse: LoginResponse) {
    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
    this.loggedIn.next(true);
  }

  getTheAuthToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.token;
    }
    return '';
  }

  isUserLoggedInFirstTimeAppLoads(): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return true;
    }
    return false;
  }

  checkStorageForUser(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

}
