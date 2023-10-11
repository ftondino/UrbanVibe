import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      token: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    let inputEmail = this.loginForm.value.email;
    let inputToken = this.loginForm.value.token;

    let user = JSON.parse(localStorage.getItem('user')!);
    let token = localStorage.getItem('token');
    if (user && inputEmail === user.email && inputToken === token) {
      this.authService.isLoggedIn = true;
      this.usersService.setUser();
      this.router.navigate(['/users']);
    } else {
      this.snackBar.open('Dati errati o non esistenti', 'Riprova', {
        duration: 3000,
      });
      this.authService.isLoggedIn = false;
    }
  }
}
