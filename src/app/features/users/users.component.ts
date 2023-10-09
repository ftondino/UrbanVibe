import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { UsersService } from './services/users.service';
import { User } from 'src/app/Models/user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { NewUserComponent } from './components/new-user/new-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'status', 'action'];
  usersDataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);
  isDataLoaded = false;

  constructor(
    private apiService: ApiService,
    private usersService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUsers();
    this.usersService.users$.subscribe((users: User[]) => {
      this.usersDataSource.data = users;
    });
  }

  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
  }

  // TUTTI I DATI DEGLI USERS
  getUsers(): void {
    this.apiService.getData<User>('users').subscribe((users) => {
      this.usersDataSource.data = users;
      this.usersService.setUsers(users);
    });
  }

  // PER NAVIGARE VERSO IL COMPONENTE CON I DETTAGLI DELL'USER
  userDetails(user: User) {
    this.router.navigate(['/user-detail', user.id]);
  }

  // AGGIUNGERE UN NUOVO USER
  newUserDialog() {
    this.dialog.open(NewUserComponent);
  }

  // ELIMINARE UN USER

  deleteUser(user: User) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Sei sicuro di voler eliminare questo utente?',
      },
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.usersService.deleteUser(user.id).subscribe(() => {
          this.getUsers();
          this.snackBar.open('Utente eliminato', 'Ok', { duration: 3000 });
        });
      }
    });
  }

  deleteUsers() {
    const selectedUsers = this.selection.selected;
    if (selectedUsers.length === 0) {
      return;
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Sei sicuro di voler eliminare questo utente?',
      },
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        selectedUsers.forEach((user) => {
          this.usersService.deleteUser(user.id).subscribe(() => {
            this.getUsers();
          });
        });
        this.snackBar.open('Utenti eliminati', 'Ok', { duration: 3000 });
        this.selection.clear();
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.usersDataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.usersDataSource.data);
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  // RICERCA ALL'INTERNO DELLA TABELLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
  }
}
