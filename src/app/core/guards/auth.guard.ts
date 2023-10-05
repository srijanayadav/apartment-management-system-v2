import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const jwtService: JwtService = inject(JwtService);
  const idToken:string = jwtService.getToken();
  if(idToken){
    return true;
  }else{
    return router.navigate(['login']);
  }

  
};
