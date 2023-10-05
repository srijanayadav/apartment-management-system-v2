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
import { Invoice } from '../models/invoice';
import { UpsertInvoice } from '../models/upsert-invoice';
import { BeginInvoicePaymentResponse } from '../models/begin-invoice-payment-response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  public getInvoices():Observable<Invoice[]>{
    return this.http.get<Invoice[]>("/invoice").pipe(
      map((data)=>data),
      catchError((err)=>{throw err;})
    )
  }
  public getInvoice(id:number):Observable<Invoice>{
    return this.http.get<Invoice>(`/invoice/${id}`).pipe(
      map((data)=>data),
      catchError((err)=>{throw err;})
    )
  }
  public createInvoice(upsertInvoice:UpsertInvoice):Observable<Invoice>{
    return this.http.post<Invoice>("/invoice", upsertInvoice).pipe(
      map((data) => data),
      catchError(
        (err) => {
          throw err;
        })
    );

  }
  public beginInvoicePayment(id:number):Observable<BeginInvoicePaymentResponse>{
    return this.http.post<BeginInvoicePaymentResponse>(`/invoice/${id}/payment`,null).pipe(
      map((data)=>data),
      catchError((err)=>{throw err;})
    )
  }
  public archive(id:number):Observable<any>{
    return this.http.delete<any>(`/invoice/${id}/archive`).pipe(
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
