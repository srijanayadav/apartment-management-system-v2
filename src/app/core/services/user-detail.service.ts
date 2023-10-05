import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators'
import { UserDetail } from '../models/user-detail';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { UpsertUserDetail } from '../models/upsert-user-detail';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private http: HttpClient) { }

  public getAllUserDetails():Observable<UserDetail[]>{
    var result = this.http.get<UserDetail[]>("/userdetail").pipe(
      map((data) => 
      {
        return data;
      }),
      catchError((err)=> 
      {
        throw err;
      })
    );
    return result;
  }
  public create(upsertUserDetail:UpsertUserDetail):Observable<UserDetail>{
    return this.http.post<UserDetail>("/userdetail",upsertUserDetail).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }
  public deleteById(id:number):Observable<any>{
    return this.http.delete<any>(`/userdetail/${id}`).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }
  public getUserDetailById(id:number):Observable<UserDetail>{
    var result = this.http.get<UserDetail>(`/userdetail/${id}`).pipe(
      map((data) => 
      {
        return data;
      }),
      catchError((err)=> 
      {
        throw err;
      })
    );
    return result;
  }  

  public async getUserDetailByUserId(id:number):Promise<UserDetail>{
    var result = this.http.get<UserDetail>(`/userdetail/user/${id}`).pipe(
      map((data) => 
      {
        return data;
      }),
      catchError((err)=> 
      {
        throw err;
      })
    );
    return await lastValueFrom(result);
  } 
  public update(id:number,upsertUserDetail:UpsertUserDetail):Observable<UserDetail>{
    return this.http.put<UserDetail>(`/userdetail/${id}`,upsertUserDetail).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }

  public archive(id:number):Observable<any>{
    return this.http.delete<any>(`/userdetail/${id}/archive`).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }
 
}
