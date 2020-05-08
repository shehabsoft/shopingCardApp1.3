import { Injectable } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthServiceLocal } from "./auth.service.local";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthServiceLocal) { }

  canActivate(route, state: RouterStateSnapshot) {
    console.log("IS Login " + this.authService.userLogin);
    
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["/login"],    {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
