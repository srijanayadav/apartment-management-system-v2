import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../models/sign-in';
import { SignInResponse } from '../models/sign-in-response';
import {catchError, distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators'
import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUp } from '../models/sign-up';
import { UserSignUp } from '../models/user-sign-up';
import { ForgotPassword } from '../models/forgot-password';
import { ForgotPasswordResponse } from '../models/forgot-password-response';
import { AdminSignUp } from '../models/admin-sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
  .asObservable()
  .pipe(distinctUntilChanged());

public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(private http: HttpClient,private readonly jwtService: JwtService) { }

  signUp(sign_up:SignUp):Observable<User>{
    return this.http.post<User>('/auth/sign-up',sign_up).pipe(
      map((data)=>
      {
        return data;
      }),
      catchError((err)=> 
      {
        throw err;
      })
    );
      
  }
  adminSignUp(sign_up:AdminSignUp):Observable<User>{
    return this.http.post<User>('/auth/admin-sign-up',sign_up).pipe(
      map((data)=>
      {
        return data;
      }),
      catchError((err)=> 
      {
        throw err;
      })
    );
      
  }
  userSignUp(sign_up:UserSignUp):Observable<any>{
    return this.http.post<any>('/auth/user-sign-up',sign_up).pipe(
      map((data)=>
      {
        return data;
      }),
      catchError((err)=> 
      {
        throw err;
      })
    );
      
  }
  sendForgotPassword(forgot_password:ForgotPassword):Observable<ForgotPasswordResponse>{
    return this.http.patch<ForgotPasswordResponse>('/auth/forgot-password',forgot_password).pipe(
      map((data)=>
      {
        return data;
      }),
      catchError((err)=> 
      {
        throw err;
      })
    );
      
  }
  login(sign_in:SignIn) {
    return this.http.post<SignInResponse>('/auth/sign-in', sign_in).pipe(
       tap((sign_in_info)=>this.setAuth(sign_in_info))
        // this is just the HTTP call, 
        // we still need to handle the reception of the token /api/v1/auth/sign-in
        //shareReplay()
        );
  }
  logout(): void {
    this.purgeAuth();
   
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  setAuth(sign_in_info: SignInResponse): void {
    console.log(sign_in_info.access_token)
    this.jwtService.saveToken(sign_in_info.access_token);
    this.currentUserSubject.next(sign_in_info.user_info);
  }
  
}
