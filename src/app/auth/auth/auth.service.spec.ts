import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to users if logged in', () => {
    service.isLoggedIn = true;
    service.loginStatus();
    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should navigate to login if not logged in', () => {
    service.isLoggedIn = false;
    service.loginStatus();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
