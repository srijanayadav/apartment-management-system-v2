import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly jwtService: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = this.jwtService.getToken();
    console.log("idToken");
    console.log(idToken);

    if (idToken) {
        const cloned = request.clone({
            headers: request.headers.set("Authorization",
                "Bearer " + idToken)
        });

        return next.handle(cloned);
    }
    else {
        return next.handle(request);
    }
  }
}
