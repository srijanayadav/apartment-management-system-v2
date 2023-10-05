import { Injectable } from '@angular/core';
import { decodeToken, isTokenValid } from '../utils/jwt-token'
import{ JwtPayloadData} from '../models/jwt-payload-data'

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  getToken(): string {
    return window.localStorage["jwtToken"];
  }

  saveToken(token: string): void {
    window.localStorage["jwtToken"] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem("jwtToken");
  }
  getPayload(){
    const token = this.getToken();
    const decodedToken = decodeToken(token);
    const JwtPayloadData :JwtPayloadData = {...decodedToken};
    return JwtPayloadData;

  }
}
