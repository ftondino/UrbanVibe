import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UsersService } from 'src/app/features/users/services/users.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usersService: UsersService;
  let snackBar: MatSnackBar;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [FormBuilder],
    });

    usersService = TestBed.inject(UsersService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a snackbar when the token is already registered', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    const openSpy = spyOn(snackBar, 'open');

    component.onSubmit();

    expect(openSpy).toHaveBeenCalledWith('Token già registrato', 'Riprova', {
      duration: 3000,
    });
  });

  it('should create a new user and redirect to /login', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const newUserResponse = {
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    };
    spyOn(usersService, 'newUser').and.returnValue(of(newUserResponse));
    const navigateSpy = spyOn(router, 'navigate');
    const openSpy = spyOn(snackBar, 'open');

    component.onSubmit();
    tick();

    expect(openSpy).toHaveBeenCalledWith('Utente creato con successo!', 'Ok', {
      duration: 3000,
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  }));

  it('should handle an error during user creation', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const errorResponse = { status: 422 };
    spyOn(usersService, 'newUser').and.returnValue(throwError(errorResponse));
    const openSpy = spyOn(snackBar, 'open');

    component.onSubmit();
    tick();

    expect(openSpy).toHaveBeenCalledWith(
      "L'email inserita è già registrata",
      'Riprova',
      {
        duration: 3000,
      }
    );
  }));
});
