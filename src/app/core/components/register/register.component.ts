import { Component } from '@angular/core';
import { UsersService } from 'src/app/features/users/services/users.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  tokenForm: FormGroup;
  isEditable = true;

  constructor(
    private usersService: UsersService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registrationForm = this._formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
    this.tokenForm = this._formBuilder.group({
      token: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    const token = localStorage.getItem(this.tokenForm.value.token);
    if (token) {
      this.snackBar.open('Token già registrato', 'Riprova', {
        duration: 3000,
      });
    } else {
      this.usersService
        .newUser(this.registrationForm.value, this.tokenForm.value.token)
        .subscribe({
          next: (response) => {
            console.log(response);
            localStorage.setItem(
              'user',
              JSON.stringify({ ...response, token: this.tokenForm.value.token })
            );
            localStorage.setItem('token', this.tokenForm.value.token);
            this.router.navigate(['/login']);
            this.snackBar.open('Utente creato con successo!', 'Ok', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.snackBar.open(
              "C'è stato un errore durante la creazione dell'utente",
              'Riprova',
              {
                duration: 3000,
              }
            );
            console.error(error);
          },
        });
    }
  }
}
