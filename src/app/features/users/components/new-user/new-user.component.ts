import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NewUserComponent>
  ) {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.userService
      .newUser(this.userForm.value, this.userService.token)
      .subscribe({
        next: (response) => {
          this.userService.setUsers([
            ...this.userService.usersSubject.value,
            response,
          ]);
          this.snackBar.open('Nuovo utente aggiunto', 'Ok', { duration: 3000 });
          this.dialogRef.close();
        },
        error: (error) => {
          console.error("Errore durante la creazione dell'utente:", error);
          this.snackBar.open("Errore durante la creazione dell'utente", 'Ok', {
            duration: 3000,
          });
        },
      });
  }
}
