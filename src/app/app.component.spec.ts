import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth/auth.service';

describe('AppComponent', () => {
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'loginStatus',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'UrbanVibe'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('UrbanVibe');
  });

  it('should check if user is logged in', () => {
    authServiceMock.isLoggedIn = true;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLoggedIn()).toBeTrue();
  });

  it('should call loginStatus on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(authServiceMock.loginStatus).toHaveBeenCalled();
  });
});
