import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators'
import { UnitInfo } from '../models/unit-info';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { UpsertUnit } from '../models/upsert-unit';
import { UpsertRental } from '../models/upsert-rental';
import { Rental } from '../models/rental';
import { PreRentalAgreementData } from '../models/pre-rental-agreement-data';
import { RentalAgreementData } from '../models/rental-agreement-data';
import { RentalAgreement } from '../models/rental-agreement';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  public getRentals():Observable<Rental[]>{
    return this.http.get<Rental[]>("/rental").pipe(
      map((data)=>data),
      catchError((err)=>{throw err;})
    )
  }
  public getRentalDetails(id:number):Observable<Rental>{
    return this.http.get<Rental>(`/rental/${id}`).pipe(
      map((data)=>data),
      catchError((err)=>{throw err;})
    )
  }

  public create(upsertRental:UpsertRental):Observable<Rental>{
    return this.http.post<Rental>("/rental", upsertRental).pipe(
      map((data) => data),
      catchError(
        (err) => {
          throw err;
        })
    );

  }
  public update(id:number, upsertRental:UpsertRental):Observable<Rental>{
    return this.http.put<Rental>(`/rental/${id}`, upsertRental).pipe(
      map((data) => data),
      catchError(
        (err) => {
          throw err;
        })
    );

  }
  public deleteById(id:number):Observable<any>{
    return this.http.delete<any>(`/rental/${id}`).pipe(
      map((data)=>{
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    );
  }

  public getPreRentalAgreementData(id:number):Observable<PreRentalAgreementData>{
    return this.http.get<PreRentalAgreementData>(`/rental/${id}/pre_agreement_file`).pipe(
      map((data)=>data),
      catchError((err)=>{throw err;})
    )
  }
  public getRentalAgreementData(id:number):Observable<RentalAgreementData>{
    return this.http.get<RentalAgreementData>(`/rental/${id}/agreement_file`).pipe(
      map((data)=>{
        
        return data;
      }),
      catchError((err)=>{throw err;})
    )
  }

  public beginAgreement(id:number):Observable<any>{
    return this.http.post<any>(`/rental/${id}/begin_agreement`,null).pipe(
      map((data)=>data),
      catchError((err)=>{throw err;})
    )
  }

  public getRentalAgreement(id:number):Observable<RentalAgreement>{
    return this.http.get<RentalAgreement>(`/rental/${id}/rental_agreement`).pipe(
      map((data)=>{
        
        return data;
      }),
      catchError((err)=>{throw err;})
    )
  }
  public archive(id:number):Observable<any>{
    return this.http.delete<any>(`/rental/${id}/archive`).pipe(
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
