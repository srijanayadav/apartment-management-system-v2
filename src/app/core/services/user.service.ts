import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators'
import { User } from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChangePassword } from '../models/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>("/user").pipe(
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
  public archive(id:number):Observable<any>{
    return this.http.delete<any>(`/user/${id}/archive`).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }
  public changePassword(id:number, changePassword:ChangePassword):Observable<any>{
    return this.http.patch<any>(`/user/${id}/password`, changePassword).pipe(
      map((data) => data),
      catchError(
        (err) => {
          throw err;
        })
    );

  }


}
