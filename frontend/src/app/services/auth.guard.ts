// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';



// export const authGuard: CanActivateFn = (route, state) => {

//   const _router=inject(Router);

//   let isLoggedIn=localStorage.getItem("token");
//   if(isLoggedIn=='false'){
//     alert("Please login, redirecting to login page!!");
//     _router.navigate(['/login'])
//     return false
//   }
//   return true;
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

// import { Injectable } from "@angular/core";

// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

// import { Observable } from "rxjs";

// import { AuthService } from "./auth.service";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate{
//   constructor(private _auth: AuthService, private router:Router){}

  
//   canActivate(){
//     if()
//   }


// }