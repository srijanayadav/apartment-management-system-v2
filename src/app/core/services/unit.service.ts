import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators'
import { UnitInfo } from '../models/unit-info';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { UpsertUnit } from '../models/upsert-unit';
import { UpsertUnitOwner } from '../models/upsert-unit-owner';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  public getAllUnits():Observable<UnitInfo[]>{
    var result = this.http.get<UnitInfo[]>("/unit").pipe(
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
  public create(unit:UpsertUnit):Observable<UnitInfo>{
    return this.http.post<UnitInfo>("/unit",unit).pipe(
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
    return this.http.delete<any>(`/unit/${id}`).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }

  public async getAllUnAssignedUnits():Promise<UnitInfo[]>{
    var result = this.http.get<UnitInfo[]>("/unit").pipe(
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

  public getUnitById(id:number):Observable<UnitInfo>{
    var result = this.http.get<UnitInfo>(`/unit/${id}`).pipe(
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
  public updateOwner(id:number,ownerInfo:UpsertUnitOwner):Observable<UnitInfo>{
    return this.http.patch<UnitInfo>(`/unit/${id}/owner`,ownerInfo).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }
  public update(id:number,unit:UpsertUnit):Observable<UnitInfo>{
    return this.http.put<UnitInfo>(`/unit/${id}`,unit).pipe(
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
    return this.http.delete<any>(`/unit/${id}/archive`).pipe(
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
