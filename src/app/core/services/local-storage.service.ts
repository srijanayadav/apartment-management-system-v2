import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  public save<T>(value :T,key:string){
    const strValue : string = JSON.stringify(value);
    window.localStorage[key] = strValue;
    return;

  }

  public get<T>(key:string):T{
    const strValue : string = window.localStorage[key];
    const obj:T= JSON.parse(strValue);
    return obj;
    
  }

  public remove(key:string): void{
    window.localStorage.removeItem(key);
  }
}
