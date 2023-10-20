import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { UsersService } from 'src/app/features/users/services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        MatDialogModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        RouterTestingModule.withRoutes([{ path: 'login', redirectTo: '' }]),
      ],
      providers: [UsersService],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirm dialog on confirmDialog call', () => {
    const spy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as any);
    component.confirmDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to user details on userDetails call', () => {
    const spy = spyOn(router, 'navigate');
    component.userDetails();
    expect(spy).toHaveBeenCalledWith(['/user-detail', component.user.id]);
  });
});
