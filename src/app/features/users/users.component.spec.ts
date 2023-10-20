import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from 'src/app/Models/user.model';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let apiService: ApiService;
  let usersService: UsersService;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, ConfirmDialogComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ApiService,
        UsersService,
        {
          provide: MatDialog,
          useValue: {
            open: () => {
              return {
                afterClosed: () => of(true),
              };
            },
          },
        },
        {
          provide: ApiService,
          useValue: {
            getData: () => of([]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should get users', () => {
    const getUsersSpy = spyOn(apiService, 'getData').and.callThrough();
    component.getUsers();
    expect(getUsersSpy).toHaveBeenCalled();
  });

  it('should navigate to user details', () => {
    const routerSpy = spyOn(router, 'navigate');
    const user = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    component.userDetails(user);
    expect(routerSpy).toHaveBeenCalledWith(['/user-detail', user.id]);
  });

  it('should open new user dialog', () => {
    const dialogSpy = spyOn(dialog, 'open');
    component.newUserDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should delete a user', () => {
    const deleteUserSpy = spyOn(usersService, 'deleteUser').and.returnValue(
      of(null)
    );
    const user = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    component.deleteUser(user);
    expect(deleteUserSpy).toHaveBeenCalledWith(user.id);
  });

  it('should delete selected users', () => {
    const deleteUserSpy = spyOn(usersService, 'deleteUser').and.returnValue(
      of(null)
    );
    const user1 = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    const user2 = {
      id: 2,
      name: 'example 2',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    component.selection.select(user1, user2);
    component.deleteUsers();
    expect(deleteUserSpy.calls.allArgs()).toEqual([[user1.id], [user2.id]]);
  });

  it('should check if all rows are selected', () => {
    const user1 = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    const user2 = {
      id: 2,
      name: 'example 2',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    component.usersDataSource.data = [user1, user2];
    component.selection.select(user1, user2);
    expect(component.isAllSelected()).toBeTrue();
  });

  it('should toggle all rows selection', () => {
    const user1 = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    const user2 = {
      id: 2,
      name: 'example 2',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    } as User;
    component.usersDataSource.data = [user1, user2];
    component.toggleAllRows();
    expect(component.selection.selected).toEqual([user1, user2]);
  });

  it('should apply filter to the table data', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'test' } });
    component.applyFilter(event);
    expect(component.usersDataSource.filter).toEqual('test');
  });
});
