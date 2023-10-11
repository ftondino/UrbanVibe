import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user = this.userService.user;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {}

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Vuoi uscire dal tuo account?',
      },
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.authService.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }

  userDetails() {
    this.router.navigate(['/user-detail', this.user.id]);
  }
}
