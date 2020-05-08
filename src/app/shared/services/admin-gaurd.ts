import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthServiceLocal } from "./auth.service.local";

@Injectable()
export class AdminGaurd implements CanActivate {
  constructor(private router: Router, private authService: AuthServiceLocal) {}

  canActivate() {
    if (this.authService.isLoggedIn() && this.authService.isAdmin) {
      return true;
    }
    this.router.navigate(["no-access"]);
    return false;
  }
}
