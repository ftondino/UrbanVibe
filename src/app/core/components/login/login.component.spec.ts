import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from 'src/app/features/users/services/users.service';
import { AuthService } from 'src/app/auth/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let usersService: UsersService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [MatSnackBar],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });
  it('should navigate to /users when login is successful', () => {
    const email = 'test@example.com';
    const token = '123456';

    component.loginForm.setValue({ email, token });

    authService.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('token', token);
    spyOn(usersService, 'setUser');
    spyOn(router, 'navigate');

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });
});
