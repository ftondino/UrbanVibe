import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  constructor(private router: Router) {}

  loginStatus(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['users']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
